'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const themes = ['violet', 'green', 'red', 'yellow'] as const

export const GalaxyOrbThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <motion.button
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full overflow-hidden shadow-lg"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`w-full h-full relative ${getGalaxyClass(theme)}`} style={{
  background: `radial-gradient(circle, ${getGalaxyColor(theme)} 0%, transparent 70%)`,
}}>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-50 animate-twinkle"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.button>
  )
}

function getGalaxyClass(theme: string) {
  switch (theme) {
    case 'violet':
      return 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-galaxy-spin'
    case 'green':
      return 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-galaxy-spin'
    case 'red':
      return 'bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 animate-galaxy-spin'
    case 'yellow':
      return 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 animate-galaxy-spin'
    default:
      return 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-galaxy-spin'
  }
}

function getGalaxyColor(theme: string) {
  switch (theme) {
    case 'violet':
      return 'rgba(139, 92, 246, 0.3)';
    case 'green':
      return 'rgba(52, 211, 153, 0.3)';
    case 'red':
      return 'rgba(248, 113, 113, 0.3)';
    case 'yellow':
      return 'rgba(251, 191, 36, 0.3)';
    default:
      return 'rgba(139, 92, 246, 0.3)';
  }
}

