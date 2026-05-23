import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchBlogPostBySlug, resolveMediaUrl } from '@/lib/api';

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  try {
    const post = await fetchBlogPostBySlug(params.slug, params.locale as Locale);
    return { title: post.title + ' — Seven School', description: post.excerpt || '' };
  } catch {
    return {};
  }
}

export default async function BlogDetailPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale).blog;

  let post;
  try {
    post = await fetchBlogPostBySlug(params.slug, locale);
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1>{post.title}</h1>
          {post.date_label && <p className="lead">{post.date_label}</p>}
        </div>
      </section>

      <section>
        <div className="container">
          <article className="blog-article">
            <Link href={`/${locale}/blog`} className="blog-back" data-popup-skip="true">{d.back}</Link>
            {post.badge && <div className="blog-tag">{post.badge}</div>}
            {post.image_url && (
              <div className="blog-cover">
                <img src={resolveMediaUrl(post.image_url)} alt={post.title} />
              </div>
            )}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }} />
          </article>
        </div>
      </section>
    </>
  );
}
