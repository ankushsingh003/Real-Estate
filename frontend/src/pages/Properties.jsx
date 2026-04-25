import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, MapPin, Search, Loader2, Building2, ExternalLink, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const searchLocation = queryParams.get('location') || 'California';
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');

  const API_KEY = '024dd1fb131f408fb46a8da3af6f10a2';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, [location.search]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // Construct parameters for Rentcast API
      // Defaulting to California if no search coordinates
      let url = `https://api.rentcast.io/v1/listings/sale?state=CA&limit=12&status=Active`;
      
      if (lat && lng) {
        url = `https://api.rentcast.io/v1/listings/sale?latitude=${lat}&longitude=${lng}&radius=20&limit=12&status=Active`;
      } else if (searchLocation && searchLocation !== 'Global') {
        // If we have a city name but no coords, we try to use state/city if possible
        // For simplicity in this step, we stick to the provided coords or a default state
        const cityPart = searchLocation.split(',')[0].trim();
        url = `https://api.rentcast.io/v1/listings/sale?city=${encodeURIComponent(cityPart)}&limit=12&status=Active`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-Api-Key': API_KEY
        }
      });

      const data = await response.json();
      
      if (response.status === 401 || !Array.isArray(data)) {
        throw new Error(data.message || "Subscription Inactive");
      }

      const mappedProperties = data.map(item => ({
        id: item.id,
        title: item.addressLine1 || "Premium Estate",
        location: `${item.city}, ${item.state} ${item.zipCode}`,
        price: item.price || 0,
        beds: item.bedrooms || 0,
        baths: item.bathrooms || 0,
        sqft: item.squareFootage || 0,
        type: item.propertyType || "Single Family",
        image: (item.images && item.images.length > 0) ? item.images[0] : "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200",
        status: item.status,
        daysOnMarket: item.daysOnMarket
      }));
      setProperties(mappedProperties);
    } catch (error) {
      console.error("Rentcast API Error:", error.message);
      // Fallback to high-fidelity sample data if API fails
      const sampleProperties = [1, 2, 3, 4, 5, 6].map(i => ({
        id: `sample-${i}`,
        title: `Luxe ${['Manor', 'Villa', 'Penthouse', 'Estate', 'Retreat', 'Mansion'][i-1]}`,
        location: `Sample Area ${i}, CA`,
        price: 1500000 + (i * 250000),
        beds: 3 + (i % 2),
        baths: 2 + (i % 2),
        sqft: 2500 + (i * 300),
        type: "Sample Data",
        image: `https://images.unsplash.com/photo-${[
          '1600596542815-ffad4c1539a9',
          '1600607687940-477a128f0a85',
          '1600585154340-be6199f7c096',
          '1613490493576-7fde63acd811',
          '1512917774080-9991f1c4c750',
          '1600566753190-17f0bcd2a6c4'
        ][i-1]}?auto=format&fit=crop&q=80&w=1200`,
        status: "Active",
        daysOnMarket: i * 2
      }));
      setProperties(sampleProperties);
      toast.error("Using Sample Data: Please activate Rentcast subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container">
        {/* Real-Time Market Status Banner */}
        <div className="mb-10 bg-slate-900 border border-white/10 p-6 rounded-[2.5rem] flex items-center justify-between animate-fade-in shadow-2xl overflow-hidden relative group">
          <div className="flex items-center gap-5 relative z-10">
            <div className="bg-primary p-3.5 rounded-2xl text-white shadow-xl shadow-primary/20">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">Live Market Data</p>
              <p className="text-lg text-white font-serif italic">Connected to <span className="text-primary not-italic font-bold">Rentcast Real Estate Feed</span></p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white relative z-10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            Authentic Inventory Sync Active
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 blur-3xl rounded-full -mr-20"></div>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4">
              <div className="w-8 h-[2px] bg-primary"></div>
              Market Listings
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
              Real Estates in <br/>
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
                  <div className="flex gap-4">
                    <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
                    <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-border/50">
            <Search className="mx-auto text-muted-foreground/30 mb-6" size={64} />
            <h3 className="text-2xl font-bold mb-2">No Properties Found</h3>
            <p className="text-muted-foreground">Try expanding your search radius or using a different location.</p>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;

