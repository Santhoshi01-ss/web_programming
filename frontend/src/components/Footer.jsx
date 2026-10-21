import React from 'react';
import { Heart, ShieldCheck, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Footer({ onNavClick, onOpenAdmin }) {
  return (
    <footer className="bg-[#042F2E] text-teal-100 border-t border-teal-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-teal-500/20">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-yellow-400 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#042F2E] rounded-[13px] flex items-center justify-center border border-yellow-400/40">
                  <span className="font-serif italic font-black text-lg text-yellow-400">OHO!</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-3xl font-black tracking-wider text-white">OHO!</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#16A34A] text-white uppercase">Veg</span>
                </div>
                <p className="text-[10px] text-yellow-400 tracking-widest uppercase font-bold">House of High Quality Flavours</p>
              </div>
            </div>

            {/* The requested Quote in italic */}
            <p className="text-xs text-yellow-300 italic leading-relaxed font-serif">
              “An upbeat, and memorable expression of high quality”
            </p>

            <p className="text-xs text-teal-200 leading-relaxed max-w-sm">
              Celebrating authentic Indian pure vegetarian gastronomy. Prepared with pure A2 cow ghee, stone-ground spices, and joyous warmth.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="veg-badge"><span className="veg-badge-dot"></span></span>
              <span className="text-xs font-semibold text-[#16A34A]">100% Pure Vegetarian Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-serif">Explore</h4>
            <ul className="space-y-2 text-xs">
              {['home', 'menu', 'about', 'gallery', 'reservations', 'contact'].map(link => (
                <li key={link}>
                  <button
                    onClick={() => onNavClick(link)}
                    className="hover:text-yellow-400 transition-colors capitalize cursor-pointer font-medium"
                  >
                    {link === 'reservations' ? 'Book a Table' : link.replace('_', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-serif">Hours of Hospitality</h4>
            <div className="space-y-1.5 text-teal-200">
              <p><strong className="text-white">Breakfast:</strong> 7:00 AM – 11:30 AM</p>
              <p><strong className="text-white">Lunch:</strong> 12:00 PM – 3:45 PM</p>
              <p><strong className="text-white">Dinner:</strong> 7:00 PM – 11:00 PM</p>
              <p className="text-yellow-400 pt-1 font-semibold">Open 7 Days a Week, 365 Days</p>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-serif">Reach Out</h4>
            <div className="space-y-2 text-teal-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>#42, 100 Feet Gourmet Boulevard, MG Road, Bengaluru</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>dine@ohoveg.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-teal-300 gap-4">
          <p>© {new Date().getFullYear()} <em className="italic font-serif">OHO!</em> Veg Restaurant. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenAdmin}
              className="hover:text-yellow-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>Admin & Staff Portal</span>
            </button>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Pure Food Lovers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
