import React from 'react';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000";
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
          {property.type}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex-center text-muted-foreground hover:text-red-500 transition-colors shadow-sm">
          <Heart size={20} />
        </button>
        <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-lg">
          ${property.price.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground mb-4 text-sm">
          <MapPin size={16} className="shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="flex items-center gap-1 text-foreground font-medium">
            <Bed size={18} className="text-primary" />
            <span>{property.beds} <span className="text-xs text-muted-foreground">Beds</span></span>
          </div>
          <div className="flex items-center gap-1 text-foreground font-medium">
            <Bath size={18} className="text-primary" />
            <span>{property.baths} <span className="text-xs text-muted-foreground">Baths</span></span>
          </div>
          <div className="flex items-center gap-1 text-foreground font-medium">
            <Square size={18} className="text-primary" />
            <span>{property.sqft} <span className="text-xs text-muted-foreground">sqft</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
