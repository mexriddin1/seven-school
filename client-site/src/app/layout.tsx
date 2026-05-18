import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seven School',
  description: "Toshkentdagi xususiy maktab va bog'cha",
};

// The root layout. We render <html lang="uz"> by default; the per-locale layout
// updates the lang attribute on the client.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
