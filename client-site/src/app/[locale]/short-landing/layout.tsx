import Script from 'next/script';

export default function ShortLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="telegram-pixel-short-landing" strategy="afterInteractive">
        {`(function(t,l,g,r,m){t[g]||(g=t[g]=function(){g.run?g.run.apply(g,arguments):g.queue.push(arguments)},g.queue=[],t=l.createElement(r),t.async=!0,t.src=m,l=l.getElementsByTagName(r)[0],l.parentNode.insertBefore(t,l))})(window,document,'tgp','script','https://telegram.org/js/pixel.js');tgp('init','aGnVh4yo');tgp('event','aGnVh4yo-LgRjEjQB');`}
      </Script>

      {children}
    </>
  );
}
