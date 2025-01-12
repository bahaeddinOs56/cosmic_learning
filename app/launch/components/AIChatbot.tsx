import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (inputText.trim() === '') return

    // Add user message
    setMessages(prev => [...prev, { text: inputText, isUser: true }])

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm an AI assistant. How can I help you with your coding journey?", isUser: false }])
    }, 1000)

    setInputText('')
  }

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
            <div className="h-60 overflow-y-auto mb-4 space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className={`p-2 rounded-lg ${msg.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your question..."
                className="flex-grow p-2 border rounded-l"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

