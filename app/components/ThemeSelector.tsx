'use client'

import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { motion } from 'framer-motion'

const themes = [
  { name: 'Violet', value: 'violet', color: 'bg-purple-500' },
  { name: 'Green', value: 'green', color: 'bg-green-500' },
  { name: 'Red', value: 'red', color: 'bg-red-500' },
  { name: 'Yellow', value: 'yellow', color: 'bg-yellow-500' },
] as const

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      {themes.map((t) => (
        <motion.button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`w-8 h-8 rounded-full ${t.color} shadow-lg`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={theme === t.value ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  )
}

