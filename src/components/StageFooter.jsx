import { useLocation, useNavigate } from 'react-router-dom'

const stages = [
  { id: 'upload', label: 'Upload', path: '/upload' },
  { id: 'redeemed', label: 'Redeemed', path: '/redeemed' },
  { id: 'activities', label: 'Activities', path: '/activities' },
  { id: 'confirmation', label: 'Done', path: '/confirmation' },
]

const renderStageIcon = (id) => {
  switch (id) {
    case 'upload':
      return (
        <svg viewBox="0 0 24 24" className="stage-footer-svg" aria-hidden="true">
          <path d="M12 4v9" />
          <path d="M8.5 7.5 12 4l3.5 3.5" />
          <path d="M5 14.5h14v4.5H5z" />
        </svg>
      )
    case 'redeemed':
      return (
        <svg viewBox="0 0 24 24" className="stage-footer-svg" aria-hidden="true">
          <path d="M4.5 8.5h15v7h-15z" />
          <path d="M9 8.5v7" />
          <path d="M14.8 10.3c0-.8-.6-1.3-1.5-1.3-.8 0-1.4.4-1.4 1.1 0 .8.9 1 1.5 1.2.8.2 1.7.5 1.7 1.6 0 1-1 1.6-2.1 1.6-.8 0-1.5-.2-2.1-.7" />
        </svg>
      )
    case 'activities':
      return (
        <svg viewBox="0 0 24 24" className="stage-footer-svg" aria-hidden="true">
          <path d="M12 20s5-4.6 5-8.2A5 5 0 0 0 7 11.8C7 15.4 12 20 12 20Z" />
          <circle cx="12" cy="11" r="1.6" />
        </svg>
      )
    case 'confirmation':
      return (
        <svg viewBox="0 0 24 24" className="stage-footer-svg" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" />
          <path d="m8.7 12.1 2.2 2.2 4.4-4.4" />
        </svg>
      )
    default:
      return null
  }
}

function StageFooter({ maxReachedStageIndex, navStateByPath }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="stage-footer" aria-label="Journey progress">
      <ul className="stage-footer-list">
        {stages.map((stage, index) => {
          const isActive = location.pathname === stage.path
          const isEnabled = index <= maxReachedStageIndex

          return (
          <li key={stage.id} className="stage-footer-item">
            <button
              type="button"
              className={`stage-footer-link${isActive ? ' stage-footer-link-active' : ''}${
                isEnabled ? '' : ' stage-footer-link-disabled'
              }`}
              aria-label={`Go to ${stage.label}`}
              disabled={!isEnabled}
              onClick={() => {
                if (!isEnabled) {
                  return
                }
                navigate(stage.path, {
                  state: navStateByPath?.[stage.path],
                })
              }}
            >
              <span className="stage-footer-icon" aria-hidden="true">
                {renderStageIcon(stage.id)}
              </span>
            </button>
          </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default StageFooter
