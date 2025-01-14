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

  const getThemeColors = () => {
    switch (theme) {
      case 'violet':
        return {
          primary: 'rgba(255, 255, 255, 0.9)',
          accent: 'rgba(139, 92, 246, 1)',
          glow: 'rgba(139, 92, 246, 0.5)'
        }
      case 'green':
        return {
          primary: 'rgba(255, 255, 255, 0.9)',
          accent: 'rgba(52, 211, 153, 1)',
          glow: 'rgba(52, 211, 153, 0.5)'
        }
      case 'red':
        return {
          primary: 'rgba(255, 255, 255, 0.9)',
          accent: 'rgba(248, 113, 113, 1)',
          glow: 'rgba(248, 113, 113, 0.5)'
        }
      case 'yellow':
        return {
          primary: 'rgba(255, 255, 255, 0.9)',
          accent: 'rgba(251, 191, 36, 1)',
          glow: 'rgba(251, 191, 36, 0.5)'
        }
      default:
        return {
          primary: 'rgba(255, 255, 255, 0.9)',
          accent: 'rgba(139, 92, 246, 1)',
          glow: 'rgba(139, 92, 246, 0.5)'
        }
    }
  }

  const colors = getThemeColors()

  return (
    <motion.button
      className="fixed top-4 right-4 z-50 w-16 h-16 flex items-center justify-center"
      onClick={handleClick}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      style={{ 
        filter: `drop-shadow(0 0 10px ${colors.glow}) drop-shadow(0 0 20px ${colors.glow})`
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background halo */}
          <motion.circle
            cx="400"
            cy="400"
            r="250"
            fill={colors.glow}
            fillOpacity="0.2"
            animate={{
              r: [250, 260, 250],
              fillOpacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* UFO body */}
          <motion.path
            d="M400 200 L600 500 L200 500 Z"
            fill={colors.primary}
            stroke={colors.accent}
            strokeWidth="4"
          />
          
          {/* UFO top */}
          <motion.ellipse
            cx="400"
            cy="300"
            rx="100"
            ry="50"
            fill={colors.primary}
            stroke={colors.accent}
            strokeWidth="4"
          />
          
          {/* UFO windows */}
          <motion.circle
            cx="350"
            cy="300"
            r="15"
            fill={colors.accent}
          />
          <motion.circle
            cx="400"
            cy="300"
            r="15"
            fill={colors.accent}
          />
          <motion.circle
            cx="450"
            cy="300"
            r="15"
            fill={colors.accent}
          />
          
          {/* Beam effect */}
          <motion.path
            d="M300 500 L500 500 L450 600 L350 600 Z"
            fill={colors.accent}
            fillOpacity="0.4"
            animate={{
              fillOpacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
    </motion.button>
  )
}

