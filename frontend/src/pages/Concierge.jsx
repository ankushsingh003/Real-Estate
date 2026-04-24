import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Concierge = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Welcome to LuxeEstate Concierge. I'm your AI architectural advisor. How can I assist you with your property search today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
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

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I've received your inquiry about "${userMsg}". I'm currently indexing our luxury listings to find the perfect match for you. (RAG Pipeline Integration Coming Soon...)` 
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container max-w-4xl">
        {/* Breadcrumb / Back button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex-center text-white shadow-xl shadow-primary/20">
              <Bot size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black italic text-foreground">Luxe<span className="text-primary">Concierge</span></h1>
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Neural Agent Online
              </div>
            </div>
          </div>
          <div className="hidden sm:flex gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} className="text-primary" /> Verified
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
              <Zap size={16} className="text-primary" /> RAG-v1
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white min-h-[600px] flex flex-col">
          {/* Chat Window */}
          <div 
            ref={scrollRef}
            className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6 bg-neutral-950 scroll-smooth"
            style={{ maxHeight: '500px' }}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex-center shrink-0 shadow-lg ${msg.role === 'assistant' ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                    {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className={`p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'assistant' ? 'bg-neutral-900 text-neutral-300 border border-neutral-800/50' : 'bg-primary text-white font-medium'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-4 items-center bg-neutral-900 p-4 rounded-2xl border border-neutral-800/50 shadow-lg">
                  <Loader2 size={18} className="animate-spin text-primary" />
                  <span className="text-neutral-500 text-sm font-medium italic">Concierge is processing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Interface */}
          <div className="p-6 bg-white border-t border-border">
            <form onSubmit={handleSend} className="relative flex items-center gap-3">
              <div className="relative flex-1 group">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties, styles, or market trends..."
                  className="w-full bg-slate-50 border-2 border-border rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-medium text-foreground"
                />
              </div>
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-primary text-white p-4 rounded-2xl hover:bg-primary-hover shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:hover:bg-primary"
              >
                <Send size={24} />
              </button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Encrypted Session</span>
              <div className="w-1 h-1 bg-border rounded-full"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Neural RAG Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concierge;
