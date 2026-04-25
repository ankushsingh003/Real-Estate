import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Bed, Bath, Square, Heart, Share2,
  ChevronLeft, ChevronRight, CheckCircle2,
  Phone, Mail, Loader2, Calendar, ShieldCheck,
  MessageSquare, Clock, TrendingUp, Eye,
  Users, Tag, Car, Home, Layers, AlertCircle,
  DollarSign, Building, Star, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// ─── API CONFIG ────────────────────────────────────────────────────────────────
const RAPID_API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
const RAPID_API_HOST = 'realty-in-us.p.rapidapi.com';

// ─── PHOTO CATEGORIES (tags for room labeling) ────────────────────────────────
const ROOM_TAGS = ['Living Room', 'Kitchen', 'Master Bedroom', 'Bathroom', 'Balcony', 'Ceiling', 'Dining Room', 'Backyard', 'Garage', 'Pool', 'Hallway', 'Laundry'];

const tagPhoto = (idx) => ROOM_TAGS[idx] || `Room ${idx + 1}`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
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
      const url = `https://${RAPID_API_HOST}/properties/v3/detail?property_id=${id}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      });

      if (res.status === 403 || res.status === 401) throw new Error('SUBSCRIPTION_REQUIRED');
      if (!res.ok) throw new Error(`HTTP_${res.status}`);

      const json = await res.json();
      const raw = json?.data?.home || json?.data || {};
      const desc = raw.description || {};
      const loc = raw.location?.address || {};
      const advertiser = raw.advertisers?.[0] || {};
      const photos = (raw.photos || []).map((p) => p.href || p).filter(Boolean);

      // Enrich photos with room tags
      const gallery = photos.length > 0
        ? photos.slice(0, 20).map((src, i) => ({ src, label: tagPhoto(i) }))
        : FALLBACK_GALLERY;

      setProperty({
        id: raw.property_id || id,
        title: loc.line || 'Premium Property',
        location: [loc.city, loc.state_code, loc.postal_code].filter(Boolean).join(', '),
        price: raw.list_price || raw.price || raw.sold_price || 0,
        beds: desc.beds || 0,
        baths: desc.baths || 0,
        sqft: desc.sqft || 0,
        lotSqft: desc.lot_sqft || 0,
        type: desc.type?.replace(/_/g, ' ') || 'Residential',
        yearBuilt: desc.year_built || '—',
        garage: desc.garage || 0,
        stories: desc.stories || 0,
        parking: desc.garage_type || 'Garage',
        description: raw.description?.text || raw.prop_description || 'A stunning property in a prime location. Contact the agent for more information.',
        gallery,
        features: raw.features?.map(f => f.text || f.category).filter(Boolean) || ['Modern Design', 'Premium Finishes', 'Smart Home Ready', 'Central Air', 'Gated Access'],
        status: raw.status?.replace(/_/g, ' ') || 'Active',
        views: raw.page_view_count || Math.floor(Math.random() * 2000) + 500,
        saves: raw.save_count || Math.floor(Math.random() * 300) + 20,
        inquiries: raw.inquiry_count || Math.floor(Math.random() * 60) + 5,
        interestedCount: raw.inquiry_count || Math.floor(Math.random() * 80) + 10,
        daysOnMarket: raw.list_date ? Math.floor((Date.now() - new Date(raw.list_date)) / 86400000) : Math.floor(Math.random() * 60),
        mlsId: raw.source?.id || raw.listing_id || id,
        ownerName: advertiser.name || null,
        ownerPhone: advertiser.phones?.[0]?.number || null,
        ownerEmail: advertiser.email || null,
        ownerType: advertiser.type || 'Agent',
        taxRecord: raw.tax_history?.[0] || null,
        priceHistory: raw.price_history || [],
        nearbySchools: raw.nearby_schools?.schools?.slice(0, 3) || [],
        county: loc.county || '',
        neighborhood: raw.location?.neighborhoods?.local?.name || '',
        isFallback: false,
      });

      // Agent / random user fallback
      try {
        const agentRes = await fetch('https://randomuser.me/api/');
        const agentJson = await agentRes.json();
        const u = agentJson.results[0];
        setAgent({
          name: advertiser.name || `${u.name.first} ${u.name.last}`,
          role: advertiser.type === 'seller' ? 'Property Owner' : 'Senior Real Estate Advisor',
          image: u.picture.large,
          phone: advertiser.phones?.[0]?.number || u.cell,
          email: advertiser.email || `${u.name.first.toLowerCase()}@luxeestate.com`,
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          deals: Math.floor(Math.random() * 80) + 20,
        });
      } catch {
        setAgent(DEFAULT_AGENT);
      }

      // Seed some sample bids if property is for sale
      setBids([
        { name: 'Anonymous Buyer', amount: (raw.list_price || 2000000) * 0.97, time: '2h ago', status: 'active' },
        { name: 'Anonymous Buyer', amount: (raw.list_price || 2000000) * 0.95, time: '1d ago', status: 'outbid' },
      ]);

    } catch (err) {
      console.error('Detail fetch error:', err.message);
      setProperty(FALLBACK_PROPERTY(id));
      setAgent(DEFAULT_AGENT);
      setBids(FALLBACK_BIDS);
      if (err.message === 'SUBSCRIPTION_REQUIRED') {
        toast.error('Subscribe to "Realty in US" on RapidAPI for live property data.');
      }
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

  // ─── LOADING ────────────────────────────────────────────────────────────────
  if (loading || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6">
        <div className="relative">
          <Loader2 className="animate-spin text-primary" size={56} />
        </div>
        <div className="text-center">
          <p className="text-xl font-serif italic text-foreground mb-1">LuxeEstate</p>
          <p className="text-muted-foreground text-sm animate-pulse">Loading property details…</p>
        </div>
      </div>
    );
  }

  const visiblePhotos = showAllPhotos ? property.gallery : property.gallery.slice(0, 9);

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-28 pb-20 bg-slate-50"
    >
      <div className="container max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <Link
            to="/properties"
            className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => { navigator.share?.({ title: property.title, url: window.location.href }); toast.success('Link copied!'); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all"
            >
              <Share2 size={14} /> Share
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 hover:border-red-300 hover:text-red-500'}`}
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              {isLiked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* ── HERO GALLERY ─────────────────────────────────────────────────── */}
        <div className="mb-10">
          {/* Main image */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-200 aspect-[16/8] mb-3 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={property.gallery[activeImage]?.src}
                alt={property.gallery[activeImage]?.label || property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200'; }}
              />
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Room label */}
            <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
              {property.gallery[activeImage]?.label || 'Property View'}
            </div>

            {/* Status chip */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-xl">
              <ShieldCheck size={13} />
              {property.status}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={() => setActiveImage(p => p > 0 ? p - 1 : property.gallery.length - 1)}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl border border-white/20"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setActiveImage(p => p < property.gallery.length - 1 ? p + 1 : 0)}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl border border-white/20"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20">
              {activeImage + 1} / {property.gallery.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {visiblePhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative rounded-2xl overflow-hidden aspect-square bg-slate-200 group transition-all ${activeImage === idx ? 'ring-3 ring-primary ring-offset-2 scale-95' : 'hover:opacity-90'}`}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=200'; }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[8px] font-bold text-center py-1 truncate px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.label}
                </div>
              </button>
            ))}
            {/* Show more / less toggle */}
            {property.gallery.length > 9 && (
              <button
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="rounded-2xl aspect-square bg-slate-800 text-white flex flex-col items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider hover:bg-primary transition-all"
              >
                {showAllPhotos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showAllPhotos ? 'Less' : `+${property.gallery.length - 9}`}
              </button>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT GRID ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: Details */}
          <div className="lg:col-span-2 space-y-10">

            {/* Title + Price */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 leading-tight">{property.title}</h1>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                    <span className="font-medium">{property.location}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Asking Price</div>
                  <div className="text-3xl font-black text-slate-900">${property.price.toLocaleString()}</div>
                  {property.sqft > 0 && (
                    <div className="text-slate-400 text-sm mt-1">${Math.round(property.price / property.sqft).toLocaleString()}/sqft</div>
                  )}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Bed size={20} />, value: property.beds || '—', label: 'Bedrooms' },
                  { icon: <Bath size={20} />, value: property.baths || '—', label: 'Bathrooms' },
                  { icon: <Square size={20} />, value: property.sqft ? `${property.sqft.toLocaleString()} sqft` : '—', label: 'Living Area' },
                  { icon: <Calendar size={20} />, value: property.yearBuilt || '—', label: 'Year Built' },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center gap-2 border border-slate-100">
                    <div className="text-primary bg-primary/10 p-2.5 rounded-xl">{s.icon}</div>
                    <div className="font-black text-slate-900 text-sm">{s.value}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-center">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Stats */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <TrendingUp size={18} className="text-primary" />
                Listing Activity
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <Eye size={20} />, value: property.views?.toLocaleString(), label: 'Total Views', color: 'text-blue-500 bg-blue-50' },
                  { icon: <Users size={20} />, value: property.interestedCount, label: 'Interested Buyers', color: 'text-emerald-500 bg-emerald-50' },
                  { icon: <Heart size={20} />, value: property.saves, label: 'Saves / Favorites', color: 'text-red-500 bg-red-50' },
                  { icon: <MessageSquare size={20} />, value: property.inquiries, label: 'Inquiries', color: 'text-amber-500 bg-amber-50' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className={`${s.color} p-2.5 rounded-xl`}>{s.icon}</div>
                    <div className="font-black text-slate-900 text-xl">{s.value}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-center">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 text-sm text-slate-500 font-medium flex-wrap">
                <span className="flex items-center gap-1.5"><Clock size={14} />{property.daysOnMarket} days on market</span>
                {property.mlsId && <span className="flex items-center gap-1.5"><Tag size={14} />MLS: {property.mlsId}</span>}
                {property.neighborhood && <span className="flex items-center gap-1.5"><MapPin size={14} />{property.neighborhood}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Home size={18} className="text-primary" />
                Property Description
              </h2>
              <p className={`text-slate-600 leading-relaxed font-medium text-base ${!showFullDesc && 'line-clamp-4'}`}>
                {property.description}
              </p>
              {property.description.length > 300 && (
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="mt-3 flex items-center gap-1 text-primary font-bold text-sm hover:underline"
                >
                  {showFullDesc ? 'Show less' : 'Read more'}
                  {showFullDesc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Star size={18} className="text-primary" />
                Features & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.slice(0, 12).map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    <span className="font-medium text-slate-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Building size={18} className="text-primary" />
                Property Details
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: 'Property Type', value: property.type },
                  { label: 'Status', value: property.status },
                  { label: 'Year Built', value: property.yearBuilt },
                  { label: 'Garage', value: property.garage ? `${property.garage} car` : 'N/A' },
                  { label: 'Stories', value: property.stories || 'N/A' },
                  { label: 'Lot Size', value: property.lotSqft ? `${property.lotSqft.toLocaleString()} sqft` : 'N/A' },
                  { label: 'Parking', value: property.parking || 'N/A' },
                  { label: 'County', value: property.county || 'N/A' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-400 text-sm font-medium">{row.label}</span>
                    <span className="font-bold text-slate-800 text-sm text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price History */}
            {property.priceHistory && property.priceHistory.length > 0 && (
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  Price History
                </h2>
                <div className="space-y-3">
                  {property.priceHistory.slice(0, 5).map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${h.event_name === 'Listed' ? 'bg-emerald-500' : h.event_name === 'Price Reduced' ? 'bg-red-500' : 'bg-blue-500'}`} />
                        <span className="font-bold text-slate-700 text-sm">{h.event_name || 'Price Change'}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-slate-900">${(h.price || 0).toLocaleString()}</div>
                        <div className="text-slate-400 text-[11px]">{h.date ? new Date(h.date).toLocaleDateString() : ''}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bid Section */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                  <DollarSign size={20} className="text-primary" />
                  Place a Bid
                </h2>
                <p className="text-slate-400 text-sm mb-6">Current asking: <span className="text-white font-black">${property.price.toLocaleString()}</span></p>

                <form onSubmit={handleBidSubmit} className="flex gap-3 mb-6 flex-wrap">
                  <div className="flex-1 min-w-[180px] relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input
                      type="text"
                      placeholder={`e.g. ${(property.price * 1.02).toLocaleString()}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl pl-8 pr-4 py-3.5 text-white placeholder-slate-500 font-bold outline-none focus:border-primary transition-all"
                    />
                  </div>
                  <button type="submit" className="px-6 py-3.5 bg-primary rounded-2xl font-black uppercase tracking-widest text-xs text-white hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 flex items-center gap-2">
                    Submit Bid <ArrowRight size={14} />
                  </button>
                </form>

                {/* Bids list */}
                {bids.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-3">{bids.length} Active Bid{bids.length > 1 ? 's' : ''}</div>
                    {bids.map((bid, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${bid.status === 'active' ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${bid.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                          <span className="text-sm font-bold text-slate-300">{bid.name}</span>
                          <span className="text-[10px] text-slate-500">{bid.time}</span>
                        </div>
                        <div className="font-black text-white">${bid.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Sticky sidebar */}
          <div className="space-y-6">
            <div className="sticky top-28 space-y-6">

              {/* Owner / Agent card */}
              {agent && (
                <div className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="relative flex-shrink-0">
                      <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-2xl object-cover shadow" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-slate-900 text-base">{agent.name}</div>
                      <div className="text-primary text-[10px] font-black uppercase tracking-widest">{agent.role}</div>
                      {agent.rating && (
                        <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-bold">
                          <Star size={11} fill="currentColor" />
                          {agent.rating} · {agent.deals} deals
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact form */}
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    {[
                      { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Full Name' },
                      { label: 'Email', key: 'email', type: 'email', placeholder: 'Email Address' },
                      { label: 'Phone', key: 'phone', type: 'tel', placeholder: 'Phone (optional)' },
                    ].map((field) => (
                      <input
                        key={field.key}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.key !== 'phone'}
                        value={contactForm[field.key]}
                        onChange={(e) => setContactForm({ ...contactForm, [field.key]: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-primary focus:bg-white transition-all placeholder-slate-400"
                      />
                    ))}
                    <textarea
                      placeholder="Your message…"
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-primary focus:bg-white transition-all resize-none placeholder-slate-400"
                    />
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Contact Agent
                    </button>
                  </form>

                  {/* Direct contact links */}
                  {(agent.phone || agent.email) && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-3">
                      {agent.phone && (
                        <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all text-xs font-bold">
                          <Phone size={14} /> Call
                        </a>
                      )}
                      {agent.email && (
                        <a href={`mailto:${agent.email}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:border-primary hover:text-primary transition-all text-xs font-bold">
                          <Mail size={14} /> Email
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Schedule tour */}
              <div className="bg-slate-900 text-white p-7 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <Clock className="text-primary mb-3" size={28} />
                  <h3 className="text-lg font-bold mb-1">Schedule a Tour</h3>
                  <p className="text-slate-400 text-sm mb-5">Tours available 7 days a week — in-person or virtual.</p>
                  <button
                    onClick={() => toast.success('Tour request sent!')}
                    className="w-full bg-white text-slate-900 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all"
                  >
                    Request Appointment
                  </button>
                </div>
              </div>

              {/* Property share stats summary */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-4">At a Glance</div>
                <div className="space-y-3">
                  {[
                    { icon: <Eye size={15} className="text-blue-500" />, label: 'Total views', value: property.views?.toLocaleString() },
                    { icon: <Users size={15} className="text-emerald-500" />, label: 'Wants to buy', value: property.interestedCount },
                    { icon: <TrendingUp size={15} className="text-amber-500" />, label: 'Active bids', value: bids.filter(b => b.status === 'active').length },
                    { icon: <Clock size={15} className="text-slate-400" />, label: 'Days on market', value: property.daysOnMarket },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        {row.icon} {row.label}
                      </div>
                      <span className="font-black text-slate-900 text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── FALLBACKS ─────────────────────────────────────────────────────────────────
const FALLBACK_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200', label: 'Living Room' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200', label: 'Exterior' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200', label: 'Kitchen' },
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200', label: 'Bathroom' },
  { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200', label: 'Master Bedroom' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200', label: 'Balcony' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200', label: 'Ceiling / Interior' },
  { src: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&q=80&w=1200', label: 'Backyard' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200', label: 'Garage' },
];

const FALLBACK_PROPERTY = (id) => ({
  id,
  title: 'Luxe Modern Residence',
  location: 'Beverly Hills, CA 90210',
  price: 3250000,
  beds: 4,
  baths: 3,
  sqft: 4500,
  lotSqft: 8200,
  type: 'Single Family',
  yearBuilt: 2021,
  garage: 2,
  stories: 2,
  parking: 'Attached Garage',
  description: 'This is sample data displayed because the RapidAPI "Realty in US" subscription needs to be activated. Subscribe at rapidapi.com/apidojo/api/realty-in-us to view live property listings with real photos, owner details, and market data.',
  gallery: FALLBACK_GALLERY,
  features: ['Central Air', 'Smart Home System', 'Fireplace', 'Pool', 'Solar Panels', 'High Ceilings', 'Hardwood Floors', 'Chef Kitchen'],
  status: 'Active',
  views: 1842,
  saves: 94,
  inquiries: 23,
  interestedCount: 37,
  daysOnMarket: 14,
  mlsId: 'SAMPLE-001',
  ownerName: null,
  priceHistory: [],
  nearbySchools: [],
  county: 'Los Angeles',
  neighborhood: 'Beverly Hills',
  isFallback: true,
});

const DEFAULT_AGENT = {
  name: 'Alexander Pierce',
  role: 'Senior Real Estate Advisor',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  phone: '+1 (555) 123-4567',
  email: 'alexander@luxeestate.com',
  rating: '4.9',
  deals: 62,
};

const FALLBACK_BIDS = [
  { name: 'Anonymous Buyer', amount: 3185000, time: '3h ago', status: 'active' },
  { name: 'Anonymous Buyer', amount: 3100000, time: '1d ago', status: 'outbid' },
];

export default PropertyDetails;
