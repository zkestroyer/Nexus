// src/features/auth/MultiStepLogin.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, KeyRound, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

type LoginStep = 'credentials' | '2fa' | 'success';

export default function MultiStepLogin() {
  const navigate = useNavigate();
  
  // State Machine for UI Steps
  const [step, setStep] = useState<LoginStep>('credentials');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password Strength State
  const [strengthScore, setStrengthScore] = useState(0);

  // Calculate Password Strength on every keystroke
  useEffect(() => {
    let score = 0;
    if (password.length > 0) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    setStrengthScore(score);
  }, [password]);

  const getStrengthColor = () => {
    if (strengthScore === 0) return 'bg-gray-200 dark:bg-gray-800';
    if (strengthScore === 1) return 'bg-red-500';
    if (strengthScore === 2) return 'bg-yellow-500';
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

  // Mock Handlers
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setStep('2fa'); // Move to OTP step
    }, 800);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;

    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      
      // Route based on email mock (Role-Based Access)
      setTimeout(() => {
        if (email.includes('investor')) {
          navigate('/investors'); // Or wherever your Investor Dashboard is routed
        } else {
          navigate('/dashboard'); // Default to Entrepreneur
        }
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md p-8 bg-background border-border shadow-2xl rounded-2xl relative overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>

        {/* --- STEP 1: Credentials & Password Strength --- */}
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-6 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Secure Login</h2>
              <p className="text-sm text-foreground/60 mt-1">Enter your Nexus platform credentials.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Work Email</label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  fullWidth 
                  startAdornment={<Mail size={18} className="text-gray-400" />}
                  required
                />
                <p className="text-xs text-foreground/50 mt-1.5">Tip: Type 'investor@test.com' to test role routing.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  fullWidth 
                  startAdornment={<Lock size={18} className="text-gray-400" />}
                  required
                />
                
                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="mt-3 space-y-1.5 animate-fade-in">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/70 font-medium">Password strength:</span>
                      <span className={`font-bold ${strengthScore >= 3 ? 'text-green-500' : 'text-foreground/70'}`}>
                        {getStrengthLabel()}
                      </span>
                    </div>
                    <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                      <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 1 ? '25%' : '0%' }}></div>
                      <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 2 ? '25%' : '0%' }}></div>
                      <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 3 ? '25%' : '0%' }}></div>
                      <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: strengthScore >= 4 ? '25%' : '0%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading} className="mt-6 text-base h-12">
              Continue <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>
        )}

        {/* --- STEP 2: Two-Factor Authentication (OTP) --- */}
        {step === '2fa' && (
          <form onSubmit={handleOtpSubmit} className="space-y-6 animate-slide-up">
            <button 
              type="button" 
              onClick={() => setStep('credentials')}
              className="text-sm text-primary hover:underline mb-2 block"
            >
              &larr; Back to login
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound size={32} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Two-Step Verification</h2>
              <p className="text-sm text-foreground/60 mt-2">
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below to confirm your identity.
              </p>
            </div>

            <div>
              <Input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} // Only allow numbers, max 6
                placeholder="000000" 
                className="text-center text-2xl tracking-[0.5em] font-mono h-14"
                fullWidth 
                required
              />
              <p className="text-xs text-center text-foreground/50 mt-3 flex items-center justify-center gap-1">
                <AlertCircle size={14} /> Any 6 digits will work for this demo.
              </p>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading} className="text-base h-12" disabled={otp.length !== 6}>
              Verify & Authenticate
            </Button>
          </form>
        )}

        {/* --- STEP 3: Success Redirect --- */}
        {step === 'success' && (
          <div className="text-center py-8 animate-fade-in">
            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-foreground">Access Granted</h2>
            <p className="text-foreground/60 mt-2">Connecting to secure server...</p>
          </div>
        )}

      </Card>
    </div>
  );
}