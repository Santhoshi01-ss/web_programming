import React from 'react';
import { Sparkles, Calendar, ArrowRight, Star, Award, HeartHandshake, Quote } from 'lucide-react';

export default function Hero({ onExploreMenu, onBookTable }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-[#042F2E] via-[#083344] to-[#F8FAFC]">
      {/* Background Decorative Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-teal-500/20 to-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-md mb-6">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>Pure Vegetarian Gastronomy</span>
        </div>

        {/* RESTAURANT NAME CENTERED */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <h1 className="font-serif italic text-6xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-yellow-300 to-yellow-500 tracking-tight drop-shadow-md">
              OHO!
            </h1>
            <span className="self-start mt-2 px-2.5 py-1 rounded-full text-xs font-black bg-[#16A34A] text-white tracking-widest uppercase shadow-lg">
              VEG
            </span>
          </div>

          {/* THE REQUESTED QUOTE IN ITALIC */}
          <div className="relative my-4 max-w-2xl mx-auto px-6 py-4 rounded-3xl bg-teal-900/40 backdrop-blur-md border border-yellow-400/30 shadow-2xl">
            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-yellow-300 font-semibold leading-relaxed tracking-wide">
              “An upbeat, and memorable expression of high quality”
            </p>
          </div>

          <p className="text-teal-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Welcome to <em className="italic font-serif font-black text-yellow-400">OHO!</em> — A sensory celebration of pure vegetarian South & North Indian culinary artistry, crafted with stone-ground spices, organic ghee, and joyous hospitality.
          </p>
        </div>

        {/* Centered CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-teal-600 via-teal-500 to-yellow-500 hover:from-teal-700 hover:to-yellow-600 text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-5 h-5 text-yellow-200" />
          </button>

          <button
            onClick={onBookTable}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-base transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-yellow-400" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Centered Showcase Photo with Badges */}
        <div className="mt-14 max-w-3xl mx-auto relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-500/30 relative transform hover:scale-[1.01] transition-all duration-500">
            <img
              src="/images/dishes/mysore_dosa.jpg"
              alt="OHO! Signature Mysore Ghee Roast Dosa"
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-black/20"></div>

            {/* Bottom floating dish banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-teal-950/80 backdrop-blur-md p-4 rounded-2xl border border-teal-500/30 text-white flex items-center justify-between">
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="veg-badge"><span className="veg-badge-dot"></span></span>
                  <h4 className="font-serif italic font-bold text-base sm:text-lg text-white">OHO! Signature Mysore Ghee Roast</h4>
                </div>
                <p className="text-xs text-teal-200">Crispy golden crepe with gunpowder podi roasted in cultured cow ghee</p>
              </div>
              <span className="text-yellow-400 font-black text-xl font-serif italic">₹145</span>
            </div>
          </div>

          {/* Floating High-Quality Badges */}
          <div className="absolute -top-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-teal-500/20 flex items-center gap-2 text-left animate-float">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <div>
              <p className="text-xs font-black text-[#042F2E]">4.9 / 5 Rating</p>
              <p className="text-[10px] text-teal-700">2,500+ Happy Foodies</p>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 sm:right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-teal-500/20 flex items-center gap-2 text-left animate-float">
            <Award className="w-4 h-4 text-teal-600" />
            <div>
              <p className="text-xs font-black text-[#042F2E]">Pure Desi Ghee</p>
              <p className="text-[10px] text-teal-700">Generational Craft</p>
            </div>
          </div>
        </div>

        {/* Highlights row */}
        <div className="pt-12 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-white font-black text-lg block">100%</span>
            <p className="text-xs text-teal-200">Pure Vegetarian</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-yellow-400 font-black text-lg block italic font-serif">Upbeat</span>
            <p className="text-xs text-teal-200">Dining Atmosphere</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-teal-300 font-black text-lg block italic font-serif">High Quality</span>
            <p className="text-xs text-teal-200">Fresh Ingredients</p>
          </div>
        </div>

      </div>
    </section>
  );
}
