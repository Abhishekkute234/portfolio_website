'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is visible
    document.body.style.overflow = 'hidden';

    // Progress bar takes 2.8s → hold 200ms → fade 600ms → unmount
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const doneTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 99999,
            backgroundColor: '#F9F6F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            overflow: 'hidden',
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        >
          {/* Lottie animation */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '280px', height: '280px' }}
          >
            <DotLottieReact
              src="https://lottie.host/8ee001cc-03c5-4518-a515-97d224bba394/StkIWzFTYn.lottie"
              loop
              autoplay
            />
          </motion.div>

          {/* Studio name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ textAlign: 'center' }}
          >
            <span style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: '32px',
              fontWeight: 400,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              display: 'block',
            }}>
              Studio Think
            </span>
            <span style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: '16px',
              color: 'rgba(0,0,0,0.4)',
              display: 'block',
              marginTop: '6px',
            }}>
              creative design studio
            </span>
          </motion.div>

          {/* Yellow progress bar — fills to 100% before loader fades */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '4px',
              backgroundColor: '#DDF03A',
              transformOrigin: 'left',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
