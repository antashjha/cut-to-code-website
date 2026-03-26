import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lines = [
  { p: '$ ', t: 'whoami',                          c: 'text-blue-400', d: 0    },
  { p: '  ', t: 'cut_to_code_member',              c: 'text-slate-300', d: 400  },
  { p: '$ ', t: 'ls domains/',                     c: 'text-blue-400', d: 900  },
  { p: '  ', t: 'web_dev  ai_ml  dsa  app  games', c: 'text-slate-400', d: 1400 },
  { p: '$ ', t: 'cat mission.txt',                 c: 'text-blue-400', d: 2000 },
  { p: '  ', t: 'Build. Break. Learn. Repeat.',    c: 'text-slate-300', d: 2500 },
  { p: '$ ', t: 'join --club cut_to_code',         c: 'text-blue-400', d: 3400 },
  { p: '  ', t: '✓ Welcome to the community!',     c: 'text-teal-400', d: 4000 },
];

function Terminal() {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(null);
  const ref = useRef(null);
  const started = useRef(false);

  const run = () => {
    setVisible([]); setTyping(null);
    lines.forEach((line, i) => {
      setTimeout(() => {
        setTyping({ ...line, i });
        setTimeout(() => {
          setVisible(p => [...p, line]);
          setTyping(null);
        }, line.t.length * 38 + 60);
      }, line.d);
    });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; setTimeout(run, 300); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
      {/* IDE Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-slate-700" />
        <span className="w-3 h-3 rounded-full bg-slate-700" />
        <span className="w-3 h-3 rounded-full bg-slate-700" />
        <span className="ml-3 font-mono text-xs text-slate-500 tracking-wider">bash — c2c_env</span>
        <button onClick={() => { started.current = false; run(); started.current = true; }}
          className="ml-auto font-mono text-xs text-slate-600 hover:text-slate-300 transition-colors">↺</button>
      </div>
      {/* Body */}
      <div className="p-6 font-mono text-sm min-h-[340px] space-y-1.5 bg-[#0a0f18]">
        <p className="text-slate-500 text-xs mb-4">Last login: {new Date().toDateString()}</p>
        {visible.map((l, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-slate-600 select-none">{l.p}</span>
            <span className={l.c}>{l.t}</span>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <span className="text-slate-600 select-none">{typing.p}</span>
            <span className={typing.c}>{typing.t}<span className="cursor-blink text-slate-500 ml-1">█</span></span>
          </div>
        )}
        {visible.length === lines.length && (
          <div className="flex gap-2 mt-2">
            <span className="text-slate-600">$ </span>
            <span className="cursor-blink text-slate-500 ml-1">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const rightRef   = useRef(null);

  useEffect(() => {
    // A slightly more staggered, sophisticated entrance for the right side
    gsap.fromTo(rightRef.current.children, 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-36 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="mb-20">
          <p className="font-mono text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">01 — About</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100">
            Who We <span className="text-blue-500">Are</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Terminal (Spans 5 columns) */}
          <div className="lg:col-span-5">
            <Terminal />
          </div>

          {/* RIGHT: The "Human" Side (Spans 7 columns) */}
          <div ref={rightRef} className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Intro Narrative */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold text-slate-200">
                Building beyond the classroom.
              </h3>
              <p className="text-slate-400 font-body text-base md:text-lg leading-relaxed max-w-2xl">
                Cut_to_Code is a student-driven community at SLIET where passion for technology 
                meets real action. We believe in learning by doing — no fluff, just shipping code.
                Whether you're writing your first script or deploying production-level architectures, 
                there’s a place for you to grow here.
              </p>
            </div>

            {/* Core Values - Replaced the AI grid with an elegant staggered list */}
            <div className="flex flex-col gap-6">
              {[
                { title: 'Build & Ship', desc: 'Move past endless tutorials. We focus on building real-world projects that solve actual problems and build your portfolio.' },
                { title: 'Collaborative Growth', desc: 'Engage in code reviews, pair programming, and peer mentorship. You never have to debug an issue alone.' },
                { title: 'Hack & Compete', desc: 'Sharpen your logic and perform under pressure through our regular hackathons and competitive programming challenges.' }
              ].map((val, i) => (
                <div key={i} className="group relative pl-6 border-l-[3px] border-slate-800 hover:border-blue-500 transition-colors duration-300">
                  <h4 className="font-display text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                    {val.title}
                  </h4>
                  <p className="font-body text-sm text-slate-400 mt-1.5 max-w-xl">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Tags - Cleaned up to look like sleek code badges */}
            <div className="pt-4">
              <p className="font-mono text-xs text-slate-600 tracking-widest mb-4 uppercase">Tech Stack</p>
              <div className="flex flex-wrap gap-2.5">
                {['React', 'Node.js', 'Python', 'C++', 'Flutter', 'TensorFlow', 'Docker','Next.js','Kotlin'].map(t => (
                  <span key={t} className="px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 font-mono text-xs text-slate-300 hover:bg-slate-800 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-200 cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}