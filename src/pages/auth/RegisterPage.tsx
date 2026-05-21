// src/pages/auth/RegisterPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleDollarSign, Building2, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [isLoading, setIsLoading] = useState(false);
  const [strengthScore, setStrengthScore] = useState(0);

  // Password Strength Logic
  useEffect(() => {
    let score = 0;
    if (password.length > 0) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    setStrengthScore(score);
  }, [password]);

  const getStrengthColor = () => {
    if (strengthScore === 0) return 'bg-secondary';
    if (strengthScore === 1) return 'bg-red-500';
    if (strengthScore === 2) return 'bg-amber-500';
    if (strengthScore === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strengthScore === 0) return '';
    if (strengthScore === 1) return 'Weak';
    if (strengthScore === 2) return 'Fair';
    if (strengthScore === 3) return 'Good';
    return 'Strong';
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate('/login');
    } catch (error) {
      // Error handled by toast in AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] opacity-[0.03] bg-primary rounded-full blur-[100px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center">
             <ShieldCheck className="text-primary-foreground" size={24} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground tracking-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/60 font-medium">
          Join the Nexus network and connect with partners.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-background border border-border py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

          <form className="space-y-5 animate-slide-up" onSubmit={handleRegisterSubmit}>
            
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">I am registering as an</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setRole('entrepreneur')} className={`py-3 px-4 border rounded-xl flex items-center justify-center font-medium transition-all ${role === 'entrepreneur' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border text-foreground/70 hover:bg-secondary'}`}>
                  <Building2 size={18} className="mr-2" /> Entrepreneur
                </button>
                <button type="button" onClick={() => setRole('investor')} className={`py-3 px-4 border rounded-xl flex items-center justify-center font-medium transition-all ${role === 'investor' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border text-foreground/70 hover:bg-secondary'}`}>
                  <CircleDollarSign size={18} className="mr-2" /> Investor
                </button>
              </div>
            </div>
            
            <Input label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required fullWidth startAdornment={<User size={18} className="text-foreground/40" />} placeholder="John Doe" />
            
            <Input label="Work Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth startAdornment={<Mail size={18} className="text-foreground/40" />} placeholder="john@company.com" />
            
            <div>
              <Input label="Secure Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} className="text-foreground/40" />} placeholder="••••••••" />
              
              {/* Password Strength Meter - Now appropriately placed during account creation! */}
              {password.length > 0 && (
                <div className="mt-3 space-y-1.5 animate-fade-in bg-secondary/30 p-3 rounded-lg border border-border/50">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-foreground/70 font-semibold uppercase tracking-wider">Security Level</span>
                    <span className={`font-bold ${strengthScore >= 3 ? 'text-green-500' : 'text-foreground/80'}`}>
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-secondary">
                    <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 1 ? '25%' : '0%' }}></div>
                    <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 2 ? '25%' : '0%' }}></div>
                    <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 3 ? '25%' : '0%' }}></div>
                    <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 4 ? '25%' : '0%' }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center pt-2">
              <input id="terms" type="checkbox" required className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary" />
              <label htmlFor="terms" className="ml-2 block text-sm font-medium text-foreground/80">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading} rightIcon={<ArrowRight size={18} />} className="mt-2" disabled={password.length > 0 && strengthScore < 2}>
              Create Account
            </Button>

            <div className="mt-6 border-t border-border/50 pt-6 text-center">
              <p className="text-sm text-foreground/60 font-medium">
                Already have an account? <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};