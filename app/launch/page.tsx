'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSelection from '@/app/launch/components/LanguageSelection'
import SkillAssessment from '@/app/launch/components/SkillAssessment'
import LearningPathSelection from '@/app/launch/components/LearningPathSelection'
import AIChatbot from '@/app/launch/components/AIChatbot'

const sections = ['Welcome', 'Language', 'Skill', 'Path']

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function LaunchJourney() {
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [skillLevel, setSkillLevel] = useState<string | null>(null)

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language)
    setTimeout(() => {
      nextSection()
    }, 800)
  }

  const handleSkillAssessment = (skill: string) => {
    setSkillLevel(skill)
    setTimeout(() => {
      setCurrentSection(3) // Skip to Learning Path Selection
    }, 800)
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <WelcomeSection />;
      case 1:
        return <LanguageSelection onSelectLanguage={handleLanguageSelection} />;
      case 2:
        return <SkillAssessment onComplete={handleSkillAssessment} />;
      case 3:
        return <LearningPathSelection language={selectedLanguage} skillLevel={skillLevel} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-900 via-purple-900 to-black">
      <div className="absolute inset-0 z-0">
        <StarField />
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl"
        >
          <ProgressIndicator currentStep={currentSection} totalSteps={sections.length} />
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-lg"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {currentSection !== 2 && ( // Hide "Next" button during Skill Assessment
              <button
                onClick={nextSection}
                disabled={currentSection === sections.length - 1}
                className="px-6 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <AIChatbot />
    </div>
  )
}

function StarField() {
  const [stars, setStars] = useState<Array<{ top: string; left: string; width: string; height: string; animationDuration: string }>>([]);

  useEffect(() => {
    const generatedStars = [...Array(100)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDuration: `${Math.random() * 5 + 5}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.height,
            animation: `twinkle ${star.animationDuration} infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center space-x-2">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i <= currentStep ? 'bg-blue-500' : 'bg-gray-400'
          }`}
        />
      ))}
    </div>
  )
}

function WelcomeSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Cosmic Coding Journey</h1>
      <p className="text-lg mb-4">
        Prepare to embark on an interstellar adventure through the vast universe of programming.
        Your unique path to mastery begins here.
      </p>
      <p className="text-lg">
        Navigate through the stars, select your programming language constellation,
        assess your current skills, and choose your learning trajectory.
      </p>
    </div>
  )
}

