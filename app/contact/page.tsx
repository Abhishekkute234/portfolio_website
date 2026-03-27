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
      <main>
        {/* Hero */}
        <section style={{ padding: '120px 40px 80px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(52px, 8vw, 120px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
          }}>
            {lines[0] && <span style={{ display: 'block' }}>{lines[0]}</span>}
            {lines[1] !== undefined && (
              <span style={{ display: 'inline-block', backgroundColor: '#DDF03A', padding: '0 8px', marginTop: '4px' }}>{lines[1]}</span>
            )}
            {displayed.length < fullText.length && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ opacity: 0.4 }}>|</motion.span>}
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ marginTop: '40px', fontSize: '18px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, fontWeight: 300 }}
          >
            Fill out the form below and we&apos;ll get back to you within 1–2 business days.
          </motion.p>
        </section>

        {/* Form */}
        <section style={{ maxWidth: '840px', margin: '0 auto', padding: '0 40px 180px' }}>
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{
                textAlign: 'center',
                padding: '100px 40px',
                backgroundColor: '#DDF03A',
                borderRadius: '24px',
              }}
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
              style={{ display: 'flex', flexDirection: 'column', gap: '32px', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '24px', padding: '56px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}
            >
              {error && (
                <div style={{ padding: '16px', backgroundColor: '#FFEBEB', color: '#D8000C', borderRadius: '8px', fontSize: '14px' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#1A1A1A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" required disabled={isSubmitting} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#1A1A1A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" required disabled={isSubmitting} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#1A1A1A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} disabled={isSubmitting}>
                    <option value="">Select...</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital Design">Digital Design</option>
                    <option value="Print & Packaging">Print & Packaging</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#1A1A1A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleChange} disabled={isSubmitting}>
                    <option value="">Select...</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                    <option value="$15,000 – $30,000">$15,000 – $30,000</option>
                    <option value="$30,000+">$30,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '10px', color: '#1A1A1A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Project Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your project..." rows={6} style={{ resize: 'vertical' }} disabled={isSubmitting} />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#DDF03A',
                  color: '#1A1A1A',
                  border: '1px solid #DDF03A',
                  borderRadius: '999px',
                  padding: '20px 48px',
                  fontSize: '16px',
                  fontWeight: 500,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  alignSelf: 'flex-start',
                  transition: 'background-color 0.3s, transform 0.3s',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
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
