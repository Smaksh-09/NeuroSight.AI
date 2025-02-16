'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <nav className="bg-white px-8 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-900">NeuroSight</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-blue-900 hover:text-blue-500 transition-colors">
            Home
          </Link>
          {isAuthenticated && (
            <Link href="/features" className="text-blue-900 hover:text-blue-500 transition-colors">
              Diagnostics Hub
            </Link>
          )}
         
          <Link href="/smartcare" className="text-blue-900 hover:text-blue-500 transition-colors">
            SmartCare
          </Link>
          {/* <Link href="/about" className="text-blue-900 hover:text-blue-500 transition-colors">
            About
          </Link> */}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
