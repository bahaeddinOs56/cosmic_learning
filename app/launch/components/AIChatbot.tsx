import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg"
        >
          {isOpen ? '✕' : '🤖'}
        </button>
      </motion.div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl"
        >
          <div className="p-4">
            <h3 className="font-bold mb-2">AI Assistant</h3>
            <p className="text-gray-600 mb-4">How can I help you with your coding journey?</p>
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full p-2 border rounded"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

