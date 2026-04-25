import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, MapPin, Search, Loader2, Building2, ExternalLink, SlidersHorizontal, LayoutGrid, List, Tag } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { toast } from 'react-hot-toast';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [marketType, setMarketType] = useState('sale'); // 'sale', 'rent', 'sold'
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const searchLocation = queryParams.get('location') || 'California';

  const RAPID_API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const RAPID_API_HOST = 'redfin-com-data.p.rapidapi.com';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, [location.search, marketType]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // Endpoint logic based on market type
      const endpoint = marketType === 'rent' ? 'search-rent' : marketType === 'sold' ? 'search-sold' : 'search-sale';
      const url = `https://${RAPID_API_HOST}/properties/${endpoint}?location=${encodeURIComponent(searchLocation)}&limit=15`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST
        }
      });

      const result = await response.json();
      
      if (response.status === 403) {
        throw new Error("API Subscription Required");
      }

      // Redfin API usually returns data in result.data or result.results
      const data = result.data || result.results || [];
      
      if (Array.isArray(data)) {
        const mappedProperties = data.map(item => ({
          id: item.propertyId || item.listingId || Math.random().toString(),
          title: item.address?.streetAddress || item.streetAddress || "Premium Property",
          location: `${item.address?.city || item.city}, ${item.address?.state || item.state}`,
          price: item.price?.value || item.price || 0,
          beds: item.bedrooms || item.beds || 0,
          baths: item.bathrooms || item.baths || 0,
          sqft: item.sqft || item.squareFootage || 0,
          type: item.propertyType || "Residential",
          image: item.imgSrc || item.poster || "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200",
          status: marketType.toUpperCase(),
          url: item.url
        }));
        setProperties(mappedProperties);
      } else {
        throw new Error("Invalid Data Format");
      }
    } catch (error) {
      console.error("Redfin API Error:", error.message);
      // Enhanced Sample Data for Fallback
      const sampleProperties = [1, 2, 3, 4, 5, 6].map(i => ({
        id: `redfin-sample-${i}`,
        title: `${['Oceanview', 'Skyline', 'Garden', 'Modern', 'Classic', 'Luxury'][i-1]} Residence`,
        location: `${['Malibu', 'New York', 'Austin', 'Miami', 'Chicago', 'Seattle'][i-1]}, USA`,
        price: 2500000 + (i * 350000),
        beds: 3 + (i % 3),
        baths: 2 + (i % 2),
        sqft: 2800 + (i * 400),
        type: marketType.toUpperCase(),
        image: `https://images.unsplash.com/photo-${[
          '1600596542815-ffad4c1539a9',
          '1600607687940-477a128f0a85',
          '1600585154340-be6199f7c096',
          '1613490493576-7fde63acd811',
          '1512917774080-9991f1c4c750',
          '1600566753190-17f0bcd2a6c4'
        ][i-1]}?auto=format&fit=crop&q=80&w=1200`,
        status: marketType.toUpperCase()
      }));
      setProperties(sampleProperties);
      if (error.message.includes("Subscription")) {
        toast.error("Please click 'Subscribe' on RapidAPI for Redfin Data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container">
        {/* Market Selector Banner */}
        <div className="mb-10 bg-slate-900 border border-white/10 p-2 rounded-[2.5rem] flex items-center shadow-2xl overflow-hidden relative">
          <button 
            onClick={() => setMarketType('sale')}
            className={`flex-1 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${marketType === 'sale' ? 'bg-primary text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}
          >
            For Sale
          </button>
          <button 
            onClick={() => setMarketType('rent')}
            className={`flex-1 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${marketType === 'rent' ? 'bg-primary text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}
          >
            For Rent
          </button>
          <button 
            onClick={() => setMarketType('sold')}
            className={`flex-1 py-4 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all ${marketType === 'sold' ? 'bg-primary text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}
          >
            Recently Sold
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
              <div className="w-8 h-[2px] bg-primary"></div>
              Redfin Market Feed
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              Inventory in <br/>
              <span className="text-primary italic underline underline-offset-8 decoration-primary/20">{searchLocation.split(',')[0]}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-border/50 shadow-xl">
             <div className="flex bg-muted/50 p-1 rounded-2xl">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <List size={20} />
                </button>
             </div>
             <button className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold hover:bg-muted transition-all text-sm border-l border-border/50">
               <SlidersHorizontal size={18} />
               Filters
             </button>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-[3rem] overflow-hidden border border-border/40 h-[500px] animate-pulse">
                <div className="h-64 bg-slate-200"></div>
                <div className="p-10 space-y-5">
                  <div className="h-8 bg-slate-200 rounded-full w-3/4"></div>
                  <div className="h-5 bg-slate-200 rounded-full w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-10 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {properties.map(property => (
              <div key={property.id} className="relative group animate-fade-in">
                <PropertyCard property={property} horizontal={viewMode === 'list'} />
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all z-20">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white hover:bg-primary transition-all cursor-pointer">
                    <ExternalLink size={20} />
                  </div>
                </div>
                {property.status === 'SOLD' && (
                  <div className="absolute top-8 left-8 z-20 bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Sold Out
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;

