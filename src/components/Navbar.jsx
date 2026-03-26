import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Domains', href: '#domains' },
  { label: 'Team', href: '#team' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ logoSrc }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    
    tl.fromTo(navRef.current, 
      { y: -100 }, 
      { y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(logoRef.current, 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 
      "-=0.5"
    )
    .fromTo(linksRef.current.children, 
      { opacity: 0, y: -10 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, 
      "-=0.4"
    )
    .fromTo(ctaRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }, 
      "-=0.2"
    );

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (label, href) => {
    setActive(label);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-500 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-1.5' 
          : 'bg-transparent py-3 md:py-4' 
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO - Scaled to match the 'Join Us' button height (~40px) */}
        <button
  ref={logoRef}
  onClick={() => go('Home', '#home')}
  className="flex items-center"
>
  {logoSrc ? (
    <img
      src={logoSrc}
      alt="Logo"
      className="h-20 md:h-11 w-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
    />
  ) : (
    <div className="h-10 md:h-11 w-10 md:w-11 rounded-full border border-blue-500/50 flex items-center justify-center text-blue-500 font-display text-xs font-bold">
      C2C
    </div>
  )}
</button>

        {/* Desktop links */}
        <ul ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <button
                onClick={() => go(label, href)}
                className={`font-body text-sm font-medium transition-colors duration-200 ${
                  active === label ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div ref={ctaRef} className="hidden md:block">
          <a
            href="#contact"
            className="px-6 py-2.5 bg-blue-600 text-white font-body text-sm font-bold tracking-wide rounded hover:bg-blue-500 transition-colors duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
          >
            Join Us
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-[2px] bg-slate-300 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-[2px] bg-slate-300 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-slate-300 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-900 border-t border-slate-800 px-8 py-6 flex flex-col gap-5 shadow-2xl">
          {navLinks.map(({ label, href }) => (
            <button key={label} onClick={() => go(label, href)}
              className={`text-left font-body text-base font-medium transition-colors ${
                active === label ? 'text-blue-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-4 px-5 py-3.5 bg-blue-600 text-white text-center font-body text-sm font-bold rounded-md shadow-md">
            Join Us
          </a>
        </div>
      </div>
    </nav>
  );
}