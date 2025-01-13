'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { GalaxyOrbThemeSelector } from '@/app/components/GalaxyOrbThemeSelector'
import { useTheme } from '@/app/contexts/ThemeContext'
import StarryNightSky from '@/app/components/StarryNightSky'

interface Hint {
  id: number;
  title: string;
  content: string;
}

export default function ProblemSolvingGrid() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState<'none' | 'solution' | 'hints'>('none')
  const [hints, setHints] = useState<Hint[]>([])
  const [expandedHints, setExpandedHints] = useState<number[]>([])

  const handleSectionClick = (section: 'solution' | 'hints') => {
    setActiveSection(activeSection === section ? 'none' : section)
  }

  const handleHintExpand = (hintId: number) => {
    setExpandedHints(prev => 
      prev.includes(hintId) ? prev.filter(id => id !== hintId) : [...prev, hintId]
    )
  }

  const handleMoreHints = () => {
    const newHint: Hint = {
      id: hints.length + 1,
      title: `Hint ${hints.length + 1}`,
      content: 'This is a placeholder hint. Replace with actual hint content.'
    }
    setHints(prev => [...prev, newHint])
  }

  const getThemeColors = () => {
    switch (theme) {
      case 'violet':
        return {
          button: 'bg-purple-600 hover:bg-purple-700',
          activeButton: 'bg-purple-800',
          hintBg: 'bg-purple-800/30',
          hintHover: 'hover:bg-purple-700/40'
        }
      case 'green':
        return {
          button: 'bg-green-600 hover:bg-green-700',
          activeButton: 'bg-green-800',
          hintBg: 'bg-green-800/30',
          hintHover: 'hover:bg-green-700/40'
        }
      case 'red':
        return {
          button: 'bg-red-600 hover:bg-red-700',
          activeButton: 'bg-red-800',
          hintBg: 'bg-red-800/30',
          hintHover: 'hover:bg-red-700/40'
        }
      case 'yellow':
        return {
          button: 'bg-yellow-600 hover:bg-yellow-700',
          activeButton: 'bg-yellow-800',
          hintBg: 'bg-yellow-800/30',
          hintHover: 'hover:bg-yellow-700/40'
        }
      default:
        return {
          button: 'bg-purple-600 hover:bg-purple-700',
          activeButton: 'bg-purple-800',
          hintBg: 'bg-purple-800/30',
          hintHover: 'hover:bg-purple-700/40'
        }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="min-h-screen text-white">
      <StarryNightSky theme={theme} />
      <div className="relative z-10 p-8">
        <GalaxyOrbThemeSelector />
        <h1 className="text-4xl font-bold mb-8 text-center">Your Personalized Cosmic Coding Challenge</h1>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Challenge</h2>
            <p className="text-lg">
              Your cosmic coding challenge will appear here. Get ready to solve an interstellar programming puzzle!
            </p>
          </motion.div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                activeSection === 'solution' ? colors.activeButton : colors.button
              } text-white transition-colors duration-200`}
              onClick={() => handleSectionClick('solution')}
            >
              View Solution
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                activeSection === 'hints' ? colors.activeButton : colors.button
              } text-white transition-colors duration-200`}
              onClick={() => handleSectionClick('hints')}
            >
              Get Hints
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {activeSection === 'hints' && (
              <motion.div
                key="hints"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">Hints</h3>
                <div className="space-y-4">
                  {hints.map((hint) => (
                    <div key={hint.id} className={`${colors.hintBg} rounded-lg overflow-hidden`}>
                      <button
                        onClick={() => handleHintExpand(hint.id)}
                        className={`w-full p-4 text-left flex justify-between items-center ${colors.hintHover} transition-colors duration-200`}
                      >
                        <span>{hint.title}</span>
                        {expandedHints.includes(hint.id) ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedHints.includes(hint.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="p-4 bg-white/5"
                          >
                            {hint.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMoreHints}
                  className={`mt-4 px-4 py-2 ${colors.button} text-white rounded-full transition-colors duration-200`}
                >
                  More Hints
                </motion.button>
              </motion.div>
            )}

            {activeSection === 'solution' && (
              <motion.div
                key="solution"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4">Solution</h3>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p>The solution to your cosmic coding challenge will be revealed here when you're ready!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

