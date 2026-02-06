import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'
import { portfolioData } from '../data/portfolioData'
import { supabase } from '../lib/supabaseClient'

export const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    { type: 'success' | 'error'; message: string } | null
  >(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in animation for contact page
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
    }, contactRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus(null)
    setIsSubmitting(true)
    
    // Button micro-interaction: Pop animation
    if (sendButtonRef.current) {
      gsap.to(sendButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Form submission logic (Supabase)
        }
      })
    }

    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      ])

    if (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      })
    } else {
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully!'
      })
      setFormData({ name: '', email: '', message: '' })
    }

    setIsSubmitting(false)
  }

  return (
    <div ref={contactRef} className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Let's Build Something Together
          </h2>
          <p className="text-lg text-zinc-400 font-body mb-6">
            Email me at{' '}
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              {portfolioData.personal.email}
            </a>
            {' '}or use the form below.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href={portfolioData.personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-pink-500 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href={portfolioData.personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-pink-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-body font-medium text-white mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-body font-medium text-white mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-body font-medium text-white mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <Button
            ref={sendButtonRef}
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          {submitStatus && (
            <p
              className={`text-sm font-body ${
                submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {submitStatus.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}







