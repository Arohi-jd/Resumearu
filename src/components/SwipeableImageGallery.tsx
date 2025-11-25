import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface SwipeableImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export const SwipeableImageGallery = ({ images, alt, className = '' }: SwipeableImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initialize image refs
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images.length)
  }, [images.length])

  // Handle window resize to recalculate positions
  useEffect(() => {
    const handleResize = () => {
      if (!sliderRef.current || !containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const offset = -currentIndex * containerWidth
      gsap.set(sliderRef.current, {
        x: offset
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex])

  // Animate to current index
  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return

    // Calculate offset based on container width
    const containerWidth = containerRef.current.offsetWidth
    if (containerWidth === 0) return // Wait for container to be rendered
    
    const offset = -currentIndex * containerWidth
    gsap.to(sliderRef.current, {
      x: offset,
      duration: 0.6,
      ease: "power3.out"
    })

    // Animate current image with 3D effects
    const currentImage = imageRefs.current[currentIndex]
    if (currentImage) {
      const innerDiv = currentImage.querySelector('div') as HTMLElement
      if (innerDiv) {
        gsap.to(innerDiv, {
          scale: 1,
          rotation: 0,
          rotationY: 0,
          z: 20,
          duration: 0.6,
          ease: "power3.out"
        })
      }
    }

    // Reset other images with 3D depth
    imageRefs.current.forEach((img, index) => {
      if (img && index !== currentIndex) {
        const innerDiv = img.querySelector('div') as HTMLElement
        if (innerDiv) {
          gsap.to(innerDiv, {
            scale: 0.98,
            rotation: 0,
            rotationY: 0,
            z: 0,
            duration: 0.6,
            ease: "power3.out"
          })
        }
      }
    })
  }, [currentIndex])

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
    setDragOffset(0)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const newX = e.touches[0].clientX
    const diff = newX - startX
    setCurrentX(newX)
    setDragOffset(diff)

    if (sliderRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const baseOffset = -currentIndex * containerWidth
      const offset = baseOffset + diff
      const progress = Math.abs(diff) / containerWidth
      
      gsap.set(sliderRef.current, {
        x: offset
      })

      // Add visual feedback during drag with 3D effect
      const currentImage = imageRefs.current[currentIndex]
      if (currentImage) {
        const innerDiv = currentImage.querySelector('div') as HTMLElement
        if (innerDiv) {
          const rotation = diff * 0.015 // Subtle rotation
          const scale = 1 - progress * 0.08 // Slight scale down
          const rotateY = diff * 0.05 // 3D rotation
          gsap.set(innerDiv, {
            rotation: rotation,
            rotationY: rotateY,
            scale: Math.max(0.92, scale),
            z: 10 - progress * 10
          })
        }
      }
    }
  }

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const threshold = (containerRef.current?.offsetWidth || 0) * 0.25
    const diff = currentX - startX

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        // Swipe right - go to previous
        setCurrentIndex(currentIndex - 1)
      } else if (diff < 0 && currentIndex < images.length - 1) {
        // Swipe left - go to next
        setCurrentIndex(currentIndex + 1)
      } else {
        // Snap back
        animateToIndex(currentIndex)
      }
    } else {
      // Snap back
      animateToIndex(currentIndex)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setDragOffset(0)
    e.preventDefault()
  }

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const newX = e.clientX
    const diff = newX - startX
    setCurrentX(newX)
    setDragOffset(diff)

    if (sliderRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      const baseOffset = -currentIndex * containerWidth
      const offset = baseOffset + diff
      const progress = Math.abs(diff) / containerWidth
      
      gsap.set(sliderRef.current, {
        x: offset
      })

      // Add visual feedback during drag with 3D effect
      const currentImage = imageRefs.current[currentIndex]
      if (currentImage) {
        const innerDiv = currentImage.querySelector('div') as HTMLElement
        if (innerDiv) {
          const rotation = diff * 0.015 // Subtle rotation
          const scale = 1 - progress * 0.08 // Slight scale down
          const rotateY = diff * 0.05 // 3D rotation
          gsap.set(innerDiv, {
            rotation: rotation,
            rotationY: rotateY,
            scale: Math.max(0.92, scale),
            z: 10 - progress * 10
          })
        }
      }
    }
  }

  // Handle mouse up
  const handleMouseUp = () => {
    if (!isDragging) return
    
    const threshold = (containerRef.current?.offsetWidth || 0) * 0.25
    const diff = currentX - startX

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (diff < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        animateToIndex(currentIndex)
      }
    } else {
      animateToIndex(currentIndex)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  // Animate to specific index
  const animateToIndex = (index: number) => {
    if (!sliderRef.current || !containerRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    const offset = -index * containerWidth
    gsap.to(sliderRef.current, {
      x: offset,
      duration: 0.4,
      ease: "power2.out"
    })

    // Reset image transforms with 3D
    const currentImage = imageRefs.current[currentIndex]
    if (currentImage) {
      const innerDiv = currentImage.querySelector('div') as HTMLElement
      if (innerDiv) {
        gsap.to(innerDiv, {
          scale: 1,
          rotation: 0,
          rotationY: 0,
          z: 20,
          duration: 0.4,
          ease: "power2.out"
        })
      }
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, images.length])

  // Handle mouse leave during drag
  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        animateToIndex(currentIndex)
        setIsDragging(false)
        setDragOffset(0)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave)
      return () => container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isDragging, currentIndex])

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setCurrentIndex(index)
  }

  return (
    <div className={`relative group ${className}`} style={{ perspective: '1000px' }}>
      {/* Gradient glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 via-fuchsia-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div 
        className="relative rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-pink-500/20 group-hover:border-pink-500/30"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={sliderRef}
            className="flex h-full"
            style={{ 
              width: `${images.length * 100}%`,
              willChange: 'transform'
            }}
          >
            {images.map((imgUrl, index) => (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                className="relative h-full flex-shrink-0 overflow-hidden"
                style={{ 
                  width: `${100 / images.length}%`,
                  minWidth: `${100 / images.length}%`,
                  maxWidth: `${100 / images.length}%`,
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: index === currentIndex ? 'translateZ(20px)' : 'translateZ(0px)'
                  }}
                >
                  <img
                    src={imgUrl.startsWith('/') ? imgUrl : imgUrl.startsWith('public/') ? imgUrl.replace('public/', '/') : `/${imgUrl}`}
                    alt={`${alt} - Image ${index + 1}`}
                    className="experience-image w-full h-full object-contain transition-all duration-700"
                    style={{ 
                      transformOrigin: 'center center',
                      transform: index === currentIndex ? 'scale(1.02)' : 'scale(1)'
                    }}
                    draggable={false}
                    onError={(e) => {
                      console.error(`Failed to load image: ${imgUrl}`)
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                    loading="lazy"
                  />
                  {/* 3D Shadow effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: index === currentIndex 
                        ? 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(168,85,247,0.1) 100%)'
                        : 'transparent',
                      opacity: index === currentIndex ? 1 : 0
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrev}
                onMouseDown={(e) => e.stopPropagation()}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border-2 border-pink-500/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-fuchsia-500/20 hover:border-pink-500/70 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                style={{ transformStyle: 'preserve-3d' }}
                aria-label="Previous image"
              >
                <svg
                  className="w-7 h-7 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                onMouseDown={(e) => e.stopPropagation()}
                disabled={currentIndex === images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border-2 border-pink-500/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-fuchsia-500/20 hover:border-pink-500/70 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                style={{ transformStyle: 'preserve-3d' }}
                aria-label="Next image"
              >
                <svg
                  className="w-7 h-7 text-white drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Swipe Indicator */}
          {isDragging && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-zinc-700/50">
              <span className="text-xs text-white font-medium">
                {Math.abs(dragOffset) > 50 ? (
                  dragOffset > 0 ? '← Swipe to go back' : 'Swipe to continue →'
                ) : 'Swipe to navigate'}
              </span>
            </div>
          )}
        </div>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => handleDotClick(index, e)}
                onMouseDown={(e) => e.stopPropagation()}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500 w-10 h-2.5 scale-110 shadow-lg shadow-pink-500/50'
                    : 'bg-zinc-600/60 w-2.5 h-2.5 hover:bg-zinc-500/80 hover:scale-125'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div 
            className="absolute top-4 right-4 z-20 px-4 py-2 rounded-full bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md border border-pink-500/30 opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-white font-semibold tracking-wide">
              {currentIndex + 1} <span className="text-pink-400">/</span> {images.length}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

