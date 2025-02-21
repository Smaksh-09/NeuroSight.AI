'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../../components/NavBar';
import { FaArrowRight, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import ResultsDisplay from '../components/ResultsDisplay';
import BackButton from '../../components/BackButton';
import NutritionResults from '../components/NutritionResults';

// Quiz questions array (your existing questions)
const quizQuestions = [
    {
      id: 1,
      question: "What is your primary health goal?",
      options: [
        "Weight Loss",
        "Muscle Gain",
        "Overall Health Improvement",
        "Disease Management"
      ],
    },
    {
      id: 2,
      question: "What is your age group?",
      options: [
        "Under 18",
        "18-25",
        "26-40",
        "41-60",
        "Above 60"
      ],
    },
    {
      id: 3,
      question: "What is your activity level?",
      options: [
        "Sedentary (Little to no exercise)",
        "Lightly Active (1-3 days per week)",
        "Moderately Active (3-5 days per week)",
        "Very Active (6+ days per week)"
      ],
    },
    {
      id: 4,
      question: "Do you have any dietary restrictions?",
      options: [
        "Vegetarian",
        "Vegan",
        "Gluten-Free",
        "Dairy-Free",
        "No Restrictions"
      ],
    },
    {
      id: 5,
      question: "Do you have any food allergies?",
      options: [
        "Nuts",
        "Shellfish",
        "Lactose",
        "Soy",
        "No Allergies"
      ],
    },
    {
      id: 6,
      question: "How many meals do you eat per day?",
      options: [
        "2 Meals",
        "3 Meals",
        "4+ Meals",
        "Intermittent Fasting"
      ],
    },
    {
      id: 7,
      question: "Do you prefer home-cooked meals or eating out?",
      options: [
        "Mostly Home-Cooked",
        "Mostly Eating Out",
        "Balanced Mix"
      ],
    },
    {
      id: 8,
      question: "What is your preferred cuisine?",
      options: [
        "Mediterranean",
        "Asian",
        "Indian",
        "Western",
        "No Preference"
      ],
    },
    {
      id: 9,
      question: "How much water do you drink daily?",
      options: [
        "Less than 1L",
        "1-2L",
        "2-3L",
        "More than 3L"
      ],
    },
    {
      id: 10,
      question: "Would you like personalized grocery lists based on meal plans?",
      options: [
        "Yes, that would be helpful",
        "No, just meal recommendations",
        "Maybe, I want to decide later"
      ],
    }
  ];
  

export default function NutritionPlanner() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `Based on the following quiz responses, provide a comprehensive health and nutrition plan:
      ${quizQuestions.map((q, i) => `${q.question}: ${answers[i]}`).join('\n')}
      
      Please provide a detailed response in the following format:

      1. Meal Plan:
      - Breakfast options
      - Lunch options
      - Dinner options
      - Snacks
      - Portion sizes
      
      2. Nutrition Advice:
      - Key nutrients to focus on
      - Foods to avoid
      - Timing of meals
      
      3. Exercise Recommendations:
      - Type of exercises
      - Frequency
      - Duration
      - Intensity levels
      
      4. Lifestyle Changes:
      - Sleep recommendations
      - Stress management
      - Daily habits
      
      5. Supplementation:
      - Essential supplements
      - Dosage recommendations
      - Timing of intake
      Avoid Markdown formatting and remove all special characters like asterisks (*) from the response.
      Make all recommendations specific and actionable.`;

      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) throw new Error('Failed to generate plan');

      const data = await res.json();
      // Clean the response by removing asterisks
      if (typeof data.content === 'string') {
        data.content = data.content.replace(/\*\*/g, '').replace(/\*/g, '');
      }
      setResponse(data);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12 mt-12">
        {!showResults ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                AI Nutrition & Lifestyle Planner
              </h1>
              <p className="text-xl text-blue-100">
                Answer a few questions to get your personalized health plan
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl"
                >
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-blue-200">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <span className="text-blue-200">
                        {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-blue-900/50 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-6">
                    {quizQuestions[currentQuestion].question}
                  </h2>
                  
                  <div className="space-y-4">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 text-left rounded-lg backdrop-blur-sm transition-all
                          ${answers[currentQuestion] === option 
                            ? 'bg-blue-600/80 text-white' 
                            : 'bg-white/10 text-blue-100 hover:bg-white/20'
                          }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between">
                    {currentQuestion > 0 && (
                      <button
                        onClick={handlePrevious}
                        className="flex items-center text-blue-300 hover:text-blue-400 transition-colors"
                      >
                        <FaArrowLeft className="mr-2" /> Previous
                      </button>
                    )}
                    
                    {currentQuestion < quizQuestions.length - 1 ? (
                      <button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion]}
                        className={`flex items-center ml-auto text-blue-300 hover:text-blue-400 
                          transition-colors ${!answers[currentQuestion] && 'opacity-50 cursor-not-allowed'}`}
                      >
                        Next <FaArrowRight className="ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!answers[currentQuestion] || loading}
                        className={`flex items-center ml-auto bg-blue-600/80 text-white px-6 py-2 
                          rounded-lg hover:bg-blue-700/90 transition-all duration-300
                          ${(!answers[currentQuestion] || loading) && 'opacity-50 cursor-not-allowed'}`}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Generating Plan...
                          </>
                        ) : (
                          <>
                            Generate Plan <FaArrowRight className="ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {error && (
              <div className="mt-4 text-red-400 text-center">
                {error}
              </div>
            )}
          </>
        ) : (
          <NutritionResults response={response} />
        )}
      </div>
    </div>
  );
}