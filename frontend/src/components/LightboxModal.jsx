import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ photo, allPhotos, currentIndex, onClose, onPrev, onNext }) {
  if (!photo) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in-up"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Main Image Container */}
      <div 
        className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
        />

        <div className="mt-4 text-center text-white">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
            {photo.category} • {currentIndex + 1} of {allPhotos.length}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
            {photo.title}
          </h3>
          <p className="text-sm text-gray-300 mt-1 max-w-xl mx-auto">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
