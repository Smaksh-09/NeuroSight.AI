'use client';
import Link from 'next/link';

export default function NavBar() {
  const isLoggedIn = false; // Replace with your authentication logic

  return (
    <nav className="bg-white px-8 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
           {/* Replace with your logo */}
          <span className="text-xl font-bold text-blue-500">NeuroSight</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-500 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-500 transition-colors">
            Services
          </Link>
          
          <Link href="/contact" className="text-gray-700 hover:text-blue-500 transition-colors">
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
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
            <>
              {/* Replace these with actual user initials or profile links */}
              <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 transition">
                Dr
              </button>
              <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-50 transition">
                Bh
              </button>
            </>
          )}
          
        </div>
      </div>
    </nav>
  );
}
