import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'
import { Badge } from '../components/Badge'
import { SwipeableImageGallery } from '../components/SwipeableImageGallery'

export const Experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null)
  const experienceItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title on page load
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
      }

      // Animate each experience item as it enters viewport
      portfolioData.experience.forEach((_, index) => {
        const item = experienceItemsRef.current[index]
        if (!item) return

        const images = item.querySelectorAll('.experience-image')
        const textContent = item.querySelector('.experience-text')
        const roleTitle = item.querySelector('.experience-role')
        const description = item.querySelector('.experience-description')
        const techStack = item.querySelector('.experience-tech')

        if (images.length === 0 || !textContent) return

        const isEven = index % 2 === 0

        // Set initial states for all images
        images.forEach((img) => {
          gsap.set(img, { opacity: 0, y: 50, scale: 0.9 })
        })
        gsap.set(textContent, { opacity: 0, x: isEven ? -50 : 50 })
        if (roleTitle) gsap.set(roleTitle, { opacity: 0, y: 20 })
        if (description) gsap.set(description, { opacity: 0, y: 20 })
        if (techStack) gsap.set(techStack, { opacity: 0, y: 20 })

        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          animation: gsap.timeline()
            // Image animation: fade-in + upward motion + scale-up (staggered for multiple images)
            .to(images, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out"
            })
            // Text content animation: slide-in from side
            .to(textContent, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out"
            }, "-=0.6")
            // Staggered text animations
            .to(roleTitle, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            }, "-=0.4")
            .to(description, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            }, "-=0.3")
            .to(techStack, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            }, "-=0.3"),
          toggleActions: "play none none reverse"
        })
      })
    }, experienceRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={experienceRef} className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-20 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Experience
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 font-body max-w-2xl mx-auto leading-relaxed">
            My professional journey and key achievements
          </p>
        </div>

        {/* Experience Items */}
        <div className="space-y-32 md:space-y-40">
          {portfolioData.experience.map((exp, index) => {
            const isEven = index % 2 === 0
            
            return (
              <div
                key={index}
                ref={(el) => {
                  experienceItemsRef.current[index] = el
                }}
              >
                <div
                  className={`flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-10 md:gap-12 lg:gap-16`}
                >
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 flex-shrink-0">
                    {exp.imageUrls && exp.imageUrls.length > 1 ? (
                      // Multiple Images - Swipeable Gallery
                      <SwipeableImageGallery
                        images={exp.imageUrls}
                        alt={`${exp.company} - ${exp.role}`}
                      />
                    ) : (
                      // Single Image
                      <div className="relative group">
                        {/* Gradient glow effect on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 via-fuchsia-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Image container with shadow */}
                        <div className="relative rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl bg-zinc-900/50 backdrop-blur-sm">
                          <img
                            src={exp.imageUrl || (exp.imageUrls && exp.imageUrls[0]) || ''}
                            alt={`${exp.company} - ${exp.role}`}
                            className="experience-image relative w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Content Section */}
                  <div className="experience-text w-full md:w-1/2 space-y-6 lg:space-y-8">
                    <div className="space-y-5">
                      {/* Type Badge */}
                      {exp.type && (
                        <div className="mb-2">
                          <span className="text-xs font-body text-fuchsia-500 font-semibold uppercase tracking-widest px-3 py-1.5 bg-fuchsia-500/10 rounded-full border border-fuchsia-500/20">
                            {exp.type}
                          </span>
                        </div>
                      )}

                      {/* Role Title */}
                      <h3 className="experience-role text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
                        {exp.role}
                      </h3>

                      {/* Company Name */}
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl md:text-2xl font-heading font-semibold text-pink-500">
                          {exp.company}
                        </h4>
                      </div>
                      
                      {/* Duration and Location */}
                      <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                        <span className="text-zinc-400 font-body">
                          {exp.duration}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 font-body">
                          {exp.location}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="experience-description text-base md:text-lg text-zinc-400 font-body leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Links */}
                      {exp.links && exp.links.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-2">
                          {exp.links.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-pink-500 hover:text-pink-400 font-body font-medium flex items-center gap-1.5 transition-colors border-b border-pink-500/30 hover:border-pink-400"
                            >
                              <span>{link.label}</span>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="experience-tech pt-6 border-t border-zinc-800/50">
                        <p className="text-xs font-body text-zinc-500 mb-4 uppercase tracking-wider font-semibold">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {exp.tech.map((tech, techIndex) => (
                            <Badge key={techIndex} className="text-xs md:text-sm px-3 py-1.5">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
