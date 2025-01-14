'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useChat } from 'ai/react'

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<string>
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const getThemeColors = () => {
    switch (theme) {
      case 'violet':
        return { bg: 'bg-purple-900', text: 'text-purple-100', input: 'bg-purple-800' }
      case 'green':
        return { bg: 'bg-green-900', text: 'text-green-100', input: 'bg-green-800' }
      case 'red':
        return { bg: 'bg-red-900', text: 'text-red-100', input: 'bg-red-800' }
      case 'yellow':
        return { bg: 'bg-yellow-900', text: 'text-yellow-100', input: 'bg-yellow-800' }
      default:
        return { bg: 'bg-purple-900', text: 'text-purple-100', input: 'bg-purple-800' }
    }
  }

  const colors = getThemeColors()

  return (
    <div className={`${colors.bg} ${colors.text} rounded-lg p-4 h-[500px] flex flex-col`}>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-2 p-2 rounded ${
              message.role === 'user' ? 'bg-blue-700 ml-auto' : `${colors.input}`
            } max-w-[80%]`}
          >
            {message.content}
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${colors.input} p-2 rounded max-w-[80%]`}
          >
            Thinking...
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className={`flex-1 ${colors.input} rounded-l p-2 outline-none`}
          placeholder="Ask for help or next step..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`${colors.bg} ${colors.text} px-4 py-2 rounded-r`}
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInterface

