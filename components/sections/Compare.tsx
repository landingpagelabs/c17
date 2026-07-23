import {
  StraplineLeftDecor,
  StraplineRightDecor,
  StraplineStars,
  StraplineVerified,
} from "./compare-icons";
import { CtaMain } from "../CtaMain";
import { imageSrc } from "../../sanity/lib/image";
import type { Compare as CompareType } from "../../sanity/types";

/** One icon per row, matched by position — kept in code, not the CMS. */
const ROW_ICONS = [
  "M11.0046 20.1692C5.94195 20.1692 1.83789 16.0652 1.83789 11.0026C1.83789 5.93999 5.94195 1.83594 11.0046 1.83594C16.0671 1.83594 20.1712 5.93999 20.1712 11.0026C20.1712 16.0652 16.0671 20.1692 11.0046 20.1692ZM7.79622 12.8359V14.6692H10.0879V16.5026H11.9212V14.6692H12.8379C14.1036 14.6692 15.1296 13.6433 15.1296 12.3776C15.1296 11.1119 14.1036 10.0859 12.8379 10.0859H9.17124C8.9181 10.0859 8.71289 9.88074 8.71289 9.62756C8.71289 9.37447 8.9181 9.16923 9.17124 9.16923H14.2129V7.33594H11.9212V5.5026H10.0879V7.33594H9.17124C7.90557 7.33594 6.87956 8.36194 6.87956 9.62756C6.87956 10.8933 7.90557 11.9192 9.17124 11.9192H12.8379C13.091 11.9192 13.2962 12.1245 13.2962 12.3776C13.2962 12.6307 13.091 12.8359 12.8379 12.8359H7.79622Z",
  "M1.83301 10.0837H20.1663V18.3337C20.1663 18.8399 19.7559 19.2503 19.2497 19.2503H2.74967C2.24342 19.2503 1.83301 18.8399 1.83301 18.3337V10.0837ZM15.583 2.75033H19.2497C19.7559 2.75033 20.1663 3.16074 20.1663 3.66699V8.25033H1.83301V3.66699C1.83301 3.16074 2.24342 2.75033 2.74967 2.75033H6.41634V0.916992H8.24967V2.75033H13.7497V0.916992H15.583V2.75033Z",
  "M10.9997 20.1663C5.93706 20.1663 1.83301 16.0622 1.83301 10.9997C1.83301 5.93706 5.93706 1.83301 10.9997 1.83301C16.0622 1.83301 20.1663 5.93706 20.1663 10.9997C20.1663 16.0622 16.0622 20.1663 10.9997 20.1663ZM11.9163 10.9997V6.41634H10.083V12.833H15.583V10.9997H11.9163Z",
  "M10.9997 3.66634C13.5192 3.66634 15.7433 4.93708 17.064 6.87467H14.6663V8.70801H20.1663V3.20801H18.333V5.49909C16.6612 3.2737 13.9994 1.83301 10.9997 1.83301C5.93706 1.83301 1.83301 5.93706 1.83301 10.9997H3.66634C3.66634 6.94958 6.94958 3.66634 10.9997 3.66634ZM18.333 10.9997C18.333 15.0498 15.0498 18.333 10.9997 18.333C8.48016 18.333 6.256 17.0622 4.9354 15.1247H7.33301V13.2913H1.83301V18.7913H3.66634V16.5002C5.33817 18.7256 8.00001 20.1663 10.9997 20.1663C16.0622 20.1663 20.1663 16.0622 20.1663 10.9997H18.333Z",
  "M9.45359 10.6016L16.7319 3.32324L18.6765 5.26779L17.3802 6.56414L19.3247 8.50869L16.0837 11.7496L14.1392 9.80507L11.3981 12.5462C12.3 14.274 12.0254 16.4561 10.5742 17.9073C8.78434 19.6972 5.88233 19.6972 4.09243 17.9073C2.30252 16.1174 2.30252 13.2154 4.09243 11.4255C5.54359 9.97438 7.72575 9.69975 9.45359 10.6016ZM8.6297 15.9628C9.34569 15.2468 9.34569 14.086 8.6297 13.3701C7.91373 12.6541 6.75294 12.6541 6.03698 13.3701C5.32101 14.086 5.32101 15.2468 6.03698 15.9628C6.75294 16.6787 7.91373 16.6787 8.6297 15.9628Z",
  "M9.16634 18.102V15.033C9.16634 13.8573 10.0782 12.9316 11.4275 12.4041C10.5808 12.0887 9.66455 11.9163 8.70801 11.9163C6.97563 11.9163 5.3753 12.4817 4.08146 13.438C4.88733 15.7245 6.79468 17.4915 9.16634 18.102ZM17.3058 14.7451C16.9454 14.2562 15.7396 13.7497 14.208 13.7497C12.3691 13.7497 10.9997 14.48 10.9997 15.033V18.333C13.6814 18.333 16.0269 16.8935 17.3058 14.7451ZM8.75384 10.5413C9.89289 10.5413 10.8163 9.61789 10.8163 8.47884C10.8163 7.33975 9.89289 6.41634 8.75384 6.41634C7.61475 6.41634 6.69134 7.33975 6.69134 8.47884C6.69134 9.61789 7.61475 10.5413 8.75384 10.5413ZM14.208 11.458C15.2206 11.458 16.0413 10.6372 16.0413 9.62467C16.0413 8.61215 15.2206 7.79134 14.208 7.79134C13.1955 7.79134 12.3747 8.61215 12.3747 9.62467C12.3747 10.6372 13.1955 11.458 14.208 11.458ZM10.9997 20.1663C5.93706 20.1663 1.83301 16.0622 1.83301 10.9997C1.83301 5.93706 5.93706 1.83301 10.9997 1.83301C16.0622 1.83301 20.1663 5.93706 20.1663 10.9997C20.1663 16.0622 16.0622 20.1663 10.9997 20.1663Z",
];

function RowIcon({ index }: { index: number }) {
  const d = ROW_ICONS[index];
  if (!d) return null;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} fill="#5A5A5A" />
    </svg>
  );
}

export function Compare({ data }: { data: CompareType | null }) {
  if (!data) return null;

  const cols = data.columns;
  const lastRow = (data.rows?.length ?? 0) - 1;
  const t0 = data.straplineTestimonials?.[0];
  const t1 = data.straplineTestimonials?.[1];

  return (
    <section className="compare">
      <div className="padding-global decor tb-decor">
        <div className="container-large">
          <div className="compare_wrapper">
            <div className="compare_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>

            <div className="compare_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>
            <div className="compare_text-wrap">
              <p className="text-label-x-large secondary fw-400">{data.text}</p>
            </div>

            <div className="compare_table-wrap">
              <div className="compare_table">
                <div className="compare_decor"></div>
                <div className="compare_table-row">
                  <div className="compare_table-col first opacity"></div>
                  <div className="compare_table-col top second">
                    <img
                      src={imageSrc(cols?.c17Logo, "/images/sections/compare/c17-logo.png")}
                      alt=""
                    />
                    <div className="text-body-small white">{cols?.c17Note}</div>
                  </div>
                  <div className="compare_table-col top">
                    <p className="text-label-large is-semibold">{cols?.agencyTitle}</p>
                    <div className="text-body-small gray">{cols?.agencyNote}</div>
                  </div>
                  <div className="compare_table-col top">
                    <p className="text-label-large is-semibold">{cols?.inhouseTitle}</p>
                    <div className="text-body-small gray">{cols?.inhouseNote}</div>
                  </div>
                </div>

                {data.rows?.map((row, i) => (
                  <div className="compare_table-row" key={i}>
                    <div className={i === 0 ? "compare_table-col first col" : "compare_table-col first"}>
                      <RowIcon index={i} />
                      <p className="text-label-medium">{row.label}</p>
                    </div>
                    <div className="compare_table-col second">
                      <p
                        className={
                          row.emphasise ? "text-label-medium white" : "text-label-small white"
                        }
                      >
                        {row.c17}
                      </p>
                    </div>
                    <div className={i === lastRow ? "compare_table-col last" : "compare_table-col"}>
                      <p className="text-label-small">{row.agency}</p>
                    </div>
                    <div className={i === lastRow ? "compare_table-col last" : "compare_table-col"}>
                      <p className="text-label-small">{row.inhouse}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="compare_table-bottom">
                <div className="compare_table-bottom-image">
                  <img
                    src={imageSrc(
                      data.bottomImage,
                      "/images/sections/compare/image-table-bot.png"
                    )}
                    alt=""
                  />
                </div>
                <div className="compare_table-bottom-text">
                  <div className="text-body-regular secondary">{data.bottomText}</div>
                </div>
              </div>
            </div>

            <CtaMain cta={data.cta} />

            <div className="compare_strapline-big">
              <div className="compare_strapline-left-decor">
                <StraplineLeftDecor />
              </div>

              {/* First card: shown on both mobile and desktop. */}
              <div className="compare_strapline-center-wrap">
                <div className="compare_strapline-stars">
                  <StraplineStars />
                </div>
                <div className="compare_strapline-text-wrap">
                  <p className="text-body-small">{t0?.quote}</p>
                </div>
                <div className="compare_strapline-info">
                  <div className="compare_strapline-image">
                    <img
                      src={imageSrc(t0?.avatar, "/images/sections/compare/avatar.png")}
                      alt=""
                    />
                  </div>
                  <p className="text-label-extra-small primary bold">{t0?.name}</p>
                  <StraplineVerified />
                </div>
                <p className="text-body-small secondary-text">{t0?.role}</p>
              </div>

              {/* Second card: desktop only (hidden ≤991px). */}
              <div className="compare_strapline-center-wrap-2">
                <div className="compare_strapline-stars">
                  <StraplineStars />
                </div>
                <div className="compare_strapline-text-wrap">
                  <p className="text-body-small">{t1?.quote}</p>
                </div>
                <div className="compare_strapline-info">
                  <div className="compare_strapline-image">
                    <img
                      src={imageSrc(t1?.avatar, "/images/sections/compare/avatar-2.png")}
                      alt=""
                    />
                  </div>
                  <p className="text-label-extra-small primary bold">{t1?.name}</p>
                  <StraplineVerified />
                </div>
                <div className="compare_strapline-info">
                  <p className="text-body-small secondary-text">{t1?.role}</p>
                </div>
              </div>

              <div className="compare_strapline-right-decor">
                <StraplineRightDecor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
