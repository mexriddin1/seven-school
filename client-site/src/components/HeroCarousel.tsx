'use client';
import { useEffect, useState } from 'react';

const DEFAULT_SLIDES = [
  'https://images.unsplash.com/photo-1427504494785-cdfa056f20e1?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1456961433659-f0acc3f27c02?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1516534775068-bb2803e40322?w=1200&h=800&fit=crop',
];

export function HeroCarousel({ slides }: { slides?: string[] }) {
  const imgs = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % imgs.length), 5000);
    return () => clearInterval(id);
  }, [imgs.length]);
  return (
    <div className="carousel-container">
      {imgs.map((src, i) => (
        <div
          key={i}
          className={'carousel-slide' + (i === active ? ' active' : '')}
          style={{
            backgroundImage: `linear-gradient(rgba(6,17,60,0.3), rgba(6,17,60,0.5)), url('${src}')`,
          }}
        />
      ))}
    </div>
  );
}
