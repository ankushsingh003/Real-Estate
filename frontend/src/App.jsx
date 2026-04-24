import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ArrowRight } from 'lucide-react';
import PropertyCard from './components/PropertyCard';

import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import PostProperty from './pages/PostProperty';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import HowItWorks from './pages/HowItWorks';








// Placeholder Pages
const Home = () => {
  const [properties, setProperties] = React.useState([
    {
      id: 1,
      title: "Modern Minimalist Villa",
      location: "Beverly Hills, CA",
      price: 2500000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "For Sale",
      query: "modern-villa"
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
      query: "penthouse-luxury"
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
      query: "contemporary-house-ocean"
    }
  ]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // High-resolution architectural photography links
    const images = [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200", // Villa
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", // Penthouse
      "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1200"  // Contemporary
    ];

    const fetchImages = () => {
      const updatedProperties = properties.map((prop, index) => ({
        ...prop,
        image: images[index]
      }));
      
      setTimeout(() => {
        setProperties(updatedProperties);
        setLoading(false);
      }, 800);
    };

    fetchImages();
  }, []);

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mb-32">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-balance">
            Find Your Next <span className="text-primary">Perfect</span> Home
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            Discover a premium collection of homes, apartments, and luxury villas curated just for you. Experience the new standard of real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/properties" className="bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:bg-primary-hover hover:scale-105 transition-all text-center">
              Browse Properties
            </Link>
            <Link to="/how-it-works" className="bg-white border-2 border-border text-foreground px-8 py-4 rounded-2xl text-lg font-bold hover:bg-muted transition-all text-center">
              How it works
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground">Handpicked luxury listings that offer the best in comfort, design, and location.</p>
          </div>
          <Link to="/properties" className="text-primary font-bold hover:underline flex items-center gap-2">
            View All Properties <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton Loading State
            [1, 2, 3].map(i => (
              <div key={i} className="h-[400px] bg-muted rounded-3xl animate-pulse"></div>
            ))
          ) : (
            properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/add-property" element={<PostProperty />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/how-it-works" element={<HowItWorks />} />




            {/* Add more routes here as we build them */}
          </Routes>

        </main>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
