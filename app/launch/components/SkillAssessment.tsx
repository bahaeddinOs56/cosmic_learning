import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface SkillAssessmentProps {
  onComplete: (skillLevel: string) => void;
}

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

export default function SkillAssessment({ onComplete }: SkillAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Determine skill level based on answers
      const skillLevel = determineSkillLevel(newAnswers)
      onComplete(skillLevel)
    }
  }

  const determineSkillLevel = (answers: string[]): string => {
    // This is a simple algorithm and can be made more sophisticated
    const score = answers.reduce((total, answer) => {
      const index = questions[total].options.indexOf(answer)
      return total + index
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
    >
      <h2 className="text-2xl font-bold mb-4">Skill Assessment</h2>
      {currentQuestion < questions.length ? (
        <div>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-2 text-left bg-white/20 rounded hover:bg-white/30 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">Thank you for completing the assessment!</p>
          <p>We&apos;ll use this information to customize your learning experience.</p>
        </div>
      )}
    </motion.div>
  )
}

