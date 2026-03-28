import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BackGround from "../assets/background.jpg";

export default function Hero() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textElementsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate the main left container
    tl.fromTo(
      leftRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    )
      // Staggered reveal for the text elements inside the left side
      .fromTo(
        textElementsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4",
      )
      // Animate Right Side card with a subtle float up
      .fromTo(
        rightRef.current,
        { x: 30, y: 30, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      );
  }, []);

  // Helper function to add elements to the stagger array
  const addToRefs = (el) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* 1. The Background Image - Kept clearer and highly visible */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${BackGround})` }}
      />

      {/* 2. The Overlay - Reduced blur to 1px so the college is distinct, but text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/75 to-stone-950/90 backdrop-blur-[1px]" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full grid lg:grid-cols-12 gap-16 items-center pt-20">
        
        {/* LEFT SIDE */}
        <div
          ref={leftRef}
          className="lg:col-span-7 flex flex-col md:flex-row items-center md:items-start text-center md:text-left min-w-0"
        >
          {/* Accent Line */}
          <div className="hidden md:block w-1.5 h-32 bg-gradient-to-b from-sky-500 to-sky-500/0 mr-8 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]" />

          {/* Text Stack */}
          <div className="flex flex-col justify-center min-w-0">
            {/* Department of CSE Badge */}
            <div
              ref={addToRefs}
              className="flex items-center justify-center md:justify-start mb-6"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-sky-500/10 border border-sky-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:bg-sky-500/20 hover:border-sky-500/50 transition-all cursor-default">
                {/* Pulsing Dot */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                {/* Text */}
                <span className="font-mono text-sm md:text-base text-sky-300 font-bold tracking-[0.15em] uppercase">
                  Department of CSE
                </span>
              </div>
            </div>

            <h1
              ref={addToRefs}
              className="font-display text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight break-all sm:break-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-stone-400 drop-shadow-sm pb-2"
            >
              CUT_TO_
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500">
                CODE
              </span>
            </h1>

            <h2
              ref={addToRefs}
              className="font-display text-lg md:text-xl lg:text-2xl text-stone-300 mt-2 font-light flex items-center justify-center md:justify-start gap-3"
            >
              Official Coding Club
              <span className="text-sky-500/50">•</span>
              <span className="font-medium text-white/90">SLIET, Longowal</span>
            </h2>

            <div
              ref={addToRefs}
              className="w-24 h-1 bg-gradient-to-r from-sky-500 to-transparent my-6 mx-auto md:mx-0 rounded-full"
            />

            <p
              ref={addToRefs}
              className="font-body text-xl md:text-2xl text-stone-200 font-light leading-relaxed"
            >
              Empowering students to build, innovate, and master the digital
              world. Welcomes You!
            </p>

            {/* HOD/Advisor Card */}
            <div
              ref={addToRefs}
              className="mt-10 inline-block text-left w-full sm:w-auto"
            >
              <p className="font-mono text-[10px] md:text-xs text-stone-400/80 uppercase tracking-widest mb-2 pl-1">
                Under the guidance of
              </p>
              <div className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-sky-500/30 rounded-xl p-4 sm:pr-12 transition-all duration-300 backdrop-blur-md overflow-hidden flex items-center gap-4">
                {/* Decorative background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="font-body text-base md:text-lg text-white font-semibold tracking-wide">
                    Dr. Damanpreet Singh
                  </p>
                  <p className="font-mono text-[10px] text-sky-400 uppercase tracking-wider mt-0.5 font-medium">
                    HOD (CSE Department, SLIET)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Glassmorphism Card */}
        <div
          ref={rightRef}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Ambient Glow behind the card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
            {/* Top accent border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500" />

            <div className="flex items-center justify-between mb-10 mt-2">
              <span className="font-mono text-xs tracking-widest text-stone-400 uppercase font-semibold">
                Club Status
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]" />{" "}
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <h3 className="text-4xl font-display font-bold text-white mb-1 tracking-tight">
                  20<span className="text-sky-500">+</span>
                </h3>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                  Members
                </p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <h3 className="text-4xl font-display font-bold text-white mb-1 tracking-tight">
                  5<span className="text-sky-500">+</span>
                </h3>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                  Domains
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="flex-1 text-center py-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-display text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] hover:-translate-y-0.5"
              >
                Contact Us
              </a>
              <a
                href="#about"
                className="flex-1 text-center py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display text-xs font-bold tracking-widest uppercase rounded-xl transition-all hover:-translate-y-0.5"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}