import { useState } from 'react'
import './PredictionForm.css'

export default function PredictionForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    experience: '',
    education: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle prediction logic
    console.log('Form submitted:', formData)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button 
        className="btn-create-prediction"
        onClick={() => setIsOpen(true)}
      >
        Create Your First Prediction
      </button>
    )
  }

  return (
    <div className="prediction-form-modal">
      <div className="form-overlay" onClick={() => setIsOpen(false)}></div>
      <div className="form-container">
        <h2>Create Wage Prediction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Applicant Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label>Industry</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            >
              <option value="">Select industry</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="0"
            />
          </div>
          <div className="form-group">
            <label>Education Level</label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
            >
              <option value="">Select education</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's</option>
              <option value="master">Master's</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Predict Wage</button>
        </form>
        <button 
          className="form-close"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
