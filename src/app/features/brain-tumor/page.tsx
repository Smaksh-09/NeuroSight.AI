'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import NavBar from '../../components/NavBar';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

export default function Brain() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef(null);
  const uploadRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      // Upload image and get Roboflow results
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();

      // Send to Gemini API for analysis
      const geminiResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roboflowData: data.result,
        }),
      });

      if (!geminiResponse.ok) throw new Error('Analysis failed');

      const analysisResult = await geminiResponse.json();
      setResult(analysisResult.result);

      // Save to history after Gemini analysis
      await fetch('/api/user/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'brain',
          result: analysisResult.result
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
      <div ref={containerRef} className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Brain Tumor <span className="text-blue-600">Detection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an MRI scan to detect and analyze potential brain tumors using our advanced AI technology.
          </p>
        </div>

        {/* Upload Section */}
        <div ref={uploadRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <label
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">MRI scan (PNG, JPG, JPEG)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {previewUrl && (
              <div className="mt-8 w-full max-w-md">
                <img
                  src={previewUrl}
                  alt="Selected MRI"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {(result || error) && (
          <div ref={resultRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            {error ? (
              <div className="text-red-600 text-center">{error}</div>
            ) : (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Results</h2>
                <div className="text-gray-700 leading-relaxed">{result}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}