import type { Metadata } from "next";

import "../styles/main.css";

export const metadata: Metadata = {
  title: "C17 — AI Sales As A Service",
  description:
    "We build the outbound system, get replies from hard-to-reach buyers, book meetings with our SDRs and then install it in-house.",
  // TabAttention swaps this href while the tab is backgrounded.
  icons: { icon: "/images/header/favicon-default.png" },
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
      <body>{children}</body>
    </html>
  );
}
