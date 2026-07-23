import { imageSrc } from "../../sanity/lib/image";
import type { PreCall as PreCallType } from "../../sanity/types";

/** Pre-call has its own slim header and banner rather than the site header. */
export function PreCall({ data }: { data: PreCallType | null }) {
  if (!data) return null;

  return (
    <>
      {data.bannerText && (
        <div className="banner-call">
          <div className="padding-global">
            <div className="container-large">
              <div className="banner-call_wrapper">
                <p className="text-label-medium white">{data.bannerText}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="header-call">
        <div className="padding-global">
          <div className="container-large">
            <div className="header_wrapper call">
              <div className="header_logo call">
                <img src={imageSrc(data.logo, "/images/header/Logo.png")} alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero-call">
          <div className="padding-global decor">
            <div className="container-large">
              <div className="hero-call_wrapper">
                <div className="hero-call_title-wrap">
                  <h2 className="title-h2">{data.title}</h2>
                </div>
                <div className="hero-call_block">
                  <div className="hero-call_block-top">
                    <span className="hero-call_dot hero-call_dot--red"></span>
                    <span className="hero-call_dot hero-call_dot--yellow"></span>
                    <span className="hero-call_dot hero-call_dot--green"></span>
                  </div>
                  <div className="hero-call_block-body">
                    <div className="hero-call_field">
                      <p className="text-label-large fw-600">{data.dateLabel}</p>
                      <div className="hero-call_field-value">
                        <p className="text-label-x-large regular">{data.dateValue}</p>
                      </div>
                    </div>
                    <div className="hero-call_field">
                      <p className="text-label-large fw-600">{data.linkLabel}</p>
                      <div className="hero-call_field-value">
                        <a href={data.linkHref || "#"} className="text-body-large purple">
                          {data.linkValue}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="hero-call_block-footer">
                    <p className="text-body-regular secondary-text">{data.footNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="question">
          <div className="padding-global decor">
            <div className="container-large">
              <div className="question_wrapper">
                <div className="question_title-wrap">
                  <h2 className="title-h2">{data.questionTitle}</h2>
                </div>
                <div className="question_text-wrap">
                  <p className="text-label-x-large secondary-text">{data.questionText}</p>
                </div>
                {/* Reuses the congrats step card so the video grid matches. */}
                <div className="hero-congrats_steps-item modify">
                  <div className="hero-congrats_steps-item-list">
                    {data.videos?.map((video, i) => (
                      <div className="hero-congrats_steps-item-video" key={i}>
                        <img src={imageSrc(video, "")} alt="" />
                      </div>
                    ))}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {data.footerText && (
        <div className="footer-banner">
          <div className="padding-global">
            <div className="container-large">
              <div className="footer-banner_wrapper">
                <div className="footer-banner_image">
                  <img
                    src={imageSrc(data.footerImage, "/images/sections/call/image.png")}
                    alt=""
                  />
                </div>
                <p className="text-label-large white">{data.footerText}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
