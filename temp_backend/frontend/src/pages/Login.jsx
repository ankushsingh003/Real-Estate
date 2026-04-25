import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from '../components/Input';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      toast.success('Welcome back!');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex-center px-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-2xl animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to your LuxeEstate account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          <div className="flex flex-col gap-2">
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
            <Link to="/forgot-password" size="sm" className="text-sm font-semibold text-primary hover:underline self-end">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex-center gap-2 mt-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Sign In <LogIn size={20} /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
