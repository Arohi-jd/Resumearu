import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Button } from '../components/Button'
import { portfolioData } from '../data/portfolioData'

export const Home = () => {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)
  const animatedTextRef = useRef<HTMLSpanElement>(null)

  // Animated sub-headline cycling
  useEffect(() => {
    const headlines = portfolioData.personal.animatedHeadlines
    let currentIndex = 0
    let isDeleting = false
    let currentText = ''
    let typingSpeed = 100

    const typeText = () => {
      const currentHeadline = headlines[currentIndex]
      
      if (isDeleting) {
        currentText = currentHeadline.substring(0, currentText.length - 1)
        typingSpeed = 50
      } else {
        currentText = currentHeadline.substring(0, currentText.length + 1)
        typingSpeed = 100
      }

      if (animatedTextRef.current) {
        animatedTextRef.current.textContent = currentText
      }

      if (!isDeleting && currentText === currentHeadline) {
        typingSpeed = 2000 // Pause at end
        isDeleting = true
      } else if (isDeleting && currentText === '') {
        isDeleting = false
        currentIndex = (currentIndex + 1) % headlines.length
        typingSpeed = 500
      }

      setTimeout(typeText, typingSpeed)
    }

    // Start typing after initial delay
    const timeout = setTimeout(typeText, 1000)
    return () => clearTimeout(timeout)
  }, [])

  // Hero reveal animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subheadlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(summaryRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(chevronRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")

      // Animate chevron bounce
      gsap.to(chevronRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6"
        >
          {portfolioData.personal.name}
        </h1>
        
        <div 
          ref={subheadlineRef}
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold mb-8 min-h-[3rem]"
        >
          <span className="text-zinc-400">I'm a </span>
          <span 
            ref={animatedTextRef}
            className="text-pink-500 inline-block"
          >
            {portfolioData.personal.animatedHeadlines[0]}
          </span>
          <span className="text-pink-500 animate-pulse">|</span>
        </div>
        
        <p 
          ref={summaryRef}
          className="text-lg sm:text-xl text-zinc-400 font-body max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {portfolioData.personal.summary}
        </p>
        
        <div ref={buttonRef} className="mb-16">
          <Button onClick={() => navigate('/projects')}>
            View My Work
          </Button>
        </div>
      </div>
      
      <div 
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
          <svg 
            className="w-6 h-6 text-pink-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
      </div>
    </div>
  )
}







