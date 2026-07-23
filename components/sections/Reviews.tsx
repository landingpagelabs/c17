import { StarsIcon, VerifiedBadgeIcon } from "../icons";
import { imageSrc } from "../../sanity/lib/image";
import type { Reviews as ReviewsType } from "../../sanity/types";

export function Reviews({ data }: { data: ReviewsType | null }) {
  if (!data) return null;

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-decor"></div>
      <div className="padding-global decor">
        <div className="container-large">
          <div className="reviews_wrappper">
            <div className="reviews_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>
            <div className="reviews_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>

            <div className="reviews_list">
              {data.items?.map((item, i) => {
                const isVideo = item.kind === "video";
                return (
                  <div className={isVideo ? "reviews_item modify" : "reviews_item"} key={i}>
                    {isVideo && item.videoUrl && (
                      <div className="reviews_video" data-video={item.videoUrl}>
                        <img src={imageSrc(item.videoThumb, "")} alt="" />
                        <img
                          className="hero-inner_list-item-lightbox-play"
                          src="/images/sections/hero/play.png"
                          alt=""
                        />
                      </div>
                    )}

                    <div className="reviews_head">
                      <StarsIcon />
                      {item.source !== "none" && <VerifiedBadgeIcon />}
                    </div>

                    <div className="reviews_content">
                      <p className="text-body-regular">{item.quote}</p>
                    </div>

                    <div className="reviews_info">
                      <div className="reviews_avatar">
                        <img src={imageSrc(item.avatar, "")} alt="" />
                      </div>
                      <div className="reviews_info-content">
                        <p className="text-label-extra-small">{item.name}</p>
                        <p className="text-label-extra-small">{item.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="reviews_cta">
              <div className="reviews_cta-image">
                <img
                  src={imageSrc(data.ctaImage, "/images/sections/reviews/img-cta.png")}
                  alt=""
                />
              </div>

              <div className="text-body-regular light-gray">{data.trustText}</div>
              <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="18" x2="0.5" stroke="white" strokeOpacity="0.3" />
              </svg>

              <div className="text-label-medium white reviews_cta-text"> {data.moreLabel}</div>

              <div className="reviews_cta-icon-plus">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 16C3.58172 16 0 12.4182 0 8C0 3.58172 3.58172 0 8 0C12.4182 0 16 3.58172 16 8C16 12.4182 12.4182 16 8 16ZM7.2 7.2H4V8.8H7.2V12H8.8V8.8H12V7.2H8.8V4H7.2V7.2Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="reviews_cta-icon-minus">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.59961 17.5996C5.18133 17.5996 1.59961 14.0178 1.59961 9.59961C1.59961 5.18133 5.18133 1.59961 9.59961 1.59961C14.0178 1.59961 17.5996 5.18133 17.5996 9.59961C17.5996 14.0178 14.0178 17.5996 9.59961 17.5996ZM8.79961 8.79961H5.59961V10.3996H8.79961H10.3996H13.5996V8.79961H10.3996H8.79961Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
