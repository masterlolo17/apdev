import './History.css'

export default function History() {
  return (
    <div className="page-content">
      <h1>Prediction History</h1>
      <p>View past wage predictions and their results.</p>
      <div className="empty-state">
        <p>No prediction history available</p>
      </div>
    </div>
  )
}
