'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBed, FaMoon, FaSun } from 'react-icons/fa';

export default function SleepAnalysis() {
  const [sleepData, setSleepData] = useState({
    duration: 0,
    quality: 'Good',
    bedTime: '',
    wakeTime: ''
  });

  const handleSleepUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const bedTime = form.bedTime.value;
    const wakeTime = form.wakeTime.value;
    
    // Calculate duration
    const bedDateTime = new Date(`2000/01/01 ${bedTime}`);
    const wakeDateTime = new Date(`2000/01/01 ${wakeTime}`);
    let duration = (wakeDateTime.getTime() - bedDateTime.getTime()) / (1000 * 60 * 60);
    if (duration < 0) duration += 24; // Handle crossing midnight

    setSleepData({
      ...sleepData,
      duration: parseFloat(duration.toFixed(1)),
      bedTime,
      wakeTime,
      quality: form.quality.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-blue-600/20 
        border border-white/10 shadow-xl"
    >
      <div className="flex items-center mb-4">
        <FaBed className="text-2xl text-white mr-3" />
        <h2 className="text-2xl font-bold text-white">Sleep Analysis</h2>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-3xl font-bold text-white mb-1">
              {sleepData.duration}h
            </div>
            <div className="text-blue-100 text-sm">Duration</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-xl font-bold text-white mb-1">
              {sleepData.quality}
            </div>
            <div className="text-blue-100 text-sm">Quality</div>
          </div>
        </div>

        <form onSubmit={handleSleepUpdate} className="space-y-4">
          <div className="flex items-center gap-2">
            <FaMoon className="text-blue-300" />
            <input
              type="time"
              name="bedTime"
              className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white"
              required
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FaSun className="text-blue-300" />
            <input
              type="time"
              name="wakeTime"
              className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white"
              required
            />
          </div>

          <select
            name="quality"
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
            required
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600/80 text-white rounded-lg"
          >
            Update Sleep Data
          </button>
        </form>
      </div>
    </motion.div>
  );
} 