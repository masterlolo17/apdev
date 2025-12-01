import { useState } from 'react'
import { parseResume } from '../utils/parser'
import { predictWage } from '../utils/wagePredictor'
import './ResumeUpload.css'

export default function ResumeUpload({ onApplicantAdd }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile)
        setMessage('')
      } else {
        setMessage('Please upload a PDF or TXT file')
        setMessageType('error')
        setFile(null)
      }
    }
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setMessage('Please select a file')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // Read file content
      const text = await file.text()
      
      // Parse resume
      const resumeData = parseResume(text)
      
      // Predict wage
      const prediction = predictWage(resumeData)
      
      // Create applicant object
      const applicant = {
        id: Date.now(),
        ...resumeData,
        predictedWage: prediction.wage,
        confidence: prediction.confidence,
        uploadDate: new Date().toLocaleDateString()
      }

      // Add applicant
      onApplicantAdd(applicant)

      // Reset form
      setFile(null)
      document.getElementById('fileInput').value = ''
      
      setMessage(`✓ Resume processed! Predicted wage: ₱${prediction.wage.toLocaleString()}`, )
      setMessageType('success')

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error processing resume: ' + error.message)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="resume-upload-page">
      <div className="upload-container">
        <h1>AI Wage Prediction</h1>
        <p>Upload a resume to predict wage</p>

        <form onSubmit={handleFileUpload} className="upload-form">
          <div className="upload-box">
            <h2>Upload Your Resume</h2>
            <p>PDF or TXT format</p>
            
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.txt"
              className="file-input"
            />
            
            <label htmlFor="fileInput" className="file-label">
              {file ? file.name : 'Click to select file'}
            </label>
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading || !file}
          >
            {loading ? 'Processing...' : 'Predict Wage'}
          </button>
        </form>
      </div>
    </div>
  )
}
