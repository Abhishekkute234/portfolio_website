'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function RegisterPage() {
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
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative font-[family-name:var(--font-dm-sans)] overflow-hidden"
      style={{
        backgroundColor: '#F5F0E8',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        color: '#1A1A1A'
      }}
    >
      {/* Dynamic Background Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[80vw] md:w-[30vw] h-[80vw] md:h-[30vw] rounded-full bg-[#DAEE47]/20 blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[10%] right-[20%] w-[60vw] md:w-[25vw] h-[60vw] md:h-[25vw] rounded-full bg-[#E5D5C5]/60 blur-[60px] md:blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-xl relative z-10 bg-transparent backdrop-blur-3xl p-6 sm:p-12 md:p-20 rounded-2xl border border-white/40 shadow-[0_20px_60px_rgb(0,0,0,0.05)]"
      >
        <motion.div variants={itemVariants}>
          <Link href="/" className="inline-block mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors">
              ← Back
            </span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 font-[family-name:var(--font-instrument-serif)] italic tracking-wide">
            Join Studio
          </h1>
          <p className="text-base sm:text-lg text-[#1A1A1A]/60 mb-10 sm:mb-14 font-light tracking-wide leading-relaxed">
            Create an account to start your creative journey.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="space-y-1 group relative">
            <label className="text-sm font-semibold tracking-widest uppercase text-[#1A1A1A]/50 group-focus-within:text-[#1A1A1A] transition-colors block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 py-5 focus:outline-none focus:border-[#1A1A1A] transition-colors text-xl tracking-wide placeholder:text-[#1A1A1A]/20"
              placeholder="hello@example.com"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 group relative">
            <label className="text-sm font-semibold tracking-widest uppercase text-[#1A1A1A]/50 group-focus-within:text-[#1A1A1A] transition-colors block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 py-4 focus:outline-none focus:border-[#1A1A1A] transition-colors text-xl placeholder:text-[#1A1A1A]/20"
              placeholder="Create a strong password"
              minLength={6}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden text-[#1A1A1A] py-[24px] rounded-2xl text-lg tracking-wide transition-all duration-500 disabled:opacity-70 flex justify-center items-center gap-3 shadow-[0_8px_30px_rgba(218,238,71,0.3)]"
              style={{ 
                background: 'linear-gradient(135deg, #DAEE47 0%, #c8dc35 100%)',
              }}
              onMouseEnter={e => { 
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.02)'; 
                (e.currentTarget as HTMLElement).style.boxShadow = '0 15px 40px rgba(218,238,71,0.5)';
              }}
              onMouseLeave={e => { 
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)'; 
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(218,238,71,0.3)';
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-2xl" />
              {loading ? (
                <span className="w-5 h-5 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin relative z-10" />
              ) : (
                <span className="relative z-10 tracking-widest uppercase text-[14px] font-bold">Create Account</span>
              )}
            </button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-10 text-center">
          <p className="text-[#1A1A1A]/50 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1A1A1A] font-medium border-b border-[#1A1A1A] pb-[1px] hover:text-[#1A1A1A]/70 hover:border-[#1A1A1A]/70 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
