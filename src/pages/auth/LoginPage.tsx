// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleDollarSign, Building2, AlertCircle, ShieldCheck, Mail, Lock, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

type LoginStep = 'credentials' | '2fa' | 'success';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<LoginStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [otp, setOtp] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setError(null);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep('2fa');
    }, 800);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;

    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password, role);
      setStep('success');
      setTimeout(() => {
        navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
      }, 1500);
    } catch (err) {
      setError((err as Error).message);
      setStep('credentials'); 
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.03] bg-primary rounded-full blur-[100px] pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <img src="public/logo.svg" alt="Nexus Logo" className="w-12 h-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/60">
          Sign in to your Nexus Command Center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-background border border-border py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg flex items-start animate-fade-in">
              <AlertCircle size={18} className="mr-2 mt-0.5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}
          
          {step === 'credentials' && (
            <form className="space-y-6 animate-slide-up" onSubmit={handleCredentialsSubmit}>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">I am an</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setRole('entrepreneur')} className={`py-3 px-4 border rounded-xl flex items-center justify-center font-medium transition-all ${role === 'entrepreneur' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border text-foreground/70 hover:bg-secondary'}`}>
                    <Building2 size={18} className="mr-2" /> Entrepreneur
                  </button>
                  <button type="button" onClick={() => setRole('investor')} className={`py-3 px-4 border rounded-xl flex items-center justify-center font-medium transition-all ${role === 'investor' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border text-foreground/70 hover:bg-secondary'}`}>
                    <CircleDollarSign size={18} className="mr-2" /> Investor
                  </button>
                </div>
              </div>
              
              <Input label="Work Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth startAdornment={<Mail size={18} className="text-foreground/40" />} />
              
              <div>
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth startAdornment={<Lock size={18} className="text-foreground/40" />} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-foreground/80">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
                </div>
              </div>
              
              <Button type="submit" fullWidth isLoading={isLoading} rightIcon={<ArrowRight size={18} />}>
                Continue Securely
              </Button>

              <div className="mt-6 border-t border-border/50 pt-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button variant="outline" type="button" onClick={() => fillDemoCredentials('entrepreneur')} className="text-xs py-2">Demo Entrepreneur</Button>
                  <Button variant="outline" type="button" onClick={() => fillDemoCredentials('investor')} className="text-xs py-2">Demo Investor</Button>
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground/60 font-medium">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-primary/80 transition-colors">Sign up</Link>
                  </p>
                </div>
              </div>
            </form>
          )}

          {step === '2fa' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6 animate-slide-up">
              <button type="button" onClick={() => setStep('credentials')} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-2 block">&larr; Back to login</button>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={32} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Two-Step Verification</h2>
                <p className="text-sm text-foreground/60 mt-2">We sent a 6-digit code to <strong>{email}</strong>.</p>
              </div>

              <div>
                <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} placeholder="000000" className="text-center text-2xl tracking-[0.5em] font-mono h-14" fullWidth required />
                <p className="text-xs text-center text-foreground/50 mt-3 flex items-center justify-center gap-1 font-medium"><AlertCircle size={14} /> Any 6 digits will work for this demo.</p>
              </div>

              <Button type="submit" fullWidth isLoading={isLoading} className="h-12" disabled={otp.length !== 6}>Verify & Authenticate</Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8 animate-fade-in">
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Access Granted</h2>
              <p className="text-foreground/60 mt-2 font-medium">Connecting to secure portal...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};