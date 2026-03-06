import BackgroundOrbs from "../../components/BackgroundOrbs";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import ProblemSolution from "../../components/ProblemSolution";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Impact from "../../components/Impact";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import ComplaintLifecycle3D from "../../components/ComplaintLifecycle3D";
import InstallButton from "../../components/InstallButton";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Cursor follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden"
    >
      {/* Cursor Glow Effect */}
      <motion.div
        className="cursor-glow hidden md:block"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Animated Background */}
      <BackgroundOrbs />

      {/* Install Button (Floating Mobile Friendly) */}
      <div className="fixed bottom-6 right-6 z-30">
        <InstallButton />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col w-full">
        <Navbar />

        <main className="flex flex-col w-full gap-16 md:gap-24">
          <Hero />

          <div className="px-4 sm:px-6 lg:px-8">
            <ProblemSolution />
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <ComplaintLifecycle3D />
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <Features />
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <HowItWorks />
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <Impact />
          </div>

          <CTA />

          <Footer />
        </main>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>

          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}