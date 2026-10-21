import React, { useState, useEffect } from 'react';
import { Calendar, Menu as MenuIcon, X, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, isAdminLoggedIn, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Us' },
  ];

  const rightNavLinks = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#042F2E]/95 backdrop-blur-md shadow-xl py-2.5 text-white border-b border-teal-500/30' 
        : 'bg-[#042F2E] py-3.5 text-white shadow-lg border-b border-teal-500/20'
    }`}>
      {/* Top micro quote announcement ticker */}
      <div className="bg-gradient-to-r from-teal-800 via-yellow-400 to-teal-800 text-[#042F2E] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-center py-1 px-4">
        <span className="italic font-serif">“An upbeat, and memorable expression of high quality”</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-start">
            {leftNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activePage === link.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-teal-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CENTER: RESTAURANT NAME OHO! */}
          <div className="flex-1 flex justify-center py-1">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex flex-col items-center text-center group focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-yellow-400 to-teal-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#042F2E] rounded-[14px] flex items-center justify-center border border-yellow-400/40">
                    <span className="font-serif italic font-black text-lg text-yellow-400 tracking-tight">OHO!</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif italic text-3xl font-black tracking-wider text-white">OHO!</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#16A34A] text-white uppercase tracking-wider">Veg</span>
                  </div>
                  <p className="text-[9px] text-yellow-400 tracking-widest uppercase font-bold">High Quality Dining</p>
                </div>
              </div>
            </button>
          </div>

          {/* Right Desktop Nav Links & Action CTAs */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-end gap-2">
            {rightNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activePage === link.id
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-teal-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('reservations')}
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-500 hover:from-teal-700 hover:to-yellow-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-yellow-200" />
              <span>Book Table</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              title="Admin Dashboard"
              className={`p-2 rounded-full transition-all border cursor-pointer ${
                isAdminLoggedIn
                  ? 'bg-yellow-400 border-yellow-300 text-[#042F2E]'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-teal-100 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-xl bg-white/10 text-teal-100"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042F2E] border-t border-teal-500/20 px-4 pt-3 pb-6 space-y-2 animate-fade-in-up">
          <div className="text-center py-2 border-b border-teal-500/20 mb-2">
            <span className="font-serif italic text-2xl font-black text-yellow-400">OHO!</span>
            <p className="text-[10px] text-teal-200 italic">“An upbeat, and memorable expression of high quality”</p>
          </div>
          {[...leftNavLinks, ...rightNavLinks].map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider ${
                activePage === link.id
                  ? 'bg-teal-600 text-white'
                  : 'text-teal-100 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('reservations')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-500 text-white font-bold text-sm shadow-lg"
            >
              <Calendar className="w-4 h-4 text-yellow-200" />
              <span>Book a Table Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
