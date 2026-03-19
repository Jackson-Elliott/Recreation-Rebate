import headerLogo from '../assets/brand/logo-header.png'
import { Link, Navigate, useLocation } from 'react-router-dom'

const pad = (value) => String(value).padStart(2, '0')

const formatCalendarDate = (value) => {
  return (
    `${value.getUTCFullYear()}${pad(value.getUTCMonth() + 1)}${pad(value.getUTCDate())}` +
    `T${pad(value.getUTCHours())}${pad(value.getUTCMinutes())}${pad(value.getUTCSeconds())}Z`
  )
}

const formatDisplayDate = (dateString) => {
  const localDate = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(localDate.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(localDate)
}

const formatDisplayTime = (timeString) => {
  const [hourPart, minutePart] = timeString.split(':')
  const hours = Number(hourPart)
  const minutes = Number(minutePart)

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return timeString
  }

  const meridiem = hours >= 12 ? 'PM' : 'AM'
  const twelveHour = hours % 12 || 12
  return `${twelveHour}:${pad(minutes)} ${meridiem}`
}

function ConfirmationScreen() {
  const location = useLocation()
  const activityTitle = location.state?.activityTitle
  const activityLocation = location.state?.activityLocation
  const bookingDate = location.state?.bookingDate
  const bookingTime = location.state?.bookingTime

  if (!activityTitle || !activityLocation || !bookingDate || !bookingTime) {
    return <Navigate to="/activities" replace />
  }

  const startDateTime = new Date(`${bookingDate}T${bookingTime}:00`)
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000)
  const isValidRange =
    !Number.isNaN(startDateTime.getTime()) && !Number.isNaN(endDateTime.getTime())

  const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render')
  googleCalendarUrl.searchParams.set('action', 'TEMPLATE')
  googleCalendarUrl.searchParams.set('text', `Recreation Rebate: ${activityTitle}`)
  googleCalendarUrl.searchParams.set(
    'details',
    `Swapped screen time for recreation time with a ${activityTitle} booking.`,
  )
  googleCalendarUrl.searchParams.set('location', activityLocation)
  if (isValidRange) {
    googleCalendarUrl.searchParams.set(
      'dates',
      `${formatCalendarDate(startDateTime)}/${formatCalendarDate(endDateTime)}`,
    )
  }

  return (
    <main className="screen screen-confirmation" aria-label="Booking confirmation screen">
      <header className="confirmation-header">
        <Link to="/" replace className="brand-lockup-button" aria-label="Restart experience">
          <img className="brand-header-logo" src={headerLogo} alt="The Recreation Rebate" />
        </Link>
      </header>

      <section className="confirmation-content">
        <h1 className="confirmation-title">
          Congradulations for swapping screen time for recreation time!
        </h1>

        <div className="confirmation-summary" aria-label="Booking confirmation details">
          <p className="confirmation-label">Activity</p>
          <p className="confirmation-value">{activityTitle}</p>

          <p className="confirmation-label">Day</p>
          <p className="confirmation-value">{formatDisplayDate(bookingDate)}</p>

          <p className="confirmation-label">Time</p>
          <p className="confirmation-value">{formatDisplayTime(bookingTime)}</p>
        </div>

        <a
          className="confirmation-calendar-button"
          href={googleCalendarUrl.toString()}
          target="_blank"
          rel="noreferrer"
        >
          Add to Google Calendar
        </a>
      </section>
    </main>
  )
}

export default ConfirmationScreen
