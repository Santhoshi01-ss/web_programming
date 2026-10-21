import React, { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';

const GALLERY_PHOTOS = [
  {
    id: 1,
    title: "Crispy Mysore Masala Dosa",
    category: "Food",
    src: "/images/dishes/mysore_dosa.jpg",
    caption: "Golden crepe roasted in pure cow ghee with fresh chutneys"
  },
  {
    id: 2,
    title: "Warm Heritage Dining Ambiance",
    category: "Ambiance",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    caption: "Welcoming and modern family-friendly dining interiors"
  },
  {
    id: 3,
    title: "OHO! Royal Grand South Indian Thali",
    category: "Food",
    src: "/images/dishes/south_thali.jpg",
    caption: "Grand banana leaf style platter with 12 traditional delicacies"
  },
  {
    id: 4,
    title: "Kumbakonam Degree Filter Coffee",
    category: "Specialty",
    src: "/images/dishes/filter_coffee.jpg",
    caption: "Decoction brewed fresh in traditional brass dabarah with rich froth"
  },
  {
    id: 5,
    title: "Amritsari Kadhai Paneer Delight",
    category: "Food",
    src: "/images/dishes/kadhai_paneer.jpg",
    caption: "Fresh cottage cheese tossed with bell peppers and whole coriander in iron kadhai"
  },
  {
    id: 6,
    title: "Warm Evening Table Setup",
    category: "Ambiance",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85",
    caption: "Elegant ambient lighting tailored for memorable gatherings"
  },
  {
    id: 7,
    title: "Podi Button Idli",
    category: "Food",
    src: "/images/dishes/podi_idli.jpg",
    caption: "Steamed mini rice cakes coated with gunpowder & pure cow ghee"
  },
  {
    id: 8,
    title: "Sweet Delights & Elaneer Payasam",
    category: "Specialty",
    src: "/images/dishes/elaneer_payasam.jpg",
    caption: "Coastal tender coconut payasam and authentic Indian confections"
  }
];

export default function GallerySection({ onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredPhotos = activeTab === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === activeTab);

  return (
    <section id="gallery" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>Visual Feast</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#042F2E]">
            Moments, Food & Ambiance
          </h2>
          <p className="mt-3 text-gray-600 text-base">
            Take a visual tour through our kitchen craft, aromatic spreads, and serene dining spaces.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {['All', 'Food', 'Ambiance', 'Specialty'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-teal-700 text-yellow-300 shadow-md border border-teal-600'
                    : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(photo, GALLERY_PHOTOS, index)}
              className="group relative rounded-3xl overflow-hidden shadow-md bg-gray-100 aspect-4/3 sm:aspect-square cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 border border-teal-100 hover:border-teal-300"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">
                  {photo.category}
                </span>
                <h3 className="font-serif text-lg font-bold leading-tight mt-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-teal-100 mt-1 line-clamp-1">
                  {photo.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-yellow-300 font-semibold">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
