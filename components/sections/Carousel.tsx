import { CloseIcon, ModalCtaArrowIcon, PlayIcon } from "../icons";
import { imageProps } from "../../sanity/lib/image";
import type { Carousel as CarouselType } from "../../sanity/types";

export function Carousel({ data }: { data: CarouselType | null }) {
  if (!data) return null;

  return (
    <section className="carousel">
      <div className="padding-global decor">
        <div className="container-large">
          <div className="carousel_wrapper">
            <div className="carousel_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>
            <div className="carousel_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>

            {/* The script reads these to avoid hard-coding the video and start slide. */}
            <div
              className="carousel_stage"
              data-video={data.videoUrl || ""}
              data-active-brand={data.activeBrand || ""}
            >
              <div className="carousel_track">
                {data.cards?.map((card, i) => (
                  <button
                    className="carousel_card"
                    type="button"
                    data-brand={card.brand}
                    data-name={card.name}
                    key={i}
                  >
                    <span className="carousel_card-media">
                      <img
                        {...imageProps(
                          card.image,
                          `/images/sections/carousel/cards/${card.brand}.webp`,
                          { width: 350 }
                        )}
                        alt={`${card.name} customer testimonial`}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="carousel_card-tip">{card.name}</span>
                  </button>
                ))}
              </div>
              <button className="carousel_play" type="button" aria-label="Watch video">
                <PlayIcon />
              </button>
            </div>

            <div className="carousel_dock">
              <div className="carousel_dock-list">
                {data.cards?.map((card, i) => (
                  <button
                    className="carousel_dock-item"
                    type="button"
                    data-brand={card.brand}
                    data-name={card.name}
                    key={i}
                  >
                    <span className="carousel_dock-tip">{card.name}</span>
                    <img
                      {...imageProps(
                        card.icon,
                        `/images/sections/carousel/icons/${card.brand}.webp`,
                        { width: 54 }
                      )}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="carousel_dock-dot"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="carousel_modal" aria-hidden="true">
        <div className="carousel_modal-top">
          <button className="carousel_modal-close" type="button" aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="carousel_modal-body">
          <div className="carousel_modal-video"></div>
          <a className="carousel_modal-cta" href={data.modalCta?.href || "#"}>
            <span>{data.modalCta?.label}</span>
            <span className="carousel_modal-cta-arrow">
              <ModalCtaArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
