import React from 'react'
import { motion } from 'framer-motion'

interface LearningPathSelectionProps {
  onSelect: (path: string) => void;
}

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

export default function LearningPathSelection({ onSelect }: LearningPathSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Choose Your Learning Path</h2>
      <p className="mb-6">Select the path that aligns with your goals:</p>
      <div className="space-y-4">
        {paths.map((path) => (
          <button
            key={path.name}
            onClick={() => onSelect(path.name)}
            className="w-full p-4 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-left flex items-start"
          >
            <span className="text-3xl mr-4">{path.icon}</span>
            <div>
              <h3 className="font-bold">{path.name}</h3>
              <p className="text-sm opacity-80">{path.description}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

