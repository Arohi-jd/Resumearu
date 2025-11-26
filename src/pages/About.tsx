import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '15+', label: 'Full products shipped' },
  { value: '5', label: 'Hackathons / comps' },
  { value: '200+', label: 'Community members led' }
]

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTimeline
        .from('.about-hero-heading', { y: 40, opacity: 0, duration: 0.8 })
        .from('.about-hero-text', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.about-hero-media', { scale: 0.92, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')

      gsap.utils.toArray<HTMLElement>('.about-card').forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 40, rotateX: -10 })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          animation: gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.05
          })
        })
      })

      gsap.utils.toArray<HTMLElement>('.skill-chip').forEach((chip) => {
        gsap.set(chip, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: chip,
          start: 'top 90%',
          animation: gsap.to(chip, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          })
        })
      })

      gsap.utils.toArray<HTMLElement>('.about-orb').forEach((orb, idx) => {
        gsap.to(orb, {
          x: idx % 2 === 0 ? 25 : -25,
          y: idx % 2 === 0 ? -25 : 25,
          scale: 1.15,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={aboutRef} className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* dynamic background */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="about-orb absolute top-10 -left-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="about-orb absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 text-xs uppercase tracking-[0.3em] about-hero-text">
            Origin Story
          </span>
          <h2 className="about-hero-heading text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mt-6 leading-tight">
            {portfolioData.personal.headline}
          </h2>
          <p className="about-hero-text mt-6 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-body">
            I’m Arohi Jadhav — a full-stack and motion-first designer crafting products that feel alive. From
            hackathon sprints to social-impact ventures, I bring cinematic interactions, clean systems, and intense focus
            on real users.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Hero media + bio */}
          <div className="lg:col-span-3 about-card">
            <div className="relative overflow-hidden rounded-[32px] border border-zinc-800/70 bg-gradient-to-br from-zinc-950/90 via-zinc-900/80 to-zinc-900/50 p-6 md:p-10 about-hero-media">
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.25),transparent_55%)]"></div>
              </div>
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-pink-400 opacity-70 blur-2xl"></div>
                  <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={portfolioData.personal.professionalPhotoUrl}
                      alt={portfolioData.personal.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-pink-400">Bio</p>
                    <h3 className="text-3xl font-heading font-semibold text-white mt-2">{portfolioData.personal.name}</h3>
                    <p className="text-zinc-400 font-body text-base leading-relaxed mt-4">
                      {portfolioData.personal.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats + extra */}
          <div className="lg:col-span-2 space-y-8 about-card">
            <div className="rounded-[28px] border border-zinc-800/70 bg-zinc-950/70 backdrop-blur px-6 py-8">
              <h4 className="text-sm uppercase tracking-[0.4em] text-zinc-500">Impact Snapshots</h4>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-5 text-center">
                    <p className="text-3xl font-heading text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-800/70 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black px-6 py-8">
              <h4 className="text-sm uppercase tracking-[0.4em] text-zinc-500 mb-6">Beyond Work</h4>
              <div className="space-y-5">
                {portfolioData.extraCurriculars.map((item, index) => (
                  <div key={item.title} className="group relative pl-5">
                    <div className="absolute left-0 top-2 h-full w-[2px] bg-gradient-to-b from-pink-500 via-fuchsia-500/60 to-transparent"></div>
                    <div className="rounded-2xl border border-white/5 bg-white/5/20 px-4 py-3 transition duration-300 group-hover:border-pink-500/40 group-hover:translate-x-1">
                      <p className="text-sm text-pink-400 uppercase tracking-[0.4em]">#{index + 1}</p>
                      <h5 className="text-lg font-heading text-white">{item.title}</h5>
                      <p className="text-sm text-zinc-400 font-body">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="mt-16">
          <div className="about-card rounded-[32px] border border-zinc-800/70 bg-zinc-950/70 px-6 sm:px-10 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">Ecosystem</p>
                <h3 className="text-3xl font-heading text-white">Skill constellation</h3>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-xs text-pink-300">
                Dynamic stack · Tailored per build
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category} className="rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/70 to-black/30 p-5 shadow-lg">
                  <h4 className="text-sm uppercase tracking-[0.4em] text-pink-400 mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="skill-chip inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

