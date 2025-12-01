import { useState } from 'react'
import './Dashboard.css'
import StatsCard from './StatsCard'

export default function Dashboard({ applicants = [], onNavigate }) {
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const calculateStats = () => {
    if (applicants.length === 0) {
      return {
        totalPredictions: 0,
        avgWage: 0,
        avgConfidence: 0,
        totalApplicants: 0
      }
    }

    const totalWage = applicants.reduce((sum, app) => sum + app.predictedWage, 0)
    const avgConfidence = applicants.reduce((sum, app) => sum + app.confidence, 0) / applicants.length

    return {
      totalPredictions: applicants.length,
      avgWage: Math.round(totalWage / applicants.length),
      avgConfidence: Math.round(avgConfidence),
      totalApplicants: applicants.length
    }
  }

  const stats = calculateStats()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Dashboard Overview</h1>
          <p>AI-powered wage prediction analytics</p>
        </div>
        <div className="header-buttons">
          <button className="btn-secondary">Applicant Portal</button>
          <button className="btn-primary" onClick={() => onNavigate('predict')}>New Prediction</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Predictions"
          value={stats.totalPredictions}
          subtitle="All time"
        />
        <StatsCard
          title="Avg Predicted Wage"
          value={`₱${stats.avgWage.toLocaleString()}`}
          subtitle="Per year"
        />
        <StatsCard
          title="Avg Confidence"
          value={`${stats.avgConfidence}%`}
          subtitle="Prediction accuracy"
        />
        <StatsCard
          title="Total Applicants"
          value={stats.totalApplicants}
          subtitle="Submitted profiles"
        />
      </div>

      <div className="predictions-section">
        {applicants.length === 0 ? (
          <div className="no-predictions">
            <h3>No predictions yet</h3>
            <p>Start making wage predictions to see analytics and insights</p>
          </div>
        ) : (
          <div className="predictions-list">
            <h3>Recent Predictions</h3>
            {applicants.slice().reverse().map((app, idx) => (
              <div 
                key={app.id} 
                className="prediction-item clickable"
                onClick={() => setSelectedApplicant(app)}
              >
                <div className="prediction-info">
                  <strong>{app.name}</strong>
                  <span className="prediction-wage">₱{app.predictedWage.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedApplicant && (
        <div className="modal-overlay" onClick={() => setSelectedApplicant(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedApplicant(null)}>✕</button>
            <h2>{selectedApplicant.name}</h2>
            <div className="applicant-details">
              <div className="detail-row">
                <span className="detail-label">Education:</span>
                <span className="detail-value">{selectedApplicant.degree}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">{selectedApplicant.experience} years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Predicted Wage:</span>
                <span className="detail-value wage">₱{selectedApplicant.predictedWage.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Confidence:</span>
                <span className="detail-value">{selectedApplicant.confidence}%</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Skills:</span>
                <div className="skills-list">
                  {selectedApplicant.skills.map((skill, idx) => (
                    <span key={idx} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">Upload Date:</span>
                <span className="detail-value">{selectedApplicant.uploadDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
