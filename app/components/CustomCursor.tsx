'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'hover' | 'drag' | 'view';

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [label, setLabel] = useState('');

  // Raw mouse position
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Inner dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 45, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 45, mass: 0.2 });

  // Outer ring — lags behind
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });

  // Trail dot 1 — medium lag
  const t1X = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.8 });
  const t1Y = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.8 });

  // Trail dot 2 — slowest
  const t2X = useSpring(mouseX, { stiffness: 30, damping: 18, mass: 1.2 });
  const t2Y = useSpring(mouseY, { stiffness: 30, damping: 18, mass: 1.2 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="drag"]')) { setMode('drag'); setLabel('DRAG'); }
      else if (target.closest('[data-cursor="view"]')) { setMode('view'); setLabel('VIEW'); }
      else if (target.closest('a') || target.closest('button')) { setMode('hover'); setLabel(''); }
      else { setMode('default'); setLabel(''); }
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [mouseX, mouseY]);

  // Derive sizes / colors per mode
  const ringSize = mode === 'view' ? 80 : mode === 'drag' ? 64 : mode === 'hover' ? 56 : isClicking ? 20 : 36;
  const ringBg   = mode === 'view' || mode === 'drag' ? 'rgba(221,240,58,0.18)' : 'transparent';
  const ringBorder = mode !== 'default' ? '#DDF03A' : '#1A1A1A';
  const dotSize = isClicking ? 4 : mode !== 'default' ? 6 : 8;
  const dotColor = mode !== 'default' ? '#DDF03A' : '#1A1A1A';

  const shared: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    translateX: '-50%',
    translateY: '-50%',
  };

  return (
    <>
      {/* Trail dot 2 — slowest / faintest */}
      <motion.div
        style={{
          ...shared,
          x: t2X, y: t2Y,
          width: 6, height: 6,
          backgroundColor: '#DDF03A',
          opacity: mode === 'default' ? 0.25 : 0.5,
          scale: isClicking ? 0.4 : 1,
          zIndex: 9996,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Trail dot 1 — medium */}
      <motion.div
        style={{
          ...shared,
          x: t1X, y: t1Y,
          width: 7, height: 7,
          backgroundColor: '#DDF03A',
          opacity: mode === 'default' ? 0.45 : 0.7,
          scale: isClicking ? 0.5 : 1,
          zIndex: 9997,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* Outer ring — lagging */}
      <motion.div
        style={{
          ...shared,
          x: ringX, y: ringY,
          zIndex: 9998,
          border: `1.5px solid ${ringBorder}`,
          backgroundColor: ringBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: ringBorder,
          backgroundColor: ringBg,
          rotate: mode === 'drag' ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      >
        {label ? (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: '9.5px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#DDF03A',
              userSelect: 'none',
              fontFamily: 'sans-serif',
            }}
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>

      {/* Inner dot — snappy */}
      <motion.div
        style={{
          ...shared,
          x: dotX, y: dotY,
          backgroundColor: dotColor,
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          style={{
            ...shared,
            x: ringX, y: ringY,
            border: '1.5px solid #DDF03A',
            zIndex: 9995,
          }}
          initial={{ width: ringSize, height: ringSize, opacity: 0.8 }}
          animate={{ width: ringSize + 40, height: ringSize + 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </>
  );
}
