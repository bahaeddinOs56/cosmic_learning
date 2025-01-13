'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const languages = [
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'C++', icon: '🔷' },
  { name: 'Ruby', icon: '💎' },
  { name: 'Go', icon: '🐹' },
  { name: 'Rust', icon: '🦀' },
  { name: 'Swift', icon: '🐦' },
  { name: 'Kotlin', icon: '🟣' },
  { name: 'TypeScript', icon: '🔵' },
  { name: 'PHP', icon: '🐘' },
  { name: 'C#', icon: '🟢' },
  { name: 'Scala', icon: '🔴' },
  { name: 'Haskell', icon: '🟡' },
  { name: 'Dart', icon: '🎯' },
]

interface LanguageSelectionProps {
  onSelectLanguage: (language: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

export default function LanguageSelection({ onSelectLanguage }: LanguageSelectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center"
        variants={itemVariants}
      >
        Choose Your Programming Language
      </motion.h2>
      <motion.p 
        className="mb-6 text-center text-lg"
        variants={itemVariants}
      >
        Select the language you want to focus on for your cosmic coding journey:
      </motion.p>
      <div className="relative">
        <motion.div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          onScroll={checkScroll}
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.name}
              onClick={() => onSelectLanguage(lang.name)}
              className="flex-shrink-0 w-40 h-40 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300 flex flex-col items-center justify-center space-y-2"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-5xl mb-2"
                initial={{ rotateY: 0 }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                {lang.icon}
              </motion.span>
              <motion.span 
                className="font-medium text-lg text-center"
                initial={{ y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {lang.name}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            aria-label="Scroll left"
          >
            ◀
          </button>
        )}
        {canScrollRight && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            aria-label="Scroll right"
          >
            ▶
          </button>
        )}
      </div>
    </motion.div>
  )
}

