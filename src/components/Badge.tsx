interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center rounded-full bg-pink-500/10 text-pink-500 px-3 py-1 text-xs font-medium border border-pink-500/20 ${className}`}>
      {children}
    </span>
  )
}







