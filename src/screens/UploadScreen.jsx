import { useRef, useState } from 'react'
import { createWorker } from 'tesseract.js'
import { useNavigate } from 'react-router-dom'
import toyotaIcon from '../assets/brand/logo-white-icon.png'

const STRICT_DURATION_PATTERN =
  /(\d{1,2})\s*h(?:r|rs|our|ours)?\s*(\d{1,2})\s*m(?:in|ins|inute|inutes)?/g

const LOOSE_DURATION_PATTERN = /(\d{1,2})\s*h(?:r|rs|our|ours)?\s*[:;.,-]?\s*(\d{1,2})\b/g

const AVERAGE_ANCHOR_PATTERN = /(last week|average|avg)/i
const OCR_PIPELINE_VERSION = 'ocr-fullscreen-ranked-reread-v1'

function isValidScreenTime(hours, minutes) {
  return Number.isInteger(hours) && Number.isInteger(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
}

function normalizeOcrText(rawText) {
  return rawText
    .toLowerCase()
    .replace(/\|/g, 'l')
    .replace(/(\d{1,2})\s*b(?=\s*[:;.,-]?\s*\d{1,2}\b)/g, '$1h')
    // OCR may read zero as letter "o" in minutes (e.g. "3h 1om").
    .replace(/(\d)\s*o(?=\s*m(?:in|ins|inute|inutes)?\b)/g, '$10')
    // OCR sometimes splits minute digits ("3h 1 9m"). Rejoin before parsing.
    .replace(/(\d)\s+(\d)(?=\s*m(?:in|ins|inute|inutes)?\b)/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim()
}

function getNearestMatch(matches, anchorIndex) {
  return matches.reduce((closest, current) => {
    if (!closest) {
      return current
    }

    const currentCenter = (current.matchStart + current.matchEnd) / 2
    const closestCenter = (closest.matchStart + closest.matchEnd) / 2
    const currentDistance = Math.abs(currentCenter - anchorIndex)
    const closestDistance = Math.abs(closestCenter - anchorIndex)

    return currentDistance < closestDistance ? current : closest
  }, null)
}

function getPreferredAnchorMatch(matches, anchorIndex) {
  const forwardMatches = matches.filter((entry) => entry.matchStart >= anchorIndex)
  if (forwardMatches.length > 0) {
    return getNearestMatch(forwardMatches, anchorIndex)
  }

  return getNearestMatch(matches, anchorIndex)
}

function collectDurationMatches(text, options = {}) {
  const { allowLoose = false } = options
  const patterns = allowLoose ? [STRICT_DURATION_PATTERN, LOOSE_DURATION_PATTERN] : [STRICT_DURATION_PATTERN]

  const deduped = new Map()

  patterns.forEach((pattern) => {
    Array.from(text.matchAll(pattern)).forEach((match) => {
      const hours = Number.parseInt(match[1], 10)
      const minutes = Number.parseInt(match[2], 10)

      if (!isValidScreenTime(hours, minutes)) {
        return
      }

      const matchStart = match.index ?? 0
      const matchEnd = matchStart + match[0].length
      const key = `${matchStart}:${matchEnd}:${hours}:${minutes}`
      deduped.set(key, { matchStart, matchEnd, hours, minutes })
    })
  })

  return Array.from(deduped.values()).sort((a, b) => a.matchStart - b.matchStart)
}

function parseScreenTime(rawText, options = {}) {
  const { requireAnchor = false } = options
  const normalized = normalizeOcrText(rawText)

  const allMatches = collectDurationMatches(normalized, { allowLoose: true })

  if (allMatches.length === 0) {
    return null
  }

  const anchorMatch = normalized.match(AVERAGE_ANCHOR_PATTERN)
  const anchorIndex = anchorMatch?.index ?? -1

  if (anchorIndex >= 0) {
    const windowStart = Math.max(anchorIndex - 110, 0)
    const windowEnd = Math.min(anchorIndex + 220, normalized.length)
    const anchoredMatches = allMatches.filter(
      (entry) => entry.matchStart >= windowStart && entry.matchEnd <= windowEnd,
    )

    if (anchoredMatches.length === 1) {
      return {
        hours: anchoredMatches[0].hours,
        minutes: anchoredMatches[0].minutes,
      }
    }

    if (anchoredMatches.length > 1) {
      const nearestAnchoredMatch = getPreferredAnchorMatch(anchoredMatches, anchorIndex)
      if (nearestAnchoredMatch) {
        return {
          hours: nearestAnchoredMatch.hours,
          minutes: nearestAnchoredMatch.minutes,
        }
      }
    }

    const nearestGlobalMatch = getPreferredAnchorMatch(allMatches, anchorIndex)
    if (nearestGlobalMatch) {
      return {
        hours: nearestGlobalMatch.hours,
        minutes: nearestGlobalMatch.minutes,
      }
    }
  }

  if (requireAnchor) {
    return null
  }

  if (allMatches.length > 1) {
    return {
      // Without a reliable anchor, use the first time found in reading order.
      // In Screen Time screenshots this is the headline metric (before categories).
      hours: allMatches[0].hours,
      minutes: allMatches[0].minutes,
    }
  }

  return {
    hours: allMatches[0].hours,
    minutes: allMatches[0].minutes,
  }
}

function getAverageConfidence(words = []) {
  if (!Array.isArray(words) || words.length === 0) {
    return null
  }

  const confidenceValues = words
    .map((word) => Number(word?.confidence))
    .filter((value) => Number.isFinite(value))

  if (confidenceValues.length === 0) {
    return null
  }

  const total = confidenceValues.reduce((sum, value) => sum + value, 0)
  return total / confidenceValues.length
}

function loadImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve({
        width: image.naturalWidth || image.width,
        height: image.naturalHeight || image.height,
      })
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to read image dimensions.'))
    }

    image.src = objectUrl
  })
}

function buildExpandedRectangle(bbox = {}, dimensions = {}) {
  const imageWidth = Math.max(1, Number(dimensions.width ?? 1))
  const imageHeight = Math.max(1, Number(dimensions.height ?? 1))
  const x0 = Number(bbox.x0 ?? 0)
  const y0 = Number(bbox.y0 ?? 0)
  const x1 = Number(bbox.x1 ?? x0)
  const y1 = Number(bbox.y1 ?? y0)
  const paddingX = 56
  const paddingY = 120

  const left = Math.max(0, Math.floor(x0 - paddingX))
  const top = Math.max(0, Math.floor(y0 - paddingY))
  const right = Math.min(imageWidth, Math.ceil(x1 + paddingX))
  const bottom = Math.min(imageHeight, Math.ceil(y1 + paddingY))

  return {
    left,
    top,
    width: Math.max(1, right - left),
    height: Math.max(1, bottom - top),
  }
}

function getStructuredDuration(lines, anchorLineIndexes) {
  const candidates = []

  lines.forEach((line) => {
    const lineText = normalizeOcrText(line.text ?? '')
    if (!lineText) {
      return
    }

    const lineMatches = collectDurationMatches(lineText, { allowLoose: true })
    if (lineMatches.length === 0) {
      return
    }

    const bbox = line.bbox ?? {}
    const width = Math.max(0, Number(bbox.x1 ?? 0) - Number(bbox.x0 ?? 0))
    const height = Math.max(0, Number(bbox.y1 ?? 0) - Number(bbox.y0 ?? 0))
    const area = width * height
    const y = Number(bbox.y0 ?? Number.POSITIVE_INFINITY)
    const x = Number(bbox.x0 ?? Number.POSITIVE_INFINITY)
    const confidence = getAverageConfidence(line.words) ?? Number(line.confidence ?? 0)
    const anchorDistance = anchorLineIndexes.length
      ? Math.min(...anchorLineIndexes.map((anchorIndex) => Math.abs(anchorIndex - line.index)))
      : Number.POSITIVE_INFINITY

    lineMatches.forEach((match) => {
      candidates.push({
        lineText,
        hours: match.hours,
        minutes: match.minutes,
        area,
        height,
        anchorDistance,
        confidence: Number.isFinite(confidence) ? confidence : 0,
        y,
        x,
        bbox,
      })
    })
  })

  if (candidates.length === 0) {
    return null
  }

  // If we can see "average/last week", keep selection close to that headline zone.
  const anchoredPool = anchorLineIndexes.length
    ? candidates.filter((candidate) => candidate.anchorDistance <= 3)
    : []
  const candidatePool = anchoredPool.length > 0 ? anchoredPool : candidates
  const hasAnchorPool = anchoredPool.length > 0

  const sorted = [...candidatePool].sort((a, b) => {
    if (hasAnchorPool && a.anchorDistance !== b.anchorDistance) return a.anchorDistance - b.anchorDistance
    if (!hasAnchorPool && a.y !== b.y) return a.y - b.y
    if (b.area !== a.area) return b.area - a.area
    if (b.height !== a.height) return b.height - a.height
    if (b.confidence !== a.confidence) return b.confidence - a.confidence
    if (a.y !== b.y) return a.y - b.y
    return a.x - b.x
  })

  return { best: sorted[0], candidates, hasAnchorContext: anchorLineIndexes.length > 0 }
}

function shouldRunSecondPass(structuredResult) {
  const best = structuredResult?.best
  if (!best || !structuredResult?.hasAnchorContext) {
    return false
  }

  const lineMatchCount = collectDurationMatches(best.lineText ?? '', { allowLoose: true }).length
  return lineMatchCount > 1 || best.minutes < 10 || best.confidence < 92
}

async function getSecondPassDuration(worker, file, structuredResult, imageDimensions) {
  const sortedTargets = [...(structuredResult?.candidates ?? [])].sort((a, b) => {
    if (a.anchorDistance !== b.anchorDistance) return a.anchorDistance - b.anchorDistance
    if (a.y !== b.y) return a.y - b.y
    if (b.area !== a.area) return b.area - a.area
    return b.confidence - a.confidence
  })

  const target = sortedTargets[0]
  if (!target) {
    return null
  }

  const rectangle = buildExpandedRectangle(target.bbox, imageDimensions)
  const secondPass = await worker.recognize(file, { rectangle }, { text: true })
  const secondPassText = secondPass?.data?.text ?? ''
  return parseScreenTime(secondPassText)
}

function UploadScreen() {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractError, setExtractError] = useState('')

  const handleChooseFile = () => {
    if (isExtracting) {
      return
    }
    inputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setExtractError('')
    setIsExtracting(true)

    try {
      const imageDimensions = await loadImageDimensions(file)
      const worker = await createWorker('eng')
      let structuredResult = null
      let text = ''
      let secondPassTime = null

      try {
        const extraction = await worker.recognize(file, {}, { text: true, blocks: true })
        text = extraction?.data?.text ?? ''
        const blocks = extraction?.data?.blocks ?? []

        const flattenedLines = []
        blocks.forEach((block) => {
          ;(block.paragraphs ?? []).forEach((paragraph) => {
            ;(paragraph.lines ?? []).forEach((line) => {
              flattenedLines.push({
                text: line.text ?? '',
                bbox: line.bbox,
                confidence: line.confidence,
                words: line.words ?? [],
                index: flattenedLines.length,
              })
            })
          })
        })

        const anchorLineIndexes = flattenedLines
          .filter((line) => AVERAGE_ANCHOR_PATTERN.test(normalizeOcrText(line.text ?? '')))
          .map((line) => line.index)

        structuredResult = getStructuredDuration(flattenedLines, anchorLineIndexes)
        secondPassTime = shouldRunSecondPass(structuredResult)
          ? await getSecondPassDuration(worker, file, structuredResult, imageDimensions)
          : null
      } finally {
        await worker.terminate()
      }

      const extractedTime =
        secondPassTime ??
        (structuredResult?.best
          ? {
              hours: structuredResult.best.hours,
              minutes: structuredResult.best.minutes,
            }
          : null) ??
        parseScreenTime(text, { requireAnchor: true }) ??
        parseScreenTime(text)

      if (import.meta.env.DEV) {
        console.info(`[${OCR_PIPELINE_VERSION}]`, {
          structured: structuredResult?.best
            ? {
                hours: structuredResult.best.hours,
                minutes: structuredResult.best.minutes,
                confidence: structuredResult.best.confidence,
                area: structuredResult.best.area,
              }
            : null,
          secondPass: secondPassTime,
          candidates: structuredResult?.candidates?.length ?? 0,
          final: extractedTime,
        })
      }

      if (!extractedTime) {
        setExtractError('Could not read Last Week’s Average. Please upload another screenshot.')
        return
      }

      navigate('/redeemed', {
        state: {
          screenTime: extractedTime,
        },
      })
    } catch {
      setExtractError('Could not process this image. Please try another screenshot.')
    } finally {
      setIsExtracting(false)
      event.target.value = ''
    }
  }

  return (
    <main className="screen screen-upload" aria-label="Upload screen">
      <section className="upload-content">
        <img className="upload-icon" src={toyotaIcon} alt="Toyota recreation icon" />
        <h2 className="upload-title">UPLOAD A SCREENSHOT OF YOUR SCREEN TIME</h2>

        <button
          type="button"
          className="upload-button"
          onClick={handleChooseFile}
          disabled={isExtracting}
        >
          Choose File
        </button>
        {isExtracting && <p className="upload-status">Extracting time...</p>}
        {extractError && <p className="upload-error">{extractError}</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
      </section>
    </main>
  )
}

export default UploadScreen
