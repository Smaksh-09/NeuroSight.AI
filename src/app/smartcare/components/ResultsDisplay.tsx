'use client';
import { motion } from 'framer-motion';
import { FaUtensils, FaAppleAlt, FaRunning, FaMoon, FaVials } from 'react-icons/fa';

interface ResultsDisplayProps {
  response: {
    mealPlan: string;
    nutritionAdvice: string;
    exerciseRecommendations: string;
    lifestyleChanges: string;
    supplementation: string;
  };
}

export default function ResultsDisplay({ response }: ResultsDisplayProps) {
  const sections = [
    {
      title: "Meal Plan",
      content: response.mealPlan,
      icon: FaUtensils,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Nutrition Advice",
      content: response.nutritionAdvice,
      icon: FaAppleAlt,
      color: "from-red-500/20 to-red-600/20"
    },
    {
      title: "Exercise Recommendations",
      content: response.exerciseRecommendations,
      icon: FaRunning,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Lifestyle Changes",
      content: response.lifestyleChanges,
      icon: FaMoon,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Supplementation",
      content: response.supplementation,
      icon: FaVials,
      color: "from-yellow-500/20 to-yellow-600/20"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white text-center mb-12"
      >
        Your Personalized Health Plan
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl backdrop-blur-md bg-gradient-to-br ${section.color}
              border border-white/10 shadow-xl`}
          >
            <div className="flex items-center mb-4">
              <section.icon className="text-2xl text-white mr-3" />
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            </div>
            <div className="text-blue-100 space-y-4 whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 