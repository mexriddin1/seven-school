import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { isLocale } from '@/i18n/config';
import { getDict } from '@/i18n/dictionaries';
import { fetchSiteBundle } from '@/lib/api';
import { BlogList } from '@/components/BlogList';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = getDict(params.locale as Locale);
  return { title: dict.meta.blog_title, description: dict.meta.blog_desc };
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale).blog;
  const bundle = await fetchSiteBundle(locale);
  const posts = bundle.blog_posts || [];

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1>{d.title}</h1>
          <p className="lead">{d.lead}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <BlogList locale={locale} posts={posts} />
        </div>
      </section>
    </>
  );
}
