import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PropertyCard from './components/PropertyCard';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';




// Placeholder Pages
const Home = () => {
  const featuredProperties = [
    {
      id: 1,
      title: "Modern Minimalist Villa",
      location: "Beverly Hills, CA",
      price: 2500000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1600585154340-be6199f7c096?auto=format&fit=crop&q=80&w=1000"
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
      image: "https://images.unsplash.com/photo-1600607687940-4e5a29615527?auto=format&fit=crop&q=80&w=1000"
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
      image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mb-32">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Find Your Next <span className="text-primary">Perfect</span> Home
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Discover a premium collection of homes, apartments, and luxury villas curated just for you. Experience the new standard of real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:bg-primary-hover hover:scale-105 transition-all">
              Browse Properties
            </button>
            <button className="bg-white border-2 border-border text-foreground px-8 py-4 rounded-2xl text-lg font-bold hover:bg-muted transition-all">
              How it works
            </button>
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
          <Link to="/properties" className="text-primary font-bold hover:underline">
            View All Properties →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
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
            {/* Add more routes here as we build them */}
          </Routes>

        </main>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
