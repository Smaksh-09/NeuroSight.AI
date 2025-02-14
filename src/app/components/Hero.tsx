"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    // Fade in & slide elements
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    )
      .fromTo(
        //@ts-ignore
        textRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2 },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.3"
      );
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 min-h-screen">
        {/* Left Content */}
        <div ref={textRef} className="md:w-1/2 text-center md:text-left space-y-6">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Revolutionize Your Health Insights<br />
            <span className="text-blue-600">with AI-Powered Diagnostics</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Upload MRI, X-ray, or CT scans and receive instant AI-driven insights to help you make informed health decisions.
          </p>

          {/* Call-to-Action Button */}
          <div ref={buttonRef} className="flex justify-center md:justify-start space-x-4 pt-6">
            <a
              href="/features"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-full h-[500px]">
            <img src="/DOCO.jpg" alt="Medical Analysis" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
