'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  highlightWord?: string;
  className?: string;
  fontSize?: string;
}

export default function AnimatedText({ text, highlightWord, className = '', fontSize = 'clamp(52px, 7vw, 110px)' }: Props) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;
    const id = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(id);
      }
    }, 28);
    return () => clearInterval(id);
  }, [text]);

  if (!highlightWord) {
    return (
      <h1 className={className} style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize, lineHeight: 1.05, color: '#1A1A1A' }}>
        {displayed}
        <span style={{ opacity: 0.3 }}>|</span>
      </h1>
    );
  }

  // Render with a highlighted word on second line
  const lines = displayed.split('\n');
  return (
    <h1 className={className} style={{ fontFamily: 'var(--font-instrument-serif), serif', fontSize, lineHeight: 1.05, color: '#1A1A1A' }}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block' }}>
          {i === 1 ? (
            <span style={{ backgroundColor: '#DAEE47', padding: '0 6px' }}>{line}</span>
          ) : line}
        </span>
      ))}
      <span style={{ opacity: 0.3 }}>|</span>
    </h1>
  );
}
