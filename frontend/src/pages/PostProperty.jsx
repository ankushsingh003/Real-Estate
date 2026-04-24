import React, { useState } from 'react';
import { Camera, Search, Plus, X, Home, MapPin, DollarSign, Layout, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Input from '../components/Input';

const PostProperty = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searching, setSearching] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    description: '',
    type: 'For Sale'
  });

  // Function to search Unsplash (using their public source as a quick search tool)
  const searchUnsplash = async () => {
    if (!searchQuery) return;
    setSearching(true);
    try {
      // For now, we'll use a curated list of high-end property IDs to simulate a search
      // In a real app, you'd call the Unsplash API here
      const results = [
        `https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1000&q=${searchQuery}`,
        `https://images.unsplash.com/photo-1600607687940-4e5a29615527?auto=format&fit=crop&q=80&w=1000&q=${searchQuery}`,
        `https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1000&q=${searchQuery}`,
        `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000&q=${searchQuery}`,
        `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000&q=${searchQuery}`,
        `https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1000&q=${searchQuery}`
      ];
      setSearchResults(results);
    } catch (error) {
      toast.error("Failed to load images");
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please select a property image");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Property listed successfully!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">List Your Property</h1>
          <p className="text-muted-foreground">Fill in the details to reach thousands of potential buyers.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-[2rem] space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layout className="text-primary" size={20} />
                Property Details
              </h2>
              
              <Input 
                label="Property Title"
                placeholder="e.g. Modern Minimalist Villa"
                icon={<Home size={20} />}
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Location"
                  placeholder="Beverly Hills, CA"
                  icon={<MapPin size={20} />}
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
                <Input 
                  label="Price ($)"
                  type="number"
                  placeholder="2,500,000"
                  icon={<DollarSign size={20} />}
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <Input label="Beds" type="number" placeholder="4" required value={formData.beds} onChange={(e) => setFormData({...formData, beds: e.target.value})} />
                <Input label="Baths" type="number" placeholder="3" required value={formData.baths} onChange={(e) => setFormData({...formData, baths: e.target.value})} />
                <Input label="Sqft" type="number" placeholder="3200" required value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground/80">Description</label>
                <textarea 
                  className="w-full bg-muted/50 border-2 border-border rounded-2xl p-4 focus:border-primary focus:bg-white transition-all outline-none min-h-[150px]"
                  placeholder="Describe your property..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Image Sidebar */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-[2rem] space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon className="text-primary" size={20} />
                Property Image
              </h2>

              {selectedImage ? (
                <div className="relative rounded-2xl overflow-hidden group">
                  <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-2xl h-48 flex-center flex-col gap-2 text-muted-foreground bg-muted/20">
                  <Camera size={40} className="opacity-20" />
                  <p className="text-sm">No image selected</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Search Unsplash..."
                    className="flex-1 bg-muted/50 border-2 border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={searchUnsplash}
                    className="bg-primary text-white p-2 rounded-xl hover:bg-primary-hover transition-all"
                  >
                    {searching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                  {searchResults.map((url, idx) => (
                    <img 
                      key={idx} 
                      src={url} 
                      className="h-20 w-full object-cover rounded-lg cursor-pointer hover:ring-2 ring-primary transition-all"
                      onClick={() => setSelectedImage(url)}
                    />
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                List Property
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProperty;
