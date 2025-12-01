import './Analytics.css'

export default function Analytics({ applicants = [] }) {
  const getAnalytics = () => {
    if (applicants.length === 0) {
      return null
    }

    const wages = applicants.map(a => a.predictedWage)
    const minWage = Math.min(...wages)
    const maxWage = Math.max(...wages)
    const avgWage = Math.round(wages.reduce((a, b) => a + b) / wages.length)

    const experienceRanges = {
      '0-2 years': applicants.filter(a => a.experience >= 0 && a.experience <= 2).length,
      '3-5 years': applicants.filter(a => a.experience >= 3 && a.experience <= 5).length,
      '6-10 years': applicants.filter(a => a.experience >= 6 && a.experience <= 10).length,
      '10+ years': applicants.filter(a => a.experience > 10).length
    }

    return { minWage, maxWage, avgWage, experienceRanges }
  }

  const analytics = getAnalytics()

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>View detailed analytics and insights about wage predictions</p>
      </div>

      {!analytics ? (
        <div className="empty-state">
          <p>No analytics data available. Upload resumes to see predictions.</p>
        </div>
      ) : (
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Wage Range</h3>
            <div className="analytics-content">
              <div className="wage-stat">
                <span className="label">Minimum:</span>
                <span className="value">₱{analytics.minWage.toLocaleString()}</span>
              </div>
              <div className="wage-stat">
                <span className="label">Maximum:</span>
                <span className="value">₱{analytics.maxWage.toLocaleString()}</span>
              </div>
              <div className="wage-stat">
                <span className="label">Average:</span>
                <span className="value">₱{analytics.avgWage.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Experience Distribution</h3>
            <div className="analytics-content">
              {Object.entries(analytics.experienceRanges).map(([range, count]) => (
                <div key={range} className="experience-stat">
                  <span className="label">{range}:</span>
                  <div className="bar-container">
                    <div className="bar" style={{width: `${(count / applicants.length) * 100}%`}}></div>
                  </div>
                  <span className="count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h3>Summary</h3>
            <div className="analytics-content">
              <p>Total Applicants: <strong>{applicants.length}</strong></p>
              <p>Average Experience: <strong>{Math.round(applicants.reduce((a, b) => a + b.experience, 0) / applicants.length)} years</strong></p>
              <p>Avg Confidence: <strong>{Math.round(applicants.reduce((a, b) => a + b.confidence, 0) / applicants.length)}%</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
