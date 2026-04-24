import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, Share2, ChevronLeft, ChevronRight, CheckCircle2, User, Phone, Mail, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Expanded mock data with detailed gallery
  const property = {
    id: id,
    title: "Modern Minimalist Villa",
    location: "Beverly Hills, CA",
    price: 2500000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "For Sale",
    description: "Experience the pinnacle of modern living in this stunning minimalist villa. Featuring clean lines, expansive floor-to-ceiling windows, and a seamless indoor-outdoor flow, this home is a masterpiece of contemporary architecture. The open-concept living area boasts high ceilings with custom architectural lighting, while the chef's kitchen is equipped with state-of-the-art appliances and custom cabinetry.",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200", // Exterior
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=1200", // Living Room
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1200", // Kitchen
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200", // Bedroom
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200", // Bathroom
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200", // Ceiling/Detail
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200"  // Balcony/View
    ],
    features: ["Smart Home System", "Wine Cellar", "Infinity Pool", "Home Cinema", "Solar Panels", "Gated Security", "Guest House", "Electric Car Charger"],
    agent: {
      name: "Alexander Pierce",
      role: "Luxury Real Estate Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      phone: "+1 (555) 123-4567"
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex-center flex-col gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground font-medium">Loading premium details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-between mb-8">
          <Link to="/properties" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
            <ChevronLeft size={20} /> Back to Listings
          </Link>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full glass flex-center text-foreground hover:text-primary transition-all">
              <Share2 size={20} />
            </button>
            <button className="w-10 h-10 rounded-full glass flex-center text-foreground hover:text-red-500 transition-all">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Large Image */}
          <div className="lg:col-span-8 group relative rounded-[2.5rem] overflow-hidden aspect-[16/9] shadow-2xl">
            <img 
              src={property.gallery[activeImage]} 
              alt={property.title} 
              className="w-full h-full object-cover animate-fade-in transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-6 left-8 text-white">
              <span className="bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">
                {activeImage === 0 ? "Exterior" : activeImage === 3 ? "Master Suite" : activeImage === 4 ? "Designer Bath" : "Premium Detail"}
              </span>
            </div>
          </div>

          {/* Thumbnails Sidebar */}
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-4 h-full">
            {property.gallery.slice(1, 7).map((img, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${activeImage === idx + 1 ? 'ring-4 ring-primary ring-offset-4' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => setActiveImage(idx + 1)}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
            {/* View More Placeholder */}
            <div className="relative rounded-3xl overflow-hidden glass flex-center flex-col gap-1 text-primary font-bold cursor-pointer hover:bg-primary/5 transition-all aspect-square border-2 border-dashed border-primary/30">
              <Plus size={24} />
              <span className="text-xs">Gallery</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground text-lg">
                <MapPin size={22} className="text-primary" />
                {property.location}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass rounded-[2.5rem]">
              <div className="text-center md:border-r border-border last:border-0">
                <div className="text-primary mb-2 flex-center"><Bed size={24} /></div>
                <div className="font-bold text-xl">{property.beds}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Beds</div>
              </div>
              <div className="text-center md:border-r border-border last:border-0">
                <div className="text-primary mb-2 flex-center"><Bath size={24} /></div>
                <div className="font-bold text-xl">{property.baths}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Baths</div>
              </div>
              <div className="text-center md:border-r border-border last:border-0">
                <div className="text-primary mb-2 flex-center"><Square size={24} /></div>
                <div className="font-bold text-xl">{property.sqft}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Sqft</div>
              </div>
              <div className="text-center">
                <div className="text-primary mb-2 flex-center"><CheckCircle2 size={24} /></div>
                <div className="font-bold text-xl">Active</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Status</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Property Description</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-8">
            {/* Price & Book Section */}
            <div className="glass p-8 rounded-[2.5rem] shadow-xl sticky top-32">
              <div className="mb-6">
                <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest block mb-2">Asking Price</span>
                <div className="text-4xl font-black text-primary">${property.price.toLocaleString()}</div>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all">
                  Book a Virtual Tour
                </button>
                <button className="w-full bg-white border-2 border-border py-4 rounded-2xl font-bold hover:bg-muted transition-all">
                  Request Information
                </button>
              </div>

              {/* Agent Card */}
              <div className="pt-8 border-t border-border">
                <div className="flex items-center gap-4 mb-6">
                  <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <div className="font-bold text-lg">{property.agent.name}</div>
                    <div className="text-primary text-sm font-medium">{property.agent.role}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone size={18} className="text-primary" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={18} className="text-primary" />
                    <span>alexander@luxeestate.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default PropertyDetails;
