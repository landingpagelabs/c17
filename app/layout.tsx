import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "../styles/main.css";
import { SITE_DESCRIPTION, SITE_LIVE, SITE_NAME, SITE_TITLE, SITE_URL } from "../lib/seo";

const GTM_ID = "GTM-KLBG4X5C";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // TabAttention swaps this href while the tab is backgrounded.
  icons: { icon: "/images/header/favicon-default.png" },
  verification: { google: "V333n3ud0teknMuHjwtOSlUZHJP2VWRqmZttZjxYt4U" },
  // Whole-site noindex until the c17.ai cutover (see lib/seo.ts). Pages may
  // override robots; congrats/pre-call pin their own permanent noindex.
  ...(SITE_LIVE ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/footer/C17_logo.webp`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PP Mori renders all text on every page — preloading skips the
            CSS → @import fonts.css → @font-face discovery waterfall. */}
        <link rel="preload" href="/fonts/PPMori-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPMori-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPMori-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* Google Tag Manager — afterInteractive: tracks early, never blocks paint. */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* iClosed Lift widget (floating CTA) — idle-loaded, not LCP-relevant. */}
        <Script
          src="https://app.iclosed.io/assets/widget.js"
          data-cta-widget="7I5cbkRlvfV9"
          strategy="lazyOnload"
        />
        {/* CantClone design protection — idle-loaded. */}
        <Script
          src="https://cdn.cantclone.com/cantclone.js"
          data-key="79529ca0889e4fe999fc25027293b992"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
