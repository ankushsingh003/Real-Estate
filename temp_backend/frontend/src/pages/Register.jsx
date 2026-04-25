import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserCheck, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from '../components/Input';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success(response.data.message || 'Registration successful! Please verify your email.');
      navigate('/verify-email', { state: { email: formData.email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex-center px-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-2xl animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Create Account</h2>
          <p className="text-muted-foreground">Join our premium real estate community</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Full Name"
            name="name"
            placeholder="John Doe"
            icon={User}
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            required
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-foreground/80 ml-1">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              {['buyer', 'seller'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  className={`py-3 rounded-2xl border-2 font-bold capitalize transition-all ${
                    formData.role === role
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-transparent text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex-center gap-2 mt-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
