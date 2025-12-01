import './Sidebar.css'

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-text">
          <h2>AI Wage Predictor</h2>
          <p>HR Analytics Platform</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-item ${currentPage === 'predict' ? 'active' : ''}`}
          onClick={() => onNavigate('predict')}
        >
          Predict Wage
        </button>
        <button 
          className={`nav-item ${currentPage === 'applicants' ? 'active' : ''}`}
          onClick={() => onNavigate('applicants')}
        >
          Applicants
        </button>
        <button 
          className={`nav-item ${currentPage === 'history' ? 'active' : ''}`}
          onClick={() => onNavigate('history')}
        >
          History
        </button>
        <button 
          className={`nav-item ${currentPage === 'analytics' ? 'active' : ''}`}
          onClick={() => onNavigate('analytics')}
        >
          Analytics
        </button>
      </nav>
    </aside>
  )
}
