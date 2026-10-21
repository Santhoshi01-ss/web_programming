import React from 'react';
import { Leaf, Award, Heart, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-[#40916C]" />,
      title: "100% Pure Vegetarian",
      desc: "Our kitchens adhere strictly to traditional pure vegetarian practices, with distinct Jain food preparation facilities."
    },
    {
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      title: "A2 Desi Cow Ghee",
      desc: "Every roast, sambar tadka, and sweet is enriched with authentic cultured cow ghee for uncompromised aroma."
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Generational Recipes",
      desc: "Recipes passed down through three generations of master cooks from Udupi, Chettinad, and Awadh."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#2D6A4F]" />,
      title: "Farm-Fresh Daily",
      desc: "Crisp vegetables, fresh paneer, and cold-pressed oils sourced fresh each morning without preservatives."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-50">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                  alt="OHO! Pure Veg Restaurant Warm Interior"
                  className="w-full h-[450px] object-cover"
                />
              </div>

              {/* Inset Secondary Image */}
              <div className="absolute -bottom-8 -right-6 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src="/images/dishes/south_thali.jpg"
                  alt="Authentic Thali Preparation"
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute -top-6 -left-6 bg-[#042F2E] text-white p-5 rounded-2xl shadow-xl border border-yellow-400/40 text-center">
                <span className="font-serif italic text-3xl font-extrabold text-yellow-400">25+</span>
                <p className="text-[11px] uppercase tracking-wider font-bold text-teal-100 mt-1">Years of<br />Culinary Craft</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-teal-800 text-xs font-black uppercase tracking-widest bg-teal-100 px-3.5 py-1.5 rounded-full border border-teal-200">
              The Story of <em className="italic font-serif">OHO!</em>
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#042F2E] leading-tight">
              <em className="italic text-teal-700">OHO!</em> — <span className="italic">An Upbeat, Memorable Expression of High Quality</span>
            </h2>

            <div className="p-4 rounded-2xl bg-teal-50 border-l-4 border-teal-600 text-sm text-[#042F2E] font-serif italic shadow-sm">
              “An upbeat, and memorable expression of high quality”
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Founded on the belief that pure vegetarian dining should be vibrant, joyous, and unforgettable, <strong className="italic font-serif font-black text-[#042F2E]">OHO!</strong> brings you pure culinary mastery crafted with reverence. We combine the warmth of traditional Indian gastronomy with an upbeat, contemporary dining space.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              From our slow-simmered 18-hour Dal Makhani and crispy Golden Ghee Roast Dosas to our ceremonial Kumbakonam Degree Filter Coffee, every plate at <strong className="italic font-serif font-black text-[#042F2E]">OHO!</strong> is an expression of uncompromising quality.
            </p>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F0FDFA] border border-teal-100 hover:border-teal-400 transition-colors">
                  <div className="mb-2">{pillar.icon}</div>
                  <h4 className="font-bold text-sm text-teal-900">{pillar.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick Timing Summary */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span>Open Daily: <strong>7:00 AM – 11:00 PM</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>MG Road, Central Gourmet Boulevard</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
