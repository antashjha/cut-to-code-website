import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const domains = [
  { 
    id: 'WEB', label: 'Web Development', color: '#3b82f6', 
    tagline: 'Architect the modern internet.',
    desc: 'From responsive front-ends to robust, scalable back-ends. Master the full lifecycle of web applications, focusing on performance, security, and user experience.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Next.js', 'REST/GraphQL','TypeScript',],
    builds: ['Real-time chat platforms', 'E-commerce dashboards', 'SaaS landing pages']
  },
  { 
    id: 'AI_ML', label: 'AI & Machine Learning', color: '#6366f1', 
    tagline: 'Teach machines to perceive and predict.',
    desc: 'Dive into data pipelines, neural networks, and predictive modeling. Learn to train, optimize, and deploy intelligent models that solve complex, real-world problems.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'Scikit-Learn', 'OpenCV'],
    builds: ['Computer vision systems', 'NLP chatbots', 'Predictive market models']
  },
  { 
    id: 'DSA', label: 'Data Structures & Algorithms', color: '#10b981', 
    tagline: 'Master the logic of computation.',
    desc: 'The backbone of elite software engineering. Develop an unbreakable foundation in algorithmic thinking, optimization, and advanced problem-solving techniques.',
    skills: ['C++', 'Java', 'Dynamic Programming', 'Graph Theory', 'Trees', 'Time Complexity'],
    builds: ['Competitive programming profiles', 'Optimized search engines', 'FAANG interview prep']
  },
  { 
    id: 'APP', label: 'App Development', color: '#0ea5e9', 
    tagline: 'Ship native experiences to every pocket.',
    desc: 'Build fluid, cross-platform mobile applications. Learn state management, local databases, and native device APIs to bring ideas from Figma to the App Store.',
    skills: ['Flutter', 'Dart', 'React Native', 'Firebase', 'SQLite', 'UI/UX Design','Kotlin'],
    builds: ['Social networking apps', 'Fitness trackers', 'Cross-platform utilities']
  },
  { 
    id: 'GAME', label: 'Game Development', color: '#8b5cf6', 
    tagline: 'Engineer immersive digital worlds.',
    desc: 'Combine mathematics, physics, and art. Learn game loops, rendering pipelines, collision detection, and shader programming to create interactive experiences.',
    skills: ['Unity', 'C#', 'Godot', 'C++', 'Blender', 'HLSL/GLSL Shaders'],
    builds: ['2D Physics platformers', '3D multiplayer arenas', 'Procedural level generators']
  },
];

export default function Domains() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // Auto-play state
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const ivRef = useRef(null);

  // Smooth content replacement animation
  const goTo = useCallback((idx) => {
    if (!contentRef.current) return;
    
    gsap.to(contentRef.current, { 
      opacity: 0, 
      y: 10, 
      duration: 0.2, 
      ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    });
  }, []);

  // Handle manual clicks
  const handleTabClick = (idx) => {
    if (idx === active) return;
    setAuto(false); // Stop auto-playing if the user clicks manually
    goTo(idx);
  };

  // Auto-play interval effect
  useEffect(() => {
    if (!auto) {
      clearInterval(ivRef.current);
      return;
    }
    
    // Cycle every 5.5 seconds
    ivRef.current = setInterval(() => {
      setActive(prev => {
        const nextIdx = (prev + 1) % domains.length;
        goTo(nextIdx);
        return prev; // Don't update state directly here, let `goTo` handle it after fade out
      });
    }, 5500); 

    return () => clearInterval(ivRef.current);
  }, [auto, goTo]);

  // Entrance animation for the section
  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
    });
  }, []);

  const d = domains[active];

  return (
    <section id="domains" ref={sectionRef} className="relative py-36 bg-slate-900 border-t border-slate-800">
      
      {/* Dynamic Background Glow based on active domain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20" 
        style={{ 
          background: `radial-gradient(circle at 75% 50%, ${d.color}40 0%, transparent 50%)`, 
          transition: 'background 0.5s ease' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">02 — Domains</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100">
              What We <span className="text-blue-500">Build</span>
            </h2>
          </div>
          
          {/* Pause Indicator (Optional subtle UX detail) */}
          {!auto && (
            <p className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">
              Auto-play paused
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Vertical Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-2 relative">
            {/* The tracking line behind the tabs */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800 hidden lg:block" />
            
            {domains.map((dm, i) => (
              <button 
                key={dm.id} 
                onClick={() => handleTabClick(i)}
                className={`relative text-left px-6 py-4 transition-all duration-300 group overflow-hidden rounded-lg lg:rounded-none lg:bg-transparent ${
                  active === i 
                    ? 'bg-slate-800/50 lg:bg-transparent' 
                    : 'bg-transparent hover:bg-slate-800/30'
                }`}
              >
                {/* Active Indicator Line (Desktop) */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 hidden lg:block ${
                    active === i ? 'h-full' : 'h-0 group-hover:h-full group-hover:bg-slate-600'
                  }`}
                  style={active === i ? { backgroundColor: dm.color } : {}}
                />
                
                <h3 
                  className={`font-display text-lg font-bold transition-colors duration-300 ${
                    active === i ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                >
                  {dm.label}
                </h3>
                <p 
                  className={`font-mono text-xs mt-1 transition-colors duration-300 ${
                    active === i ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden lg:opacity-100 lg:h-auto'
                  }`}
                  style={active === i ? { color: dm.color } : { color: '#64748b' }}
                >
                  {dm.id}
                </p>
              </button>
            ))}
          </div>

          {/* RIGHT: Deep-Dive Content Panel */}
          <div className="lg:col-span-8 relative">
            <div 
              ref={contentRef} 
              className="relative bg-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
              style={{ boxShadow: `0 25px 50px -12px ${d.color}15` }}
            >
              
              {/* Massive Typographic Watermark Background */}
              <div 
                className="absolute -right-10 -bottom-10 font-display font-black text-[120px] md:text-[180px] leading-none select-none pointer-events-none opacity-[0.03]"
                style={{ color: d.color }}
              >
                {d.id}
              </div>

              {/* Main Content */}
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-slate-100 mb-3">
                  {d.label}
                </h3>
                <p className="font-mono text-sm tracking-wide mb-8" style={{ color: d.color }}>
                  {d.tagline}
                </p>
                <p className="text-slate-400 font-body text-base md:text-lg leading-relaxed max-w-2xl mb-12">
                  {d.desc}
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* Tech Stack */}
                  <div>
                    <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-5">
                      Core Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {d.skills.map(s => (
                        <span 
                          key={s} 
                          className="px-3 py-1.5 rounded-md border border-slate-700 bg-slate-800/50 font-mono text-xs text-slate-300 transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* What You'll Build */}
                  <div>
                    <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-5">
                      What You'll Build
                    </p>
                    <ul className="space-y-3">
                      {d.builds.map((build, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1" style={{ color: d.color }}>▹</span>
                          <span className="font-body text-sm text-slate-300 leading-relaxed">
                            {build}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}