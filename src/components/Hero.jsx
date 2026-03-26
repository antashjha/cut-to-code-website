import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import BackGround from '../assets/background.jpg'; 

export default function Hero({ logoSrc }) {
  // 1. Create refs for the elements we want to animate
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // 2. Setup the GSAP animation on component mount
  useEffect(() => {
    // Create a timeline for staggered animations
    const tl = gsap.timeline({ delay: 0.7 });

    // Animate Left Side (Slide in from left, fade in)
    tl.fromTo(leftRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    // Animate Right Side (Slide in from right, fade in, start slightly before left finishes)
    .fromTo(rightRef.current, 
      { x: 50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      '-=0.6' // This offset makes it start 0.6 seconds earlier than it normally would
    );
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* The Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BackGround})` }} 
      />
      
      {/* The Warm Overlay */}
      <div className="absolute inset-0 bg-stone-900/75 backdrop-blur-[2px]" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid lg:grid-cols-12 gap-12 items-center pt-20">

        {/* LEFT SIDE: Attached leftRef */}
        <div ref={leftRef} className="lg:col-span-7 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left min-w-0">
          
          

          {/* Text Stack */}
          <div className="flex flex-col justify-center md:border-l-4 border-orange-500 md:pl-6 lg:pl-8 min-w-0">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide break-all sm:break-normal">
              CUT_TO_CODE
            </h1>
            <h2 className="font-display text-lg md:text-2xl text-stone-300 mt-2 font-light">
              SLIET, Longowal
            </h2>

            <div className="w-24 h-1 bg-orange-500/80 my-5 mx-auto md:mx-0" />

            <p className="font-body text-xl md:text-2xl lg:text-3xl text-stone-100 font-light">
              Welcomes You!
            </p>
            <p className="font-mono text-[10px] md:text-xs text-stone-400 mt-4 tracking-widest uppercase">
              A community of builders & innovators
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Attached rightRef */}
        <div ref={rightRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
            
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs tracking-widest text-stone-300 uppercase">Club Network</span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-4xl font-display font-bold text-white mb-1">20<span className="text-orange-500">+</span></h3>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">Members</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-bold text-white mb-1">5<span className="text-orange-500">+</span></h3>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider">Tech Domains</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <a href="#contact" 
                className="flex-1 text-center py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-display text-xs font-bold tracking-widest uppercase rounded transition-colors shadow-lg">
                Join Now
              </a>
              <a href="#about" 
                className="flex-1 text-center py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-display text-xs font-bold tracking-widest uppercase rounded transition-colors">
                Explore
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}