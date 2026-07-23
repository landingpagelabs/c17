import { ClientScripts } from "../components/ClientScripts";
import { TabAttention } from "../components/TabAttention";
import { Banner } from "../components/sections/Banner";
import { Campaign } from "../components/sections/Campaign";
import { Carousel } from "../components/sections/Carousel";
import { Compare } from "../components/sections/Compare";
import { Faq } from "../components/sections/Faq";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Quote } from "../components/sections/Quote";
import { Reviews } from "../components/sections/Reviews";
import { Services } from "../components/sections/Services";
import { Team } from "../components/sections/Team";
import { client } from "../sanity/lib/client";
import { homePageQuery } from "../sanity/lib/queries";
import type { HomePage } from "../sanity/types";

export const revalidate = 60;

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const data = await client.fetch<HomePage>(homePageQuery);

  return (
    <div className="page-wrapper">
      <Header data={data.header} />

      {/* Section order matches the original page. */}
      <main className="main">
        <Hero data={data.hero} />
        <HowItWorks data={data.howItWorks} />
        <Banner data={data.banner} />
        <Services data={data.services} />
        <Compare data={data.compare} />
        <Carousel data={data.carousel} />
        <Quote data={data.quote} />
        <Team data={data.team} />
        <Reviews data={data.reviews} />
        <Campaign data={data.campaign} />
        <Faq data={data.faq} />
      </main>

      <Footer data={data.footer} />
      <ClientScripts />
      <TabAttention />
    </div>
  );
}
