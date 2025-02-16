'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import BackButton from '../../components/BackButton';
import { FaWalking, FaBed, FaPills, FaPlus } from 'react-icons/fa';
import StepsTracker from '../components/StepsTracker';
import SleepAnalysis from '../components/SleepAnalysis';
import MedicationReminders from '../components/MedicationReminders';

export default function HealthDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Health Monitoring Dashboard
          </h1>
          <p className="text-xl text-blue-100">
            Track your daily activities, sleep patterns, and medication schedule
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <StepsTracker />
          <SleepAnalysis />
          <MedicationReminders />
        </div>
      </div>
    </div>
  );
} 