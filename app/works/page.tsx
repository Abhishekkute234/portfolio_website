'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

const allProjects = [
  { title: 'Kaito Tea Co.', category: 'brand identity', image: '/images/kaito-tea.png', href: '/works' },
  { title: 'Paper & Bloom', category: 'print & packaging', image: '/images/paper-bloom.png', href: '/works' },
  { title: 'SiteLines', category: 'digital design', image: '/images/sitelines.png', href: '/works' },
  { title: 'Vela Cosmetics', category: 'brand identity', image: '/images/vela.png', href: '/works' },
  { title: 'Kaito Tea Co. Vol. II', category: 'brand identity', image: '/images/kaito-tea.png', href: '/works' },
  { title: 'Paper & Bloom — Spring', category: 'print & packaging', image: '/images/paper-bloom.png', href: '/works' },
];

const filters = ['All', 'Brand Identity', 'Digital Design', 'Print & Packaging'];

export default function WorksPage() {
  const [displayed, setDisplayed] = useState('');
  const [active, setActive] = useState('All');
  const fullText = 'Thoughtful design,\nreal impact.';

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < fullText.length) { setDisplayed(fullText.slice(0, i + 1)); i++; }
      else clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);

  const lines = displayed.split('\n');
  const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.category.toLowerCase().includes(active.toLowerCase().split(' ')[0]));

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section style={{ padding: '120px 40px 80px', maxWidth: '1400px', margin: '0 auto', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: 'clamp(58px, 9vw, 130px)',
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
        </section>

        {/* Filter tabs */}
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px 60px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '999px',
                  border: '1px solid rgba(0,0,0,0.15)',
                  fontSize: '15px',
                  backgroundColor: active === f ? '#1A1A1A' : '#fff',
                  color: active === f ? '#fff' : '#1A1A1A',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontWeight: 400,
                  boxShadow: active === f ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Works grid */}
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px 160px' }}>
          <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filtered.map((p, i) => (
              <motion.div
                key={p.title + Math.random()} // force re-animation on filter
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                layout
              >
                <ProjectCard {...p} index={0} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
