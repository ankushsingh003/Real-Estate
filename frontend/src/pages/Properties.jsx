import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, Loader2 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for all properties
  const allProperties = [
    {
      id: 1,
      title: "Modern Minimalist Villa",
      location: "Beverly Hills, CA",
      price: 2500000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"
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
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
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
      image: "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 4,
      title: "Sunset Boulevard Estate",
      location: "Los Angeles, CA",
      price: 5900000,
      beds: 6,
      baths: 5,
      sqft: 6800,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 5,
      title: "Lakeside Modern Cabin",
      location: "Lake Tahoe, NV",
      price: 950000,
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: "For Rent",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 6,
      title: "High-Rise Urban Loft",
      location: "Chicago, IL",
      price: 1200000,
      beds: 2,
      baths: 2,
      sqft: 1500,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = allProperties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 container">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Properties</h1>
          <p className="text-muted-foreground">Find your dream home from our curated selection of global listings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by city or property..." 
              className="bg-white border-2 border-border rounded-2xl pl-12 pr-6 py-3 w-full md:w-[350px] outline-none focus:border-primary transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white border-2 border-border p-3 rounded-2xl hover:bg-muted transition-all">
            <SlidersHorizontal size={24} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {['All Properties', 'For Sale', 'For Rent', 'Apartments', 'Villas', 'Commercial'].map((filter, i) => (
          <button 
            key={filter} 
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${i === 0 ? 'bg-primary text-white shadow-lg' : 'bg-white border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[400px] bg-muted rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 glass rounded-[3rem]">
              <div className="text-muted-foreground mb-4">No properties found matching "{searchTerm}"</div>
              <button onClick={() => setSearchTerm('')} className="text-primary font-bold hover:underline">Clear search</button>
            </div>
          )}
        </>
      )}

      {/* Load More */}
      {!loading && filteredProperties.length > 0 && (
        <div className="flex-center mt-16">
          <button className="bg-white border-2 border-border px-8 py-3 rounded-2xl font-bold hover:bg-muted transition-all">
            Load More Listings
          </button>
        </div>
      )}
    </div>
  );
};

export default Properties;
