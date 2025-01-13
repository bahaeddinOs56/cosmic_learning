'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    question: "How familiar are you with programming concepts?",
    options: ["Complete beginner", "Some basic knowledge", "Intermediate", "Advanced"]
  },
  {
    question: "Have you built any projects before?",
    options: ["No projects yet", "Small personal projects", "Academic projects", "Professional projects"]
  },
  {
    question: "How comfortable are you with problem-solving?",
    options: ["Not very comfortable", "Somewhat comfortable", "Comfortable", "Very comfortable"]
  }
]

interface SkillAssessmentProps {
  onComplete: (skillLevel: string) => void;
}

export default function SkillAssessment({ onComplete }: SkillAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (isCompleted) {
      const skillLevel = determineSkillLevel(answers)
      setTimeout(() => {
        onComplete(skillLevel)
      }, 1000) // Delay to show completion message
    }
  }, [isCompleted, answers, onComplete])

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer)
    
    setTimeout(() => {
      const newAnswers = [...answers, answer]
      setAnswers(newAnswers)
      setSelectedOption(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setIsCompleted(true)
      }
    }, 500) // Delay for animation
  }

  const determineSkillLevel = (answers: string[]): string => {
    const score = answers.reduce((total, answer, index) => {
      return total + questions[index].options.indexOf(answer)
    }, 0)

    if (score <= 2) return "Beginner"
    if (score <= 5) return "Intermediate"
    return "Advanced"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Skill Assessment</h2>
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-4 text-xl">{questions[currentQuestion].question}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedOption === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={selectedOption === option ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl mb-4">Thank you for completing the assessment!</p>
            <p className="text-lg">We're calculating your personalized learning path...</p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        className="h-2 bg-blue-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

