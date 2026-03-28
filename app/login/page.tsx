'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requiresVerification) {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
        } else {
          setError(data.error || 'Login failed');
        }
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div 
      className="min-h-[100dvh] w-full flex flex-col lg:flex-row font-[family-name:var(--font-dm-sans)] relative overflow-hidden"
      style={{
        backgroundColor: '#F5F0E8',
        color: '#1A1A1A'
      }}
    >
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Left Column (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-10 md:p-12 lg:p-16 relative z-10 justify-center min-h-[100dvh]">
        <Link href="/" className="absolute top-6 left-6 sm:top-10 sm:left-10 inline-block w-max z-50">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to site
          </span>
        </Link>

        <motion.div 
          variants={formVariants} 
          initial="hidden" 
          animate="show"
          className="w-full max-w-[460px] mx-auto bg-white/30 backdrop-blur-2xl border border-white/60 p-8 sm:p-12 md:p-14 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.03)]"
        >
          {/* Decorative Icon */}
          <motion.div variants={itemVariants} className="w-12 h-12 mb-8 flex gap-1">
             <div className="w-5 h-5 bg-[#1A1A1A] rounded-[4px] shadow-sm"></div>
             <div className="w-5 h-5 bg-[#DAEE47] rounded-[4px] mt-4 shadow-sm"></div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl mb-4 font-[family-name:var(--font-instrument-serif)] italic tracking-wide">
            Welcome back
          </motion.h1>
          <motion.p variants={itemVariants} className="text-[15px] sm:text-base text-[#1A1A1A]/60 mb-10 font-light tracking-wide leading-relaxed">
            Enter your details to access your creative studio and automated workflows.
          </motion.p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
            {error && (
              <motion.div variants={itemVariants} className="bg-[#FFEBEB] text-[#D8000C] text-[13px] font-medium p-4 rounded-xl border border-red-100">
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-2 group relative">
              <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]/80 transition-colors block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 py-3 sm:py-4 focus:outline-none focus:border-[#1A1A1A] transition-all text-lg sm:text-xl tracking-wide placeholder:text-[#1A1A1A]/20"
                placeholder="hello@example.com"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2 group relative">
              <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]/80 transition-colors block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 py-3 sm:py-4 focus:outline-none focus:border-[#1A1A1A] transition-all text-lg sm:text-xl tracking-wide placeholder:text-[#1A1A1A]/20"
                placeholder="••••••••"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className="w-full mt-4 group relative overflow-hidden text-[#1A1A1A] py-[18px] sm:py-[20px] rounded-2xl text-[14px] sm:text-[15px] font-bold tracking-widest uppercase transition-all duration-500 disabled:opacity-70 flex justify-center items-center shadow-[0_8px_30px_rgba(218,238,71,0.3)] hover:shadow-[0_15px_40px_rgba(218,238,71,0.5)] hover:-translate-y-[2px]"
              style={{ background: 'linear-gradient(135deg, #DAEE47 0%, #c8dc35 100%)' }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-2xl" />
              {loading ? (
                <span className="w-5 h-5 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin relative z-10" />
              ) : (
                <span className="relative z-10">Sign In</span>
              )}
            </motion.button>
            
            {/* Or separator */}
            <motion.div variants={itemVariants} className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#1A1A1A]/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold tracking-widest uppercase text-[#1A1A1A]/30">or</span>
              <div className="flex-grow border-t border-[#1A1A1A]/10"></div>
            </motion.div>

            {/* Social Buttons */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
               <button type="button" className="flex items-center justify-center p-4 rounded-xl border border-white/60 bg-white/40 hover:bg-white/80 hover:shadow-md hover:-translate-y-[1px] transition-all">
                 <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.82 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
               </button>
               <button type="button" className="flex items-center justify-center p-4 rounded-xl border border-white/60 bg-white/40 hover:bg-white/80 hover:shadow-md hover:-translate-y-[1px] transition-all">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
               </button>
               <button type="button" className="flex items-center justify-center p-4 rounded-xl border border-white/60 bg-white/40 hover:bg-white/80 hover:shadow-md hover:-translate-y-[1px] transition-all text-black">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" fill="none" /><path d="M16.365 16.59c-.58.33-1.666.975-3.085.975-2.802 0-4.821-2.036-4.821-4.802 0-2.723 2.062-4.996 4.97-4.996 1.346 0 2.455.515 3.012.795L15.69 9.83c-.453-.255-1.503-.683-2.613-.683-1.967 0-3.377 1.488-3.377 3.615 0 2.225 1.42 3.525 3.36 3.525.96 0 1.968-.363 2.508-.664l.798 1.05v-.083zM15.01 4h-1.425C13.585 5.53 14.83 6.91 16 6.91v-1.41c-.655 0-1.123-.626-.99-1.5z"/></svg>
               </button>
            </motion.div>
          </form>

          <motion.p variants={itemVariants} className="mt-10 text-center text-[13px] text-[#1A1A1A]/50 font-medium">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#1A1A1A] font-bold tracking-wide hover:text-[#1A1A1A]/70 border-b border-[#1A1A1A]/20 hover:border-[#1A1A1A]/50 pb-[1px] transition-all">
              Create one
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right Column (Decorative Premium Feature) */}
     
    </div>
  );
}
