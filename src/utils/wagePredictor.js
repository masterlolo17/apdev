// Mock wage prediction service (frontend only)
export const predictWage = (applicantData) => {
  // Simulate wage prediction based on applicant data
  const baseWage = 50000
  
  let wageMultiplier = 1
  
  // Experience multiplier
  if (applicantData.experience) {
    wageMultiplier += (applicantData.experience * 0.05) // 5% per year
  }
  
  // Education multiplier
  if (applicantData.degree) {
    if (applicantData.degree.includes("PhD")) {
      wageMultiplier += 0.35
    } else if (applicantData.degree.includes("Master")) {
      wageMultiplier += 0.25
    } else if (applicantData.degree.includes("Bachelor")) {
      wageMultiplier += 0.15
    }
  }
  
  // Skills multiplier
  if (applicantData.skills && applicantData.skills.length > 0) {
    const skillMultiplier = Math.min(applicantData.skills.length * 0.02, 0.3)
    wageMultiplier += skillMultiplier
  }
  
  const predictedWage = Math.round(baseWage * wageMultiplier)
  
  return {
    wage: predictedWage,
    confidence: Math.round((Math.random() * 0.2 + 0.75) * 100) // 75-95% confidence
  }
}
