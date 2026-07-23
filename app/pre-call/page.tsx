import type { Metadata } from "next";

import { ClientScripts } from "../../components/ClientScripts";
import { PreCall } from "../../components/sections/PreCall";
import { client } from "../../sanity/lib/client";
import { preCallQuery } from "../../sanity/lib/queries";
import type { PreCall as PreCallType } from "../../sanity/types";

export const revalidate = 60;

export const metadata: Metadata = { title: "Pre-call | C17 Lab" };

/** No site header or footer — the page ships its own slim header. */
export default async function PreCallPage() {
  const data = await client.fetch<PreCallType | null>(preCallQuery);

  return (
    <>
      <PreCall data={data} />
      <ClientScripts />
    </>
  );
}
