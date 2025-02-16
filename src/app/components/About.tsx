'use client';
import { motion } from 'framer-motion';
import { FaBrain, FaLungs, FaHeartbeat, FaShieldAlt, FaUserMd, FaChartLine } from 'react-icons/fa';

export default function About() {
  const features = [
    {
      icon: FaBrain,
      title: "Advanced AI Analysis",
      description: "Cutting-edge machine learning models for accurate medical image analysis and health assessments."
    },
    {
      icon: FaShieldAlt,
      title: "Privacy Focused",
      description: "Secure handling of medical data with state-of-the-art encryption and privacy protection."
    },
    {
      icon: FaUserMd,
      title: "Healthcare Support",
      description: "Assists healthcare professionals with rapid analysis and preliminary assessments."
    },
    {
      icon: FaChartLine,
      title: "Continuous Learning",
      description: "Our AI models are regularly updated with the latest medical research and findings."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionizing Healthcare
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            NeuroSight combines advanced AI technology with medical expertise to provide 
            accurate analysis and personalized health guidance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl backdrop-blur-md 
                bg-gradient-to-br from-blue-900/40 to-blue-800/40 
                border border-white/10 shadow-xl"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-8 rounded-2xl backdrop-blur-md 
            bg-gradient-to-br from-blue-900/40 to-blue-800/40 
            border border-white/10 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-blue-100 mb-6">
              To make advanced medical analysis accessible and efficient through AI technology, 
              while supporting healthcare professionals in delivering better patient care.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-100">Analysis Accuracy</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">Available Support</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-blue-100">Secure & Private</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-blue-200/60">
            © 2024 NeuroSight. All medical analysis should be reviewed by healthcare professionals.
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    </section>
  );
} 