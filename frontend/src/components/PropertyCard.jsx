import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, ArrowUpRight, TrendingUp, Users } from 'lucide-react';

const PropertyCard = ({ property, horizontal = false }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative ${horizontal ? 'flex flex-col md:flex-row' : ''}`}
    >
      {/* Favorite Button */}
      <button className="absolute top-6 right-6 z-20 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300">
        <Heart size={18} />
      </button>

      {/* Image Container */}
      <div className={`relative overflow-hidden bg-slate-200 ${horizontal ? 'md:w-2/5 aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'}`}>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=800'; }}
        />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
            {property.status}
          </div>
          {property.newListing && (
            <div className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <TrendingUp size={12} /> New Listing
            </div>
          )}
        </div>

        {/* Floating Price Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-3xl text-white">
            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
              {property.priceLabel || 'Current Price'}
            </div>
            <div className="text-2xl font-black">
              ${property.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-8 flex flex-col justify-between ${horizontal ? 'md:w-3/5' : ''}`}>
        <div>
          <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-[0.3em] mb-3">
            <div className="w-6 h-[1.5px] bg-primary" />
            {property.propertyType || 'Residential'}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-6">
            <MapPin size={14} className="text-primary flex-shrink-0" />
            <span className="truncate font-medium">{property.location}</span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-50 mb-6">
            {[
              { icon: <Bed size={16} />, value: property.beds, label: 'Beds' },
              { icon: <Bath size={16} />, value: property.baths, label: 'Baths' },
              { icon: <Square size={16} />, value: property.sqft ? `${Math.round(property.sqft/1000)}k` : '—', label: 'Sqft' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-slate-400 group-hover:text-primary transition-colors">{stat.icon}</div>
                <div className="text-sm font-black text-slate-800">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users size={14} />
              <span className="text-[11px] font-bold">{property.interestedCount || 12}</span>
            </div>
            {property.bidCount > 0 && (
              <div className="flex items-center gap-1.5 text-emerald-500">
                <TrendingUp size={14} />
                <span className="text-[11px] font-bold">{property.bidCount} Bids</span>
              </div>
            )}
          </div>

          <Link
            to={`/property/${property.id}`}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-lg hover:shadow-primary/30"
          >
            Details <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
