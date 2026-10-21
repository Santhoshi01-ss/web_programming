import React, { useState } from 'react';
import { Search, Flame, Star, Coffee, Sparkles, Filter, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'south_indian', label: 'South Indian' },
  { id: 'north_indian', label: 'North Indian' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'desserts', label: 'Desserts' },
];

export default function MenuSection({ dishes, onSelectDish }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlySpecials, setOnlySpecials] = useState(false);

  // Filter dishes
  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (dish.description && dish.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecial = !onlySpecials || dish.is_chef_special || dish.is_featured;
    return matchesCategory && matchesSearch && matchesSpecial;
  });

  return (
    <section id="menu" className="py-24 bg-[#F0FDFA]/60 border-t border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-teal-800 text-xs font-black uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-teal-200 shadow-sm">
            Curated Vegetarian Gastronomy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#042F2E] mt-4">
            Our Interactive Menu
          </h2>
          <p className="mt-3 text-gray-600 text-base">
            From crispy morning tiffins to royal dinner delicacies, explore our high-quality pure vegetarian offerings.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-teal-100 mb-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search dishes (e.g., Poori, Dosa, Paneer)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Toggle for Specials */}
            <button
              onClick={() => setOnlySpecials(!onlySpecials)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border cursor-pointer ${
                onlySpecials
                  ? 'bg-gradient-to-r from-teal-700 via-teal-600 to-yellow-500 text-white border-transparent shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${onlySpecials ? 'text-yellow-200' : 'text-teal-600'}`} />
              <span>Chef's Specials Only</span>
            </button>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar border-t border-gray-100 mt-5">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-teal-700 text-yellow-300 shadow-md border border-teal-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6 px-2">
          <span>Showing <strong className="text-teal-700">{filteredDishes.length}</strong> high quality dishes</span>
          {activeCategory !== 'all' && (
            <button 
              onClick={() => setActiveCategory('all')}
              className="text-teal-700 hover:underline font-bold text-xs cursor-pointer"
            >
              Reset category filter
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-700">No dishes match your search</h3>
            <p className="text-sm text-gray-500 mt-1">Try another keyword or category filter</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('all'); setOnlySpecials(false); }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-teal-100 hover:border-teal-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
                onClick={() => onSelectDish(dish)}
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="veg-badge shadow"><span className="veg-badge-dot"></span></span>
                      {dish.is_chef_special && (
                        <span className="bg-yellow-400 text-teal-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                          Chef's Special
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-teal-700 text-yellow-300 font-black font-serif italic text-sm px-3 py-1 rounded-lg shadow border border-teal-600">
                      ₹{dish.price}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                      {dish.category.replace('_', ' ')}
                    </span>
                    {dish.spice_level && (
                      <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-500" />
                        <span className="capitalize">{dish.spice_level}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#042F2E] group-hover:text-teal-700 transition-colors">
                    {dish.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">{dish.dietary}</span>
                  <span className="font-bold text-teal-700 group-hover:text-yellow-600 group-hover:translate-x-1 transition-transform">
                    View Details &rarr;
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
