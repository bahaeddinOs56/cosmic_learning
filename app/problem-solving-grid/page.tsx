'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Hint {
  id: number;
  title: string;
  content: string;
}

export default function ProblemSolvingGrid() {
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
    // This function will be used to request more hints from the OpenAI API
    const newHint: Hint = {
      id: hints.length + 1,
      title: `Hint ${hints.length + 1}`,
      content: '' // This will be filled by the OpenAI API
    }
    setHints(prev => [...prev, newHint])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Personalized Cosmic Coding Challenge</h1>
      
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg min-h-[200px]"
        >
          {/* Empty challenge grid to be populated by ChatGPT */}
        </motion.div>

        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full ${
              activeSection === 'solution' ? 'bg-blue-800' : 'bg-blue-600'
            } text-white`}
            onClick={() => handleSectionClick('solution')}
          >
            View Solution
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full ${
              activeSection === 'hints' ? 'bg-green-800' : 'bg-green-600'
            } text-white`}
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
                  <div key={hint.id} className="bg-white/5 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleHintExpand(hint.id)}
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-white/10 transition-colors duration-200"
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
                          className="p-4 bg-white/5 min-h-[100px]"
                        >
                          {/* Empty hint content to be populated by ChatGPT */}
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
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
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
              <div className="bg-white/5 p-4 rounded-lg min-h-[200px]">
                {/* Empty solution grid to be populated by ChatGPT */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

