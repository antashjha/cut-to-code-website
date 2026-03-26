import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const teamData = [
  {
    id: 1,
    name: "Aryan Singh",
    role: "Coordinator / Web Lead",
    category: "Core Team",
    av: "AS",
    linkedin:
      "https://www.linkedin.com/in/aryan-singh-25518533b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 2,
    name: "Arpita Gupta",
    role: "Co-Coordinator / DSA",
    category: "Core Team",
    av: "AG",
    linkedin: "https://www.linkedin.com/in/arpita-gupta-b526a128b",
  },
  {
    id: 3,
    name: "Antash K. Jha",
    role: "Technical Lead / Web dev",
    category: "Tech Team",
    av: "AK",
    linkedin: "https://www.linkedin.com/in/antash-jha/",
  },
  {
    id: 4,
    name: "Abhinav Shukla",
    role: "Tech Co-Lead / App Dev",
    category: "Tech Team",
    av: "AS",
    linkedin:
      "https://www.linkedin.com/in/abhinav-shukla-3a31b8344?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 5,
    name: "Ankit Prajapati",
    role: "Operations & Logistics Lead",
    category: "Operations",
    av: "AP",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Harsh Tripathi",
    role: "Operations & Logistics Co-Lead",
    category: "Operations",
    av: "HT",
    linkedin: "#",
  },
  {
    id: 7,
    name: "Prerna Sharma",
    role: "Media Lead",
    category: "Media Team",
    av: "PS",
    linkedin: "https://www.linkedin.com/in/prernasharmaaa/",
  },
  {
    id: 8,
    name: "Siddharth Jain",
    role: "Media Co-Lead",
    category: "Media Team",
    av: "SJ",
    linkedin: "#",
  },
  {
    id: 9,
    name: "Dheeraj Verma",
    role: "Media / DSA",
    category: "Media Team",
    av: "DV",
    linkedin:
      "https://www.linkedin.com/in/dheeraj-prajapat-40801b384?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 10,
    name: "Aryan Kumar",
    role: "DSA Lead",
    category: "Mentorship",
    av: "AK",
    linkedin: "https://www.linkedin.com/in/aryan-kumar-62a738315/",
  },
  {
    id: 11,
    name: "Rohit Rawat",
    role: "DSA Co-Lead",
    category: "Mentorship",
    av: "RR",
    linkedin: "https://www.linkedin.com/in/imrohitrwt/",
  },
  {
    id: 12,
    name: "Anup",
    role: "AI/ML Lead",
    category: "Mentorship",
    av: "AN",
    linkedin: "#",
  },
  {
    id: 13,
    name: "Ayush Aggrawal",
    role: "AI/ML Co-Lead",
    category: "Mentorship",
    av: "AA",
    linkedin: "#",
  },
  {
    id: 14,
    name: "Prit Deshbhratar",
    role: "Game Dev",
    category: "Mentorship",
    av: "PD",
    linkedin: "#",
  },
  {
    id: 15,
    name: "Ankit Pandey",
    role: "Web Dev Mentor",
    category: "Mentorship",
    av: "AP",
    linkedin: "#",
  },
  {
    id: 16,
    name: "Aman",
    role: "Web Dev Mentor",
    category: "Mentorship",
    av: "AM",
    linkedin: "#",
  },
  {
    id: 17,
    name: "Shahbaj Alam",
    role: "DSA Mentor",
    category: "Mentorship",
    av: "SA",
    linkedin: "#",
  },
  {
    id: 18,
    name: "Gaurav Ankit",
    role: "DSA Mentor",
    category: "Mentorship",
    av: "GA",
    linkedin:
      "https://www.linkedin.com/in/gaurav-ankit-12337726b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 19,
    name: "Ankit Anurag",
    role: "DSA Mentor",
    category: "Mentorship",
    av: "AA",
    linkedin:
      "https://www.linkedin.com/in/ankit-anurag-94014b363?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 20,
    name: "Rohan Mishra",
    role: "AI/ML Mentor",
    category: "Mentorship",
    av: "RM",
    linkedin: "https://www.linkedin.com/in/rohan-mishra-65137731b/",
  },
  {
    id: 21,
    name: "Subham Bishnoi",
    role: "Media ",
    category: "Media Team",
    av: "RM",
    linkedin: "#",
  },
];

const categories = [
  "ALL",
  "Core Team",
  "Tech Team",
  "Operations",
  "Media Team",
  "Mentorship",
];

// Reusable LinkedIn Icon component
const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

function Card({ m }) {
  return (
    <div className="h-full rounded-xl border border-slate-700 bg-slate-800 p-8 flex flex-col items-center text-center transition-colors duration-300 hover:border-slate-500 hover:bg-slate-800/80 group">
      <div className="w-16 h-16 rounded-full border border-slate-600 bg-slate-900 flex items-center justify-center font-display text-xl font-bold text-slate-200 mb-5 shadow-inner">
        {m.av}
      </div>
      <h3 className="font-display text-lg font-bold text-slate-100">
        {m.name}
      </h3>
      <p className="font-mono text-[10px] text-blue-400 mt-1.5 tracking-widest uppercase">
        {m.category}
      </p>
      <div className="w-8 h-px bg-slate-600 my-4 shrink-0" />
      <p className="font-body text-sm text-slate-400 mb-6">{m.role}</p>

      <div className="mt-auto">
        <a
          href={m.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-600 bg-slate-900/50 text-slate-300 font-mono text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all duration-300 shadow-sm"
        >
          <span>Connect</span>
          <LinkedinIcon />
        </a>
      </div>
    </div>
  );
}

export default function Team() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const advisorRef = useRef(null); // Ref for static card animation

  const filteredTeam =
    activeCategory === "ALL"
      ? teamData
      : teamData.filter((m) => m.category === activeCategory);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIdx = Math.max(0, filteredTeam.length - (isMobile ? 1 : 3));

  useEffect(() => {
    setIdx(0);
    setAuto(true);
  }, [activeCategory]);

  const nextCard = useCallback(() => {
    setIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
  }, [maxIdx]);

  const prevCard = () => {
    setAuto(false);
    setIdx((prev) => (prev <= 0 ? maxIdx : prev - 1));
  };

  useEffect(() => {
    if (!auto || maxIdx === 0) return;
    const interval = setInterval(nextCard, 3500);
    return () => clearInterval(interval);
  }, [auto, nextCard, maxIdx]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      // Distinct animation for the Advisor card
      gsap.fromTo(
        advisorRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: advisorRef.current, start: "top 80%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-36 bg-slate-900 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-slate-500 tracking-[0.2em] uppercase mb-4">
              03 — Team
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-100">
              The <span className="text-blue-500">Builders</span>
            </h2>
          </div>

          {maxIdx > 0 && (
            <div className="hidden md:flex gap-3">
              <button
                onClick={prevCard}
                className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all flex items-center justify-center shadow-sm overflow-hidden"
              >
                ←
              </button>
              <button
                onClick={() => {
                  setAuto(false);
                  nextCard();
                }}
                className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all flex items-center justify-center shadow-sm overflow-hidden"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* --- NEW: Static Faculty Advisor Section --- */}
        <div ref={advisorRef} className="mb-20 flex justify-center">
          <div className="w-full max-w-lg rounded-2xl border-2 border-blue-500/30 bg-slate-800 p-10 flex flex-col items-center text-center shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 hover:border-blue-500/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden group">
            {/* Decorative background gradient flare */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar placeholder with Advisor Initials */}
              <div className="w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center font-display text-4xl font-bold text-white mb-6 shadow-2xl relative">
                DS
                {/* Visual badge indicator */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                  </svg>
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
                Dr. Damanpreet Singh
              </h3>

              {/* Highlighted Faculty Advisor Label */}
              <div className="mt-2.5 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
                <p className="font-mono text-xs md:text-sm text-blue-300 font-semibold tracking-widest uppercase">
                  Faculty Advisor
                </p>
              </div>

              <div className="w-16 h-px bg-slate-600 my-6 shrink-0" />

              <p className="font-body text-base md:text-lg text-slate-300 mb-8 max-w-sm leading-relaxed">
                HOD, Department of Computer Science & Engineering, SLIET
                Longowal.
              </p>

              {/* LinkedIn Connect Button for Advisor */}
              <a
                href="#" // Insert Daman Sir's LinkedIn URL here
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-blue-600 text-white font-mono text-xs uppercase tracking-widest hover:bg-blue-500 transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Connect on LinkedIn</span>
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        {/* --- End Static Advisor Section --- */}

        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-slate-800 border-blue-500/50 text-blue-400 shadow-sm"
                  : "bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
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
            style={{
              transform: `translateX(-${idx * (isMobile ? 100 : 100 / 3)}%)`,
            }}
          >
            {filteredTeam.map((m) => (
              <div
                key={m.id}
                className="w-full md:w-[33.333333%] shrink-0 px-3 pb-4 flex"
              >
                <div className="w-full overflow-hidden">
                  {" "}
                  {/* added overflow-hidden to prevent layout shift during hover scale */}
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
                onClick={() => {
                  setAuto(false);
                  setIdx(i);
                }}
                className="rounded-full transition-all duration-300 overflow-hidden"
                style={{
                  width: idx === i ? "24px" : "8px",
                  height: "8px",
                  background: idx === i ? "#3b82f6" : "#334155",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
