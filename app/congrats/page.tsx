import { BannerCongrats } from "../../components/sections/BannerCongrats";
import { BannerInfo } from "../../components/sections/BannerInfo";
import { ClientScripts } from "../../components/ClientScripts";
import { Confetti } from "../../components/Confetti";
import { Footer } from "../../components/sections/Footer";
import { HeroCongrats } from "../../components/sections/HeroCongrats";
import { Results } from "../../components/sections/Results";
import { Reviews } from "../../components/sections/Reviews";
import { TabAttention } from "../../components/TabAttention";
import { client } from "../../sanity/lib/client";
import { congratsPageQuery } from "../../sanity/lib/queries";
import type { CongratsPage } from "../../sanity/types";

export const revalidate = 60;

// Funnel utility page — never in search results, even after cutover.
export const metadata = {
  title: "Congrats | C17 Lab",
  robots: { index: false, follow: false },
};

/** The post-application page: no header, and a narrower footer. */
export default async function Congrats() {
  const data = await client.fetch<CongratsPage>(congratsPageQuery);

  return (
    <div className="page-wrapper">
      <BannerCongrats data={{ text: data.heroCongrats?.bannerText }} />

      <main className="main">
        <HeroCongrats data={data.heroCongrats} />
        <Results data={data.results} />
        <Reviews data={data.reviews} />
        <BannerInfo data={data.bannerInfo} />
      </main>

      <Footer data={data.footer} narrow />
      <ClientScripts />
      <TabAttention />
      <Confetti />
    </div>
  );
}
