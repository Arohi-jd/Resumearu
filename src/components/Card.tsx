import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', onClick, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden cursor-pointer transition-all hover:border-pink-500/50 ${className}`}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"







