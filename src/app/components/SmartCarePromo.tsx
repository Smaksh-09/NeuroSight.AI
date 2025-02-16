'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHeartbeat, FaStethoscope, FaUtensils } from 'react-icons/fa';

export default function SmartCarePromo() {
  const features = [
    {
      icon: FaUtensils,
      title: "Nutrition Planner"
    },
    {
      icon: FaStethoscope,
      title: "Symptom Checker"
    },
    {
      icon: FaHeartbeat,
      title: "Health Monitor"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative p-8 rounded-2xl backdrop-blur-md 
            bg-gradient-to-br from-blue-900/40 to-blue-800/40 
            border border-white/10 shadow-xl overflow-hidden"
          >
            {/* Content */}
            <div className="relative z-10 text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Discover SmartCare
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Your AI-powered health companion for personalized wellness guidance
              </p>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <feature.icon className="w-8 h-8 mx-auto text-white mb-2" />
                  <p className="text-sm text-blue-100">{feature.title}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link href="/smartcare">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-blue-600/80 text-white rounded-lg font-semibold 
                    hover:bg-blue-700/90 transition-all duration-300 backdrop-blur-sm 
                    border border-blue-400/30"
                >
                  Explore SmartCare
                </motion.button>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 