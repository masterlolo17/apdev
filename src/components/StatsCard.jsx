import './StatsCard.css'

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="stats-card">
      <h3 className="stats-title">{title}</h3>
      <div className="stats-value">{value}</div>
      <p className="stats-subtitle">{subtitle}</p>
    </div>
  )
}
