'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { resolveMediaUrl } from '@/lib/api';

type Post = {
  id: number; slug: string; image_url: string | null;
  badge: string; date_label: string; title: string; excerpt: string;
};

export function BlogList({ locale, posts }: { locale: Locale; posts: Post[] }) {
  const d = getDict(locale).blog;
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter((p) => {
      return (
        (p.title || '').toLowerCase().includes(needle) ||
        (p.excerpt || '').toLowerCase().includes(needle) ||
        (p.badge || '').toLowerCase().includes(needle)
      );
    });
  }, [q, posts]);

  const placeholder =
    locale === 'ru' ? 'Поиск по статьям...' :
    locale === 'en' ? 'Search articles...' :
    'Maqolalardan qidiring...';

  return (
    <>
      <div className="blog-search">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'rgba(6,17,60,.5)' }}>{d.empty}</p>
      ) : (
        <div className="blog-grid">
          {filtered.map((p) => (
            <Link href={`/${locale}/blog/${p.slug}`} className="blog-card" key={p.id} data-popup-skip="true">
              <div className="blog-img">
                {p.image_url ? <img src={resolveMediaUrl(p.image_url)} alt={p.title} loading="lazy" /> : <span>📰</span>}
              </div>
              <div className="blog-body">
                {p.badge && <div className="blog-tag">{p.badge}</div>}
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="blog-read">{d.read_more}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
