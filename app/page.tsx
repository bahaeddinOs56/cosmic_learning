'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleLaunchClick = () => {
    router.push('/register')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff1b6b] via-[#45caff] to-black opacity-30" />
        <Image
          src="/galaxim.jpg"
          alt="High-resolution cosmic galaxy background"
          fill
          style={{ objectFit: 'cover' }}
          className="animate-pulse opacity-60 mix-blend-screen"
          priority
          quality={100}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/80" />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-white p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(69, 202, 255, 0.1) 0%, transparent 50%)',
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff1b6b] to-[#45caff]"
        >
          Cosmic Coding Journey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-center max-w-2xl text-cyan-100"
        >
          Embark on an interstellar adventure to master programming
        </motion.p>

        <motion.button
          onClick={handleLaunchClick}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(69, 202, 255, 0.5)' }}
          className="bg-gradient-to-r from-[#ff1b6b] to-[#45caff] text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:from-[#45caff] hover:to-[#ff1b6b]"
        >
          Launch Your Journey
        </motion.button>
      </div>
    </div>
  )
}

