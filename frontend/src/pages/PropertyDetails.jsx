import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Bed, Bath, Square, Heart, Share2, 
  ChevronLeft, ChevronRight, CheckCircle2, 
  Phone, Mail, Loader2, Calendar, ShieldCheck, 
  MessageSquare, Clock, ArrowUpRight, TrendingUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [property, setProperty] = useState(null);
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

  const RAPID_API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const RAPID_API_HOST = 'redfin-com-data.p.rapidapi.com';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const url = `https://${RAPID_API_HOST}/property/get-details?propertyId=${id}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST
        }
      });

      if (!response.ok) throw new Error("Failed to fetch property details");
      
      const result = await response.json();
      const rawData = result.data || result;
      const data = rawData.homeData || rawData;
      
      setProperty({
        id: rawData.propertyId || id,
        title: data.addressInfo?.formattedStreetLine || data.streetAddress || "Premium Estate",
        location: data.addressInfo ? `${data.addressInfo.city}, ${data.addressInfo.state} ${data.addressInfo.zip}` : "Location Available",
        price: data.priceInfo?.amount || data.price || 0,
        beds: data.propertyInfo?.bedrooms || data.beds || 0,
        baths: data.propertyInfo?.bathrooms || data.baths || 0,
        sqft: data.propertyInfo?.sqft || data.squareFootage || 0,
        type: data.propertyType || "Residential",
        yearBuilt: data.yearBuilt || 2022,
        parking: data.parkingType || "Attached Garage",
        description: data.description || data.remarks || "Experience the pinnacle of modern living with this stunning architectural masterpiece featuring clean lines and premium finishes throughout.",
        gallery: (data.photosInfo?.imgSrcs && data.photosInfo.imgSrcs.length > 0) ? data.photosInfo.imgSrcs : [
          data.photosInfo?.poster || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1200"
        ],
        features: data.amenities || ["Central Air", "Fireplace", "High Ceilings", "Smart Home Ready", "Gated Access"],
        status: data.propertyStatus || "Active"
      });

      // Fetch random agent for flavor
      const agentRes = await fetch('https://randomuser.me/api/');
      const agentData = await agentRes.json();
      const user = agentData.results[0];
      setAgent({
        name: `${user.name.first} ${user.name.last}`,
        role: "Senior Redfin Advisor",
        image: user.picture.large,
        phone: user.cell,
        email: `${user.name.first.toLowerCase()}@luxeestate.com`
      });

    } catch (err) {
      console.error("Redfin Detail Error:", err.message);
      // Fallback to high-fidelity sample data
      setProperty({
        id: id,
        title: "Luxe Modern Residence",
        location: "Premium Location, USA",
        price: 3250000,
        beds: 4,
        baths: 3,
        sqft: 4500,
        type: "RapidAPI Sample",
        yearBuilt: 2023,
        parking: "Private Garage",
        description: "This is high-fidelity sample data shown because the RapidAPI subscription for Redfin data needs to be activated. Once subscribed, you will see real-time Redfin property analytics.",
        gallery: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
        ],
        features: ["Modern Design", "Smart Home", "Energy Efficient", "Gated Access"],
        status: "ACTIVE"
      });
      if (err.message.includes("Subscription") || err.message.includes("403")) {
        toast.error("Please click 'Subscribe' on RapidAPI Redfin page.");
      }
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent to " + agent.name);
    setContactForm({ ...contactForm, name: '', email: '', phone: '' });
  };

  if (loading || !property) {
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
          <p className="text-muted-foreground font-medium animate-pulse">Authenticating listing details...</p>
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
            className="lg:col-span-8 relative rounded-[3rem] overflow-hidden aspect-[16/9] shadow-2xl group bg-slate-100"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
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
                <ShieldCheck size={14} /> Official {property.status} Listing
              </motion.div>
              <h2 className="text-white text-3xl font-serif italic drop-shadow-lg">{property.title}</h2>
            </div>

            {/* Gallery Controls */}
            {property.gallery.length > 1 && (
              <div className="absolute bottom-8 right-10 flex gap-2">
                <button 
                  onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : property.gallery.length - 1)}
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all shadow-xl"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveImage(prev => prev < property.gallery.length - 1 ? prev + 1 : 0)}
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all shadow-xl"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>

          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-4">
            {property.gallery.slice(1, 5).map((img, idx) => (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx} 
                className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-lg bg-slate-100 ${activeImage === idx + 1 ? 'ring-4 ring-primary ring-offset-4 shadow-primary/20' : ''}`}
                onClick={() => setActiveImage(idx + 1)}
              >
                <img src={img} alt="Detail" className="w-full h-full object-cover aspect-square" />
                <div className={`absolute inset-0 transition-all ${activeImage === idx + 1 ? 'bg-transparent' : 'bg-black/20 hover:bg-transparent'}`}></div>
              </motion.div>
            ))}
            <div className="relative rounded-3xl overflow-hidden glass flex-center flex-col gap-2 text-primary font-black cursor-pointer hover:bg-primary/5 transition-all aspect-square border-2 border-dashed border-primary/30 group">
              <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                <TrendingUp size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-widest">Market Insights</span>
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
                  <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] block mb-2">Market Price</span>
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
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-4">Property Highlights</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {property.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground/80 font-bold">
                        <CheckCircle2 size={18} className="text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-muted/30 p-8 rounded-[2rem] border border-border/40">
                  <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Asset Details</h4>
                  <div className="space-y-4">
                    <div className="flex-between">
                      <span className="text-muted-foreground font-medium">Parking</span>
                      <span className="font-bold">{property.parking}</span>
                    </div>
                    <div className="flex-between">
                      <span className="text-muted-foreground font-medium">Listing Status</span>
                      <span className="text-green-600 font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> {property.status}
                      </span>
                    </div>
                    <div className="flex-between text-xs pt-2 border-t border-border/20">
                      <span className="text-muted-foreground">Internal ID</span>
                      <span className="font-mono">{property.id.substring(0, 8)}...</span>
                    </div>
                  </div>
                </div>
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Interested Buyer</label>
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Direct Channel</label>
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
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Message</label>
                    <textarea 
                      placeholder="I'm interested in negotiation..." 
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3.5 outline-none focus:border-primary focus:bg-white transition-all text-sm font-bold min-h-[120px] resize-none"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all">
                    Start Negotiation
                  </button>
                </form>
              </motion.div>

              <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <Clock className="text-primary mb-4" size={32} />
                  <h3 className="text-2xl font-bold mb-2">Schedule Inspection</h3>
                  <p className="text-slate-400 text-sm mb-6 font-medium">Verified tours available Monday through Sunday.</p>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
                    Request Appointment
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

export default PropertyDetails;


