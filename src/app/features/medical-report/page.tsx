'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import NavBar from '../../components/NavBar';
import { FaCloudUploadAlt, FaSpinner, FaFileAlt, FaListAlt } from 'react-icons/fa';

export default function MedicalReport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef(null);
  const uploadRef = useRef(null);
  const resultRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1 }
    ).fromTo(uploadRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('report', selectedFile);

    try {
      const response = await fetch('/api/analyze-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setAnalysis(data.result);

      // Save to history
      await fetch('/api/user/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'report',
          result: data.result
        }),
      });

      // Animate result section
      gsap.fromTo(resultRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medical Report <span className="text-blue-600">Analysis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your medical report for a comprehensive analysis and personalized health recommendations.
          </p>
        </div>

        {/* Upload Section */}
        <div ref={uploadRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaFileAlt className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, PNG, or JPG (Max 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {previewUrl && (
              <div className="mt-8 w-full max-w-md">
                {selectedFile?.type.includes('image') ? (
                  <img
                    src={previewUrl}
                    alt="Medical Report"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <FaFileAlt className="w-16 h-16 text-blue-500" />
                  </div>
                )}
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Analyzing Report...
                    </>
                  ) : (
                    'Analyze Report'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {(analysis || error) && (
          <div ref={resultRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            {error ? (
              <div className="text-red-600 text-center">{error}</div>
            ) : (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaListAlt className="mr-2 text-blue-500" />
                  Analysis Results
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {analysis}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
