import React from 'react';
import { Home, Mail, Phone, MapPin, Globe, Send, Share2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-card text-dark-card-foreground pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg text-white">
                <Home size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Luxe<span className="text-primary">Estate</span>
              </span>
            </Link>
            <p className="text-dark-muted-foreground leading-relaxed">
              Making the search for your dream home effortless and elegant. We provide the finest selection of premium real estate worldwide.
            </p>
            <div className="flex gap-4">
              {[Globe, Send, MessageCircle, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-dark-muted flex-center hover:bg-primary transition-all text-white">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-dark-muted-foreground">
              <li><Link to="/properties" className="hover:text-primary transition-colors">Properties</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Services</h4>
            <ul className="flex flex-col gap-4 text-dark-muted-foreground">
              <li><Link to="/buy" className="hover:text-primary transition-colors">Buy Property</Link></li>
              <li><Link to="/sell" className="hover:text-primary transition-colors">Sell Property</Link></li>
              <li><Link to="/rent" className="hover:text-primary transition-colors">Rent Property</Link></li>
              <li><Link to="/mortgage" className="hover:text-primary transition-colors">Mortgage</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-dark-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={20} />
                <span>123 Luxury Ave, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={20} />
                <span>hello@luxeestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-dark-muted mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-dark-muted-foreground text-sm">
          <p>© 2024 LuxeEstate. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
