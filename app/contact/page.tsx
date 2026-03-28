'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [displayed, setDisplayed] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fullText = "Contact us";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < fullText.length) { setDisplayed(fullText.slice(0, i + 1)); i++; }
      else clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [fullText]);

  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <Header />
      <main className="min-h-[100dvh] pt-32 pb-20 w-full px-5 sm:px-8 md:px-12 flex items-center relative overflow-hidden bg-[#F5F0E8] z-0">
        {/* Background Texture */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-[1300px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 relative z-10">
           {/* Left Column */}
           <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col pt-10 justify-center">
              {/* Icon */}
              <motion.div variants={itemVariants} className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1A1A1A] rounded-[12px] flex items-center justify-center mb-6 shadow-sm shadow-[#1A1A1A]/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#DDF03A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#DDF03A" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>
              
              <motion.h1 variants={itemVariants} style={{
                fontFamily: 'var(--font-instrument-serif), serif', fontSize: 'clamp(48px, 8vw, 84px)', fontWeight: 400,
                lineHeight: 1.05, color: '#1A1A1A', letterSpacing: '-0.02em', marginBottom: '24px'
              }}>
                {displayed}
                {displayed.length < fullText.length && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ opacity: 0.4 }}>|</motion.span>}
              </motion.h1>

              <motion.p variants={itemVariants} className="text-base sm:text-[17px] md:text-lg text-[#1A1A1A]/60 leading-[1.8] font-light max-w-[480px] mb-12">
                Whether you have a question about our features, trials, pricing, or anything else, our team is ready to answer all your questions.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col space-y-4 text-[#1A1A1A] font-medium text-[15px] mb-12">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/60 border border-white/80 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:scale-105 transition-all">
                    <span className="text-sm">✉</span>
                  </div>
                  <span className="font-semibold tracking-wide border-b border-transparent group-hover:border-[#1A1A1A] transition-all">contact@yoursaas.ai</span>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/60 border border-white/80 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:scale-105 transition-all">
                    <span className="text-sm">☏</span>
                  </div>
                  <span className="font-semibold tracking-wide border-b border-transparent group-hover:border-[#1A1A1A] transition-all">+1 (800) 123 XX21</span>
                </div>
              </motion.div>
           </motion.div>

           {/* Right Column (Form) */}
           <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }} className="w-full flex lg:justify-end">
             <div className="w-full max-w-[540px] bg-white/40 backdrop-blur-2xl border border-white/70 rounded-[2px] sm:rounded-[4px] p-8 sm:p-12 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.04)] relative">
               {submitted ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                    <span className="text-6xl mb-6 text-[#1A1A1A]">✦</span>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-4xl mb-4 text-[#1A1A1A]">Message sent!</h3>
                    <p className="text-[#1A1A1A]/70 text-lg">We&apos;ll be in touch really soon.</p>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 relative z-10">
                    {error && <div className="p-4 bg-[#FFEBEB] text-[#D8000C] rounded-xl text-[14px] font-medium">{error}</div>}
                    
                    <div className="space-y-2 group">
                      <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]/80 transition-colors block">Full name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 py-3 sm:py-4 focus:outline-none focus:border-[#1A1A1A] transition-all text-lg sm:text-xl tracking-wide placeholder:text-[#1A1A1A]/30" placeholder="John Doe" />
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]/80 transition-colors block">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 py-3 sm:py-4 focus:outline-none focus:border-[#1A1A1A] transition-all text-lg sm:text-xl tracking-wide placeholder:text-[#1A1A1A]/30" placeholder="hello@example.com" />
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]/80 transition-colors block">Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 py-3 sm:py-4 focus:outline-none focus:border-[#1A1A1A] transition-all text-lg sm:text-xl tracking-wide placeholder:text-[#1A1A1A]/30" placeholder="Acme Corp" />
                    </div>

                    <div className="space-y-2 group mb-2">
                      <label className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A]/40 group-focus-within:text-[#1A1A1A]/80 transition-colors block">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required disabled={isSubmitting} rows={3} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 py-3 sm:py-4 focus:outline-none focus:border-[#1A1A1A] transition-all text-[17px] tracking-wide placeholder:text-[#1A1A1A]/30 resize-none leading-relaxed" placeholder="How can we help you?" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full group relative overflow-hidden text-[#1A1A1A] py-[18px] sm:py-[20px] rounded-2xl text-[14px] sm:text-[15px] font-bold tracking-widest uppercase transition-all duration-500 disabled:opacity-70 flex justify-center items-center shadow-[0_8px_30px_rgba(218,238,71,0.3)] hover:shadow-[0_15px_40px_rgba(218,238,71,0.5)] hover:-translate-y-[2px]" style={{ background: 'linear-gradient(135deg, #DAEE47 0%, #c8dc35 100%)' }}>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-2xl" />
                      {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin relative z-10" />
                      ) : (
                        <span className="relative z-10">Send Message</span>
                      )}
                    </button>
                  </form>
               )}
             </div>
           </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
