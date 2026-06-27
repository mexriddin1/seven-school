import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { fetchSiteBundle } from "@/lib/api";
import { BlogList } from "@/components/BlogList";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};

  const locale = params.locale;
  const baseUrl = "https://sevenschool.uz";
  const localizedUrl = `${baseUrl}/${locale}/blog`;

  const titleMap: Record<string, string> = {
    uz: "Xususiy maktab va bog'cha blogi, foydali maqolalar — Seven School",
    ru: "Блог частной школы и детского сада в Ташкенте — Seven School",
    en: "Private School & Kindergarten Blog, Educational Articles — Seven School",
  };

  const descriptionMap: Record<string, string> = {
    uz: "Farzand tarbiyasi, zamonaviy ta'lim metodikalari va Seven School hayoti haqidagi eng qiziqarli yangiliklar hamda foydali maqolalarni o'qing.",
    ru: "Полезные статьи о воспитании детей, современных методиках обучения и свежие новости из жизни Seven School. Читайте советы экспертов и отзывы.",
    en: "Read the latest news from Seven School, useful parenting tips, articles on modern teaching methodologies, and insights into private education in Tashkent.",
  };

  const keywordsMap: Record<string, string> = {
    uz: "xususiy maktab yangiliklari, xususiy maktab blogi, bolalar tarbiyasi haqida maqolalar, ta'lim tizimi sharhlari, seven school blog",
    ru: "частная школа отзывы, блог частной школы, новости детского сада, советы родителям о школе, статьи про воспитание детей ташкент",
    en: "private school blog, kindergarten news, educational articles, parenting tips tashkent, seven school news, private education articles",
  };

  const currentTitle = titleMap[locale] || titleMap["uz"];
  const currentDescription = descriptionMap[locale] || descriptionMap["uz"];
  const currentKeywords = keywordsMap[locale] || keywordsMap["uz"];

  return {
    title: currentTitle,
    description: currentDescription,
    keywords: currentKeywords,
    metadataBase: new URL(baseUrl),

    alternates: {
      canonical: localizedUrl,
      languages: {
        uz: `${baseUrl}/uz/blog`,
        ru: `${baseUrl}/ru/blog`,
        en: `${baseUrl}/en/blog`,
      },
    },

    openGraph: {
      title: currentTitle,
      description: currentDescription,
      url: localizedUrl,
      siteName: "Seven School",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [
        {
          url: "/img/hero-bg.jpg",
          width: 1200,
          height: 630,
          alt: currentTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: currentTitle,
      description: currentDescription,
      images: ["/img/hero-bg.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
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
