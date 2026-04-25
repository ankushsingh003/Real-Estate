import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Bed, Bath, Square, Heart, Share2,
  ChevronLeft, ChevronRight, CheckCircle2,
  Phone, Mail, Loader2, Calendar, ShieldCheck,
  MessageSquare, Clock, TrendingUp, Eye,
  Users, Tag, Building, Star, ArrowRight, ChevronDown, ChevronUp,
  Home, DollarSign
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '',
    message: 'I am interested in this property and would like to learn more.',
  });
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/properties/details/${id}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!json.success) throw new Error(json.message || 'FAILED');

      const data = json.data;
      setProperty(data);

      // Agent / random user fallback
      try {
        const agentRes = await fetch('https://randomuser.me/api/');
        const agentJson = await agentRes.json();
        const u = agentJson.results[0];
        setAgent({
          name: data.ownerName || `${u.name.first} ${u.name.last}`,
          role: data.ownerType === 'seller' ? 'Property Owner' : 'Senior Real Estate Advisor',
          image: u.picture.large,
          phone: data.ownerPhone || u.cell,
          email: data.ownerEmail || `${u.name.first.toLowerCase()}@luxeestate.com`,
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          deals: Math.floor(Math.random() * 80) + 20,
        });
      } catch {
        setAgent(DEFAULT_AGENT);
      }

      // Seed sample bids
      setBids([
        { name: 'Anonymous Buyer', amount: data.price * 0.97, time: '2h ago', status: 'active' },
        { name: 'Anonymous Buyer', amount: data.price * 0.95, time: '1d ago', status: 'outbid' },
      ]);

    } catch (err) {
      console.error('Detail fetch error:', err.message);
      toast.error('Failed to load property details.');
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success(`Message sent to ${agent?.name || 'the agent'}!`);
    setContactForm({ ...contactForm, name: '', email: '', phone: '' });
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount.replace(/,/g, ''));
    if (!amount || amount <= (property.price || 0)) {
      toast.error('Bid must be higher than the asking price.');
      return;
    }
    setBids([{ name: 'Your Bid', amount, time: 'Just now', status: 'active' }, ...bids]);
    toast.success(`Bid of $${amount.toLocaleString()} placed!`);
    setBidAmount('');
  };

  if (loading || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6">
        <Loader2 className="animate-spin text-primary" size={56} />
        <p className="text-muted-foreground text-sm animate-pulse">Loading property details…</p>
      </div>
    );
  }

  const visiblePhotos = showAllPhotos ? property.gallery : property.gallery.slice(0, 9);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <Link to="/properties" className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
          <div className="flex gap-3">
            <button onClick={() => { navigator.share?.({ title: property.title, url: window.location.href }); toast.success('Link copied!'); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
              <Share2 size={14} /> Share
            </button>
            <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 hover:border-red-300 hover:text-red-500'}`}>
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              {isLiked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="mb-10">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-200 aspect-[16/8] mb-3 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={property.gallery[activeImage]?.src}
                alt={property.gallery[activeImage]?.label}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </AnimatePresence>
            <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
              {property.gallery[activeImage]?.label || 'Property View'}
            </div>
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-xl">
              <ShieldCheck size={13} /> {property.status}
            </div>
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button onClick={() => setActiveImage(p => p > 0 ? p - 1 : property.gallery.length - 1)} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all border border-white/20"><ChevronLeft size={20} /></button>
              <button onClick={() => setActiveImage(p => p < property.gallery.length - 1 ? p + 1 : 0)} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all border border-white/20"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {visiblePhotos.map((photo, idx) => (
              <button key={idx} onClick={() => setActiveImage(idx)} className={`relative rounded-2xl overflow-hidden aspect-square bg-slate-200 transition-all ${activeImage === idx ? 'ring-3 ring-primary scale-95' : 'hover:opacity-90'}`}>
                <img src={photo.src} alt={photo.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-slate-500"><MapPin size={16} />{property.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-primary font-black uppercase tracking-widest">Asking Price</div>
                  <div className="text-3xl font-black text-slate-900">${property.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Bed size={20} />, value: property.beds, label: 'Bedrooms' },
                  { icon: <Bath size={20} />, value: property.baths, label: 'Bathrooms' },
                  { icon: <Square size={20} />, value: `${property.sqft.toLocaleString()} sqft`, label: 'Area' },
                  { icon: <Calendar size={20} />, value: property.yearBuilt, label: 'Built' },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center gap-2 border border-slate-100">
                    <div className="text-primary bg-primary/10 p-2.5 rounded-xl">{s.icon}</div>
                    <div className="font-black text-slate-900 text-sm">{s.value}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Home size={18} className="text-primary" />Description</h2>
              <p className="text-slate-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2"><Star size={18} className="text-primary" />Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="text-slate-700 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bidding Section */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><DollarSign size={20} className="text-primary" />Place a Bid</h2>
                <p className="text-slate-400 text-sm mb-6">Current asking: <span className="text-white font-black">${property.price.toLocaleString()}</span></p>
                <form onSubmit={handleBidSubmit} className="flex gap-3 mb-6 flex-wrap">
                  <input type="text" placeholder="Your bid amount..." value={bidAmount} onChange={(e)=>setBidAmount(e.target.value)} className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-3.5 text-white font-bold outline-none focus:border-primary" />
                  <button type="submit" className="px-8 py-3.5 bg-primary rounded-2xl font-black uppercase text-xs">Submit Bid</button>
                </form>
                <div className="space-y-2">
                  {bids.map((bid, i) => (
                    <div key={i} className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-sm text-slate-300">{bid.name} <span className="text-[10px] ml-2 text-slate-500">{bid.time}</span></span>
                      <span className="font-black text-white">${bid.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {agent && (
              <div className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm sticky top-28">
                <div className="flex items-center gap-4 mb-6">
                  <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <div className="font-black text-slate-900">{agent.name}</div>
                    <div className="text-primary text-[10px] font-black uppercase">{agent.role}</div>
                  </div>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input type="text" placeholder="Name" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold" />
                  <input type="email" placeholder="Email" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold" />
                  <textarea placeholder="Message..." rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold resize-none" />
                  <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-2xl font-black uppercase text-xs shadow-lg">Contact Agent</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DEFAULT_AGENT = {
  name: 'Alexander Pierce',
  role: 'Senior Advisor',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  phone: '+1 (555) 123-4567',
  email: 'alexander@luxeestate.com',
};

export default PropertyDetails;
