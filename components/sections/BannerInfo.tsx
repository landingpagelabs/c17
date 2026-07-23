import { SignoffLineIcon, SignoffQuoteIcon } from "./congrats-icons";
import { CtaMain } from "../CtaMain";
import { imageSrc } from "../../sanity/lib/image";
import type { BannerInfo as BannerInfoType } from "../../sanity/types";

export function BannerInfo({ data }: { data: BannerInfoType | null }) {
  if (!data) return null;

  return (
    <section className="banner-info">
      <div className="padding-global decor tb-decor">
        <div className="banner-info_decor">
          <img src="/images/sections/congrats/decor-left.png" alt="" />
        </div>
        <div className="container-large">
          <div className="banner-info_big-wrapper">
            <div className="banner-info_wrapper">
              <div className="banner-info_title-wrap">
                <h5 className="title-h5">{data.title}</h5>
              </div>
              <div className="banner-info_title-wrap-gray">
                <SignoffLineIcon />
                <h5 className="title-h5 gray-60">{data.subtitle}</h5>
                <SignoffLineIcon />
              </div>
              <div className="banner-info_content-wrap">
                <div className="banner-info_content">
                  <SignoffQuoteIcon />
                  <div className="banner-info_content-avatar">
                    <img src={imageSrc(data.avatar, "")} alt="" />
                  </div>
                  <div className="banner-info_content-text">
                    <p className="text-label-large">{data.name}</p>
                    <p className="text-body-small">{data.role}</p>
                  </div>
                </div>
              </div>

              <div className="banner-info_content-text-2">
                <p className="text-body-small">{data.trustText}</p>
              </div>

              <CtaMain cta={data.cta} />

              <div className="banner-info_list-title">
                <p className="text-label-mini-large">{data.listTitle}</p>
              </div>
              <div className="banner-info_list">
                {data.logos?.map((logo, i) => (
                  <div className="banner-info_list-item" key={i}>
                    <img src={imageSrc(logo, "")} alt="" />
                  </div>
                ))}
              </div>

              <div className="banner-info_image-big">
                <img
                  src={imageSrc(
                    data.image,
                    "/images/sections/congrats/banner-images.png"
                  )}
                  alt=""
                />
              </div>
              <div className="banner-info_image-big-mobile">
                <img src="/images/sections/congrats/banner-images-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="banner-info_decor right">
          <img src="/images/sections/congrats/decor-right.png" alt="" />
        </div>
      </div>
    </section>
  );
}
