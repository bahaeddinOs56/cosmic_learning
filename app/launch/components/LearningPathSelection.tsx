'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const paths = [
  {
    name: "Data Structures and Algorithms",
    description: "Master fundamental computer science concepts and problem-solving techniques.",
    icon: "🧠"
  },
  {
    name: "Real-World Problem Solving",
    description: "Build practical projects and applications for real-world scenarios.",
    icon: "🌍"
  }
]

interface LearningPathSelectionProps {
  language: string | null;
  skillLevel: string | null;
  theme: 'violet' | 'green' | 'red' | 'yellow';
}

export default function LearningPathSelection({ language, skillLevel, theme }: LearningPathSelectionProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Choose Your Learning Path</h2>
      <p className="mb-6 text-center">
        Based on your selection of {language || 'your chosen language'} and your {skillLevel || 'assessed'} skill level, 
        here are the recommended learning paths:
      </p>
      <div className="space-y-4">
        {paths.map((path) => (
          <motion.button
            key={path.name}
            onClick={() => setSelectedPath(path.name)}
            className={`w-full p-4 rounded-lg transition-colors text-left flex items-start ${
              selectedPath === path.name
                ? theme === 'violet' ? 'bg-purple-600 text-white' :
                  theme === 'green' ? 'bg-green-600 text-white' :
                  theme === 'red' ? 'bg-red-600 text-white' :
                  'bg-yellow-600 text-white'
                : 'bg-white/20 hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-3xl mr-4">{path.icon}</span>
            <div>
              <h3 className="font-bold">{path.name}</h3>
              <p className="text-sm opacity-80">{path.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/problem-solving-grid">
          <motion.button
            className={`px-8 py-3 rounded-full font-bold text-lg shadow-lg ${
              theme === 'violet' ? 'bg-gradient-to-r from-purple-500 to-indigo-600' :
              theme === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
              theme === 'red' ? 'bg-gradient-to-r from-red-500 to-rose-600' :
              'bg-gradient-to-r from-yellow-500 to-amber-600'
            } text-white`}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            disabled={!selectedPath}
          >
            Generate Your Cosmic Challenges
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

