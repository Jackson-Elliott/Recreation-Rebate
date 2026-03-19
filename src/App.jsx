import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ActivitiesScreen from './screens/ActivitiesScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import LoadingScreen from './screens/LoadingScreen'
import RedeemedScreen from './screens/RedeemedScreen'
import UploadScreen from './screens/UploadScreen'
import StageFooter from './components/StageFooter'

const stagePaths = ['/upload', '/redeemed', '/activities', '/confirmation']
const RESET_TO_UPLOAD_ON_NEXT_LOAD_KEY = 'resetToUploadOnNextLoad'

const getStageIndex = (pathname) => {
  return stagePaths.findIndex((stagePath) => pathname === stagePath || pathname.startsWith(`${stagePath}/`))
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const showStageFooter = location.pathname !== '/'
  const isFullRedFooterScreen =
    location.pathname === '/upload' || location.pathname === '/confirmation'
  const [maxReachedStageIndex, setMaxReachedStageIndex] = useState(0)
  const [screenTimeStore, setScreenTimeStore] = useState(null)
  const [bookingStore, setBookingStore] = useState(null)

  useEffect(() => {
    try {
      const shouldResetToUpload = sessionStorage.getItem(RESET_TO_UPLOAD_ON_NEXT_LOAD_KEY) === '1'
      if (shouldResetToUpload) {
        sessionStorage.removeItem(RESET_TO_UPLOAD_ON_NEXT_LOAD_KEY)
        if (location.pathname !== '/upload') {
          navigate('/upload', { replace: true })
        }
      }
    } catch {
      // Ignore session storage failures.
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const stageIndex = getStageIndex(location.pathname)
    if (stageIndex >= 0) {
      setMaxReachedStageIndex((previous) => Math.max(previous, stageIndex))
    }

    const routeState = location.state ?? {}
    if (routeState.screenTime) {
      setScreenTimeStore(routeState.screenTime)
    }

    if (
      routeState.activityTitle &&
      routeState.activityLocation &&
      routeState.bookingDate &&
      routeState.bookingTime
    ) {
      setBookingStore({
        activityTitle: routeState.activityTitle,
        activityLocation: routeState.activityLocation,
        bookingDate: routeState.bookingDate,
        bookingTime: routeState.bookingTime,
      })
    }
  }, [location.pathname, location.state])

  useEffect(() => {
    let didConfirmLeave = false

    const shouldWarnAboutLosingSpot = () => getStageIndex(location.pathname) > 0

    const handleBeforeUnload = (event) => {
      if (!shouldWarnAboutLosingSpot()) {
        return
      }

      didConfirmLeave = true
      const warningText = "Are you sure you'll lose your spot"
      event.preventDefault()
      event.returnValue = warningText
      return warningText
    }

    const handlePageHide = () => {
      if (!didConfirmLeave || !shouldWarnAboutLosingSpot()) {
        return
      }

      try {
        sessionStorage.setItem(RESET_TO_UPLOAD_ON_NEXT_LOAD_KEY, '1')
      } catch {
        // Ignore session storage failures.
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [location.pathname])

  const navStateByPath = {
    '/upload': undefined,
    '/redeemed': screenTimeStore ? { screenTime: screenTimeStore } : undefined,
    '/activities': screenTimeStore ? { screenTime: screenTimeStore } : undefined,
    '/confirmation': bookingStore
      ? { ...bookingStore, ...(screenTimeStore ? { screenTime: screenTimeStore } : {}) }
      : undefined,
  }

  return (
    <div
      className={`app-shell${showStageFooter ? ' has-stage-footer' : ''}${
        isFullRedFooterScreen ? ' footer-on-red-screen' : ''
      }`}
    >
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/upload" element={<UploadScreen />} />
        <Route path="/redeemed" element={<RedeemedScreen fallbackScreenTime={screenTimeStore} />} />
        <Route path="/activities" element={<ActivitiesScreen fallbackScreenTime={screenTimeStore} />} />
        <Route path="/confirmation" element={<ConfirmationScreen fallbackBooking={bookingStore} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showStageFooter && (
        <StageFooter maxReachedStageIndex={maxReachedStageIndex} navStateByPath={navStateByPath} />
      )}
    </div>
  )
}

export default App
