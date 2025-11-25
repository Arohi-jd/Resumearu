import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '../types'
import { Badge } from './Badge'
import { Button } from './Button'

interface ProjectCaseStudyProps {
  project: Project | null
  onClose: () => void
}

export const ProjectCaseStudy = ({ project, onClose }: ProjectCaseStudyProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const outcomeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return

    const ctx = gsap.context(() => {
      // Modal entrance animation
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      )

      // ScrollTrigger animations for sections
      const sections = [problemRef.current, solutionRef.current, outcomeRef.current]
      
      sections.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            animation: gsap.fromTo(
              section,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            ),
            toggleActions: "play none none reverse"
          })
        }
      })
    }, modalRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [project])

  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      })
    } else {
      onClose()
    }
  }

  if (!project) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[95vh] bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-white transition-colors bg-zinc-800/80 rounded-full p-2 backdrop-blur-sm hover:bg-zinc-700"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image / Website Preview */}
          <div className="w-full h-[60vh] min-h-[500px] max-h-[700px] overflow-hidden bg-zinc-950 relative border-b-2 border-zinc-800 p-4 md:p-6">
            {project.url ? (
              <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-zinc-800 shadow-inner bg-white">
                {/* Loading indicator */}
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-zinc-400 font-body text-sm">Loading website preview...</div>
                  </div>
                </div>
                <iframe
                  src={project.url}
                  className="w-full h-full border-0 relative z-20 bg-white"
                  title={`${project.title} preview`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  allow="fullscreen"
                  onLoad={(e) => {
                    // Hide loading indicator when iframe loads
                    const loadingDiv = e.currentTarget.previousElementSibling as HTMLElement
                    if (loadingDiv) {
                      loadingDiv.style.display = 'none'
                    }
                  }}
                />
              </div>
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {project.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-zinc-400 font-body mb-6">
                {project.headline}
              </h2>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>{project.role}</Badge>
                {project.tech.map((tech, index) => (
                  <Badge key={index}>{tech}</Badge>
                ))}
              </div>

              {/* Visit Live Site Button */}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Button variant="outline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Live Site
                  </Button>
                </a>
              )}
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* The Problem */}
              <div ref={problemRef} className="opacity-0">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  The Problem
                </h3>
                <p className="text-zinc-400 font-body text-lg leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* The Solution */}
              <div ref={solutionRef} className="opacity-0">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  The Solution
                </h3>
                <p className="text-zinc-400 font-body text-lg leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* The Outcome */}
              <div ref={outcomeRef} className="opacity-0">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  The Outcome
                </h3>
                <p className="text-zinc-400 font-body text-lg leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

