import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart, Share2, ChevronLeft, ChevronRight, CheckCircle2, User, Phone, Mail, Loader2 } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [agent, setAgent] = useState({
    name: "Alexander Pierce",
    role: "Luxury Real Estate Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    phone: "+1 (555) 123-4567",
    email: "alexander@luxeestate.com"
  });

  // Property Data
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
    features: ["Smart Home System", "Wine Cellar", "Infinity Pool", "Home Cinema", "Solar Panels", "Gated Security", "Guest House", "Electric Car Charger"]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchAgent = async () => {
      try {
        const res = await fetch('https://randomuser.me/api/');
        const data = await res.json();
        const user = data.results[0];
        setAgent({
          name: `${user.name.first} ${user.name.last}`,
          role: parseInt(id) % 2 === 0 ? "Senior Partner" : "Luxury Specialist",
          image: user.picture.large,
          phone: user.cell,
          email: `${user.name.first.toLowerCase()}@luxeestate.com`
        });
      } catch (err) {
        console.log("Failed to fetch agent");
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

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
            <div className="relative rounded-3xl overflow-hidden glass flex-center flex-col gap-1 text-primary font-bold cursor-pointer hover:bg-primary/5 transition-all aspect-square border-2 border-dashed border-primary/30">
              <Plus size={24} />
              <span className="text-xs">Gallery</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-5xl font-bold mb-4 leading-tight">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground text-lg">
                <MapPin size={22} className="text-primary" />
                {property.location}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Bed size={24} />, label: "Beds", value: property.beds },
                { icon: <Bath size={24} />, label: "Baths", value: property.baths },
                { icon: <Square size={24} />, label: "Sqft", value: property.sqft },
                { icon: <CheckCircle2 size={24} />, label: "Status", value: "Active" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-muted/30 border border-border/50 p-6 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                  <div className="text-primary bg-primary/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="glass p-10 rounded-[2.5rem] space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  Property Description
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              <div className="glass p-10 rounded-[2.5rem] space-y-8 overflow-hidden">
                <div className="flex flex-between items-center pr-4">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                    Key Features & Amenities
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const slider = document.getElementById('amenities-slider');
                        slider.scrollBy({ left: -300, behavior: 'smooth' });
                      }}
                      className="w-10 h-10 rounded-full border border-border flex-center text-muted-foreground hover:border-primary hover:text-primary transition-all active:scale-90"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={() => {
                        const slider = document.getElementById('amenities-slider');
                        slider.scrollBy({ left: 300, behavior: 'smooth' });
                      }}
                      className="w-10 h-10 rounded-full border border-primary/30 flex-center text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                <div id="amenities-slider" className="flex gap-4 overflow-x-auto pb-4 pr-10 scrollbar-hide snap-x scroll-smooth">
                  {property.features.map(feature => (
                    <div key={feature} className="flex-none w-[280px] flex items-center gap-4 p-6 bg-muted/20 border border-border/30 rounded-[2.5rem] hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all group snap-start">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="font-bold text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
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

              <div className="pt-8 border-t border-border">
                <div className="flex items-center gap-4 mb-6">
                  <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <div className="font-bold text-lg">{agent.name}</div>
                    <div className="text-primary text-sm font-medium">{agent.role}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone size={18} className="text-primary" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={18} className="text-primary" />
                    <span className="truncate">{agent.email}</span>
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
