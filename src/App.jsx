import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Domains from './components/Domains';
import Team from './components/Team';
import Events from './components/Events';
import Footer from './components/Footer';
import Join from './components/Join'; 

// 1. Import your Logo
import Logo from './assets/logo2-removebg-preview.png';

// 2. ✏️ IMPORT YOUR BACKGROUND IMAGE HERE
// Replace 'your-background.jpg' with the actual name of the image file in your assets folder!
import HeroBg from './assets/background.jpg';
import JoinBg from './assets/Bg2.jpg'; 


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Navbar logoSrc={Logo} />
      <Hero logoSrc={Logo} />
      <About />
      <Domains />
      <Team />
      <Events />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* 3. Pass the imported image to the Join component */}
        <Route path="/join" element={<Join bgImage={JoinBg} />} />
      </Routes>
    </Router>
  );
}