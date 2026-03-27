'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  title: string;
  category: string;
  image: string;
  href?: string;
  index?: number;
}

export default function ProjectCard({ title, category, image, href = '#', index = 0 }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={href} style={{ textDecoration: 'none', display: 'block' }} >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderTop: '1px solid rgba(0,0,0,0.1)',
            padding: '0',
            cursor: 'pointer',
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/7',
            overflow: 'hidden',
            marginBottom: '0',
          }}>
            <Image
              src={image}
              alt={title}
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2}
              style={{
                objectFit: 'cover',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
                transformOrigin: 'center center',
              }}
            />
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.06)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'opacity',
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 0',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.4s ease',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-instrument-serif), serif',
              fontSize: 'clamp(24px, 2.8vw, 40px)',
              fontWeight: 500,
              color: '#1A1A1A',
            }}>
              {title}
            </h3>
            <span style={{
              fontFamily: 'var(--font-caveat), cursive',
              fontSize: '18px',
              color: 'rgba(0,0,0,0.55)',
            }}>
              {category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
