import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// Google site verification xavfsiz va to'g'ri o'qilishi uchun metadata ichiga ko'chirildi
export const metadata: Metadata = {
  title: "Seven School",
  description: "Toshkentdagi xususiy maktab va bog'cha",
  verification: {
    google: "Mm679pRMxX7mNTuiwYtvcfDmtQ0bdTALaGZ_9p8NI20",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}

        {/* Google Analytics va tracking skriptlari body oxiriga ko'chirildi */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EC7BH10HJW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EC7BH10HJW');

            // Telefon raqamlarini kuzatish
            document.addEventListener("click", function(e) {
              const link = e.target.closest('a[href^="tel:"]');
              if (link && typeof gtag === 'function') {
                gtag('event', 'phone_click', {
                  'event_category': 'Contact',
                  'event_label': link.href,
                  'transport_type': 'beacon'
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
