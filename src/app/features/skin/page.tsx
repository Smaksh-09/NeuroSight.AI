'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import NavBar from '../../components/NavBar';
import { FaCloudUploadAlt, FaSpinner, FaSun } from 'react-icons/fa';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Skin() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();

      const geminiResponse = await fetch('/api/analyze-skin', {
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
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        <NavBar />
        <div className="container mx-auto px-4 py-12">
          <div ref={headerRef} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Skin Cancer Detection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI analysis for early detection of skin abnormalities and potential cancerous lesions.
            </p>
          </div>

          <div ref={uploadRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaSun className="w-12 h-12 text-blue-500 mb-4" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG or JPG (Max 10MB)</p>
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
                    alt="Skin Analysis"
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
                        Analyzing Image...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {(result || error) && (
            <div ref={resultRef} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
              {error ? (
                <div className="text-red-600 text-center">{error}</div>
              ) : (
                <div className="prose max-w-none">
                  <div className={`text-2xl font-bold mb-6 p-4 rounded-lg text-white ${
                    result.includes("No concerning lesions") ? "bg-green-500" : "bg-yellow-500"
                  }`}>
                    {result.split('\n')[0]}
                  </div>
                  
                  <div className="space-y-6">
                    {result.split('\n\n').slice(1).map((section: string, index:number) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {section.split(':')[0]}
                        </h3>
                        <div className="text-gray-700 leading-relaxed">
                          {section.split(':')[1]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}