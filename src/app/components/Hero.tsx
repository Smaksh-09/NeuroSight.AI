'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 min-h-screen">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Revolutionize Your Health Insights<br />
            <span className="text-blue-600">with AI-Powered Diagnostics</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
           Upload MRI, X-ray, or CT scans and receive instant AI-driven insights to help you make informed health decisions.
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center md:justify-start space-x-4 pt-6"
          >
            <motion.a
              href="/appointment"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-[500px]">
            <Image
              src="/final.jpg"
              alt="Medical Analysis"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Appointment Booking Section */}
      
    </section>
  );
}
