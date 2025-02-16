'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import NavBar from '../../components/NavBar';
import BackButton from '../../components/BackButton';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

export default function FeaturePage() {
  // State and refs remain the same...

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12 mt-12">
        <BackButton />
        
        <motion.div
          ref={headerRef}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {/* Feature specific title */}
          </h1>
          <p className="text-xl text-blue-100">
            {/* Feature specific description */}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={uploadRef}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10"
          >
            {!previewUrl ? (
              <div className="flex flex-col items-center">
                <label className="w-full cursor-pointer">
                  <div className="w-full p-8 border-2 border-dashed border-blue-300/30 rounded-lg
                    hover:border-blue-400/40 transition-colors">
                    <div className="flex flex-col items-center">
                      <FaCloudUploadAlt className="w-12 h-12 text-blue-400 mb-4" />
                      <p className="text-lg text-blue-100">
                        Drop your file here or click to upload
                      </p>
                      <p className="text-sm text-blue-200/60 mt-2">
                        Supported formats: PNG, JPG, JPEG
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="w-full py-4 bg-blue-600/80 text-white rounded-lg font-semibold 
                    hover:bg-blue-700/90 transition-all duration-300 backdrop-blur-sm 
                    border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </button>
              </div>
            )}
          </motion.div>

          {(result || error) && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl 
                border border-white/10"
            >
              {error ? (
                <div className="text-red-400 text-center">{error}</div>
              ) : (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
                  <div className="text-blue-100 space-y-4 whitespace-pre-line">
                    {result}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 