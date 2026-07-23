import { CtaMain } from "../CtaMain";
import { RichText } from "../RichText";
import { imageProps } from "../../sanity/lib/image";
import type { Hero as HeroType, HeroCard } from "../../sanity/types";

/**
 * Each card slot has its own size in hero.css, keyed by `item-N` where N runs
 * 1-9 across the three columns. Slot 1 uses the base style and has no class.
 *
 * `cards` is the slot's rotation stack: cards[0] is the visible leader, the
 * rest are pool entries the glitch wave in all.js cycles through (variants
 * are all server-rendered; only `.is-active` is displayed).
 */
function Card({
  cards,
  slot,
  fallback,
}: {
  cards: HeroCard[];
  slot: number;
  fallback: string;
}) {
  return (
    <div className="hero-inner_list-item">
      <div
        className={
          slot === 1
            ? "hero-inner_list-image"
            : `hero-inner_list-image item-${slot}`
        }
      >
        {cards.map((card, k) => (
          <img
            key={k}
            {...imageProps(card.image, k === 0 ? fallback : "", { width: 200 })}
            alt=""
            loading="lazy"
            decoding="async"
            className={k === 0 ? "chip-variant is-active" : "chip-variant"}
            data-pool={k}
          />
        ))}
      </div>
      <div className="hero-inner_list-text">
        {cards.map((card, k) => (
          <p
            key={k}
            className={
              "text-label-triple-extra-small fw-600-black chip-variant" +
              (k === 0 ? " is-active" : "")
            }
            data-pool={k}
          >
            {card.label}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Slot i shows leader cards[i]; pool entries rotate in round-robin (entry
 *  i, i+4, i+8, ... belong to slot i). */
function slotStack(
  leaders: HeroCard[] | undefined,
  pool: HeroCard[] | undefined,
  i: number
): HeroCard[] {
  const leader = leaders?.[i];
  const rest = (pool ?? []).filter((_, idx) => idx % 4 === i);
  return [leader, ...rest].filter(Boolean) as HeroCard[];
}

export function Hero({ data }: { data: HeroType | null }) {
  if (!data) return null;

  const center = data.centerCard;

  return (
    <section className="hero">
      <div className="padding-global decor">
        <div className="hero_vector">
          {/* One <picture> instead of two CSS-toggled imgs: only the matching
              source downloads, and it's the page's LCP element on mobile —
              the single fetchPriority="high" image on the site. */}
          <picture>
            <source
              media="(max-width: 991px)"
              srcSet="/images/sections/hero/Vector-mobile.webp"
              width={1170}
              height={2629}
            />
            <img
              src="/images/sections/hero/Vector.webp"
              width={2880}
              height={1271}
              fetchPriority="high"
              alt=""
            />
          </picture>
        </div>
        <div className="container-large">
          <div className="hero_wrapper">
            <div className="hero_logo">
              <img
                {...imageProps(data.logo, "/images/sections/hero/hero-logo.webp", { width: 143 })}
                alt=""
              />
            </div>
            <div className="hero_strapline">
              <p className="text-body-regular gray">
                <RichText value={data.strapline} />
              </p>
            </div>

            <div className="hero_title-wrap">
              <h1 className="title-h1">{data.title}</h1>
            </div>

            <div className="hero_text-wrap">
              <p className="text-body-large">{data.text}</p>
            </div>

            <CtaMain cta={data.cta} />

            <div className="hero_decor">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.3"
                  d="M13.1334 13.1338L19.927 7.34031L18.3791 5.79248L13.1334 10.0382L7.88767 5.79248L6.33984 7.34031L13.1334 13.1338Z"
                  fill="black"
                />
                <path
                  d="M13.1334 19.9752L19.927 14.1816L18.3791 12.6338L13.1334 16.8795L7.88767 12.6338L6.33984 14.1816L13.1334 19.9752Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="hero-inner" id="case">
              <div className="hero-inner_title">
                <p className="text-label-large fw-600-black">{data.innerTitle}</p>
              </div>

              <div className="hero-inner_list">
                <div className="hero-inner_list-left">
                  {data.leftCards?.map((_, i) => (
                    <Card
                      key={i}
                      cards={slotStack(data.leftCards, data.leftCardsPool, i)}
                      slot={i + 1}
                      fallback={`/images/sections/hero/item-${i + 1}.webp`}
                    />
                  ))}
                </div>

                <div className="hero-inner_list-center">
                  <div className="hero-inner_list-item center">
                    {center?.videoUrl && (
                      <div
                        className="hero-inner_list-item-lightbox "
                        data-video={center.videoUrl}
                      >
                        <img
                          {...imageProps(
                            center.videoThumb,
                            "/images/sections/hero/video.webp",
                            { width: 228 }
                          )}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <img
                          className="hero-inner_list-item-lightbox-play"
                          src="/images/sections/hero/play.webp" width={141} height={141}
                          alt="" loading="lazy" decoding="async" />
                      </div>
                    )}
                    <div className="hero-inner_list-image item-5">
                      <img
                        {...imageProps(
                          center?.image,
                          "/images/sections/hero/center.webp",
                          { width: 179 }
                        )}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="hero-inner_list-text">
                      <p className="text-label-triple-extra-small fw-600-black">
                        {center?.label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hero-inner_list-right">
                  {data.rightCards?.map((_, i) => (
                    <Card
                      key={i}
                      cards={slotStack(data.rightCards, data.rightCardsPool, i)}
                      slot={i + 6}
                      fallback={`/images/sections/hero/item-${i + 6}.webp`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
