import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from '../components/Input';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email missing. Please register again.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-email', {
        email,
        verificationCode: code
      });
      toast.success(response.data.message || 'Email verified successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex-center px-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-2xl animate-fade-in text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex-center mx-auto mb-6 text-primary">
          <Mail size={40} />
        </div>
        
        <h2 className="text-3xl font-bold mb-3">Verify Email</h2>
        <p className="text-muted-foreground mb-10">
          We've sent a 6-digit verification code to <span className="font-bold text-foreground">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-center text-2xl tracking-[0.5em] font-bold"
          />

          <button
            type="submit"
            disabled={loading || code.length < 6}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-primary-hover hover:scale-[1.02] transition-all flex-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Verify Account <CheckCircle size={20} /></>}
          </button>
        </form>

        <button 
          onClick={() => toast.success("Code resent!")}
          className="mt-8 text-sm font-semibold text-primary hover:underline"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
