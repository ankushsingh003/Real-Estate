import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import PostProperty from './pages/PostProperty';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import HowItWorks from './pages/HowItWorks';
import Concierge from './pages/Concierge';


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
            <Route path="/concierge" element={<Concierge />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
