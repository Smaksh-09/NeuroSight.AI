'use client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/features')}
      className="fixed top-24 left-6 inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition-colors border border-blue-100"
    >
      <FaArrowLeft className="mr-2" />
      Back to Features
    </button>
  );
} 