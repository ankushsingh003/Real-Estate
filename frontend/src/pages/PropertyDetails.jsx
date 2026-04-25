import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Square, Heart, Share2, 
  ChevronLeft, ChevronRight, CheckCircle2, 
  Phone, Mail, Loader2, Calendar, ShieldCheck, 
  MessageSquare, Clock, ArrowUpRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [agent, setAgent] = useState({
    name: "Alexander Pierce",
    role: "Luxury Real Estate Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    phone: "+1 (555) 123-4567",
    email: "alexander@luxeestate.com"
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property and would like to learn more.'
  });

  // Property Data (In a real app, this would be fetched from /api/properties/:id)
  const property = {
    id: id,
    title: "Modern Minimalist Villa",
    location: "Beverly Hills, CA",
    price: 2500000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "For Sale",
    yearBuilt: 2023,
    parking: "2 Cars",
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

  const similarProperties = [
    { id: 101, title: "Glass Mansion", price: 3800000, location: "Bel Air, CA", beds: 5, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" },
    { id: 102, title: "Contemporary Loft", price: 1200000, location: "Downtown, LA", beds: 2, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600" },
    { id: 103, title: "Nordic Retreat", price: 2100000, location: "Malibu, CA", beds: 3, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600" }
  ];

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
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchAgent();
  }, [id]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent to " + agent.name);
    setContactForm({ ...contactForm, name: '', email: '', phone: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex-center flex-col gap-6">
        <div className="relative">
          <Loader2 className="animate-spin text-primary" size={64} />
          <div className="absolute inset-0 flex-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-serif italic text-foreground mb-2">LuxeEstate</p>
          <p className="text-muted-foreground font-medium animate-pulse">Curating your premium experience...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container">
        {/* Header Navigation */}
        <div className="flex flex-between items-center mb-8">
          <Link to="/properties" className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all font-bold text-sm uppercase tracking-widest">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Listings
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white hover:text-primary transition-all font-bold text-xs uppercase tracking-widest">
              <Share2 size={16} /> Share
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl glass transition-all font-bold text-xs uppercase tracking-widest ${isLiked ? 'text-red-500 bg-red-50' : 'hover:text-red-500'}`}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {isLiked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Dynamic Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <motion.div 
            layoutId="main-image"
            className="lg:col-span-8 relative rounded-[3rem] overflow-hidden aspect-[16/9] shadow-2xl group"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={property.gallery[activeImage]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
            
            <div className="absolute bottom-8 left-10 flex flex-col gap-2">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit shadow-xl shadow-primary/30"
              >
                <ShieldCheck size={14} /> Verified Luxury Listing
              </motion.div>
              <h2 className="text-white text-3xl font-serif italic">{property.title}</h2>
            </div>

            {/* Gallery Controls */}
            <div className="absolute bottom-8 right-10 flex gap-2">
              <button 
                onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : property.gallery.length - 1)}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => setActiveImage(prev => prev < property.gallery.length - 1 ? prev + 1 : 0)}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-4">
            {property.gallery.slice(1, 5).map((img, idx) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx} 
                className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-lg ${activeImage === idx + 1 ? 'ring-4 ring-primary ring-offset-4 shadow-primary/20' : ''}`}
                onClick={() => setActiveImage(idx + 1)}
              >
                <img src={img} alt="Detail" className="w-full h-full object-cover aspect-square" />
                <div className={`absolute inset-0 transition-all ${activeImage === idx + 1 ? 'bg-transparent' : 'bg-black/20 hover:bg-transparent'}`}></div>
              </motion.div>
            ))}
            <div className="relative rounded-3xl overflow-hidden glass flex-center flex-col gap-2 text-primary font-black cursor-pointer hover:bg-primary/5 transition-all aspect-square border-2 border-dashed border-primary/30 group">
              <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                <Plus size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-widest">View All Photos</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-16">
            <section className="animate-fade-in">
              <div className="flex flex-between items-start mb-6">
                <div>
                  <h1 className="text-5xl font-bold mb-4 tracking-tight">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground text-lg">
                    <MapPin size={22} className="text-primary" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] block mb-2">Investment</span>
                  <div className="text-4xl font-black text-foreground">${property.price.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Bed size={24} />, label: "Bedrooms", value: property.beds },
                  { icon: <Bath size={24} />, label: "Bathrooms", value: property.baths },
                  { icon: <Square size={24} />, label: "Living Area", value: property.sqft + " sqft" },
                  { icon: <Calendar size={24} />, label: "Year Built", value: property.yearBuilt }
                ].map((stat, idx) => (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    key={idx} 
                    className="bg-white border border-border/60 p-8 rounded-[2rem] flex flex-col items-center gap-3 hover:shadow-2xl hover:border-primary/20 transition-all group"
                  >
                    <div className="text-primary bg-primary/5 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-black">{stat.value}</div>
                    <div className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="glass p-12 rounded-[3rem] space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-primary rounded-full"></div>
                <h2 className="text-3xl font-bold italic font-serif">Property Narrative</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-xl font-medium">
                {property.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-border/40">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Luxury Features</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {property.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground/80 font-bold">
                        <CheckCircle2 size={18} className="text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/30 p-8 rounded-[2rem] border border-border/40">
                  <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Quick Specs</h4>
                  <div className="space-y-4">
                    <div className="flex-between">
                      <span className="text-muted-foreground font-medium">Parking</span>
                      <span className="font-bold">{property.parking}</span>
                    </div>
                    <div className="flex-between">
                      <span className="text-muted-foreground font-medium">Status</span>
                      <span className="text-green-600 font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Similar Properties Section */}
            <section className="space-y-10">
              <div className="flex flex-between items-end">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Similar Collection</h2>
                  <p className="text-muted-foreground">Handpicked alternatives for your taste.</p>
                </div>
                <Link to="/properties" className="text-primary font-bold text-sm underline underline-offset-4 flex items-center gap-2 hover:gap-3 transition-all">
                  View Market <ArrowUpRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map(prop => (
                  <Link to={`/property/${prop.id}`} key={prop.id} className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl">
                    <img src={prop.image} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h4 className="text-xl font-bold mb-1">{prop.title}</h4>
                      <div className="flex items-center gap-1 text-white/70 text-xs mb-2">
                        <MapPin size={12} /> {prop.location}
                      </div>
                      <div className="text-primary font-black">${prop.price.toLocaleString()}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Interaction */}
          <div className="space-y-8">
            <div className="sticky top-32 space-y-6">
              {/* Agent Card */}
              <motion.div 
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass p-8 rounded-[2.5rem] shadow-2xl border border-white/50"
              >
                <div className="flex items-center gap-5 mb-8 pb-8 border-b border-border/40">
                  <div className="relative">
                    <img src={agent.image} alt={agent.name} className="w-20 h-20 rounded-3xl object-cover shadow-lg" />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white flex-center shadow-lg">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{agent.name}</h3>
                    <p className="text-primary font-black text-[10px] uppercase tracking-widest">{agent.role}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="p-2 bg-muted/50 rounded-lg hover:bg-primary hover:text-white transition-all"><Phone size={14} /></button>
                      <button className="p-2 bg-muted/50 rounded-lg hover:bg-primary hover:text-white transition-all"><Mail size={14} /></button>
                      <button className="p-2 bg-muted/50 rounded-lg hover:bg-primary hover:text-white transition-all"><MessageSquare size={14} /></button>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Your Identity</label>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3.5 outline-none focus:border-primary focus:bg-white transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Contact Link</label>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3.5 outline-none focus:border-primary focus:bg-white transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Brief Inquiry</label>
                    <textarea 
                      placeholder="I'm interested in..." 
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3.5 outline-none focus:border-primary focus:bg-white transition-all text-sm font-bold min-h-[120px] resize-none"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all">
                    Initialize Inquiry
                  </button>
                </form>

                <div className="mt-8 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-black">24h</p>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Avg Response</p>
                  </div>
                  <div className="w-[1px] h-8 bg-border"></div>
                  <div className="text-center">
                    <p className="text-2xl font-black">98%</p>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Satisfaction</p>
                  </div>
                </div>
              </motion.div>

              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <Clock className="text-primary mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-2">Book a Visit</h3>
                  <p className="text-slate-400 text-sm mb-6 font-medium">In-person tours available Monday through Sunday from 9am to 6pm.</p>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
                    Check Availability
                  </button>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default PropertyDetails;

