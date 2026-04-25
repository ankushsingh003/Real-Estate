import React from 'react';
import { MapPin, Bed, Bath, Square, Heart, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PropertyCard = ({ property, horizontal = false }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link 
        to={`/property/${property.id}`} 
        className={`group bg-white rounded-[2.5rem] overflow-hidden border border-border/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex ${horizontal ? 'flex-col md:flex-row' : 'flex-col'}`}
      >
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-slate-100 ${horizontal ? 'md:w-[400px] h-[300px]' : 'h-72'}`}>
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=800";
            }}
          />
          
          {/* Status Badge */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-primary uppercase tracking-widest shadow-sm border border-white/20">
              {property.type}
            </div>
            {property.status === 'SOLD' && (
              <div className="bg-red-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-lg">
                Closed Deal
              </div>
            )}
          </div>

          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex-center text-white hover:bg-white hover:text-red-500 transition-all border border-white/20 shadow-xl group/fav"
          >
            <Heart size={20} className="group-hover/fav:fill-current" />
          </button>

          <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl font-bold text-xl shadow-2xl border border-white/10">
            ${(property.price || 0).toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1 flex-1 pr-4">
                {property.title}
              </h3>
              <ArrowUpRight size={20} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-8 font-medium">
              <div className="w-8 h-[1px] bg-border group-hover:w-12 group-hover:bg-primary transition-all"></div>
              <MapPin size={16} className="shrink-0" />
              <span className="text-sm line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Bed size={18} className="text-primary" />
                <span>{property.beds}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Beds</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-border/40 pl-4">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Bath size={18} className="text-primary" />
                <span>{property.baths}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Baths</span>
            </div>
            <div className="flex flex-col gap-1 border-l border-border/40 pl-4">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Square size={18} className="text-primary" />
                <span>{property.sqft}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Sq Ft</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
