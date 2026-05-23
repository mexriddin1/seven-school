'use client';
import type { TogarakItem } from '@/i18n/dictionaries';

// Static image set used to back the looping clubs marquee.
const IMAGES = [
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001d8?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=480&h=320&fit=crop',
  'https://images.unsplash.com/photo-1554380297-0a139470bacc?w=480&h=320&fit=crop',
];

export function TogarakCarousel({ items }: { items: TogarakItem[] }) {
  // duplicate for the seamless marquee loop
  const loop = [...items, ...items];
  return (
    <div className="carousel-window">
      <div className="carousel-track">
        {loop.map((it, i) => {
          const src = IMAGES[i % IMAGES.length];
          return (
            <div className="feat-card" key={i}>
              <div className="feat-image">
                <img src={src} alt={it.title} />
              </div>
              <div className="feat-content">
                <h3>{it.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
