'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Works', href: '/works' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer style={{
      backgroundColor: '#111111',
      color: '#fff',
      padding: '80px 32px 40px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '80px',
        }}>
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: '32px',
              fontWeight: 400,
              display: 'block',
              marginBottom: '16px',
            }}>
              Think
            </span>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '220px' }}>
              A creative design studio where strategy meets craft.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Navigation
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#DAEE47'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Get in Touch
            </p>
            <a href="mailto:hello@studiothink.co" style={{
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              fontSize: '15px',
              display: 'block',
              marginBottom: '24px',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#DAEE47'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'}
            >
              hello@studiothink.co
            </a>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '16px' }}>
              Socials
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['LinkedIn', 'Instagram', 'Dribbble'].map(s => (
                <a key={s} href="#" style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#DAEE47'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
            © {year} Studio Think. All rights reserved.
          </p>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-caveat), cursive',
          }}>
            Made with Next.js ✦
          </span>
        </div>
      </div>
    </footer>
  );
}
