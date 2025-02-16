'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { FaHeartbeat, FaStethoscope, FaUtensils } from 'react-icons/fa';

const features = [
  {
    title: "AI-Based Nutrition & Lifestyle Planner",
    description: "Get personalized meal plans, nutrition advice, and lifestyle recommendations based on your health goals and preferences.",
    icon: FaUtensils,
    color: "from-green-500/20 to-green-600/20",
    link: "/smartcare/nutrition"
  },
  {
    title: "Symptom Checker",
    description: "Advanced AI-powered symptom analysis to help you understand potential health conditions and next steps.",
    icon: FaStethoscope,
    color: "from-blue-500/20 to-blue-600/20",
    link: "/smartcare/symptoms"
  },
  {
    title: "Health Monitoring Dashboard",
    description: "Track your health metrics, view progress, and get insights for continuous improvement.",
    icon: FaHeartbeat,
    color: "from-purple-500/20 to-purple-600/20",
    link: "/smartcare/dashboard"
  }
];

export default function SmartCare() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            SmartCare Features
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our AI-powered healthcare tools designed to help you make informed decisions about your health and wellness.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl backdrop-blur-md 
                bg-gradient-to-br ${feature.color} border border-white/10 shadow-xl`}
            >
              <div className="p-8">
                <feature.icon className="text-4xl text-white mb-6 transform group-hover:scale-110 transition-transform duration-300" />
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-blue-100 mb-8">
                  {feature.description}
                </p>

                <Link href={feature.link}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-blue-600/80 text-white rounded-lg font-semibold 
                      hover:bg-blue-700/90 transition-all duration-300 backdrop-blur-sm 
                      border border-blue-400/30"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
