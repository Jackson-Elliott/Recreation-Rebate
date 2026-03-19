import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import headerLogo from '../assets/brand/logo-header.png'
import brandIcon from '../assets/brand/logo-redeemed-red-clean.png'
import ticketBackground from '../assets/brand/ticket-redeemed.png'

function generateRedeemCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function RedeemedScreen({ fallbackScreenTime = null }) {
  const navigate = useNavigate()
  const location = useLocation()
  const screenTime = location.state?.screenTime ?? fallbackScreenTime
  const [redeemCode] = useState(() => generateRedeemCode())

  if (!screenTime) {
    return <Navigate to="/upload" replace />
  }

  return (
    <main className="screen screen-redeemed" aria-label="Redeemed screen">
      <header className="redeemed-header">
        <Link
          to="/"
          replace
          className="brand-lockup-button"
          aria-label="Restart experience"
        >
          <img className="brand-header-logo" src={headerLogo} alt="The Recreation Rebate" />
        </Link>
      </header>

      <section className="redeemed-body">
        <article className="ticket-card">
          <img
            className="ticket-card-art"
            src={ticketBackground}
            alt=""
            aria-hidden="true"
          />
          <div className="ticket-content">
            <img className="ticket-logo" src={brandIcon} alt="Toyota logo" />
            <p className="ticket-label">SCREEN TIME REDEEMED</p>
            <p className="ticket-time">
              {screenTime.hours}h&nbsp;{screenTime.minutes}m
            </p>

            <p className="ticket-code-label">CODE</p>
            <p className="ticket-code">{redeemCode}</p>

            <button
              type="button"
              className="ticket-button"
              onClick={() =>
                navigate('/activities', {
                  state: { screenTime },
                })
              }
            >
              Explore Activities
            </button>
          </div>
        </article>
      </section>
    </main>
  )
}

export default RedeemedScreen
