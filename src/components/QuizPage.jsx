// src/components/QuizPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quiz.js';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerClick = (tags) => {
    // Add the new tags from the chosen answer
    const newTags = [...selectedTags, ...tags];

    // If it's the last question...
    if (currentQuestionIndex === quizQuestions.length - 1) {
      // ...navigate to the results page and pass the final tags.
      navigate('/quiz-results', { state: { tags: newTags } });
    } else {
      // Otherwise, save the tags and move to the next question
      setSelectedTags(newTags);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const questionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen bg-black text-cream flex flex-col items-center justify-center p-4 font-body">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex} // This makes Framer Motion animate when the question changes
          variants={questionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
          className="text-center w-full max-w-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-fancy-title mb-12">
            {currentQuestion.question}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer.tags)}
                className="quiz-option-button"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}