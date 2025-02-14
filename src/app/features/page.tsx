'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FaBrain, FaBone, FaSpinner, FaFileAlt } from 'react-icons/fa';

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
      title: "Musculoskeletal System Analysis",
      icon: <FaBone className="w-16 h-16" />,
      description: "Comprehensive analysis of bones, joints, and surrounding tissues. Identify fractures, abnormalities, and degenerative conditions with state-of-the-art AI technology.",
      benefits: [
        "Fracture detection",
        "Joint space analysis",
        "Bone density assessment",
        "Arthritis progression tracking"
      ],
      route: "/features/musculoskeletal"
    },
    {
      id: 3,
      title: "Spine Analysis",
      icon: <FaSpinner className="w-16 h-16" />,
      description: "Detailed spine examination for various conditions including disc herniation, spinal stenosis, and vertebral fractures. Get comprehensive reports with AI-assisted measurements.",
      benefits: [
        "Disc herniation detection",
        "Spinal alignment analysis",
        "Vertebral spacing measurement",
        "Stenosis assessment"
      ],
      route: "/features/spine"
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
      route: "/features/reports"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;

    // Animate header
    gsap.fromTo(
      container,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Animate cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          rotateY: 45
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          delay: 0.2 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20">
      <div ref={containerRef} className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
        <span className="text-blue-600">Features</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered medical imaging analysis tools designed to assist healthcare professionals in making diagnoses.
          </p>
        </div>

        {/* Features Cards */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              //@ts-ignore
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Icon Section */}
                <div className="md:w-1/4 bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center text-white">
                  {feature.icon}
                </div>

                {/* Content Section */}
                <div className="md:w-3/4 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={feature.route}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}