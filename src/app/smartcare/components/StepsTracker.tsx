'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWalking } from 'react-icons/fa';

export default function StepsTracker() {
  const [stepsGoal, setStepsGoal] = useState(10000);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const progress = Math.min((currentSteps / stepsGoal) * 100, 100);

  const handleUpdateSteps = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const steps = parseInt(form.steps.value);
    if (!isNaN(steps) && steps > 0) {
      setCurrentSteps(steps);
    }
    form.reset();
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const goal = parseInt(form.goal.value);
    if (!isNaN(goal) && goal > 0) {
      setStepsGoal(goal);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-br from-green-500/20 to-green-600/20 
        border border-white/10 shadow-xl"
    >
      <div className="flex items-center mb-4">
        <FaWalking className="text-2xl text-white mr-3" />
        <h2 className="text-2xl font-bold text-white">Steps Tracker</h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-100">Daily Goal: {stepsGoal} steps</span>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-300 hover:text-blue-200"
          >
            {isEditing ? 'Cancel' : 'Edit Goal'}
          </button>
        </div>

        {isEditing && (
          <form onSubmit={handleUpdateGoal} className="mb-4">
            <div className="flex gap-2">
              <input
                type="number"
                name="goal"
                placeholder="New goal"
                className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white"
                min="1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600/80 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        )}

        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500/60 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-blue-100 mt-2">
          {currentSteps} / {stepsGoal} steps
        </div>
      </div>

      <form onSubmit={handleUpdateSteps}>
        <div className="flex gap-2">
          <input
            type="number"
            name="steps"
            placeholder="Update steps"
            className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white"
            min="0"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600/80 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
    </motion.div>
  );
} 