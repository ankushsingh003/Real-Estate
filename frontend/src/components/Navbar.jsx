import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Heart, User, Menu, X, Plus as PlusIcon } from 'lucide-react';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Find Property', path: '/properties', icon: <Search size={18} /> },
    { name: 'Favorites', path: '/favorites', icon: <Heart size={18} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container flex-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2.5 rounded-xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
            <Home size={26} />
          </div>
          <span className={`text-2xl font-black tracking-tighter italic transition-colors duration-500 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
            Luxe<span className="text-primary">Estate</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 hover:text-primary ${isScrolled ? 'text-muted-foreground' : 'text-white/80 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/add-property" className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest transition-all duration-500 hover:text-primary ${isScrolled ? 'text-foreground' : 'text-white'}`}>
            <PlusIcon size={18} />
            <span>Post Property</span>
          </Link>
          <Link to="/login" className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
            Sign In
          </Link>
        </div>


        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-6 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] bg-border my-2"></div>
            <Link 
              to="/add-property" 
              className="flex items-center gap-3 text-lg font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PlusCircle size={20} />
              Post Property
            </Link>
            <Link 
              to="/login" 
              className="bg-primary text-white text-center py-3 rounded-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
