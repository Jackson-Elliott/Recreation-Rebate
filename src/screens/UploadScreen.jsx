import { useRef, useState } from 'react'
import { recognize } from 'tesseract.js'
import { useNavigate } from 'react-router-dom'
import toyotaIcon from '../assets/brand/logo-white-icon.png'

const WEEKLY_AVERAGE_CROP = {
  x: 0.06,
  y: 0.2,
  width: 0.88,
  height: 0.28,
}

const DURATION_PATTERN =
  /(\d{1,2})\s*h(?:r|rs|our|ours)?\s*(\d{1,2})\s*m(?:in|ins|inute|inutes)?/g

const AVERAGE_ANCHOR_PATTERN = /(last week|average|avg)/i

function isValidScreenTime(hours, minutes) {
  return Number.isInteger(hours) && Number.isInteger(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
}

function parseScreenTime(rawText, options = {}) {
  const { requireAnchor = false } = options
  const normalized = rawText
    .toLowerCase()
    .replace(/\|/g, 'l')
    .replace(/\s+/g, ' ')
    .trim()

  const allMatches = Array.from(normalized.matchAll(DURATION_PATTERN))
    .map((match) => ({
      matchStart: match.index ?? 0,
      matchEnd: (match.index ?? 0) + match[0].length,
      hours: Number.parseInt(match[1], 10),
      minutes: Number.parseInt(match[2], 10),
    }))
    .filter((entry) => isValidScreenTime(entry.hours, entry.minutes))

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
      return null
    }
  }

  if (requireAnchor) {
    return null
  }

  if (allMatches.length !== 1) {
    return null
  }

  return {
    hours: allMatches[0].hours,
    minutes: allMatches[0].minutes,
  }
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image.'))
    }

    image.src = objectUrl
  })
}

function toCroppedImageFile(canvas, originalName) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to crop image.'))
        return
      }

      resolve(
        new File([blob], `${originalName}-weekly-average.png`, {
          type: 'image/png',
        }),
      )
    }, 'image/png')
  })
}

async function cropWeeklyAverageRegion(file) {
  const image = await loadImageFromFile(file)

  const sx = Math.floor(image.width * WEEKLY_AVERAGE_CROP.x)
  const sy = Math.floor(image.height * WEEKLY_AVERAGE_CROP.y)
  const sw = Math.max(1, Math.floor(image.width * WEEKLY_AVERAGE_CROP.width))
  const sh = Math.max(1, Math.floor(image.height * WEEKLY_AVERAGE_CROP.height))

  const boundedSw = Math.min(sw, image.width - sx)
  const boundedSh = Math.min(sh, image.height - sy)

  const canvas = document.createElement('canvas')
  canvas.width = boundedSw
  canvas.height = boundedSh

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas context unavailable.')
  }

  context.drawImage(image, sx, sy, boundedSw, boundedSh, 0, 0, boundedSw, boundedSh)

  return toCroppedImageFile(canvas, file.name)
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
      const croppedImage = await cropWeeklyAverageRegion(file)
      const {
        data: { text },
      } = await recognize(croppedImage, 'eng')

      const extractedTime = parseScreenTime(text, { requireAnchor: true }) ?? parseScreenTime(text)

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
