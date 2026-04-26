import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SlidersHorizontal, LayoutGrid, List,
  Loader2, Home, Building2, TrendingDown, AlertCircle
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-hot-toast';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [marketType, setMarketType] = useState('sale');
  const [isFallback, setIsFallback] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rawLocation = queryParams.get('location') || 'Los Angeles, CA';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, [location.search, marketType]);

  const fetchProperties = async () => {
    setProperties([]); // Clear list immediately to show it's refreshing
    setLoading(true);
    setIsFallback(false);
    try {
      const url = `http://localhost:5000/api/properties/search?location=${encodeURIComponent(rawLocation)}&marketType=${marketType}&limit=20`;
      const res = await fetch(url);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Server Error ${res.status}`);
      }

      const json = await res.json();
      if (!json.success || !json.data || json.data.length === 0) {
        throw new Error('NO_RESULTS');
      }

      setProperties(json.data);
    } catch (err) {
      console.error('Property Fetch Error:', err.message);
      toast.error(`Live properties unavailable: ${err.message}. Please check your connection.`);
      setProperties([]);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  const marketTabs = [
    { key: 'sale', label: 'For Sale', icon: <Home size={15} /> },
    { key: 'rent', label: 'For Rent', icon: <Building2 size={15} /> },
    { key: 'sold', label: 'Recently Sold', icon: <TrendingDown size={15} /> },
  ];

  const city = rawLocation.split(',')[0] || 'New York';

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
