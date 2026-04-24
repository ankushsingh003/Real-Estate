import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';

// Placeholder Pages
const Home = () => (
  <div className="pt-32 pb-20">
    <section className="container">
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
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more routes here as we build them */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
