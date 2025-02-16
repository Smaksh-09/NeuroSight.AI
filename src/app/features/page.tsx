'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FaBrain, FaLungs, FaSun, FaFileAlt } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Features() {
  const containerRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Brain Tumor Detection & Analysis",
      icon: <FaBrain className="w-16 h-16" />,
      description: "Advanced AI-powered detection and analysis of brain tumors from MRI scans. Get detailed insights about tumor location, size, and potential classification with high accuracy.",
      benefits: [
        "Early detection of tumors",
        "Precise tumor localization",
        "Severity assessment",
        "Growth tracking over time"
      ],
      route: "/features/brain-tumor"
    },
    {
      id: 2,
      title: "Lungs Tumor Detection & Analysis",
      icon: <FaLungs className="w-16 h-16" />,
      description: "Our AI-powered Lung Tumor Detection and Analysis feature leverages advanced machine learning models to analyze MRI and CT scans, identifying potential lung tumors and providing detailed analysis.",
      benefits: [
        "Automated Tumor Detection",
        "Confidence Score & Severity Analysis",
        "Detailed AI-Generated Report ",
        "Multi-Scan Support"
      ],
      route: "/features/lungs"
    },
    {
      id: 3,
      title: "Skin Cancer Detection & Analysis",
      icon: <FaSun className="w-16 h-16" />,
      description: "Our AI-powered Skin Cancer Detection & Analysis system leverages deep learning models to analyze dermatoscopic images and identify potential signs of skin cancer, including melanoma, basal cell carcinoma, and squamous cell carcinoma. The system detects abnormalities in skin lesions and provides real-time insights to assist in early diagnosis and treatment planning.",
      benefits: [
        "AI-Powered Lesion Detection",
        "Classification & Severity Assessment",
        "AI-Generated Diagnostic Report ",
        "Multi-Image Support "
      ],
      route: "/features/skin"
    },
    {
      id: 4,
      title: "Medical Report Analysis",
      icon: <FaFileAlt className="w-16 h-16" />,
      description: "Intelligent analysis of medical reports to extract key information and provide simplified summaries. Get quick insights from complex medical documentation.",
      benefits: [
        "Key findings extraction",
        "Automated report summarization",
        "Trend analysis",
        "Historical comparison"
      ],
      route: "/features/medical-report"
    }
  ];

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
            AI Medical Analysis Features
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our advanced AI-powered medical imaging analysis tools designed to assist healthcare professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-2xl backdrop-blur-md 
                bg-gradient-to-br from-blue-500/20 to-blue-600/20 
                border border-white/10 shadow-xl"
            >
              <div className="p-8">
                <div className="text-white mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-blue-100 mb-6">
                  {feature.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-blue-100">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {benefit}
                    </div>
                  ))}
                </div>

                <Link href={feature.route}>
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
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-xl 
                transform group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-xl 
                transform group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}