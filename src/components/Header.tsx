import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { portfolioData } from '../data/portfolioData'

export const Header = () => {
  const location = useLocation()
  const currentPage = location.pathname

  return (
    <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-md border-b border-zinc-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-heading font-bold text-white hover:text-pink-500 transition-colors"
          >
            {portfolioData.personal.name}
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-body transition-colors ${
                currentPage === '/' 
                  ? 'text-pink-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-body transition-colors ${
                currentPage === '/projects' 
                  ? 'text-pink-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link
              to="/about"
              className={`text-sm font-body transition-colors ${
                currentPage === '/about' 
                  ? 'text-pink-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/experience"
              className={`text-sm font-body transition-colors ${
                currentPage === '/experience' 
                  ? 'text-pink-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Experience
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-body transition-colors ${
                currentPage === '/contact' 
                  ? 'text-pink-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>
          
          <Link to="/contact" className="hidden md:inline-flex">
            <Button>Let's Talk</Button>
          </Link>
          
          {/* Mobile menu button */}
          <Link
            to="/"
            className="md:hidden text-white"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

