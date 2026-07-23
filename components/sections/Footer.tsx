import { FOOTER_ASK_ICONS } from "./footer-icons";
import { SOCIAL_ICONS } from "./social-icons";
import { CtaMain } from "../CtaMain";
import { RichText } from "../RichText";
import { imageProps } from "../../sanity/lib/image";
import type { Footer as FooterType } from "../../sanity/types";

/** Matches the CMS link label to its icon, e.g. "LinkedIn" -> LinkedInIcon. */
function SocialIcon({ label }: { label?: string }) {
  const Icon = SOCIAL_ICONS[(label || "").toLowerCase()];
  return Icon ? <Icon /> : null;
}

/** Footer contact/legal links ship from the CMS with href "#". A real CMS href
 *  always wins; otherwise we derive it from the label (email -> mailto, phone ->
 *  tel, legal pages -> their route). no-hover links (e.g. the address) are left
 *  untouched. */
const FOOTER_LINK_ROUTES: Record<string, string> = {
  "privacy policy": "/private-policy",
  "terms of service": "/terms-of-service",
};
/** External links open in a new tab; internal/anchor/mailto/tel stay put. */
function externalProps(href: string) {
  return /^https?:\/\//.test(href)
    ? { target: "_blank" as const, rel: "noopener" }
    : {};
}

function footerHref(link: { href?: string; label?: string; noHover?: boolean }): string {
  const href = link.href;
  if (href && href !== "#") return href;
  if (link.noHover) return href || "#";
  const label = (link.label || "").trim();
  if (label.includes("@")) return `mailto:${label}`;
  if (/^[+(]?[\d][\d\s()+-]{5,}$/.test(label)) return `tel:${label.replace(/[^\d+]/g, "")}`;
  return FOOTER_LINK_ROUTES[label.toLowerCase()] ?? href ?? "#";
}

/**
 * `narrow` renders the congrats-page variant: a 1080px container instead of
 * 1190px. Which link columns appear is data, not code — the congrats footer
 * document simply holds fewer of them.
 */
export function Footer({
  data,
  narrow = false,
}: {
  data: FooterType | null;
  narrow?: boolean;
}) {
  if (!data) return null;

  const copyright = (data.copyright || "").replace(
    "{year}",
    String(new Date().getFullYear())
  );

  return (
    <footer className="footer">
      <div className="padding-global">
        <div className={narrow ? "container-large-small" : "container-large"}>
          <div className="footer_wrapper">
            <div className="footer_head">
              <div className="footer-head_left">
                <div className="footer-head-left_logo-image">
                  <img
                    className="footer-head-left_logo-img"
                    {...imageProps(data.logo, "/images/footer/C17_logo.webp", { width: 164 })}
                    alt="C17 logo"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="footer-head-left_title-wrap">
                  <h5 className="title-h5">
                    <RichText value={data.title} boldClassName="footer-head-span" />
                  </h5>
                </div>
                <CtaMain cta={data.cta} slim />
              </div>

              <div className="footer-head_right">
                {data.columns?.map((column, i) => (
                  <div
                    className={
                      column.isLong
                        ? "footer-head-right_list is-long"
                        : "footer-head-right_list"
                    }
                    key={i}
                  >
                    <div className="footer-head-right-list_title-wrap">
                      <p className="label-large is-semibold">{column.title}</p>
                    </div>
                    <div className="footer-head-right-list_links-wrap">
                      {column.links?.map((link, j) => {
                        if (column.isSocial) {
                          return (
                            <a
                              href={footerHref(link)}
                              className="footer_social-wrap"
                              key={j}
                              {...externalProps(footerHref(link))}
                            >
                              <div className="footer_social">
                                <SocialIcon label={link.label} />
                              </div>
                              <div className="item_footer-head-right">
                                <p className="text-body-regular">{link.label}</p>
                              </div>
                            </a>
                          );
                        }
                        // Plain-text rows (e.g. the street address) are not
                        // links at all — no href, no hover, no cursor.
                        if (link.noHover) {
                          return (
                            <div className="item_footer-head-right no-hover" key={j}>
                              <p className="text-body-regular">{link.label}</p>
                            </div>
                          );
                        }
                        return (
                          <a
                            href={footerHref(link)}
                            className="item_footer-head-right"
                            // A video link opens the shared modal (see all.js).
                            data-video={link.videoUrl || undefined}
                            key={j}
                            {...externalProps(footerHref(link))}
                          >
                            <p className="text-body-regular">{link.label}</p>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer_content">
              <div className="footer-content_left">
                <div className="footer-content-left_title-wrap">
                  <p className="text-body-small">{data.askTitle}</p>
                </div>
                <div className="footer-content-left_list">
                  {data.askLinks?.map((link, i) => {
                    const Icon = FOOTER_ASK_ICONS[i];
                    return (
                      <a
                        href={link.href || "#"}
                        target="_blank"
                        className="item_footer-content-left"
                        key={i}
                      >
                        {Icon && <Icon />}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="footer-content_right">
                {/* Certification badges are not links (and get no hover)
                    unless the CMS provides a real destination. */}
                {data.awards?.map((award, i) => {
                  const img = (
                    <img
                      className="item-footer-content-right_img"
                      {...imageProps(award.image, `/images/footer/award_${i + 1}.webp`, { width: 100 })}
                      alt="award image"
                      loading="lazy"
                      decoding="async"
                    />
                  );
                  return award.href && award.href !== "#" ? (
                    <a
                      href={award.href}
                      className="item_footer-content-right"
                      key={i}
                      {...externalProps(award.href)}
                    >
                      {img}
                    </a>
                  ) : (
                    <div className="item_footer-content-right" key={i}>
                      {img}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="footer_bottom">
              <div className="footer-bottom_left">
                <div className="footer-bottom-left_image">
                  <img
                    className="footer-bottom-left_img"
                    {...imageProps(data.builtBy?.logo, "/images/footer/bottom_logo.webp", { width: 40 })}
                    alt="LPL logo"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* The second logo is only in the home (wide) footer. */}
                  {!narrow && (
                    <img
                      className="footer-bottom-left_img-2"
                      src="/images/footer/bottom_logo-2.webp" width={78} height={78}
                      alt="LPL logo" loading="lazy" decoding="async" />
                  )}
                </div>
                <a
                  href={data.builtBy?.href || "#"}
                  target="_blank"
                  className="footer-bottom-left_title-wrap"
                >
                  <p className="text-body-small">{data.builtBy?.label}</p>
                </a>
              </div>
              <div className="footer-bottom_right">
                <p className="text-body-small">{copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
