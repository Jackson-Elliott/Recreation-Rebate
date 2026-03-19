import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import headerLogo from '../assets/brand/logo-header.png'

function LoadingScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/upload')
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [navigate])

  return (
    <main className="screen screen-loading" aria-label="Loading screen">
      <img className="loading-brand-logo" src={headerLogo} alt="The Recreation Rebate" />

      <div className="loading-track" aria-hidden="true">
        <div className="loading-fill" />
      </div>
    </main>
  )
}

export default LoadingScreen
