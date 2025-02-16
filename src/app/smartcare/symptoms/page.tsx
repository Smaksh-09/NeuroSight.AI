'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../../components/NavBar';
import { FaSpinner } from 'react-icons/fa';
import SymptomResults from '../components/SymptomResults';
import BackButton from '../../components/BackButton';

const userDetails = [
  {
    id: 'age',
    label: 'Age Group',
    options: [
      'Under 18',
      '18-30',
      '31-45',
      '46-60',
      'Above 60'
    ]
  },
  {
    id: 'gender',
    label: 'Gender',
    options: [
      'Male',
      'Female',
      'Other'
    ]
  },
  {
    id: 'duration',
    label: 'Symptom Duration',
    options: [
      'Less than 24 hours',
      '1-3 days',
      '4-7 days',
      'More than a week',
      'More than a month'
    ]
  },
  {
    id: 'severity',
    label: 'Symptom Severity',
    options: [
      'Mild - Noticeable but not interfering with daily activities',
      'Moderate - Some interference with daily activities',
      'Severe - Significant impact on daily activities',
      'Very Severe - Unable to perform daily activities'
    ]
  },
  {
    id: 'timing',
    label: 'When do symptoms occur?',
    options: [
      'Constant',
      'Intermittent',
      'Only during specific activities',
      'Only at certain times of day',
      'Random occurrences'
    ]
  }
];

export default function SymptomChecker() {
  const [selections, setSelections] = useState<{[key: string]: string}>({});
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSelectionChange = (id: string, value: string) => {
    setSelections(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    // Validate all selections are made
    if (Object.keys(selections).length < userDetails.length || !symptoms.trim()) {
      setError('Please fill in all fields and describe your symptoms');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prompt = `As a medical AI assistant, analyze the following symptoms and patient details:

Patient Information:
- Age Group: ${selections.age}
- Gender: ${selections.gender}
- Symptom Duration: ${selections.duration}
- Severity: ${selections.severity}
- Timing: ${selections.timing}

Symptoms Description:
${symptoms}

Please provide a comprehensive analysis in the following format:

1. Possible Conditions:
- List potential conditions
- Their likelihood
- Key indicators

2. Recommended Actions:
- Immediate steps
- When to seek medical attention
- Home care recommendations

3. Additional Tests:
- Relevant medical tests
- Diagnostics to consider

4. Lifestyle Recommendations:
- Daily activities
- Diet considerations
- Preventive measures

5. Warning Signs:
- Red flags to watch for
- Emergency symptoms
- When to seek immediate care
 !Do not send ** in the response!
Note: This is not a definitive diagnosis. Always consult healthcare professionals for proper medical evaluation.`;

      const res = await fetch('/api/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) throw new Error('Failed to analyze symptoms');

      const data = await res.json();
      setResponse(data);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12 mt-12">
        {!showResults ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                AI Symptom Checker
              </h1>
              <p className="text-xl text-blue-100">
                Describe your symptoms and get AI-powered health insights
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                {userDetails.map(detail => (
                  <div key={detail.id} className="mb-6">
                    <label className="block text-white text-lg mb-3">
                      {detail.label}
                    </label>
                    <select
                      value={selections[detail.id] || ''}
                      onChange={(e) => handleSelectionChange(detail.id, e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 text-blue-100 border border-blue-300/20
                        focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/20 backdrop-blur-sm"
                    >
                      <option value="">Select {detail.label}</option>
                      {detail.options.map(option => (
                        <option key={option} value={option} className="bg-blue-900">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <div className="mb-6">
                  <label className="block text-white text-lg mb-3">
                    Describe your symptoms in detail
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={5}
                    className="w-full p-4 rounded-lg bg-white/10 text-blue-100 border border-blue-300/20
                      focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/20 backdrop-blur-sm"
                    placeholder="Please describe what you're experiencing..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 bg-blue-600/80 text-white rounded-lg font-semibold 
                    hover:bg-blue-700/90 transition-all duration-300 backdrop-blur-sm 
                    border border-blue-400/30 ${loading && 'opacity-50 cursor-not-allowed'}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Analyzing Symptoms...
                    </span>
                  ) : (
                    'Analyze Symptoms'
                  )}
                </button>

                {error && (
                  <div className="mt-4 text-red-400 text-center">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <SymptomResults response={response} />
        )}
      </div>
    </div>
  );
} 