import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Card } from '../components/Card'
import { portfolioData } from '../data/portfolioData'
import { Project } from '../types'
import { ProjectCaseStudy } from '../components/ProjectCaseStudy'

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade-in animation for cards
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (index: number, isHovering: boolean) => {
    const card = cardsRef.current[index]
    if (!card) return

    const image = card.querySelector('.project-image')
    const overlay = card.querySelector('.project-overlay')
    const iframe = card.querySelector('iframe')

    if (isHovering) {
      if (iframe) {
        // For iframes, animate the transform scale
        gsap.to(iframe, {
          transform: 'scale(0.525)',
          duration: 0.4,
          ease: "power2.out"
        })
      } else if (image) {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        })
      }
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      if (iframe) {
        gsap.to(iframe, {
          transform: 'scale(0.5)',
          duration: 0.4,
          ease: "power2.out"
        })
      } else if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
      }
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-white mb-12 text-center">
            My Projects
          </h2>
          
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {portfolioData.projects.map((project, index) => (
              <Card
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group"
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <div className="relative overflow-hidden h-64 bg-zinc-800">
                  {project.url ? (
                    <div className="project-image w-full h-full relative">
                      <iframe
                        src={project.url}
                        className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none transition-transform duration-400"
                        style={{ 
                          transform: 'scale(0.5)',
                          transformOrigin: 'top left',
                          width: '200%',
                          height: '200%'
                        }}
                        title={`${project.title} preview`}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    </div>
                  ) : (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="project-image w-full h-full object-cover transition-transform duration-400"
                    />
                  )}
                  <div className="project-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0">
                    <span className="text-pink-500 font-heading font-semibold text-lg">
                      View Case Study
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 font-body text-sm mb-3">
                    {project.category}
                  </p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-pink-500 hover:text-pink-400 text-sm font-body flex items-center gap-1 transition-colors"
                    >
                      <span>Visit Live Site</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

