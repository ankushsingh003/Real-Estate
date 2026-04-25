import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SlidersHorizontal, LayoutGrid, List, MapPin,
  Loader2, Home, Building2, TrendingDown, AlertCircle
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-hot-toast';

// ─── API CONFIG ────────────────────────────────────────────────────────────────
// Uses "Realty in US" on RapidAPI — subscribe at:
// https://rapidapi.com/apidojo/api/realty-in-us
// Replace with your own key below:
const RAPID_API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
const RAPID_API_HOST = 'realty-in-us.p.rapidapi.com';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const buildUrl = (marketType, city, stateCode, offset = 0) => {
  const base = 'https://realty-in-us.p.rapidapi.com/properties/v3/list';
  const params = new URLSearchParams({
    limit: '20',
    offset: String(offset),
    status: marketType === 'sold' ? 'sold' : marketType === 'rent' ? 'for_rent' : 'for_sale',
    city,
    state_code: stateCode,
    sort: 'relevant',
  });
  return `${base}?${params.toString()}`;
};

const mapProperty = (item, marketType) => {
  const loc = item.location?.address || {};
  const desc = item.description || {};
  const flags = item.flags || {};
  const photo = (item.primary_photo?.href || item.photos?.[0]?.href || '').replace('s.jpg', 'od-w480_h360_x2.jpg');

  return {
    id: item.property_id || item.listing_id,
    title: loc.line || loc.street_direction || 'Premium Property',
    location: [loc.city, loc.state_code, loc.postal_code].filter(Boolean).join(', '),
    price: item.list_price || item.price || item.sold_price || 0,
    priceLabel: marketType === 'sold' ? 'Sold For' : marketType === 'rent' ? 'Monthly Rent' : 'Asking Price',
    beds: desc.beds || 0,
    baths: desc.baths || desc.baths_full || 0,
    sqft: desc.sqft || 0,
    propertyType: desc.type?.replace(/_/g, ' ') || 'Residential',
    image: photo || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    status: marketType === 'sold' ? 'SOLD' : marketType === 'rent' ? 'FOR_RENT' : 'FOR_SALE',
    views: Math.floor(Math.random() * 900) + 100,
    interestedCount: Math.floor(Math.random() * 40) + 2,
    bidCount: marketType === 'for_sale' ? Math.floor(Math.random() * 8) : 0,
    garage: desc.garage || 0,
    stories: desc.stories || 0,
    yearBuilt: desc.year_built,
    newListing: flags?.is_new_listing,
    priceReduced: flags?.is_price_reduced,
    raw: item,
  };
};

const FALLBACK_PROPERTIES = (marketType) =>
  [1, 2, 3, 4, 5, 6].map((i) => ({
    id: `sample-${i}`,
    title: ['Oceanview Estate', 'Skyline Penthouse', 'Garden Villa', 'Modern Loft', 'Classic Colonial', 'Luxury Townhouse'][i - 1],
    location: ['Malibu, CA 90265', 'New York, NY 10001', 'Austin, TX 78701', 'Miami, FL 33101', 'Chicago, IL 60601', 'Seattle, WA 98101'][i - 1],
    price: 2500000 + i * 350000,
    beds: 3 + (i % 3),
    baths: 2 + (i % 2),
    sqft: 2800 + i * 400,
    propertyType: ['Single Family', 'Condo', 'Villa', 'Loft', 'Colonial', 'Townhouse'][i - 1],
    image: `https://images.unsplash.com/photo-${['1600596542815-ffad4c1539a9', '1600607687940-477a128f0a85', '1600585154340-be6199f7c096', '1613490493576-7fde63acd811', '1512917774080-9991f1c4c750', '1600566753190-17f0bcd2a6c4'][i - 1]}?auto=format&fit=crop&q=80&w=800`,
    status: marketType === 'sold' ? 'SOLD' : marketType === 'rent' ? 'FOR_RENT' : 'FOR_SALE',
    views: Math.floor(Math.random() * 900) + 100,
    interestedCount: Math.floor(Math.random() * 40) + 2,
    bidCount: Math.floor(Math.random() * 8),
    isFallback: true,
  }));

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [marketType, setMarketType] = useState('sale');
  const [isFallback, setIsFallback] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rawLocation = queryParams.get('location') || 'New York, NY';

  // Parse "City, STATE" → { city, stateCode }
  const parseLocation = (str) => {
    const parts = str.split(',').map((s) => s.trim());
    return { city: parts[0] || 'New York', stateCode: parts[1]?.split(' ')[0] || 'NY' };
  };

  const { city, stateCode } = parseLocation(rawLocation);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, [location.search, marketType]);

  const fetchProperties = async () => {
    setLoading(true);
    setIsFallback(false);
    try {
      const url = buildUrl(marketType, city, stateCode);
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      });

      if (res.status === 403 || res.status === 401) throw new Error('SUBSCRIPTION_REQUIRED');
      if (!res.ok) throw new Error(`HTTP_ERROR_${res.status}`);

      const json = await res.json();
      const results = json?.data?.home_search?.results || json?.data?.results || [];

      if (!Array.isArray(results) || results.length === 0) throw new Error('NO_RESULTS');

      setProperties(results.map((item) => mapProperty(item, marketType)));
    } catch (err) {
      console.error('Realty API error:', err.message);
      setProperties(FALLBACK_PROPERTIES(marketType));
      setIsFallback(true);
      if (err.message === 'SUBSCRIPTION_REQUIRED') {
        toast.error('Subscribe to "Realty in US" on RapidAPI to see live listings.');
      }
    } finally {
      setLoading(false);
    }
  };

  const marketTabs = [
    { key: 'sale', label: 'For Sale', icon: <Home size={15} /> },
    { key: 'rent', label: 'For Rent', icon: <Building2 size={15} /> },
    { key: 'sold', label: 'Recently Sold', icon: <TrendingDown size={15} /> },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container">

        {/* Market Type Selector */}
        <div className="mb-10 bg-slate-900 p-2 rounded-[2.5rem] flex items-center shadow-2xl overflow-hidden">
          {marketTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMarketType(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all duration-300 ${
                marketType === tab.key
                  ? 'bg-primary text-white shadow-xl shadow-primary/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-3">
              <div className="w-8 h-[2px] bg-primary" />
              Live Market Feed
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Properties in{' '}
              <span className="text-primary italic">{city}</span>
            </h2>
            {!loading && (
              <p className="text-slate-400 mt-2 font-medium">
                {properties.length} listings found
                {isFallback && (
                  <span className="ml-2 inline-flex items-center gap-1 text-amber-500 text-xs">
                    <AlertCircle size={12} /> Sample data (API subscription needed)
                  </span>
                )}
              </p>
            )}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-3 bg-white px-2 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex bg-slate-50 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List size={18} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border-l border-slate-200 text-slate-600 hover:text-primary transition-colors">
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Grid / List */}
        {loading ? (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 animate-pulse">
                <div className="h-64 bg-slate-200" />
                <div className="p-7 space-y-4">
                  <div className="h-5 bg-slate-200 rounded-full w-3/4" />
                  <div className="h-4 bg-slate-200 rounded-full w-1/2" />
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[1, 2, 3].map((j) => <div key={j} className="h-10 bg-slate-100 rounded-xl" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
            {properties.map((property, idx) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
              >
                <PropertyCard property={property} horizontal={viewMode === 'list'} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
