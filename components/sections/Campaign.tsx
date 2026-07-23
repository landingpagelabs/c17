import {
  BottomBadgeIcon,
  BottomDividerIcon,
  BottomVerifiedIcon,
} from "./campaign-icons";
import { imageProps } from "../../sanity/lib/image";
import type { Campaign as CampaignType } from "../../sanity/types";

/** Renders text with any email addresses turned into mailto links. */
function withEmailLinks(text: string) {
  return text
    .split(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)
    .map((part, i) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(part) ? (
        <a key={i} href={`mailto:${part}`} className="campaign_mail-link">
          {part}
        </a>
      ) : (
        part
      )
    );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5527_9396)">
        <path
          d="M18.7431 18.7477H15.4853V13.6428C15.4853 12.4254 15.4605 10.8588 13.7876 10.8588C12.089 10.8588 11.8296 12.1834 11.8296 13.5529V18.7477H8.57175V8.25H11.7013V9.68092H11.7434C12.1807 8.85592 13.244 7.98508 14.8326 7.98508C18.1335 7.98508 18.744 10.1576 18.744 12.9855L18.7431 18.7477ZM4.89225 6.81358C4.64372 6.8137 4.39761 6.76481 4.168 6.6697C3.93839 6.5746 3.72979 6.43514 3.55413 6.25932C3.37848 6.0835 3.23923 5.87476 3.14434 5.64506C3.04946 5.41536 3.00081 5.1692 3.00117 4.92067C3.00135 4.54646 3.11249 4.18072 3.32054 3.86968C3.52858 3.55865 3.82419 3.31629 4.16998 3.17325C4.51576 3.03022 4.8962 2.99294 5.26318 3.06612C5.63015 3.1393 5.96719 3.31966 6.23166 3.58439C6.49613 3.84912 6.67617 4.18632 6.74899 4.55337C6.82182 4.92042 6.78416 5.30082 6.6408 5.64647C6.49743 5.99212 6.25478 6.28749 5.94354 6.49523C5.6323 6.70298 5.26645 6.81377 4.89225 6.81358ZM6.52575 18.7477H3.25875V8.25H6.52575V18.7477ZM20.3729 0H1.62342C0.726 0 0 0.7095 0 1.58492V20.4151C0 21.2914 0.726 22 1.62342 22H20.3702C21.2667 22 22 21.2914 22 20.4151V1.58492C22 0.7095 21.2667 0 20.3702 0H20.3729Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_5527_9396">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Campaign({ data }: { data: CampaignType | null }) {
  if (!data) return null;

  return (
    <section className="campaign" id="apply">
      <div className="padding-global decor">
        <div className="campaign_decor">
          <img src="/images/sections/campaign/left-decor.webp" width={392} height={2379} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="container-large">
          <div className="campaign_wrapper-big">
            <div className="campaign_wrapper">
              <div className="campaign_strapline">
                {data.straplineItems?.map((item, i) => {
                  // Items are objects { text, icon } from the CMS; older content
                  // may still be plain strings, so handle both. The icon falls
                  // back to the original per-position asset when none is set.
                  const text = typeof item === "string" ? item : item?.text;
                  const icon = typeof item === "string" ? undefined : item?.icon;
                  return (
                    <div
                      className={i === 0 ? "campaign_strapline-item active" : "campaign_strapline-item"}
                      key={i}
                    >
                      <p className="text-body-regular gray">[</p>
                      <img
                        {...imageProps(icon, `/images/sections/campaign/strapline-${i + 1}.svg`, { width: 20 })}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <p className="text-body-regular gray"> {text} </p>
                      <p className="text-body-regular gray">]</p>
                    </div>
                  );
                })}
              </div>

              <div className="campaign_title-wrap">
                <h2 className="title-h2">{data.title}</h2>
              </div>
              <div className="campaign_text-wrap">
                <p className="text-body-large">{data.text}</p>
              </div>

              <div className="campaign_form-wrap">
                <form className="campaign_form" data-question-count={data.questions?.length ?? 0}>
                  <div className="campaign_form-top">
                    <svg width="55" height="13" viewBox="0 0 55 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.39536 12.7907C9.92741 12.7907 12.7907 9.92741 12.7907 6.39536C12.7907 2.8633 9.92741 0 6.39536 0C2.8633 0 0 2.8633 0 6.39536C0 9.92741 2.8633 12.7907 6.39536 12.7907Z"
                        fill="#FF4B59"
                      />
                      <path
                        d="M27.1258 12.7907C30.6579 12.7907 33.5212 9.92742 33.5212 6.39536C33.5212 2.8633 30.6579 0 27.1258 0C23.5938 0 20.7305 2.8633 20.7305 6.39536C20.7305 9.92742 23.5938 12.7907 27.1258 12.7907Z"
                        fill="#FFC600"
                      />
                      <path
                        d="M47.8573 12.7907C51.3893 12.7907 54.2526 9.92741 54.2526 6.39536C54.2526 2.8633 51.3893 0 47.8573 0C44.3252 0 41.4619 2.8633 41.4619 6.39536C41.4619 9.92741 44.3252 12.7907 47.8573 12.7907Z"
                        fill="#00CA48"
                      />
                    </svg>
                  </div>

                  <div className="campaign_form-progress">
                    <div className="campaign_form-progress-thumb"></div>
                  </div>

                  {data.questions?.map((q, i) => (
                    <div
                      className={i === 0 ? "campaign_step active" : "campaign_step"}
                      if-step={String(i + 1)}
                      key={i}
                    >
                      <div className="campaign_step-title-wrap">
                        <h5 className="text-label-large">{q.question}</h5>
                      </div>
                      <div className="campaign_radio">
                        {/* The "yes" default is pre-highlighted; the script
                            moves .purple as the user answers. */}
                        <div className="campaign_radio-input purple">
                          <label>
                            <input type="radio" name="answer" value="yes" defaultChecked />
                            <p className="text-label-x-large">{q.yesLabel}</p>
                          </label>
                        </div>
                        <div className="campaign_radio-input">
                          <label>
                            <input type="radio" name="answer" value="no" />
                            <p className="text-label-x-large">{q.noLabel}</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="campaign_step" if-step="Yes">
                    <div className="campaign_step-finish-title">
                      <h4 className="text-label-large">{data.outcomeYes?.title}</h4>
                    </div>
                  </div>

                  <div className="campaign_step" if-step="No">
                    <div className="campaign_step-finish-title-no">
                      <h3 className="title-h3">{data.outcomeNo?.title}</h3>
                    </div>
                    <div className="campaign_step-finish-text-top gray">
                      <p className="text-body-regular">{data.outcomeNo?.text}</p>
                    </div>
                    <div className="campaign_step-finish-text-no gray">
                      <p className="text-body-small">{data.outcomeNo?.secondaryText}</p>
                    </div>
                    <a
                      className="cta-blue"
                      href={data.outcomeNo?.cta?.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon />
                      <p className="text-label-medium">{data.outcomeNo?.cta?.label}</p>
                    </a>
                    <div className="campaign_div"></div>
                    <div className="campaign_text-bot">
                      <p className="text-label-medium">{data.outcomeNo?.mistakeTitle}</p>
                    </div>
                    <div className="campaign_text-bot-2">
                      <p className="text-body-small">
                        {withEmailLinks(
                          data.outcomeNo?.mistakeText ||
                            "Email us at enzo@c17.ai and we'll take a second look"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Sits outside the steps: visible whichever step is active. */}
                  <div className="campaign_form-bottom">
                    <div className="campaign_form-bottom-left">
                      <div className="campaign_form-bottom-avatar">
                        <img
                          {...imageProps(
                            data.formBottom?.avatar,
                            "/images/sections/campaign/ava.webp",
                            { width: 44 }
                          )}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="campaign_form-bottom-left-info">
                        <p className="text-body-small">{data.formBottom?.quote}</p>
                        <p className="text-label-double-extra-small flex">
                          {data.formBottom?.name}
                          <BottomVerifiedIcon />
                        </p>
                      </div>
                    </div>
                    <BottomDividerIcon />
                    <div className="campaign_form-bottom-right">
                      <BottomBadgeIcon />
                      <div className="campaign_form-bottom-right-text">
                        <p className="text-body-small">{data.formBottom?.note}</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="campaign_image">
                <img
                  {...imageProps(
                    data.image,
                    "/images/sections/campaign/Frame 2147261625.webp",
                    { width: 1080 }
                  )}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="campaign_image-mobile">
                <img src="/images/sections/campaign/bot-1.webp" width={1953} height={163} alt="" loading="lazy" decoding="async" />
              </div>
            </div>

          </div>
        </div>
        <div className="campaign_decor right">
          <img src="/images/sections/campaign/right-decor.webp" width={392} height={2379} alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
