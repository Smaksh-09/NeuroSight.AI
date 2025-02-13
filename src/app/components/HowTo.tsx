'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaRegImages, FaRegChartBar, FaMicroscope } from 'react-icons/fa';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowTo() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current;

    // Main section fade in
    gsap.fromTo(section,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    // Animate each step
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
          }
        }
      );
    });
  }, []);

  const steps = [
    {
      icon: <FaMicroscope className="w-12 h-12 text-blue-500" />,
      title: "Select Feature",
      description: "Choose from our specialized AI analysis tools tailored for different types of medical scans - MRI, X-ray, or CT scan analysis.",
      number: "01"
    },
    {
      icon: <FaRegImages className="w-12 h-12 text-blue-500" />,
      title: "Upload Scan",
      description: "Securely upload your medical image. Our system supports various formats and ensures your data privacy throughout the process.",
      number: "02"
    },
    {
      icon: <FaRegChartBar className="w-12 h-12 text-blue-500" />,
      title: "Get Results",
      description: "Receive detailed AI-powered analysis within seconds, including potential anomalies, measurements, and suggested insights.",
      number: "03"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with our AI-powered medical imaging analysis in three simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              //@ts-ignore
              ref={el => stepsRef.current[index] = el}
              className="relative bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{step.number}</span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-blue-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}