import { FOOTER_ASK_ICONS } from "./footer-icons";
import { SOCIAL_ICONS } from "./social-icons";
import { CtaMain } from "../CtaMain";
import { RichText } from "../RichText";
import { imageSrc } from "../../sanity/lib/image";
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
                    src={imageSrc(data.logo, "/images/footer/C17_logo.png")}
                    alt="C17 logo"
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
                      {column.links?.map((link, j) =>
                        column.isSocial ? (
                          <a href={footerHref(link)} className="footer_social-wrap" key={j}>
                            <div className="footer_social">
                              <SocialIcon label={link.label} />
                            </div>
                            <div className="item_footer-head-right">
                              <p className="text-body-regular">{link.label}</p>
                            </div>
                          </a>
                        ) : (
                          <a
                            href={footerHref(link)}
                            className={
                              link.noHover
                                ? "item_footer-head-right no-hover"
                                : "item_footer-head-right"
                            }
                            // A video link opens the shared modal (see all.js).
                            data-video={link.videoUrl || undefined}
                            key={j}
                          >
                            <p className="text-body-regular">{link.label}</p>
                          </a>
                        )
                      )}
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
                {data.awards?.map((award, i) => (
                  <a href={award.href || "#"} className="item_footer-content-right" key={i}>
                    <img
                      className="item-footer-content-right_img"
                      src={imageSrc(award.image, `/images/footer/award_${i + 1}.png`)}
                      alt="award image"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer_bottom">
              <div className="footer-bottom_left">
                <div className="footer-bottom-left_image">
                  <img
                    className="footer-bottom-left_img"
                    src={imageSrc(data.builtBy?.logo, "/images/footer/bottom_logo.png")}
                    alt="LPL logo"
                  />
                  {/* The second logo is only in the home (wide) footer. */}
                  {!narrow && (
                    <img
                      className="footer-bottom-left_img-2"
                      src="/images/footer/bottom_logo-2.png"
                      alt="LPL logo"
                    />
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
