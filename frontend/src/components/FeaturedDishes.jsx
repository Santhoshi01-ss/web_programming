import React from 'react';
import { Star, Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedDishes({ dishes, onSelectDish, onExploreFullMenu }) {
  // Take up to 6 featured items
  const featured = dishes.filter(d => d.is_featured).slice(0, 6);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            <span>Chef's Handpicked Specials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#042F2E] tracking-tight">
            Our Signature Creations
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Time-honored recipes perfected with vibrant flavours. Every preparation is crafted with pure ingredients, authentic ghee, and high-quality passion.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((dish) => (
            <div
              key={dish.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col border border-teal-100 hover:border-teal-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => onSelectDish && onSelectDish(dish)}
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <img
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="veg-badge shadow"><span className="veg-badge-dot"></span></span>
                  {dish.is_chef_special && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-yellow-400 text-teal-950 shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Special
                    </span>
                  )}
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-4 right-4 bg-teal-700 text-yellow-300 px-3.5 py-1 rounded-full text-base font-black font-serif italic shadow-lg border border-teal-600">
                  ₹{dish.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      {dish.category.replace('_', ' ')}
                    </span>
                    {dish.spice_level && (
                      <span className="text-xs text-amber-700 font-semibold flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                        <span className="capitalize">{dish.spice_level}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#042F2E] group-hover:text-teal-700 transition-colors line-clamp-1">
                    {dish.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium text-[#16A34A]">{dish.dietary || "Pure Veg"}</span>
                  <span className="text-teal-700 font-bold flex items-center gap-1 group-hover:translate-x-1 group-hover:text-yellow-600 transition-transform">
                    View Details &rarr;
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={onExploreFullMenu}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-700 via-teal-600 to-yellow-500 hover:from-teal-800 hover:to-yellow-600 text-white font-bold text-base shadow-lg transition-all cursor-pointer"
          >
            <span>Explore Complete Interactive Menu</span>
            <ArrowRight className="w-5 h-5 text-yellow-200" />
          </button>
        </div>

      </div>
    </section>
  );
}
