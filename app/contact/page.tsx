'use client';
import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [displayed, setDisplayed] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fullText = "Let's create\nsomething together";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < fullText.length) { setDisplayed(fullText.slice(0, i + 1)); i++; }
      else clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  const lines = displayed.split('\n');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    description: ''
  });
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

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 w-full">
        {/* Hero */}
        <section className="px-6 md:px-10 py-10 md:py-16 max-w-[1000px] w-full mx-auto text-center shrink-0">
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
          }}>
            {lines[0] && <span style={{ display: 'block' }}>{lines[0]}</span>}
            {lines[1] !== undefined && (
              <span className="inline-block bg-[#DDF03A] px-2 md:px-3 mt-1 md:mt-2">{lines[1]}</span>
            )}
            {displayed.length < fullText.length && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ opacity: 0.4 }}>|</motion.span>}
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 md:mt-10 text-base md:text-lg text-black/60 leading-[1.8] font-light"
          >
            Fill out the form below and we&apos;ll get back to you within 1–2 business days.
          </motion.p>
        </section>

        {/* Form */}
        <section className="max-w-[840px] w-full mx-auto px-6 md:px-10 pb-10 md:pb-20 shrink-0">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-center p-12 sm:p-16 md:p-24 bg-[#DDF03A] rounded-[24px]"
            >
              <span style={{ fontSize: '56px', display: 'block', marginBottom: '24px', color: '#1A1A1A' }}>✦</span>
              <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: '42px', marginBottom: '16px', fontWeight: 400, color: '#1A1A1A' }}>Message sent!</h3>
              <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.7)', fontWeight: 300 }}>We&apos;ll be in touch soon. Thank you.</p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              onSubmit={handleSubmit} 
              className="flex flex-col gap-10 md:gap-14 bg-white border border-black/[0.08] rounded-[24px] p-6 sm:p-10 md:p-14 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
            >
              {error && (
                <div style={{ padding: '16px', backgroundColor: '#FFEBEB', color: '#D8000C', borderRadius: '8px', fontSize: '14px' }}>
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
                <div>
                  <label className="block text-[13px] sm:text-sm font-medium mb-4 sm:mb-5 text-[#1A1A1A] tracking-[0.04em] uppercase">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" required disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors text-base md:text-lg" />
                </div>
                <div>
                  <label className="block text-[13px] sm:text-sm font-medium mb-4 sm:mb-5 text-[#1A1A1A] tracking-[0.04em] uppercase">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" required disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors text-base md:text-lg" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
                <div className="relative">
                  <label className="block text-[13px] sm:text-sm font-medium mb-4 sm:mb-5 text-[#1A1A1A] tracking-[0.04em] uppercase">Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors text-base md:text-lg appearance-none cursor-pointer">
                    <option value="">Select...</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital Design">Digital Design</option>
                    <option value="Print & Packaging">Print & Packaging</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-[13px] sm:text-sm font-medium mb-4 sm:mb-5 text-[#1A1A1A] tracking-[0.04em] uppercase">Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors text-base md:text-lg appearance-none cursor-pointer">
                    <option value="">Select...</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                    <option value="$15,000 – $30,000">$15,000 – $30,000</option>
                    <option value="$30,000+">$30,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[13px] sm:text-sm font-medium mb-4 sm:mb-5 text-[#1A1A1A] tracking-[0.04em] uppercase">Project Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your project..." rows={5} disabled={isSubmitting} className="w-full bg-transparent border-b-[1.5px] border-[#1A1A1A]/20 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors text-base md:text-lg resize-y" />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#DDF03A',
                  color: '#1A1A1A',
                  border: '1px solid #DDF03A',
                  borderRadius: '999px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  alignSelf: 'flex-start',
                  transition: 'background-color 0.3s, transform 0.3s',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
                className="px-8 py-4 sm:px-[48px] sm:py-[20px] w-full sm:w-auto text-center mt-4"
                whileHover={!isSubmitting ? { scale: 1.02, backgroundColor: '#ccde28' } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Sending...' : 'Send message →'}
              </motion.button>
            </motion.form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
