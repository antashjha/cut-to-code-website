import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

// ✏️ Updated LinkedIn URL
const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/cut-to-code-a7993a3b9/' },
  { name: 'Instagram', url: 'https://www.instagram.com/cut2code_sliet?igsh=MXBkMXB1MW1uMWt3bQ==&utm_source=ig_contact_invite' },
  { name: 'X', url: 'https://x.com/code_cut93622' }
];

export default function Footer() {
  const sectionRef = useRef(null);
  
  // State to track mouse position for the spotlight effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
    });
  }, []);

  // Function to update mouse coordinates relative to the card
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 bg-slate-900 border-t border-slate-800 overflow-hidden">
      
      {/* Massive subtle background watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
        <h1 className="text-[20rem] font-black font-display text-white tracking-tighter">C2C</h1>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT: Info & Socials */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100 mb-6">
              Let's build <span className="text-blue-500">together.</span>
            </h2>
            <p className="font-body text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
              Have questions about the club, upcoming events, or sponsorships? Reach out to our core team.
            </p>
            
            <div className="space-y-5 font-mono text-sm text-slate-300">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cut2codexsliet@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 hover:text-blue-400 transition-colors w-fit"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all">
                  <span className="text-blue-500 text-lg">✉</span> 
                </div>
                cut2codexsliet@gmail.com
              </a>
              
              <div className="flex items-center gap-4 w-fit">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <span className="text-blue-500 text-lg">📍</span> 
                </div>
                SLIET Campus, Longowal, Sangrur - 148106
              </div>
            </div>

            <div className="flex gap-3 mt-12 flex-wrap">
              {socialLinks.map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 font-mono text-xs tracking-widest uppercase hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 shadow-sm"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Humanized CTA Card with Mouse Spotlight */}
          <div 
            className="group relative rounded-3xl p-10 md:p-12 border border-slate-700 bg-slate-800/50 backdrop-blur-md shadow-2xl overflow-hidden cursor-default"
            onMouseMove={handleMouseMove}
          >
            {/* DYNAMIC MOUSE SPOTLIGHT */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
              }}
            />
            
            {/* Static Ambient Glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl z-0" />
            
            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
              
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <span className="text-blue-400 text-sm">👋</span>
                <p className="font-mono text-[10px] text-blue-400 tracking-widest uppercase font-bold mt-0.5">
                  We're looking for you
                </p>
              </div>
              
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Got an idea? <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Let's build it.
                </span>
              </h3>
              
              <p className="font-body text-slate-400 text-sm md:text-base mb-10 max-w-sm">
                Whether you're writing your very first "Hello World" or debugging complex backend systems, there's a seat at the table for you. Come learn, code, and grow with us.
              </p>
              
              <Link 
                to="/join" 
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 font-display text-base font-bold tracking-wide text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 overflow-hidden w-full sm:w-auto shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <span className="relative z-10 flex items-center">
                  Say Hello & Join
                  <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </Link>

            </div>
          </div>

        </div>
        
        {/* ✏️ Updated bottom row with your new tagline */}
        <div className="mt-24 pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="font-mono text-xs text-slate-500">© {new Date().getFullYear()} Cut_to_Code SLIET. All rights reserved.</p>
          <p className="font-mono text-xs text-slate-600 font-bold tracking-widest uppercase md:text-right">
            Learn.. Build... Deploy....
          </p>
        </div>
      </div>
    </section>
  );
}