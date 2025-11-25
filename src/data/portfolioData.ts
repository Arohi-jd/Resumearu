import { PortfolioData } from '../types'

// Central data source for the portfolio
export const portfolioData: PortfolioData = {
  personal: {
    name: "Arohi Jadhav",
    headline: "Full-Stack Developer & UI/UX Designer",
    animatedHeadlines: [
      "Full-Stack Developer",
      "UI/UX Designer",
      "SIH 2024 Finalist",
      "Co-founder of SETU",
      "AI/ML Enthusiast"
    ],
    summary: "B.Tech sophomore in Computer Science (AI/ML), specializing in full-stack web development. A Smart India Hackathon 2024 Finalist and Co-founder of SETU, passionate about solving real-world problems through technology and design.",
    email: "arohi.jadhav@adypu.edu.in",
    phone: "+918421536202",
    links: {
      github: "https://github.com/[YourUsername]",
      linkedin: "https://linkedin.com/[YourUsername]",
    },
    professionalPhotoUrl: "/images/experience/IMG_20241227_225932 (1).jpg",
    candidPhotoUrl: "https://placehold.co/600x400/18181b/fuchsia?text=Hackathon+Team"
  },
  projects: [
    {
      id: "navsmart",
      title: "NAVSMART (SIH 2024)",
      category: "Full-Stack & AI",
      imageUrl: "/images/projects/navsmart.jpg",
      headline: "AI-Driven Fleet Management for Delhi Transport Corp.",
      role: "Team Leader & Full-Stack Developer",
      problem: "Delhi Transport Corporation faced inefficiencies in fleet management, route optimization, and maintenance scheduling, leading to high fuel costs and downtime.",
      solution: "As Team Lead, I engineered a full-stack Vue.js/Quasar app with a Supabase backend to manage routes, crews, and costs. We implemented AI-driven algorithms, the Google Maps API for real-time GIS tracking, and Chart.js for the admin dashboard.",
      outcome: "Finalist & Runner-Up at Smart India Hackathon 2024. The solution was projected to reduce fuel costs by 15% and improve on-time performance.",
      tech: ["Vue.js", "Quasar", "Supabase", "PostgreSQL", "Google Maps API", "Chart.js", "AI/ML"],
      url: "https://nav-smart-projects.vercel.app/"
    },
    
    {
      id: "teefusion",
      title: "TeeFusion (DEARE)",
      category: "Full-Stack",
      imageUrl: "/images/projects/teefusion.jpg",
      headline: "Next-gen T-shirt selling platform with a seamless UI.",
      role: "Entrepreneur & Developer",
      problem: "Launched a custom apparel brand and needed a platform to showcase and sell products, managing 70+ orders and achieving a 40% profit margin.",
      solution: "Engineered a full-stack e-commerce platform using React and a Supabase backend. Designed an animated, seamless shopping UI with Framer Motion and Material-UI.",
      outcome: "Scaled a brand from zero to 70+ orders in 2 months through strategic sourcing and social media marketing.",
      tech: ["React", "Supabase", "Framer Motion", "Material-UI"],
      url: "https://teefusion-ajp5.vercel.app/"
    },
    {
      id: "rockpaperscissor",
      title: "Rock Paper Scissor Game",
      category: "Frontend",
      imageUrl: "/images/projects/rock-paper-scissor.jpg",
      headline: "Interactive Rock Paper Scissor game with modern UI.",
      role: "Developer",
      problem: "Creating an engaging and interactive game experience with smooth animations and intuitive gameplay.",
      solution: "Built a responsive Rock Paper Scissor game with modern UI design, smooth animations, and interactive gameplay mechanics.",
      outcome: "Delivered a fun, interactive game that showcases frontend development skills and attention to user experience.",
      tech: ["React", "CSS", "JavaScript"],
      url: "https://game-smoky-tau.vercel.app/"
    },
    {
      id: "petgrooming",
      title: "Pet Grooming Service",
      category: "Full-Stack",
      imageUrl: "/images/projects/pet-grooming.jpg",
      headline: "Pet grooming service platform with appointment booking system.",
      role: "Full-Stack Developer",
      problem: "Pet owners needed a convenient way to book grooming appointments online with a user-friendly interface.",
      solution: "Developed a full-stack pet grooming service platform with appointment booking, service selection, and payment integration. Features include user authentication, appointment management, and responsive design.",
      outcome: "Created a seamless booking experience for pet owners, streamlining the appointment process and improving customer satisfaction.",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      url: "https://pet-grooming-gamma.vercel.app/"
    }

  ],
  experience: [
    {
      role: "UI/UX Designer",
      company: "TheGoodGameTheory",
      duration: "April 2025 - July 2025",
      location: "Remote",
      type: "Work",
      description: "Designed 50+ user screens for TheGoodGameTheory & Kridum AI platforms. Built high-fidelity prototypes and reusable UI components in Figma.",
      imageUrls: [
        "/images/experience/Internship Completion Certificate (1)_page-0001.jpg",
        
      ],
      tech: ["Figma", "UI/UX Design", "Prototyping", "Component Library"],
      links: [
        { label: "Certificate", url: "#" },
        { label: "Work Link 1", url: "#" },
        { label: "Work Link 2", url: "#" }
      ]
    },
    {
      role: "Co-Founder",
      company: "SETU",
      duration: "March 2025 - Present",
      location: "Pune",
      type: "Project",
      description: "Co-founded and co-lead a social-impact venture focused on tech-driven rural development. Direct multiple tech projects, including a MERN portal connecting rural artisans to urban markets.",
      imageUrls: [
        "public/images/experience/WhatsApp Image 2025-11-19 at 23.57.38.jpeg",

        "public/images/experience/WhatsApp Image 2025-11-15 at 17.32.54.jpeg",
        "public/images/experience/WhatsApp Image 2025-07-04 at 0.33.24.jpeg",

        "public/images/experience/WhatsApp Image 2025-07-04 at 00.33.21.jpeg",
        "public/images/experience/WhatsApp Image 2025-07-04 at 0.33.22.jpeg",
        "public/images/experience/WhatsAp Image 2025-07-04 at 14.19.51.jpeg",
        "public/images/experience/WhatsApp Image 2025-11-15 at 17.32.55.jpeg",
      ],
      tech: ["React", "Node.js", "MongoDB", "Express.js", "MERN"],
      links: [
        { label: "Research Paper", url: "#" }
      ]
    },
    {
      role: "President",
      company: "Student Developer Club",
      duration: "November 2024 - Present",
      location: "Pune",
      type: "GitHub Repositories",
      description: "Fostered a collaborative tech community for 200+ members by organizing 5+ hands-on workshops and a 24-hour hackathon. Direct multiple tech projects, including a MERN portal connecting rural artisans to urban markets. Led innovative, community-driven projects and organized club-wide contributions to open-source initiatives.",
      imageUrls: [
        "public/images/experience/WhatsApp Image 2025-11-19 at 23.51.29.jpeg",
        "public/images/experience/WhatsApp Image 2025-11-20 at 00.11.04.jpeg",
        "public/images/experience/wp.jpeg",
        "public/images/experience/WhatsApp Image 2025-11-19 at 23.29.40.jpeg",
        
      ],
      tech: ["Community Management", "Event Organization", "Leadership", "Open Source"],
      links: [
        { label: "NST-SDC Repos", url: "#" },
        { label: "Student Developer Club", url: "#" }
      ]
    },
    {
      role: "Entrepreneur",
      company: "DEARE",
      duration: "October 2024 - May 2025",
      location: "Pune",
      type: "Entrepreneur",
      description: "Launched and scaled a custom apparel brand from zero to 70+ orders in 2 months, achieving a 40% profit margin through strategic sourcing and social media marketing.",
      imageUrl: "/images/experience/deare.jpg",
      tech: ["E-commerce", "Marketing", "Business Strategy", "Social Media"]
    },
    {
      role: "Team Leader - Finalist and Runner Up",
      company: "Smart India Hackathon (SIH) 2024",
      duration: "September 2024 - December 2024",
      location: "Pune",
      type: "Competition",
      description: "Finalist & Runner-Up entry for Smart India Hackathon 2024, a nationwide coding competition. Engineered an AI-driven fleet management system to optimize bus routes for Delhi Transport Corp, projected to reduce fuel costs by 15% and improve on-time performance.",
      imageUrl: "/images/experience/navsmart-sih.jpg",
      tech: ["Vue.js", "Quasar", "Supabase", "AI/ML", "Team Leadership", "Google Maps API"]
    }
  ],
  skills: {
    frontend: ["React", "Vue.js", "Quasar", "Material-UI", "Framer Motion", "Vite"],
    backend: ["Node.js", "Express.js"],
    databases: ["MySQL", "Supabase", "Firebase", "Prisma"],
    tools: ["Git", "GitHub", "Figma", "Chart.js"],
    languages: ["JavaScript", "CSS", "HTML", "Python"]
  },
  extraCurriculars: [
    { title: "Founder, KASS Beauty", description: "Launched a D2C beauty brand, handling branding, marketing, and operations."},
    { title: "District-Level Rifle Shooter", description: "Competed in district-level championships."},
    { title: "Volunteer, Robin Hood Army", description: "Developed and maintained the organization's local website."}
  ]
}

