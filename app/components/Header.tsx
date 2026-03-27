'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // Hanoi is UTC+7
      const hanoi = new Date(now.getTime() + (7 * 60 * 60 * 1000));
      const h = hanoi.getUTCHours().toString().padStart(2, '0');
      const m = hanoi.getUTCMinutes().toString().padStart(2, '0');
      const s = hanoi.getUTCSeconds().toString().padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#F5F0E8',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      backgroundImage:
        'linear-gradient(rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.07) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Left: Logo + Clock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            fontSize: '22px',
            fontWeight: 400,
            color: '#1A1A1A',
            textDecoration: 'none',
            letterSpacing: '-0.3px',
          }}>
            Think
          </Link>
          {time && (
            <span style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: '14px',
              color: 'rgba(0,0,0,0.5)',
            }}>
              hanoi, {time}
            </span>
          )}
        </div>

        {/* Center: Nav */}
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={{
                fontSize: '15px',
                color: '#1A1A1A',
                textDecoration: 'none',
                fontWeight: isActive ? 500 : 400,
                borderBottom: isActive ? '1.5px solid #1A1A1A' : '1.5px solid transparent',
                paddingBottom: '2px',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA */}
        <Link href="/contact" style={{
          backgroundColor: '#DAEE47',
          color: '#1A1A1A',
          border: '1.5px solid #1A1A1A',
          borderRadius: '999px',
          padding: '9px 22px',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background-color 0.2s, transform 0.15s',
          display: 'inline-block',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#c8dc35'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#DAEE47'; }}
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
