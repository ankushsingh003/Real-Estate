import React, { useState } from 'react';
import { MapPin, Bed, Bath, Square, Heart, ArrowUpRight, Eye, Users, TrendingUp, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PropertyCard = ({ property, horizontal = false }) => {
  const [liked, setLiked] = useState(false);

  const statusColors = {
    FOR_SALE: 'bg-emerald-500',
    FOR_RENT: 'bg-blue-500',
    SOLD: 'bg-red-500',
    PENDING: 'bg-amber-500',
  };

  const statusLabel = {
    FOR_SALE: 'For Sale',
    FOR_RENT: 'For Rent',
    SOLD: 'Sold',
    PENDING: 'Pending',
  };

  const statusKey = property.status?.toUpperCase().replace(' ', '_') || 'FOR_SALE';
  const statusColor = statusColors[statusKey] || 'bg-primary';
  const statusText = statusLabel[statusKey] || property.status || 'Active';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      <Link
        to={`/property/${property.id}`}
        className={`group block bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:border-slate-200 transition-all duration-500 ${horizontal ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden bg-slate-100 flex-shrink-0 ${horizontal ? 'md:w-[380px] h-[260px]' : 'h-64'}`}>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=800';
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Status badge */}
          <div className={`absolute top-5 left-5 ${statusColor} text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-lg`}>
            {statusText}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className={`absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${liked ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500'}`}
          >
            <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          </button>

          {/* Price */}
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                {property.priceLabel || (statusKey === 'FOR_RENT' ? 'Monthly Rent' : 'Asking Price')}
              </div>
              <div className="text-white font-black text-2xl drop-shadow-lg">
                ${(property.price || 0).toLocaleString()}
                {statusKey === 'FOR_RENT' && <span className="text-sm font-bold text-white/80">/mo</span>}
              </div>
            </div>
            {property.bidCount > 0 && (
              <div className="bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <TrendingUp size={12} />
                {property.bidCount} bids
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-7 flex-1 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                {property.title}
              </h3>
              <ArrowUpRight
                size={18}
                className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5"
              />
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin size={14} className="text-primary flex-shrink-0" />
              <span className="line-clamp-1 font-medium">{property.location}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 py-4 border-t border-slate-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-sm mb-0.5">
                <Bed size={15} className="text-primary" />
                <span>{property.beds || '—'}</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Beds</div>
            </div>
            <div className="text-center border-x border-slate-100">
              <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-sm mb-0.5">
                <Bath size={15} className="text-primary" />
                <span>{property.baths || '—'}</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Baths</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-sm mb-0.5">
                <Square size={15} className="text-primary" />
                <span>{property.sqft ? property.sqft.toLocaleString() : '—'}</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Sq Ft</div>
            </div>
          </div>

          {/* Bottom meta */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              {property.views > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                  <Eye size={13} />
                  <span>{property.views.toLocaleString()} views</span>
                </div>
              )}
              {property.interestedCount > 0 && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                  <Users size={13} />
                  <span>{property.interestedCount} interested</span>
                </div>
              )}
            </div>
            {property.propertyType && (
              <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-full">
                <Tag size={10} />
                {property.propertyType}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
