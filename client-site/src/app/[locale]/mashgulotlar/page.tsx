import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { fetchSiteBundle } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};

  const locale = params.locale;
  const baseUrl = "https://sevenschool.uz";
  const localizedUrl = `${baseUrl}/${locale}/mashgulotlar`;

  const titleMap: Record<string, string> = {
    uz: "Maktabga tayyorlov va chuqurlashtirilgan darslar — Seven School",
    ru: "Подготовка к школе и STEAM обучение в Ташкенте — Seven School",
    en: "School Preparation and Advanced STEAM Classes — Seven School",
  };

  const descriptionMap: Record<string, string> = {
    uz: "Seven School maktab va bog'chasidagi zamonaviy mashg'ulotlar, STEAM dasturi, ingliz va arab tili darslari hamda to'garaklar bilan tanishing.",
    ru: "Занятия и кружки в Seven School: эффективная подготовка к школе, STEAM программа, углубленный английский и арабский языки для детей. Узнать подробнее!",
    en: "Explore educational activities at Seven School: pre-school preparation, interactive STEAM curriculum, intensive English and Arabic language classes.",
  };

  const keywordsMap: Record<string, string> = {
    uz: "maktabga tayyorlov kursi toshkent, xususiy maktab darslari, steam ta'lim tizimi, ingliz tili maktabi, bolalar bog'chasi mashg'ulotlari",
    ru: "подготовка к школе ташкент, подготовительные курсы для школы, steam школа ташкент, частная школа с английским уклоном, занятия в детском саду",
    en: "preschool preparation tashkent, steam school tashkent, advanced english classes, private school curriculum, kindergarten activities",
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
        uz: `${baseUrl}/uz/mashgulotlar`,
        ru: `${baseUrl}/ru/mashgulotlar`,
        en: `${baseUrl}/en/mashgulotlar`,
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

export default async function LessonsPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = getDict(locale).lessons;
  const bundle = await fetchSiteBundle(locale);

  const blocks = (bundle.lesson_blocks || []).length
    ? bundle.lesson_blocks.map((b) => ({
        icon: b.icon || "✦",
        title: b.title,
        desc: b.description,
        tags: Array.isArray(b.tags) ? b.tags : [],
      }))
    : d.blocks;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{d.eyebrow}</span>
          <h1 dangerouslySetInnerHTML={{ __html: d.title_html }} />
          <p className="lead">{d.lead}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="lessons-grid">
            {blocks.map((b, i) => (
              <div className="lesson-block" key={i}>
                <div className="lesson-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <div className="lesson-tags">
                  {(b.tags || []).map((t: string) => (
                    <span className="lesson-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--navy)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            style={{ color: "#fff" }}
            dangerouslySetInnerHTML={{ __html: d.dark_h2_html }}
          />
          <p
            style={{
              color: "rgba(255,255,255,.7)",
              maxWidth: 600,
              margin: "20px auto 32px",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            {d.dark_p}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            data-popup-open
          >
            {d.dark_btn}
          </button>
        </div>
      </section>
    </>
  );
}
