import React from 'react';
import { Home, Mail, Phone, MapPin, Globe, Send, Share2, MessageCircle } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & About */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Home size={28} />
              </div>
              <span className="text-2xl font-black tracking-tight italic">
                Luxe<span className="text-primary">Estate</span>
              </span>
            </Link>
            <p className="text-neutral-400 leading-relaxed text-lg">
              Redefining the art of luxury living. We connect the world's most discerning buyers with the most extraordinary architectural masterpieces.
            </p>
            <div className="flex gap-4">
              {[Globe, Send, MessageCircle, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex-center hover:bg-primary hover:border-primary hover:scale-110 transition-all text-neutral-400 hover:text-white group">
                  <Icon size={20} />
                </a>
              ))}
            </div>

          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Explore
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-neutral-400">
              {['Properties', 'About Us', 'How it Works', 'Our Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-neutral-700 rounded-full group-hover:bg-primary group-hover:w-3 transition-all"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Services
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-neutral-400">
              {['Buy Property', 'Sell Your Home', 'Luxury Rentals', 'Mortgage Advice', 'VIP Concierge'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-neutral-700 rounded-full group-hover:bg-primary group-hover:w-3 transition-all"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-6 text-neutral-400">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <span className="text-sm leading-relaxed pt-1">123 Luxury Ave, <br/>Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-sm">+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-sm truncate">hello@luxeestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-neutral-900 w-full mb-10"></div>
        
        {/* Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500 text-xs font-medium uppercase tracking-[0.2em]">
          <p>© 2024 LuxeEstate. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
