import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ClientScripts } from "../../../components/ClientScripts";
import { Footer } from "../../../components/sections/Footer";
import { Header } from "../../../components/sections/Header";
import { TermsPage } from "../../../components/sections/TermsPage";
import { client } from "../../../sanity/lib/client";
import { legalPages } from "../../../sanity/pages";
import { termsPageQuery } from "../../../sanity/lib/queries";
import type {
  Footer as FooterType,
  Header as HeaderType,
  TermsPage as TermsPageType,
} from "../../../sanity/types";

export const revalidate = 60;

/** Each legal page's document id doubles as its URL slug. */
const SLUGS: string[] = legalPages.map((p) => p.id);

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

// Only the known legal slugs resolve here; anything else 404s.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

const load = (slug: string) =>
  client.fetch<{
    page: TermsPageType | null;
    header: HeaderType | null;
    footer: FooterType | null;
  }>(termsPageQuery, { slug });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await load(slug);
  return {
    title: page?.pageTitle || page?.title,
    alternates: { canonical: `/${slug}` },
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const { page, header, footer } = await load(slug);
  if (!page) notFound();

  return (
    <div className="page-wrapper">
      <Header data={header} />

      <main className="main">
        <TermsPage data={page} />
      </main>

      <Footer data={footer} narrow />
      <ClientScripts />
    </div>
  );
}
