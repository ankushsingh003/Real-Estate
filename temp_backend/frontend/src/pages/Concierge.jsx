import React, { useState, useRef, useEffect } from 'react';
import { Send, User, ArrowLeft, MessageSquare, Phone, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const Concierge = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm Sarah from LuxeEstate. I'm here to help you find your perfect home. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulated human agent response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I've received your request! Let me check our latest listings for you. Our team is here to ensure you get the best deal." 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container max-w-4xl">
        {/* Simple Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-semibold text-sm transition-all">
          <ArrowLeft size={18} /> Back to Listings
        </Link>

        {/* Agent Header */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-border mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                alt="Agent" 
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sarah from LuxeEstate</h1>
              <p className="text-sm text-muted-foreground font-medium">Expert Real Estate Advisor</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-slate-50 flex-center text-muted-foreground hover:text-primary transition-all">
              <Phone size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-50 flex-center text-muted-foreground hover:text-primary transition-all">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Chat Window - Pure White Theme */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-border min-h-[600px] flex flex-col">
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-8 md:p-10 overflow-y-auto space-y-6 scroll-smooth bg-slate-50/30"
            style={{ maxHeight: '500px' }}
          >
            <div className="text-center mb-8">
              <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border shadow-sm">
                Today
              </span>
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[75%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                    {msg.role === 'assistant' ? <MessageSquare size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[15px] leading-relaxed ${
                    msg.role === 'assistant' 
                    ? 'bg-white text-foreground border border-border shadow-sm' 
                    : 'bg-primary text-white shadow-md font-medium'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-center bg-white px-4 py-2 rounded-full border border-border shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-muted-foreground text-xs font-medium italic">Sarah is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Interface */}
          <div className="p-6 bg-white border-t border-border">
            <form onSubmit={handleSend} className="flex items-center gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Sarah about architectural styles, pricing, or locations..."
                className="flex-1 bg-slate-50 border border-border rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white transition-all font-medium text-foreground"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-primary text-white w-14 h-14 rounded-2xl flex-center shadow-lg hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100"
              >
                <Send size={24} />
              </button>
            </form>
            <p className="text-center text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-widest">
              Our real agents are here to solve all your queries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concierge;
