import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle, fetchBlogPostBySlug, resolveMediaUrl } from '@/lib/api';
import { CtaBanner } from '@/components/CtaBanner';

type Params = { locale: string; slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  try {
    const post = await fetchBlogPostBySlug(params.slug, params.locale as Locale);
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);

  let post;
  try {
    post = await fetchBlogPostBySlug(params.slug, locale);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const bundle = await fetchSiteBundle(locale);
  const s = bundle.settings;

  return (
    <>
      {/* ============= BLOG DETAIL ARTICLE ============= */}
      <article className="blog-detail">
        <div className="container">
          <div className="blog-detail-header">
            {post.badge && <span className="badge">{post.badge}</span>}
            {post.date_label && <span className="blog-meta">{post.date_label}</span>}
          </div>
          <h1>{post.title}</h1>
          {post.image_url && (
            <div className="blog-detail-hero">
              <img src={resolveMediaUrl(post.image_url)} alt={post.title} />
            </div>
          )}
          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
          <div className="blog-detail-footer">
            <Link href={`/${locale}/blog`} className="btn btn-outline">
              &larr; {dict.cta_back_all}
            </Link>
          </div>
        </div>
      </article>

      {/* ============= CTA BANNER ============= */}
      <CtaBanner locale={locale} settings={s} showMap={false} />
    </>
  );
}
