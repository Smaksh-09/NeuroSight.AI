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
  const cardsRef = useRef([]);

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

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    cardsRef.current.forEach((card, index) => {
      tl.fromTo(card,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          delay: index * 0.2 
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="text-blue-400">Features</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered medical imaging analysis tools designed to assist healthcare professionals in making diagnoses.
          </p>
        </div>

        {/* Features Cards */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group overflow-hidden rounded-2xl backdrop-blur-md 
                bg-gradient-to-br from-blue-500/20 to-blue-600/20 
                border border-white/10 shadow-xl"
            >
              <div className="flex flex-col md:flex-row p-8">
                {/* Icon Section */}
                <div className="md:w-1/4 flex items-center justify-center text-white mb-6 md:mb-0">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/4 md:pl-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100 mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-blue-100">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={feature.route}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full md:w-auto px-6 py-3 bg-blue-600/80 text-white rounded-lg 
                        font-semibold hover:bg-blue-700/90 transition-all duration-300 
                        backdrop-blur-sm border border-blue-400/30"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/5 rounded-full blur-xl 
                transform group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-xl 
                transform group-hover:scale-150 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}