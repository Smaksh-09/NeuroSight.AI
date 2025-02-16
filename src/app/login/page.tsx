'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { FaUser, FaLock, FaSpinner, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const router = useRouter();

  const containerRef = useRef(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);

  // Add this to store ball positions
  const ballPositions = useRef(
    [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  );

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate decorative elements first
    tl.fromTo(decorationRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1 }
    )
    
    // Animate form
    .fromTo(formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    
    // Animate floating balls
    ballsRef.current.forEach((ball, index) => {
      const randomX = Math.random() * 100 - 50; // -50 to 50
      const randomY = Math.random() * 100 - 50; // -50 to 50
      
      gsap.to(ball, {
        x: randomX,
        y: randomY,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Cleanup function
    return () => {
      tl.kill();
      ballsRef.current.forEach(ball => {
        gsap.killTweensOf(ball);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      login(data.token, {
        username: data.username, 
        email: data.email,
        createdAt: data.createdAt
      });
      router.push('/features');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements - moved to lower z-index */}
      <div className="absolute inset-0 -z-10">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            //@ts-ignore
            ref={(el) => (ballsRef.current[index] = el as HTMLDivElement)}
            className="absolute w-32 h-32 rounded-full bg-blue-500/20 backdrop-blur-md"
            style={{
              left: ballPositions.current[index].left,
              top: ballPositions.current[index].top,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Top right link with higher z-index */}
      <div className="absolute top-0 right-0 p-4 z-10">
        <Link 
          href="/signup" 
          className="text-blue-300 hover:text-blue-400 transition-colors font-semibold"
        >
          Create Account
        </Link>
      </div>

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 z-10">
        {/* Decorative Section */}
        <div ref={decorationRef} className="w-full md:w-1/2 p-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-xl text-blue-100 mb-8 drop-shadow-md">
              Access our AI-powered medical imaging analysis tools
            </p>
            <div className="bg-blue-400 h-1 w-20 mx-auto md:mx-0"></div>
          </div>
          
          <div className="mt-12 hidden md:block relative">
            <div className="relative z-10">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400/20 rounded-full backdrop-blur-sm"></div>
              <div className="absolute top-8 right-12 w-16 h-16 bg-blue-300/20 rounded-full backdrop-blur-sm"></div>
              <div className="absolute bottom-12 left-16 w-20 h-20 bg-blue-500/20 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div
          ref={formRef}
          className="w-full md:w-1/2 max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-blue-300/20 shadow-xl relative"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-100 mb-2 font-medium">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 bg-white/10 border border-blue-300/20 rounded-lg 
                    text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 
                    backdrop-blur-sm transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-100 mb-2 font-medium">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 bg-white/10 border border-blue-300/20 rounded-lg 
                    text-white placeholder-blue-200/60 focus:outline-none focus:border-blue-400 
                    backdrop-blur-sm transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600/80 text-white rounded-lg font-semibold 
                hover:bg-blue-700/90 transition-all duration-300 backdrop-blur-sm 
                border border-blue-400/30 hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-blue-100">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-300 hover:text-blue-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

