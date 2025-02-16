'use client';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { FaLightbulb, FaTimes } from 'react-icons/fa';

const medicalFacts = [
  "In 2025, an estimated 2,041,910 new cancer cases are projected to occur in the United States, which is about 5,600 new cases each day.",
  "The cancer mortality rate has been declining, averting nearly 4.5 million deaths since 1991 due to smoking reductions, earlier detection, and improved treatment.",
  "Artificial Intelligence (AI) and Machine Learning are expected to play a significant role in disease diagnosis by 2025, potentially revolutionizing healthcare.",
  "Benign tumors may be removed for three reasons: to confirm they are benign, to prevent them from becoming cancerous, or to relieve symptoms if they cause problems or pressure.",
  "Malignant tumors are cancerous and can invade neighboring cells, multiplying and dividing at a very fast and out-of-control rate.",
  "Precision Medicine, which delivers highly effective and personalized health treatments based on factors like genetics and lifestyle, is expected to be a major trend in 2025.",
  "By age 50, more than 12% of U.S. adults have osteoporosis at the femur neck, in the lumbar spine, or in both, with a higher rate among women (19.6%) than men (4.4%).",
  "Wearable health technology is evolving from basic step counters to sophisticated devices that can monitor blood pressure, blood sugar levels, and early signs of health conditions.",
  "The human body can distinguish at least 1 trillion different odors, far surpassing the previously thought 10,000.",
  "Telehealth services are expected to continue expanding in 2025, making healthcare more accessible and convenient for patients."
];

export default function DailyFacts() {
  const [showFact, setShowFact] = useState(false);
  const [currentFact, setCurrentFact] = useState('');
  const factCardRef = useRef(null);
  const containerRef = useRef(null);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * medicalFacts.length);
    return medicalFacts[randomIndex];
  };

  const handleShowFact = () => {
    if (!showFact) {
      setCurrentFact(getRandomFact());
      setShowFact(true);
      
      // Animate fact card appearance
      gsap.fromTo(
        factCardRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)"
        }
      );
    } else {
      // Animate fact card disappearance
      gsap.to(factCardRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        onComplete: () => setShowFact(false)
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div ref={containerRef} className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Daily Medical Facts
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover interesting facts about healthcare and medical advancements
          </p>
          
          <button
            onClick={handleShowFact}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            <FaLightbulb className="mr-2" />
            {showFact ? 'Close Fact' : 'Get Daily Fact'}
          </button>

          {showFact && (
            <div
              ref={factCardRef}
              className="mt-8 bg-white rounded-xl shadow-xl p-8 relative"
            >
              <button
                onClick={handleShowFact}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
              <div className="flex items-start">
                <FaLightbulb className="text-blue-500 text-xl flex-shrink-0 mt-1 mr-4" />
                <p className="text-gray-700 text-lg leading-relaxed text-left">
                  {currentFact}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 