import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { CtaMain } from "../CtaMain";
import type { TermsPage as TermsPageType } from "../../sanity/types";

/**
 * Maps Portable Text onto the original markup exactly: paragraphs and list
 * items carry `text-body-regular secondary`, links `terms-content_link`, and
 * tables keep their wrapper so they can scroll on mobile.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-body-regular secondary">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="terms-content_list">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-body-regular secondary">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <span className="fw-600">{children}</span>,
    num: ({ children }) => <span className="terms-content_num">{children}</span>,
    link: ({ children, value }) => (
      <a className="terms-content_link" href={value?.href || "#"}>
        {children}
      </a>
    ),
  },
  types: {
    table: ({ value }) => (
      <div className="terms-content_table-wrap">
        <table className="terms-content_table">
          <thead>
            <tr>
              {value?.head?.map((cell: string, i: number) => (
                <th className="text-body-regular" key={i}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value?.rows?.map(
              (row: { cells?: string[] }, i: number) => (
                <tr key={i}>
                  {row.cells?.map((cell, j) => (
                    <td className="text-body-regular secondary" key={j}>
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    ),
  },
};

export function TermsPage({ data }: { data: TermsPageType | null }) {
  if (!data) return null;

  return (
    <>
      <section className="hero-terms">
        <div className="padding-global decor">
          <div className="container-large">
            <div className="hero-terms_wrapper">
              <div className="hero-terms_strapline">
                <p className="text-body-regular gray">{data.strapline}</p>
              </div>
              <div className="hero-terms_title-wrap">
                <h1 className="title-h1">{data.title}</h1>
              </div>
              {/* Legal pages have no campaign form to scroll to, so this CTA
                  points back to the home page. */}
              <CtaMain cta={{ ...data.cta, href: "/" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="terms-content">
        <div className="padding-global decor">
          <div className="container-large">
            <div className="terms-content_wrapper">
              {data.items?.map((item, i) => (
                <div className="terms-content_item" key={i}>
                  {item.title && (
                    <div className="terms-content_title-wrap">
                      <h2 className={item.titleStyle || "text-label-large"}>
                        {item.title}
                      </h2>
                    </div>
                  )}
                  <PortableText value={item.body || []} components={components} />
                </div>
              ))}

              {!!data.signatures?.length && (
                <div className="terms-content_sign">
                  {data.signatures.map((col, i) => (
                    <div className="terms-content_sign-col" key={i}>
                      <p className="text-body-regular secondary fw-600">{col.party}</p>
                      {col.lines?.map((line, j) => (
                        <p className="text-body-regular secondary" key={j}>
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
