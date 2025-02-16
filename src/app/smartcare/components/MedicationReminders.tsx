'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPills, FaPlus, FaTrash, FaClock } from 'react-icons/fa';

interface Medication {
  id: string;
  name: string;
  time: string;
  dosage: string;
}

export default function MedicationReminders() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newMedication = {
      id: Date.now().toString(),
      name: form.name.value,
      time: form.time.value,
      dosage: form.dosage.value
    };
    setMedications([...medications, newMedication]);
    setShowForm(false);
    form.reset();
  };

  const handleDelete = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-purple-600/20 
        border border-white/10 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaPills className="text-2xl text-white mr-3" />
          <h2 className="text-2xl font-bold text-white">Medication Reminders</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-2 bg-purple-600/80 text-white rounded-lg"
        >
          <FaPlus />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddMedication} className="mb-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Medication name"
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
            required
          />
          <input
            type="time"
            name="time"
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
            required
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage (e.g., 1 pill)"
            className="w-full px-3 py-2 bg-white/10 rounded-lg text-white"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600/80 text-white rounded-lg"
          >
            Add Medication
          </button>
        </form>
      )}

      <div className="space-y-4">
        {medications.map(med => (
          <div
            key={med.id}
            className="flex items-center justify-between p-4 bg-white/10 rounded-lg"
          >
            <div>
              <div className="font-semibold text-white">{med.name}</div>
              <div className="text-sm text-blue-100">
                <span className="flex items-center">
                  <FaClock className="mr-1" /> {med.time}
                </span>
                <div>{med.dosage}</div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(med.id)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {medications.length === 0 && !showForm && (
        <div className="text-center text-blue-100 py-4">
          No medications added yet. Click the + button to add one.
        </div>
      )}
    </motion.div>
  );
} 