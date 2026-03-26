import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const teamData = [
  { id: 1,  name: 'Aryan Singh',      role: 'Coordinator / Web Lead', category: 'Core Team',    av: 'AS', linkedin: 'https://www.linkedin.com/in/aryan-singh-25518533b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { id: 2,  name: 'Arpita Gupta',     role: 'Co-Coordinator / DSA',   category: 'Core Team',    av: 'AG', linkedin: 'https://www.linkedin.com/in/arpita-gupta-b526a128b' },
  { id: 3,  name: 'Antash K. Jha',    role: 'Technical Lead / Web dev',         category: 'Tech Team',    av: 'AK', linkedin: 'https://www.linkedin.com/in/antash-jha/' },
  { id: 4,  name: 'Abhinav Shukla',   role: 'Tech Co-Lead / App Dev', category: 'Tech Team',    av: 'AS', linkedin: 'https://www.linkedin.com/in/abhinav-shukla-3a31b8344?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { id: 5,  name: 'Ankit Prajapati',  role: 'Operations & Logistics Lead',        category: 'Operations',   av: 'AP', linkedin: '#' },
  { id: 6,  name: 'Harsh Tripathi',   role: 'Operations & Logistics Co-Lead',     category: 'Operations',   av: 'HT', linkedin: '#' },
  { id: 7,  name: 'Prerna Sharma',    role: 'Media Lead',             category: 'Media Team',   av: 'PS', linkedin: 'https://www.linkedin.com/in/prernasharmaaa/' },
  { id: 8,  name: 'Siddharth Jain',   role: 'Media Co-Lead',          category: 'Media Team',   av: 'SJ', linkedin: '#' },
  { id: 9,  name: 'Dheeraj Verma',    role: 'Media / DSA',            category: 'Media Team',   av: 'DV', linkedin: 'https://www.linkedin.com/in/dheeraj-prajapat-40801b384?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { id: 10, name: 'Aryan Kumar',      role: 'DSA Lead',               category: 'Mentorship',   av: 'AK', linkedin: 'https://www.linkedin.com/in/aryan-kumar-62a738315/' },
  { id: 11, name: 'Rohit Rawat',      role: 'DSA Co-Lead',            category: 'Mentorship',   av: 'RR', linkedin: 'https://www.linkedin.com/in/imrohitrwt/' },
  { id: 12, name: 'Anup',             role: 'AI/ML Lead',             category: 'Mentorship',   av: 'AN', linkedin: '#' },
  { id: 13, name: 'Ayush Aggrawal',   role: 'AI/ML Co-Lead',          category: 'Mentorship',   av: 'AA', linkedin: '#' },
  { id: 14, name: 'Prit Deshbhratar', role: 'Game Dev',               category: 'Mentorship',   av: 'PD', linkedin: '#' },
  { id: 15, name: 'Ankit Pandey',     role: 'Web Dev Mentor',         category: 'Mentorship',   av: 'AP', linkedin: '#' },
  { id: 16, name: 'Aman',             role: 'Web Dev Mentor',         category: 'Mentorship',   av: 'AM', linkedin: '#' },
  { id: 17, name: 'Shahbaj Alam',     role: 'DSA Mentor',             category: 'Mentorship',   av: 'SA', linkedin: '#' },
  { id: 18, name: 'Gaurav Ankit',     role: 'DSA Mentor',             category: 'Mentorship',   av: 'GA', linkedin: 'https://www.linkedin.com/in/gaurav-ankit-12337726b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { id: 19, name: 'Ankit Anurag',     role: 'DSA Mentor',             category: 'Mentorship',   av: 'AA', linkedin: 'https://www.linkedin.com/in/ankit-anurag-94014b363?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { id: 20, name: 'Rohan Mishra',     role: 'AI/ML Mentor',           category: 'Mentorship',   av: 'RM', linkedin: 'https://www.linkedin.com/in/rohan-mishra-65137731b/' },
  { id: 21, name: 'Subham Bishnoi',     role: 'Media ',           category: 'Media Team',   av: 'RM', linkedin: '#' },
];

const categories = ['ALL', 'Core Team', 'Tech Team', 'Operations', 'Media Team', 'Mentorship'];

function Card({ m }) {
  return (
    <div className="h-full rounded-xl border border-slate-700 bg-slate-800 p-8 flex flex-col items-center text-center transition-colors duration-300 hover:border-slate-500 hover:bg-slate-800/80 group">
      <div className="w-16 h-16 rounded-full border border-slate-600 bg-slate-900 flex items-center justify-center font-display text-xl font-bold text-slate-200 mb-5 shadow-inner">
        {m.av}
      </div>
      <h3 className="font-display text-lg font-bold text-slate-100">{m.name}</h3>
      <p className="font-mono text-[10px] text-blue-400 mt-1.5 tracking-widest uppercase">{m.category}</p>
      <div className="w-8 h-px bg-slate-600 my-4 shrink-0" />
      <p className="font-body text-sm text-slate-400 mb-6">{m.role}</p>

      {/* NEW: LinkedIn Connect Button pushed to the bottom */}
      <div className="mt-auto">
        <a 
          href={m.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-600 bg-slate-900/50 text-slate-300 font-mono text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 shadow-sm"
        >
          <span>Connect</span>
          {/* Subtle LinkedIn SVG Icon */}
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Team() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const filteredTeam = activeCategory === 'ALL' 
    ? teamData 
    : teamData.filter(m => m.category === activeCategory);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIdx = Math.max(0, filteredTeam.length - (isMobile ? 1 : 3));

  useEffect(() => {
    setIdx(0);
    setAuto(true);
  }, [activeCategory]);

  const nextCard = useCallback(() => {
    setIdx(prev => (prev >= maxIdx ? 0 : prev + 1));
  }, [maxIdx]);

  const prevCard = () => {
    setAuto(false);
    setIdx(prev => (prev <= 0 ? maxIdx : prev - 1));
  };

  useEffect(() => {
    if (!auto || maxIdx === 0) return;
    const interval = setInterval(nextCard, 3500);
    return () => clearInterval(interval);
  }, [auto, nextCard, maxIdx]);

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
    });
  }, []);

  return (
    <section id="team" ref={sectionRef} className="relative py-36 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">03 — Team</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100">
              The <span className="text-blue-500">Builders</span>
            </h2>
          </div>
          
          {maxIdx > 0 && (
            <div className="hidden md:flex gap-3">
              <button onClick={prevCard} className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all flex items-center justify-center shadow-sm">
                ←
              </button>
              <button onClick={() => { setAuto(false); nextCard(); }} className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all flex items-center justify-center shadow-sm">
                →
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-slate-800 border-blue-500/50 text-blue-400 shadow-sm' 
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div 
          className="overflow-hidden mx-auto max-w-6xl"
          onMouseEnter={() => setAuto(false)} 
          onMouseLeave={() => setAuto(true)}  
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * (isMobile ? 100 : 100 / 3)}%)` }}
          >
            {filteredTeam.map((m) => (
              <div key={m.id} className="w-full md:w-[33.333333%] shrink-0 px-3 pb-4 flex">
                {/* w-full ensures the inner card takes up the whole column space */}
                <div className="w-full">
                  <Card m={m} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {maxIdx > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-8 px-4">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button 
                key={i} 
                onClick={() => { setAuto(false); setIdx(i); }}
                className="rounded-full transition-all duration-300"
                style={{ 
                  width: idx === i ? '24px' : '8px',
                  height: '8px',
                  background: idx === i ? '#3b82f6' : '#334155', 
                }} 
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}