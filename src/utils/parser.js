// Utility functions to parse resume text
export const parseResume = (text) => {
  const resume = {
    name: extractName(text),
    degree: extractDegree(text),
    skills: extractSkills(text),
    experience: extractExperience(text)
  }
  return resume
}

const extractName = (text) => {
  const lines = text.split('\n').filter(line => line.trim().length > 0)
  const firstLine = lines[0]?.trim()
  if (firstLine && firstLine.length > 0 && firstLine.length < 50) {
    return firstLine
  }
  
  const namePattern = /^([A-Z][a-z]+\s+[A-Z][a-z]+)/m
  const match = text.match(namePattern)
  return match ? match[1] : 'Unknown'
}

const extractDegree = (text) => {
  const degrees = ['Bachelor', 'Master', 'PhD', 'Associate', 'Diploma', 'High School']
  const degreePattern = new RegExp(`(${degrees.join('|')})\\s*(?:'?s)?\\s+(?:in|of)?\\s+([^\\n]+)`, 'i')
  const match = text.match(degreePattern)
  
  if (match) {
    return `${match[1]}'s in ${match[2].trim()}`
  }
  
  if (text.match(/\bBachelor\b/i)) return "Bachelor's Degree"
  if (text.match(/\bMaster\b/i)) return "Master's Degree"
  if (text.match(/\bPhD\b/i)) return "PhD"
  
  return 'Not specified'
}

const extractSkills = (text) => {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'SQL', 'MongoDB', 'PostgreSQL', 'MySQL',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Git', 'GitHub', 'GitLab', 'JIRA',
    'HTML', 'CSS', 'REST', 'GraphQL',
    'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow', 'PyTorch',
    'Leadership', 'Communication', 'Project Management', 'Agile', 'Scrum',
    'Linux', 'Windows', 'MacOS', 'DevOps'
  ]
  
  const skills = []
  const textLower = text.toLowerCase()
  
  commonSkills.forEach(skill => {
    if (textLower.includes(skill.toLowerCase())) {
      skills.push(skill)
    }
  })
  
  return [...new Set(skills)].slice(0, 10)
}

const extractExperience = (text) => {
  const yearsPattern = /(\d+)\s*(?:\+)?\s*years?\s+(?:of\s+)?(?:experience|exp)/i
  const match = text.match(yearsPattern)
  
  if (match) {
    return parseInt(match[1])
  }
  
  return 0
}
