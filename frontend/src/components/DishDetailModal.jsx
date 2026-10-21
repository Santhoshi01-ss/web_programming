import React from 'react';
import { X, Flame, Star, Calendar, Check } from 'lucide-react';

export default function DishDetailModal({ dish, onClose, onBookTable }) {
  if (!dish) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in-up"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 bg-gray-100">
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="veg-badge shadow"><span className="veg-badge-dot"></span></span>
            {dish.is_chef_special && (
              <span className="bg-yellow-400 text-teal-950 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                Chef's Signature
              </span>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {dish.category.replace('_', ' ')}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#042F2E] mt-0.5">
                {dish.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif italic text-2xl font-extrabold text-teal-800">
                ₹{dish.price}
              </span>
              <p className="text-[10px] text-gray-400">Taxes incl.</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {dish.description}
          </p>

          {/* Attributes */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Spice Intensity</span>
              <div className="flex items-center gap-1 text-sm font-semibold text-gray-800 mt-0.5">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="capitalize">{dish.spice_level || "Medium"}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Dietary Standard</span>
              <div className="flex items-center gap-1 text-sm font-semibold text-emerald-800 mt-0.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{dish.dietary || "100% Pure Veg"}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-teal-700 via-teal-600 to-yellow-500 hover:from-teal-800 hover:to-yellow-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-yellow-200" />
              <span>Book Table for this Dish</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
