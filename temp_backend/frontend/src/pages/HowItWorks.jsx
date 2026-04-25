import React from 'react';
import { Search, Home, Handshake, ShieldCheck, MessageCircle, TrendingUp, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      title: "Discover Your Dream",
      desc: "Browse our curated collection of high-end listings. Use advanced filters to find the perfect architecture, location, and lifestyle.",
      icon: <Search size={32} />,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Direct Connection",
      desc: "Connect directly with luxury specialists or owners. Our platform ensures instant, transparent communication without the middleman noise.",
      icon: <MessageCircle size={32} />,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Transparent Valuation",
      desc: "Every listing is verified. Access detailed market data, historical pricing, and full architectural breakdowns for complete peace of mind.",
      icon: <ShieldCheck size={32} />,
      color: "bg-emerald-500/10 text-emerald-500"
    },
    {
      title: "Secure Closing",
      desc: "Experience a streamlined, digital-first closing process. We facilitate secure documentation and transparent legal handovers.",
      icon: <Handshake size={32} />,
      color: "bg-amber-500/10 text-amber-500"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="container">
        {/* Hero Header */}
        <div className="max-w-3xl mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Real Estate, <span className="text-primary italic">Reimagined.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At LuxeEstate, we've stripped away the complexity of traditional real estate. No hidden fees, no opaque processes—just a transparent bridge between dreamers and their homes.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {steps.map((step, idx) => (
            <div key={idx} className="glass p-10 rounded-[3rem] hover:scale-[1.05] transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-foreground/5 pointer-events-none group-hover:text-primary/10 transition-colors">
                {idx + 1}
              </div>
              <div className={`${step.color} w-16 h-16 rounded-2xl flex-center mb-8 group-hover:rotate-12 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Transparency Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative glass p-12 rounded-[4rem] border-2 border-primary/20 shadow-2xl">
              <div className="flex gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary flex-center text-white"><Zap size={24} /></div>
                <h2 className="text-3xl font-black italic">The Luxe Transparency</h2>
              </div>
              <div className="space-y-6">
                {[
                  "Zero hidden commissions for buyers.",
                  "Direct messaging with property owners.",
                  "Real-time market volatility tracking.",
                  "Verified architectural documentation.",
                  "Smart-contract ready transaction hooks."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex-center p-1 group-hover:bg-primary transition-all">
                      <div className="w-full h-full bg-transparent rounded-full group-hover:bg-white"></div>
                    </div>
                    <span className="text-lg font-semibold text-foreground/80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              A Direct Bridge <br/> 
              <span className="text-primary">From Click to Key.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're selling a legacy estate or buying your first penthouse, our platform provides the tools you need to stay in control. Every transaction is logged, every communication is encrypted, and every price is fair.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link to="/register" className="bg-primary text-white px-10 py-5 rounded-3xl font-bold shadow-2xl hover:scale-105 transition-all text-center">
                Join the Network
              </Link>
              <Link to="/properties" className="bg-white border-2 border-border text-foreground px-10 py-5 rounded-3xl font-bold hover:bg-muted transition-all text-center">
                Browse Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Transparent Fee", val: "0%" },
            { label: "Verified Listings", val: "100%" },
            { label: "Global Presence", val: "45+" },
            { label: "User Privacy", val: "End-to-End" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 bg-muted/20 rounded-[2.5rem] border border-border/50">
              <div className="text-4xl font-black text-primary mb-2">{stat.val}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
