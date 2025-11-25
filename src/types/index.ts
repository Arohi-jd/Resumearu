// TypeScript interfaces for portfolio data
export interface PersonalInfo {
  name: string
  headline: string
  animatedHeadlines: string[]
  summary: string
  email: string
  phone: string
  links: {
    github: string
    linkedin: string
  }
  professionalPhotoUrl: string
  candidPhotoUrl: string
}

export interface Project {
  id: string
  title: string
  category: string
  imageUrl: string
  headline: string
  role: string
  problem: string
  solution: string
  outcome: string
  tech: string[]
  url?: string
}

export interface Experience {
  role: string
  company: string
  duration: string
  location: string
  description: string
  imageUrl?: string  // For single image (backward compatibility)
  imageUrls?: string[]  // For multiple images
  tech?: string[]
  links?: {
    label: string
    url: string
  }[]
  type?: 'Work' | 'Project' | 'Certificate' | 'GitHub Repositories' | 'Entrepreneur' | 'Competition'
}

export interface Skills {
  frontend: string[]
  backend: string[]
  databases: string[]
  tools: string[]
  languages: string[]
}

export interface ExtraCurricular {
  title: string
  description: string
}

export interface PortfolioData {
  personal: PersonalInfo
  projects: Project[]
  experience: Experience[]
  skills: Skills
  extraCurriculars: ExtraCurricular[]
}

