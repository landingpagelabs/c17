import { Fragment } from "react";

import { CtaMain } from "../CtaMain";
import { CheckIcon, ChevronIcon } from "../icons";
import type { HowItWorks as HowItWorksType } from "../../sanity/types";

/**
 * Each step's mock UI is illustrative chrome driven by the GSAP timeline in
 * how-it-works.js, not marketing copy, so it stays in code and is matched to
 * the step by position. Editors control the day / title / text / note.
 */
function StepFraction({ index, note }: { index: number; note?: string }) {
  return (
    <div className="hiw_fraction">
      <div className="hiw_fraction-count">
        <span>{String(index + 1).padStart(2, "0")}</span> / 03
      </div>
      <div className="hiw_track">
        {[0, 1, 2].map((i) => (
          <span className={i <= index ? "hiw_track-seg is-on" : "hiw_track-seg"} key={i} />
        ))}
      </div>
      <p className="hiw_fraction-note">
        {/* The design breaks this note across two lines; editors use a newline. */}
        {(note || "").split("\n").map((line, i, all) => (
          <Fragment key={i}>
            {line}
            {i < all.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    </div>
  );
}

function StepOneCard() {
  return (
    <div className="hiw_card hiw_card--browser">
      <div className="hiw_browser-head">
        <div className="hiw_dots">
          <span className="hiw_dot hiw_dot--red"></span>
          <span className="hiw_dot hiw_dot--yellow"></span>
          <span className="hiw_dot hiw_dot--green"></span>
        </div>
        <span className="hiw_pill">Free</span>
      </div>
      <div className="hiw_rows">
        <div className="hiw_row" data-check="1">
          <span className="hiw_check">
            <CheckIcon />
          </span>
          <span className="hiw_row-label">Pilot campaign approved</span>
        </div>
        <div className="hiw_row" data-check="2">
          <span className="hiw_check">
            <CheckIcon />
          </span>
          <span className="hiw_row-label">Outreach sequence live</span>
        </div>
        <div className="hiw_row">
          <span className="hiw_check hiw_check--empty"></span>
          <span className="hiw_row-label">First replies incoming</span>
        </div>
      </div>
      <div className="hiw_card-fade"></div>
    </div>
  );
}

function StepTwoCard() {
  return (
    <div className="hiw_card hiw_card--panel">
      <div className="hiw_panel-head">
        <span>100</span>
        <span>400</span>
      </div>
      <div className="hiw_slider">
        <div className="hiw_slider-fill"></div>
        <div className="hiw_slider-handle"></div>
        <div className="hiw_slider-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="hiw_opt" data-opt="1">
        <span className="hiw_check hiw_check--dash">
          <i></i>
        </span>
        <span className="hiw_row-label">Decision-maker confirmed</span>
        <span className="hiw_radio"></span>
      </div>
      <div className="hiw_opt" data-opt="2">
        <span className="hiw_check hiw_check--dash">
          <i></i>
        </span>
        <span className="hiw_row-label">Healthcare - 400+ headcount</span>
        <span className="hiw_radio is-on"></span>
      </div>
      <div className="hiw_opt hiw_opt--muted">
        <span className="hiw_check hiw_check--dash">
          <i></i>
        </span>
        <span className="hiw_row-label">Sequence running...</span>
      </div>
      <div className="hiw_card-fade"></div>
    </div>
  );
}

function StepThreeCard() {
  return (
    <div className="hiw_handoff">
      <div className="hiw_bubble">Handoff complete</div>
      <div className="hiw_card hiw_card--handoff">
        <div className="hiw_handoff-flow">
          <div className="hiw_handoff-logo">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 20.7833C0 13.7509 5.45243 8.43587 12.7166 8.43587C19.0534 8.43587 24.0937 12.5488 24.8751 18.2846H17.7054C17.0614 16.3011 15.0693 14.953 12.708 14.953C9.37646 14.953 6.92931 17.4517 6.92931 20.7747C6.92931 24.1062 9.37646 26.6049 12.708 26.6049C15.0693 26.6049 17.0528 25.2654 17.7054 23.2733H24.8751C24.0851 29.0091 19.0534 33.1221 12.7166 33.1221C5.46101 33.1306 0 27.8156 0 20.7833Z"
                fill="#5E48D8"
              />
              <path
                d="M23.9218 2.42602L22.3839 3.27856V1.18065L24.532 0.0105031H26.0197V8.43557H23.9218V2.42602Z"
                fill="#5E48D8"
              />
              <path
                d="M31.1499 1.98089H27.9237V0H33.6407V1.64657L30.6735 8.42507H28.3165L31.1499 1.98089Z"
                fill="#5E48D8"
              />
            </svg>
          </div>
          <span className="hiw_handoff-line"></span>
          <div className="hiw_handoff-check">
            <div className="hiw_handoff-check-badge">
              <svg width="14" height="13" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.5444 0.608197C11.8541 1.17452 11.6461 1.8847 11.0798 2.19441C9.47697 3.07091 7.97185 4.90585 6.8225 6.66565C6.26231 7.52352 5.81281 8.32236 5.50367 8.90639C5.34939 9.19776 5.23088 9.43432 5.15176 9.59607L5.03687 9.83613C4.8563 10.2308 4.47178 10.4933 4.0384 10.5173C3.60491 10.5411 3.19382 10.3228 2.97095 9.9502C2.6078 9.34304 2.03075 8.78881 1.49597 8.36607C1.23612 8.16061 1.00223 7.99862 0.835321 7.88934L0.589543 7.73565C0.0291359 7.41564 -0.166 6.70211 0.153714 6.14158C0.473497 5.58081 1.18728 5.38551 1.74798 5.70528L2.11618 5.93401C2.32912 6.07344 2.62117 6.27587 2.94571 6.53241C3.19372 6.72853 3.47102 6.96427 3.751 7.23589C4.05114 6.69662 4.42631 6.06 4.86541 5.3875C6.05369 3.5681 7.82096 1.31235 9.95827 0.143547C10.5245 -0.166174 11.2347 0.0418651 11.5444 0.608197Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
          <span className="hiw_handoff-line"></span>
          <div className="hiw_handoff-team">
            <span className="hiw_handoff-avatar hiw_handoff-avatar--top"></span>
            <span className="hiw_handoff-avatar hiw_handoff-avatar--bl"></span>
            <span className="hiw_handoff-avatar hiw_handoff-avatar--br"></span>
          </div>
        </div>
        <div className="hiw_handoff-labels">
          <span className="hiw_handoff-labels-left">Managed by us</span>
          <span className="hiw_handoff-labels-right">Your Team</span>
        </div>
        <div className="hiw_bar">
          <div className="hiw_bar-fill"></div>
          <div className="hiw_bar-rest"></div>
        </div>
      </div>
    </div>
  );
}

const STEP_CARDS = [StepOneCard, StepTwoCard, StepThreeCard];

export function HowItWorks({ data }: { data: HowItWorksType | null }) {
  if (!data) return null;

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="padding-global decor">
        <div className="container-large">
          <div className="how-it-works_wrapper">
            <div className="how-it-works_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>
            <div className="how-it-works_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>

            <div className="how-it-works_animation">
              <div className="hiw">
                <img
                  className="hiw_clock-track"
                  src="/images/sections/how-it-works/clock-circle.webp"
                  alt=""
                  aria-hidden="true"
                />
                <svg
                  className="hiw_clock"
                  viewBox="0 0 714 714"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle
                    className="hiw_clock-fill"
                    cx="357"
                    cy="357"
                    r="347"
                    stroke="#D0CEFF"
                    strokeWidth="20"
                    strokeDasharray="2181"
                    strokeDashoffset="2181"
                  />
                </svg>

                <div className="hiw_steps">
                  {data.steps?.map((step, i) => {
                    const Card = STEP_CARDS[i];
                    return (
                      <div
                        className={i === 0 ? "hiw_step is-active" : "hiw_step"}
                        data-step={i + 1}
                        key={i}
                      >
                        <p className="hiw_step-day">{step.day}</p>
                        <h3 className="hiw_step-title">{step.title}</h3>
                        <p className="hiw_step-text">{step.text}</p>

                        {Card && <Card />}

                        <StepFraction index={i} note={step.note} />
                      </div>
                    );
                  })}
                </div>

                {/* Mobile-only step nav (desktop advances on scroll — see
                    how-it-works.js). */}
                <div className="hiw_nav">
                  <button
                    className="hiw_nav-btn hiw_nav-prev"
                    type="button"
                    aria-label="Previous step"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect width="22" height="22" rx="11" fill="white" />
                      <path d="M10.3158 10.9996L13.2031 13.887L12.3782 14.7119L8.66585 10.9996L12.3782 7.28732L13.2031 8.11227L10.3158 10.9996Z" fill="black" />
                    </svg>
                    <span className="text-body-small">Prev</span>
                  </button>
                  <button
                    className="hiw_nav-btn hiw_nav-next"
                    type="button"
                    aria-label="Next step"
                  >
                    <span className="text-body-small">Next</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect width="22" height="22" rx="11" fill="white" />
                      <path d="M11.6842 11.0004L8.79688 8.11304L9.62184 7.28809L13.3341 11.0004L9.62184 14.7127L8.79688 13.8877L11.6842 11.0004Z" fill="black" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="cta-block">
              <CtaMain cta={data.cta} />
              <div className="cta-strapline">
                {data.ctaSteps?.map((label, i) => (
                  <Fragment key={i}>
                    {i > 0 && <ChevronIcon />}
                    <div className="cta-strapline-item">
                      <div className="cta-strapline-item-number fw-600-black">
                        <p className="text-label-triple-extra-small">{i + 1}</p>
                      </div>
                      <p className="text-body-small">{label}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
