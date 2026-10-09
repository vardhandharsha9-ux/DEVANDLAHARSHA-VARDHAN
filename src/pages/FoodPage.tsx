import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Search,
  Star,
  Clock,
  Plus,
  ShoppingBag,
  Filter,
  Check,
  MapPin,
  Phone,
  Flame,
} from 'lucide-react';
import { FOOD_ITEMS, RESTAURANTS } from '../data/mockData';
import { FoodItem } from '../types';

export const FoodPage: React.FC = () => {
  const { addToCart, cartCount, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'South Indian',
    'North Indian',
    'Desserts',
  ];

  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      if (vegOnly && !item.isVeg) return false;
      if (activeCategory !== 'All') {
        if (activeCategory === 'South Indian' && !item.category.includes('Breakfast') && !item.name.toLowerCase().includes('dosa') && !item.name.toLowerCase().includes('meals') && !item.name.toLowerCase().includes('coffee')) {
          return false;
        } else if (activeCategory === 'North Indian' && !item.name.toLowerCase().includes('paneer') && !item.name.toLowerCase().includes('naan')) {
          return false;
        } else if (item.category !== activeCategory && activeCategory !== 'South Indian' && activeCategory !== 'North Indian') {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.restaurantName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, vegOnly, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
          Authentic Regional Dining
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
          Local Culinary Experience
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Order authentic Tirupati Ghee Roast Dosas, Royal Andhra Thalis, Hyderabadi Biryanis, and degree filter coffee delivered directly to your hotel room.
        </p>
      </div>

      {/* Featured Restaurants Row */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
          Top Rated Partner Kitchens in Tirupati
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RESTAURANTS.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <img
                src={r.imageUrl}
                alt={r.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{r.name}</h4>
                </div>
                <p className="text-xs text-slate-500 truncate">{r.cuisine.join(', ')}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {r.rating}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-700 font-medium">🕒 {r.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Search and Categories */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dosa, thali, biryani, coffee..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>Pure Veg Only</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold shadow-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <span className="text-slate-800">{item.isVeg ? 'Vegetarian' : 'Non-Veg'}</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{item.rating}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {item.restaurantName}
                </span>
                <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-bold">Price</span>
                  <span className="text-lg font-black text-slate-900">₹{item.price}</span>
                </div>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
