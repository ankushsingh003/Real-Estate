import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern Minimalist Villa",
      location: "Beverly Hills, CA",
      price: 2500000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "For Sale",
      query: "modern-villa"
    },
    {
      id: 2,
      title: "Luxury Penthouse Suite",
      location: "Manhattan, NY",
      price: 1800000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      type: "For Rent",
      query: "penthouse-luxury"
    },
    {
      id: 3,
      title: "Oceanview Contemporary",
      location: "Malibu, CA",
      price: 4200000,
      beds: 5,
      baths: 4,
      sqft: 4500,
      type: "For Sale",
      query: "contemporary-house-ocean"
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // High-resolution architectural photography links
    const images = [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200", // Villa
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", // Penthouse
      "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200"  // Contemporary
    ];

    const updatedProperties = properties.map((prop, index) => ({
      ...prop,
      image: images[index]
    }));
    
    const timer = setTimeout(() => {
      setProperties(updatedProperties);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Cinematic Branded Hero Section */}
      <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Advanced Gradient Layering */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687940-477a128f0a85?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Home" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          {/* Multi-layered overlays for depth */}
          <div className="absolute inset-0 bg-neutral-950/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/40 via-transparent to-neutral-950/40"></div>
        </div>

        {/* Hero Content - Refined LuxeEstate Layout */}
        <div className="container relative z-10 text-center text-white animate-fade-in px-6">
          <div className="flex-center flex-col gap-4 mb-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              <Sparkles className="text-primary" size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                The Luxury Collection 2024
              </span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif italic leading-[0.9] drop-shadow-2xl">
              Elevate Your <br/> 
              <span className="text-white">Perspective.</span>
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto mb-16">
            <p className="text-lg md:text-xl font-medium text-white/80 leading-relaxed text-balance">
              Discover architectural masterpieces in the world's most prestigious zip codes.
            </p>
          </div>

          {/* LuxeEstate Signature Search - Rounded & Floating */}
          <div className="max-w-5xl mx-auto relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
            <div className="relative flex flex-col md:flex-row items-center gap-4 p-3 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl">
              <div className="flex-1 flex items-center gap-4 px-6 w-full">
                <MapPin className="text-primary shrink-0" size={24} />
                <input 
                  type="text" 
                  placeholder="Enter a city, neighborhood, or specific villa..." 
                  className="w-full bg-transparent text-white placeholder:text-white/60 py-5 text-lg outline-none font-medium"
                />
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden md:block"></div>
              <div className="flex-1 hidden md:flex items-center gap-4 px-6">
                <ShieldCheck className="text-primary shrink-0" size={24} />
                <span className="text-white/60 font-medium truncate">Verified Luxury Listings Only</span>
              </div>
              <button className="w-full md:w-auto bg-primary text-white pl-8 pr-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all">
                <Search size={20} />
                Search Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
              <div className="w-8 h-[2px] bg-primary"></div>
              Curated Selection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Extraordinary Estates</h2>
            <p className="text-muted-foreground text-lg">Handpicked luxury listings that offer the best in comfort, design, and location.</p>
          </div>
          <Link to="/properties" className="group bg-white border-2 border-border px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 shadow-sm hover:shadow-xl">
            View All Properties <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-[450px] bg-muted rounded-[2.5rem] animate-pulse"></div>
            ))
          ) : (
            properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
