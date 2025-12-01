import './Applicants.css'

export default function Applicants({ applicants }) {
  return (
    <div className="applicants-page">
      <div className="applicants-header">
        <h1>Applicants</h1>
        <p>All uploaded applicant profiles and predictions</p>
      </div>

      {applicants.length === 0 ? (
        <div className="empty-applicants">
          <p>No applicants yet. Upload a resume to get started.</p>
        </div>
      ) : (
        <div className="applicants-table-container">
          <table className="applicants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Education</th>
                <th>Experience (years)</th>
                <th>Skills</th>
                <th>Predicted Wage</th>
                <th>Confidence</th>
                <th>Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="name-cell">{applicant.name}</td>
                  <td>{applicant.degree}</td>
                  <td className="center">{applicant.experience}</td>
                  <td>
                    <div className="skills-tags">
                      {applicant.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                      {applicant.skills.length > 3 && (
                        <span className="skill-tag more">+{applicant.skills.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="wage-cell">₱{applicant.predictedWage.toLocaleString()}</td>
                  <td className="center">
                    <div className="confidence-badge">{applicant.confidence}%</div>
                  </td>
                  <td className="center">{applicant.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
