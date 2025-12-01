import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ResumeUpload from './components/ResumeUpload'
import Applicants from './components/Applicants'
import History from './components/History'
import Analytics from './components/Analytics'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [applicants, setApplicants] = useState([])

  const handleApplicantAdd = (applicant) => {
    setApplicants([...applicants, applicant])
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard applicants={applicants} onNavigate={setCurrentPage} />
      case 'predict':
        return <ResumeUpload onApplicantAdd={handleApplicantAdd} />
      case 'applicants':
        return <Applicants applicants={applicants} />
      case 'history':
        return <History />
      case 'analytics':
        return <Analytics applicants={applicants} />
      default:
        return <Dashboard applicants={applicants} onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  )
}
