"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Background from "./Background";

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
    <section ref={containerRef} className="relative">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 min-h-screen">
        {/* Left Content */}
        <div ref={textRef} className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            Revolutionize Your Health Insights<br />
            <span className="text-blue-300">with AI-Powered Diagnostics</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed drop-shadow-md">
            Upload MRI, X-ray, or CT scans and receive instant AI-driven insights to help you make informed health decisions.
          </p>

          <div ref={buttonRef} className="flex justify-center md:justify-start space-x-4 pt-6">
            <a
              href="/features"
              className="px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg shadow-lg 
                hover:bg-blue-700/90 transition-all duration-300 text-lg font-semibold 
                border border-blue-400/30 hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Right side - Empty for background visibility */}
        <div ref={imageRef} className="md:w-1/2" />
      </div>
    </section>
  );
}
