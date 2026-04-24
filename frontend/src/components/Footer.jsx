import React from 'react';
import { Home, Mail, Phone, MapPin, Globe, Send, Share2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-slate-900/10 backdrop-blur-xl border-t border-slate-200/50 pt-24 pb-12 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & About */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Home size={28} />
              </div>
              <span className="text-2xl font-black tracking-tighter italic text-slate-900">
                Luxe<span className="text-primary">Estate</span>
              </span>
            </Link>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              Redefining the art of luxury living. We connect the world's most discerning buyers with the most extraordinary architectural masterpieces.
            </p>
            <div className="flex gap-4">
              {[Globe, Send, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-xl bg-white/40 border border-slate-200 flex-center hover:bg-primary hover:border-primary hover:scale-110 transition-all text-slate-500 hover:text-white shadow-sm group">
                  <Icon size={20} />
                </a>
              ))}
              <button 
                onClick={async (e) => {
                  e.preventDefault();
                  const shareData = {
                    title: 'LuxeEstate',
                    text: 'Check out these premium luxury properties on LuxeEstate!',
                    url: window.location.href
                  };
                  try {
                    if (navigator.share) {
                      await navigator.share(shareData);
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                      import('react-hot-toast').then(t => t.toast.success('Link copied!'));
                    }
                  } catch (err) { console.log(err); }
                }}
                className="w-11 h-11 rounded-xl bg-white/40 border border-slate-200 flex-center hover:bg-primary hover:border-primary hover:scale-110 transition-all text-slate-500 hover:text-white shadow-sm group"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-slate-900 uppercase tracking-widest text-xs">
              Explore
              <div className="absolute -bottom-2 left-0 w-6 h-1 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-slate-600">
              {['Properties', 'About Us', 'How it Works', 'Our Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary hover:translate-x-2 transition-all flex items-center gap-2 group font-bold text-sm uppercase tracking-widest">
                    <div className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-primary group-hover:w-3 transition-all"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-slate-900 uppercase tracking-widest text-xs">
              Services
              <div className="absolute -bottom-2 left-0 w-6 h-1 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-4 text-slate-600">
              {['Buy Property', 'Sell Your Home', 'Luxury Rentals', 'Mortgage Advice', 'VIP Concierge'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary hover:translate-x-2 transition-all flex items-center gap-2 group font-bold text-sm uppercase tracking-widest">
                    <div className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-primary group-hover:w-3 transition-all"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block text-slate-900 uppercase tracking-widest text-xs">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-6 h-1 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-6 text-slate-600">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/40 border border-slate-200 flex-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <MapPin size={20} />
                </div>
                <span className="text-sm leading-relaxed pt-1 font-bold text-slate-800">123 Luxury Ave, <br/>Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/40 border border-slate-200 flex-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Phone size={20} />
                </div>
                <span className="text-sm font-bold text-slate-800">+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/40 border border-slate-200 flex-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Mail size={20} />
                </div>
                <span className="text-sm truncate font-bold text-slate-800">hello@luxeestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-slate-200 w-full mb-10"></div>
        
        {/* Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
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
