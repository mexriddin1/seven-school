import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, resolveMediaUrl } from '@/lib/api';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';
import { BlogSearch } from '@/components/BlogSearch';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.blog_title, description: dict.meta.blog_desc };
}

// Inline SVG placeholder used when a blog post has no image — matches the
// stylistic decorative icon found in the reference design.
function BlogImgPlaceholder() {
  return (
    <svg
      className="blog-img-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 16l5-5 4 4 3-3 6 6" />
      <circle cx="8.5" cy="9.5" r="1.5" />
    </svg>
  );
}

function slugifyBadge(badge: string | undefined | null): string {
  if (!badge) return 'uni';
  const map: Record<string, string> = {
    grant: 'grant',
    ielts: 'ielts',
    qabul: 'qabul',
    universitet: 'uni',
    university: 'uni',
    karyera: 'career',
    career: 'career',
    tavsiya: 'tip',
    'ota-onalarga': 'parents',
    parents: 'parents',
  };
  const lower = badge.toLowerCase().trim();
  if (map[lower]) return map[lower];
  return (
    lower
      .replace(/['']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'uni'
  );
}

export default async function BlogIndex({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  return (
    <>
      {/* ============= PAGE HERO ============= */}
      <PageHero
        locale={locale}
        eyebrow={dict.page_eyebrows.blog}
        title={s['blog.hero_title'] || dict.nav.blog || 'Blog'}
        showCrumbs={false}
      />

      {/* ============= BLOG GRID ============= */}
      <section className="blog">
        <div className="container">
          <BlogSearch placeholder={dict.blog_search_placeholder} />
          <div className="blog-grid">
            {bundle.blog_posts.map((p, i) => {
              const delay = i % 3;
              const delayClass = delay === 0 ? '' : ` delay-${delay}`;
              const badgeSlug = slugifyBadge(p.badge);
              return (
                <Link
                  key={p.id}
                  href={`/${locale}/blog/${p.slug}`}
                  className={`blog-card reveal${delayClass}`}
                >
                  <div className={`blog-img blog-img-${badgeSlug}`}>
                    {p.image_url ? (
                      <img src={resolveMediaUrl(p.image_url)} alt={p.title} />
                    ) : (
                      <BlogImgPlaceholder />
                    )}
                    {p.badge && <span className="badge">{p.badge}</span>}
                  </div>
                  <div className="blog-body">
                    <span className="blog-meta">{p.date_label}</span>
                    <h3>{p.title}</h3>
                    {p.excerpt && <p>{p.excerpt}</p>}
                    <span className="text-link">{dict.read_more || "O'qish →"}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <CtaBanner locale={locale} settings={s} showMap={false} />
    </>
  );
}
