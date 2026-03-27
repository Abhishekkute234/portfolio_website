'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';

const projects = [
  { title: 'Kaito Tea Co.', category: 'brand identity', image: '/images/kaito-tea.png', href: '/works' },
  { title: 'Paper & Bloom', category: 'print & packaging', image: '/images/paper-bloom.png', href: '/works' },
  { title: 'SiteLines', category: 'digital design', image: '/images/sitelines.png', href: '/works' },
  { title: 'Vela Cosmetics', category: 'brand identity', image: '/images/vela.png', href: '/works' },
];

const logos = ['BRANDNAME', 'STUDIO', 'PARTNER', 'PLACEHOLDER', 'COLLECTIVE', 'ATELIER', 'BRANDNAME', 'STUDIO'];

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Founder, Kaito Tea Co.',
    text: 'Studio Think completely transformed our brand. The attention to detail and creative vision surpassed every expectation. Our customers immediately felt the difference.',
    initial: 'S',
    color: '#DDF03A',
  },
  {
    name: 'Marc L.',
    role: 'Creative Director, SiteLines',
    text: 'Working with Studio Think was effortless. They understood our vision immediately and delivered a digital experience that truly reflects who we are.',
    initial: 'M',
    color: '#B5D4E8',
  },
  {
    name: 'Linh T.',
    role: 'CEO, Vela Cosmetics',
    text: 'The team at Studio Think has an incredible eye for aesthetics. Our packaging redesign drove a 40% increase in shelf pickup. Truly remarkable work.',
    initial: 'L',
    color: '#F4C4A1',
  },
];

const processSteps = [
  { num: '01', title: 'Discover', desc: 'We dive deep into your brand, audience, and goals to uncover what makes you unique.' },
  { num: '02', title: 'Define', desc: 'We craft a clear strategy and creative direction that aligns with your vision.' },
  { num: '03', title: 'Design', desc: 'We bring ideas to life with meticulous attention to craft and detail.' },
  { num: '04', title: 'Deliver', desc: 'We launch your project and ensure it lands exactly as intended.' },
];

function HeroSection() {
  const words = ['Design', 'crafted', 'with', 'intention.'];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const timeout = setTimeout(() => {
      const currentWord = words[wordIndex];
      if (charIndex < currentWord.length) {
        setCharIndex(c => c + 1);
      } else if (wordIndex < words.length - 1) {
        setWordIndex(w => w + 1);
        setCharIndex(0);
      } else {
        setDone(true);
      }
    }, 70); // Slightly slower for elegance
    return () => clearTimeout(timeout);
  });

  const getLine1 = () => {
    const w0 = wordIndex > 0 ? words[0] : words[0].slice(0, charIndex);
    const w1 = wordIndex > 1 ? ` ${words[1]}` : wordIndex === 1 ? ` ${words[1].slice(0, charIndex)}` : '';
    return w0 + w1;
  };
  const getLine2 = () => {
    const w2 = wordIndex > 2 ? words[2] : wordIndex === 2 ? words[2].slice(0, charIndex) : '';
    const w3 = wordIndex > 3 ? ` ${words[3]}` : wordIndex === 3 ? ` ${words[3].slice(0, charIndex)}` : '';
    return w2 + w3;
  };

  return (
    <section style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 32px', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
      <div style={{ maxWidth: '900px' }}>
        <h1 style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontSize: 'clamp(58px, 9vw, 130px)',
          lineHeight: 1.05,
          color: '#1A1A1A',
          fontWeight: 400,
          letterSpacing: '-0.02em',
        }}>
          <span style={{ display: 'block' }}>
            {getLine1()}
          </span>
          <span style={{ display: 'block', backgroundColor: done || wordIndex >= 2 ? '#DDF03A' : 'transparent', padding: done || wordIndex >= 2 ? '0 8px' : '0', transition: 'background-color 0.4s ease' }}>
            {getLine2() || <span style={{ opacity: 0 }}>placeholder</span>}
          </span>
          {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ opacity: 0.4 }}>|</motion.span>}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            marginTop: '40px',
            fontSize: '18px',
            color: 'rgba(0,0,0,0.6)',
            maxWidth: '460px',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          We are a creative studio building brands and digital experiences that make people stop and feel something.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ marginTop: '56px', display: 'flex', gap: '20px', alignItems: 'center' }}
        >
          <Link href="/works" style={{
            backgroundColor: '#1A1A1A',
            color: '#F9F6F0',
            borderRadius: '999px',
            padding: '16px 36px',
            fontSize: '15px',
            textDecoration: 'none',
            fontWeight: 400,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            View our work
          </Link>
          <Link href="/contact" style={{
            backgroundColor: 'transparent',
            color: '#1A1A1A',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '999px',
            padding: '16px 36px',
            fontSize: '15px',
            textDecoration: 'none',
            fontWeight: 400,
            transition: 'border-color 0.2s, background-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Start a project
          </Link>
        </motion.div>
      </div>

      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.2}
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 3 }}
        transition={{ duration: 0.8, delay: 1.6, type: "spring" }}
        style={{
          position: 'absolute',
          right: '12%',
          top: '25%',
          backgroundColor: '#DDF03A',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '4px',
          padding: '16px 20px',
          fontSize: '16px',
          fontFamily: 'var(--font-caveat), cursive',
          cursor: 'grab',
          userSelect: 'none',
          boxShadow: '4px 8px 16px rgba(0,0,0,0.06)',
          zIndex: 10,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ cursor: 'grabbing', scale: 0.95 }}
      >
        available for 2026 ✦
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.2}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: -4 }}
        transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
        style={{
          position: 'absolute',
          right: '6%',
          bottom: '22%',
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '4px',
          padding: '16px 20px',
          fontSize: '16px',
          fontFamily: 'var(--font-caveat), cursive',
          cursor: 'grab',
          userSelect: 'none',
          boxShadow: '4px 8px 16px rgba(0,0,0,0.06)',
          zIndex: 10,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ cursor: 'grabbing', scale: 0.95 }}
      >
        trust the process 🖊
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <motion.div 
          animate={{ x: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ width: '40px', height: '1px', backgroundColor: 'rgba(0,0,0,0.4)' }} 
        />
        <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '15px', color: 'rgba(0,0,0,0.5)' }}>scroll to explore</span>
      </motion.div>
    </section>
  );
}

function AboutSnippet() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 32px 140px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden', borderRadius: '12px', marginBottom: '64px' }}
      >
        <motion.div style={{ width: '100%', height: '120%', y }}>
          <Image src="/images/about-hero.png" alt="Abstract studio art" fill style={{ objectFit: 'cover' }} />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '24px', color: '#1A1A1A', borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '4px' }}>
          about us
        </span>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontSize: 'clamp(24px, 3.5vw, 42px)',
          lineHeight: 1.45,
          color: '#1A1A1A',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
          fontWeight: 400,
        }}
      >
        Studio Think is the creative practice of{' '}
        <span style={{ backgroundColor: '#DDF03A', padding: '2px 6px', fontStyle: 'italic' }}>Dung</span>, a{' '}
        <span style={{ backgroundColor: '#DDF03A', padding: '2px 6px', fontStyle: 'italic' }}>graphic designer</span>{' '}
        based in{' '}
        <span style={{ backgroundColor: '#DDF03A', padding: '2px 6px', fontStyle: 'italic' }}>Hanoi</span>.
        Here, every project begins with intention — sketched on craft paper, refined with care, and delivered with purpose.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ textAlign: 'center', marginTop: '56px' }}
      >
        <Link href="/about" style={{
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: '20px',
          color: '#1A1A1A',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}>
          learn more about us <span style={{ transition: 'transform 0.3s', display: 'inline-block' }}>→</span>
        </Link>
      </motion.div>
    </section>
  );
}

function LogoMarquee() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '48px 0', overflow: 'hidden', marginBottom: '140px', backgroundColor: '#fff' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '20px', color: 'rgba(0,0,0,0.4)' }}>trusted by</span>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '100px', whiteSpace: 'nowrap' }} className="marquee-inner">
          {[...logos, ...logos, ...logos].map((name, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 300,
                color: '#1A1A1A',
              }}>✦</div>
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SelectedWorks() {
  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px 160px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '80px' }}
      >
        <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', padding: '12px 24px', backgroundColor: '#fff' }}>
          <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '18px', color: 'rgba(0,0,0,0.4)', display: 'block', marginBottom: '4px' }}>proudly</span>
          <h2 style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 400,
            color: '#1A1A1A',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            Selected works
          </h2>
        </div>
        <div style={{ marginLeft: 'auto', alignSelf: 'flex-end', paddingBottom: '16px' }}>
          <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '18px', color: 'rgba(0,0,0,0.4)' }}>
            idea worth exploring ↓
          </span>
        </div>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} {...p} index={i} />
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: '80px' }}
      >
        <Link href="/works" style={{
          border: '1px solid rgba(0,0,0,0.2)',
          borderRadius: '999px',
          padding: '16px 48px',
          fontSize: '15px',
          color: '#1A1A1A',
          textDecoration: 'none',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          View all work
        </Link>
      </motion.div>
    </section>
  );
}

function Process() {
  return (
    <section style={{ padding: '40px 32px 140px', maxWidth: '1400px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '100px' }}
      >
        <h2 style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontSize: 'clamp(48px, 6vw, 90px)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}>
          A process<br />
          <span style={{ fontStyle: 'italic' }}>rooted in craft</span>
        </h2>
        <div style={{ alignSelf: 'flex-end', paddingBottom: '16px' }}>
          <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '18px', color: 'rgba(0,0,0,0.4)' }}>
            small steps → big results
          </span>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
        {processSteps.map((step, i) => (
          <motion.div 
            key={step.num} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '32px' }}
          >
            <span style={{ 
              fontFamily: 'var(--font-instrument-serif), serif', 
              fontSize: '18px', 
              color: '#1A1A1A', 
              backgroundColor: '#DDF03A', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              display: 'inline-block', 
              marginBottom: '24px',
              fontStyle: 'italic'
            }}>
              {step.num}
            </span>
            <h3 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: '32px', fontWeight: 400, marginBottom: '16px' }}>{step.title}</h3>
            <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, fontWeight: 300 }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ padding: '0 32px 160px', maxWidth: '1400px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '80px' }}
      >
        <span style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '24px', color: 'rgba(0,0,0,0.4)', display: 'block', marginBottom: '12px' }}>kind words</span>
        <h2 style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize: 'clamp(44px, 5vw, 76px)', fontWeight: 400, letterSpacing: '-0.02em' }}>
          What clients say
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '16px',
              padding: '48px',
              backgroundColor: hovered === i ? '#1A1A1A' : '#fff',
              transition: 'background-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease',
              cursor: 'default',
              boxShadow: hovered === i ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
              transform: hovered === i ? 'translateY(-10px)' : 'translateY(0)',
            }}
          >
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              backgroundColor: t.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: '28px', marginBottom: '32px',
              color: '#1A1A1A'
            }}>
              {t.initial}
            </div>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: hovered === i ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
              marginBottom: '32px',
              transition: 'color 0.4s ease',
              fontFamily: 'var(--font-instrument-serif), serif',
              fontStyle: 'italic',
            }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div>
              <p style={{ fontWeight: 400, fontSize: '15px', color: hovered === i ? '#fff' : '#1A1A1A', transition: 'color 0.4s ease' }}>{t.name}</p>
              <p style={{ fontSize: '14px', color: hovered === i ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', transition: 'color 0.4s ease', fontWeight: 300 }}>{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: '#111111',
        color: '#fff',
        padding: '160px 32px',
        textAlign: 'center',
      }}
    >
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '24px', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '20px' }}
      >
        ready when you are
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          fontSize: 'clamp(48px, 8vw, 110px)',
          fontWeight: 400,
          lineHeight: 1.05,
          marginBottom: '60px',
          letterSpacing: '-0.02em',
        }}
      >
        Let&rsquo;s work together
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link href="/contact" style={{
          backgroundColor: '#DDF03A',
          color: '#1A1A1A',
          border: '1px solid #DDF03A',
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
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSnippet />
        <LogoMarquee />
        <SelectedWorks />
        <Process />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
