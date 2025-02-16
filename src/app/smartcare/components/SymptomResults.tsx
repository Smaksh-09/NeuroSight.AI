'use client';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaFirstAid, FaClipboardList, FaHeartbeat, FaBell } from 'react-icons/fa';

interface SymptomResultsProps {
  response: {
    possibleConditions: string;
    recommendedActions: string;
    additionalTests: string;
    lifestyleRecommendations: string;
    warningSigns: string;
  };
}

export default function SymptomResults({ response }: SymptomResultsProps) {
  const sections = [
    {
      title: "Possible Conditions",
      content: response.possibleConditions,
      icon: FaClipboardList,
      color: "from-yellow-500/20 to-yellow-600/20"
    },
    {
      title: "Recommended Actions",
      content: response.recommendedActions,
      icon: FaFirstAid,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Additional Tests",
      content: response.additionalTests,
      icon: FaHeartbeat,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Lifestyle Recommendations",
      content: response.lifestyleRecommendations,
      icon: FaHeartbeat,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Warning Signs",
      content: response.warningSigns,
      icon: FaExclamationTriangle,
      color: "from-red-500/20 to-red-600/20"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Symptom Analysis Results
        </h1>
        <p className="text-xl text-red-300">
          ⚠️ This is not a medical diagnosis. Please consult a healthcare professional for proper medical advice.
        </p>
      </motion.div>

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