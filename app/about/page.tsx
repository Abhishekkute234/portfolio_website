'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const team = [
  { name: 'Dung Nguyen', role: 'Founder & Creative Director', initial: 'D', color: '#DDF03A' },
  { name: 'Minh Tran', role: 'Senior Designer', initial: 'M', color: '#B5D4E8' },
  { name: 'Lan Pham', role: 'Brand Strategist', initial: 'L', color: '#F4C4A1' },
  { name: 'Huy Le', role: 'Motion Designer', initial: 'H', color: '#C8E6C9' },
];

const services = [
  { name: 'Brand Identity', desc: 'From logo design to full brand systems — we build identities that resonate and endure.', emoji: '◆' },
  { name: 'Digital Design', desc: 'Websites and interfaces that combine beauty with precision engineering.', emoji: '◉' },
  { name: 'Print & Packaging', desc: 'Tactile experiences that extend your brand from screen to shelf.', emoji: '◈' },
];

const stats = [
  { number: '39+', label: 'Happy Clients', yellow: false },
  { number: '90%', label: 'Client Satisfaction Rate', yellow: true },
  { number: '5', label: 'Years of Creative Excellence', yellow: false },
];

export default function AboutPage() {
  const [displayed, setDisplayed] = useState('');
  const fullText = 'We turn ideas into\nvisual experience.';

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(id);
      }
    }, 40);
    return () => clearInterval(id);
  }, []);

  const lines = displayed.split('\n');

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ padding: '120px 40px 80px', maxWidth: '1400px', margin: '0 auto', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'relative', maxWidth: '1000px' }}>
            <h1 style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: 'clamp(52px, 8.5vw, 130px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}>
              {lines[0] && <span style={{ display: 'block' }}>{lines[0]}</span>}
              {lines[1] !== undefined && (
                <span style={{ display: 'inline-block', backgroundColor: '#DDF03A', padding: '0 8px', marginTop: '4px' }}>
                  {lines[1]}
                </span>
              )}
              {displayed.length < fullText.length && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ opacity: 0.4 }}>|</motion.span>}
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{ position: 'absolute', right: '0', bottom: '-40px' }}
            >
              <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '18px', color: 'rgba(0,0,0,0.4)' }}>
                welcome to our studio →
              </span>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <section style={{ padding: '0 40px 140px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.6)', fontWeight: 300 }}
            >
              Studio Think is a creative design studio where strategy meets craft. Founded in 2018, we&apos;ve built our reputation on one simple belief: great design isn&apos;t just about looking good. It&apos;s about solving problems, telling stories, and creating connections that matter.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(0,0,0,0.6)', fontWeight: 300 }}
            >
              We&apos;re a tight-knit team of designers, strategists, and creative thinkers who obsess over the details. From brand identities that stand out in crowded markets to digital experiences that feel effortless, we create works that don&apos;t just look beautiful.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <Image src="/images/studio-building.png" alt="Studio Think building" fill style={{ objectFit: 'cover' }} />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '100px 40px', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: '140px', backgroundColor: '#fff' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {stats.map((s, i) => (
              <motion.div 
                key={s.label} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  backgroundColor: s.yellow ? '#DDF03A' : 'transparent',
                  border: s.yellow ? 'none' : '1px solid rgba(0,0,0,0.1)',
                  margin: '0 auto',
                  textAlign: 'center',
                  padding: '32px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: '56px', fontWeight: 400, lineHeight: 1, color: '#1A1A1A' }}>{s.number}</span>
                <span style={{ fontSize: '14px', marginTop: '16px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.5, fontWeight: 300 }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section style={{ maxWidth: '1400px', margin: '0 auto 160px', padding: '0 40px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: 'clamp(44px, 5vw, 76px)', fontWeight: 400, marginBottom: '80px', letterSpacing: '-0.02em' }}
          >
            What we do
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {services.map((s, i) => (
              <motion.div 
                key={s.name} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '16px',
                  padding: '48px 40px',
                  backgroundColor: i === 1 ? '#1A1A1A' : '#fff',
                  color: i === 1 ? '#fff' : '#1A1A1A',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  transition: 'transform 0.4s ease',
                }}
                whileHover={{ transform: 'translateY(-8px)' }}
              >
                <div style={{ fontSize: '32px', marginBottom: '24px', color: i === 1 ? '#DDF03A' : '#1A1A1A' }}>{s.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: '32px', fontWeight: 400, marginBottom: '16px' }}>{s.name}</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.8, color: i === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)', fontWeight: 300 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: '160px', backgroundColor: '#fff' }}>
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
            style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
          >
            {['AWWWARDS', 'FWA', 'CSSDA', 'CSS WINNER', 'WEBBY'].map(award => (
              <div key={award} style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '14px', color: '#1A1A1A' }}>★</div>
                <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>{award}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Team */}
        <section style={{ maxWidth: '1400px', margin: '0 auto 160px', padding: '0 40px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: 'clamp(44px, 5vw, 76px)', fontWeight: 400, marginBottom: '80px', letterSpacing: '-0.02em' }}
          >
            The team
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {team.map((member, i) => (
              <motion.div 
                key={member.name} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  backgroundColor: member.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-instrument-serif), serif',
                  fontSize: '80px',
                  marginBottom: '24px',
                  color: '#1A1A1A',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {member.initial}
                </div>
                <p style={{ fontWeight: 400, fontSize: '18px', marginBottom: '6px', fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic' }}>{member.name}</p>
                <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', fontWeight: 300 }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ backgroundColor: '#111111', color: '#fff', padding: '160px 40px', textAlign: 'center' }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: 'clamp(48px, 6vw, 90px)', fontWeight: 400, marginBottom: '60px', letterSpacing: '-0.02em' }}
          >
            Ready to build something great?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact" style={{
              backgroundColor: '#DDF03A',
              color: '#1A1A1A',
              borderRadius: '999px',
              padding: '20px 56px',
              fontSize: '17px',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.3s ease, background-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.backgroundColor = '#ccde28'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#DDF03A'; }}
            >
              Start a project
            </Link>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
