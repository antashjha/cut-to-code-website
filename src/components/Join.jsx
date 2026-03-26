import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Join({ bgImage }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  // Your actual Web App URL from Google Apps Script
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwO0OdHLhSXsyei4w1IosReRuJETEtQXGaI4J3v5q8jKiS_ypQZuFAyRTMvAevgps1Q/exec'; 

  // Smooth entrance animation
  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.result === 'success') {
          setSuccess(true);
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        setLoading(false);
        alert('Error submitting form! ' + error);
      });
  };

  // Reusable input style for consistency
  const inputStyles = "w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 hover:border-slate-600 transition-all duration-300";

  return (
    <div className="min-h-screen relative flex items-center justify-center pt-24 pb-12 px-6">
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-10" />
        {bgImage && (
          <img 
            src={bgImage} 
            alt="SLIET Background" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Form Container */}
      <div 
        ref={formRef}
        className="relative z-20 w-full max-w-2xl bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-8 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] mt-4"
      >
        
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 font-mono text-xs text-slate-400 hover:text-blue-400 transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Join <span className="text-blue-500">Cut_to_Code</span>
          </h1>
          <p className="font-body text-slate-400 text-base max-w-sm mx-auto">
            Ready to build? Fill out the application below to begin your journey.
          </p>
        </div>

        {success ? (
          /* Success State */
          <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
            <div className="text-7xl mb-8 animate-bounce">🚀</div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Application Received!</h2>
            <p className="text-slate-400 font-body text-lg mb-10 max-w-md mx-auto">
              Welcome to the community. Keep an eye on your SLIET email for the next steps and onboarding details.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-8 py-4 font-display font-bold tracking-wide text-white transition-all duration-300 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-500 shadow-lg"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2.5">
                <label className="font-mono text-xs tracking-widest text-slate-400 uppercase flex gap-1">
                  Full Name <span className="text-blue-500">*</span>
                </label>
                <input required type="text" name="fullName" className={inputStyles} placeholder="John Doe" />
              </div>
              
              {/* Phone */}
              <div className="space-y-2.5">
                <label className="font-mono text-xs tracking-widest text-slate-400 uppercase flex gap-1">
                  Phone Number <span className="text-blue-500">*</span>
                </label>
                <input required type="tel" name="phone" className={inputStyles} placeholder="+91 00000 00000" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs tracking-widest text-slate-400 uppercase flex gap-1">
                Email Address <span className="text-blue-500">*</span>
              </label>
              <input required type="email" name="email" className={inputStyles} placeholder="yourname@sliet.ac.in" />
            </div>

            {/* Academic Year */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs tracking-widest text-slate-400 uppercase flex gap-1">
                Academic Year <span className="text-blue-500">*</span>
              </label>
              <div className="relative">
                <select required name="year" defaultValue="" className={`${inputStyles} appearance-none cursor-pointer`}>
                  <option value="" disabled>Select your current year</option>
                  <option value="B.Tech 1st Year">B.Tech 1st Year</option>
                  <option value="B.Tech 2nd Year">B.Tech 2nd Year</option>
                  <option value="B.Tech 3rd Year">B.Tech 3rd Year</option>
                  <option value="B.Tech 4th Year">B.Tech 4th Year</option>
                  <option value="ICD 1st Year">ICD 1st Year</option>
                  <option value="ICD 2nd Year">ICD 2nd Year</option>
                  <option value="ICD 3rd Year">ICD 3rd Year</option>
                </select>
                {/* Custom Dropdown Chevron */}
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Primary Domain Interest */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs tracking-widest text-slate-400 uppercase flex gap-1">
                Primary Interest <span className="text-blue-500">*</span>
              </label>
              <div className="relative">
                <select required name="domain" defaultValue="" className={`${inputStyles} appearance-none cursor-pointer`}>
                  <option value="" disabled>Select a domain</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="AI / Machine Learning">AI / Machine Learning</option>
                  <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                  <option value="Game Development">Game Development</option>
                </select>
                {/* Custom Dropdown Chevron */}
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Query / Message Field */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                Any Queries? <span className="text-slate-600 normal-case tracking-normal">(Optional)</span>
              </label>
              <textarea 
                name="query" 
                rows="3" 
                className={`${inputStyles} resize-none`} 
                placeholder="Got questions about the club? Let us know here..."
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-8 py-5 font-display text-lg font-bold tracking-wide text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Submit Application 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              )}
            </button>
            
          </form>
        )}
      </div>
    </div>
  );
}