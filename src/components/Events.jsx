import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Template Array: The boxes are ready. Fill these in whenever you host something!
const events = [
  { id: 1, type: 'EVENT',    title: 'Upcoming Event Name', date: 'TBD', time: 'TBD', loc: 'TBD', status: 'upcoming', desc: 'N/A' },
  { id: 2, type: 'WORKSHOP', title: 'Upcoming Workshop',   date: 'TBD', time: 'TBD', loc: 'TBD', status: 'upcoming', desc: 'N/A' },
  { id: 3, type: 'NOTICE',   title: 'Important Notice',    date: 'TBD', time: 'TBD', loc: 'TBD', status: 'active',   desc: 'N/A' },
  { id: 4, type: 'CONTEST',  title: 'Upcoming Contest',    date: 'TBD', time: 'TBD', loc: 'TBD', status: 'upcoming', desc: 'N/A' },
];

const filters = ['ALL', 'EVENT', 'WORKSHOP', 'NOTICE', 'CONTEST'];

export default function Events() {
  const [filter, setFilter] = useState('ALL');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Filter the events
  const shown = filter === 'ALL' ? events : events.filter(e => e.type === filter);

  // Entrance animation for the whole section
  useEffect(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
    });
  }, []);

  // Smooth pop-in animation when switching filters
  useEffect(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [filter]);

  // Status badge styling
  const statusLabel = { upcoming: 'Upcoming', active: 'Active', past: 'Past' };
  const statusStyle = {
    upcoming: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    active:   'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    past:     'text-slate-500 bg-slate-800 border-slate-700',
  };

  // Color coding for the tiny category text
  const typeColors = {
    EVENT: '#3b82f6',    // blue
    WORKSHOP: '#8b5cf6', // violet
    NOTICE: '#f59e0b',   // amber
    CONTEST: '#10b981',  // emerald
  };

  return (
    <section id="events" ref={sectionRef} className="relative py-36 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">04 — Notice Board</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100">
            What's <span className="text-blue-500">Happening</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
                filter === f 
                  ? 'bg-slate-800 border-blue-500/50 text-blue-400 shadow-sm' 
                  : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Render the boxes if they exist */}
          {shown.map(e => (
            <div key={e.id}
              className={`group rounded-xl border bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-500 hover:shadow-xl hover:bg-slate-800 ${
                e.status === 'past' ? 'border-slate-800 opacity-60 hover:opacity-100' : 'border-slate-700'
              }`}>
              
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-bold tracking-widest" style={{ color: typeColors[e.type] }}>
                  {e.type}
                </span>
                <span className={`font-mono text-[10px] uppercase tracking-wider border rounded-full px-2.5 py-1 ${statusStyle[e.status]}`}>
                  {statusLabel[e.status]}
                </span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                {e.title}
              </h3>
              
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-700/50">
                <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="text-slate-500">📅</span> {e.date}
                </div>
                <div className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="text-slate-500">📍</span> {e.loc}
                </div>
              </div>
              
              <p className="font-body text-sm text-slate-400 leading-relaxed mb-6">
                {e.desc}
              </p>
              
              {e.status !== 'past' && (
                <button className="font-mono text-xs font-bold tracking-wider transition-colors duration-200 text-slate-400 group-hover:text-blue-400">
                  More Info →
                </button>
              )}
            </div>
          ))}

          {/* Fallback Empty State (If a category has no items) */}
          {shown.length === 0 && (
            <div className="col-span-full py-16 rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/20 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4 opacity-50">📡</div>
              <h3 className="font-display text-lg font-bold text-slate-300 mb-2">No {filter === 'ALL' ? 'Updates' : filter}s Currently</h3>
              <p className="font-body text-sm text-slate-500 max-w-sm">
                Check back later. The club leadership will post new updates here soon.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}