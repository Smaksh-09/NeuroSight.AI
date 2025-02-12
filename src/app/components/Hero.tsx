'use client';
import { motion } from 'framer-motion';
import doctorImg from '@/public/doctorImg.png'
export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-16">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-blue-600 leading-tight"
          >
            Revolutionize Your Health Insights
          </motion.h1>

          {/* Subheading */}
          <p className="mt-4 text-gray-600 text-lg">
            Upload MRI, X-ray, or CT scans and receive instant AI-driven insights to help you make informed health decisions.
          </p>

          {/* Call-to-Actions */}
          <div className="mt-6 flex justify-center md:justify-start space-x-4">
            <motion.a
              href="/upload"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Get Started
            </motion.a>
            <motion.a
              href="/features"
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-gray-100 text-blue-600 rounded-lg shadow hover:bg-gray-200 transition"
            >
              Learn More
            </motion.a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src='@/public/doctorImg.webp' // Replace with your actual image path
            alt="Medical Analysis"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
