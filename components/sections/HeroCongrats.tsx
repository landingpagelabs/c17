import { ActionIcon, CopyIcon } from "./congrats-icons";
import { RichText } from "../RichText";
import { imageSrc } from "../../sanity/lib/image";
import type { CongratsStep, HeroCongrats as HeroCongratsType } from "../../sanity/types";

/**
 * Each card's body layout differs, so `kind` selects it. The trailing empty
 * <div> in every card is kept from the original — congrats.css uses it as a
 * grid/flex spacer.
 */
function StepBody({ step }: { step: CongratsStep }) {
  if (step.kind === "video") {
    return (
      <div className="hero-congrats_steps-video" data-video={step.videoUrl || ""}>
        <img src={imageSrc(step.videoThumb, "")} alt="" />
        <img
          className="hero-congrats_steps-video-play"
          src="/images/sections/congrats/play.webp"
          alt=""
        />
      </div>
    );
  }

  if (step.kind === "calendar") {
    return (
      <div className="hero-congrats_steps-item-body">
        <div className="hero-congrats_steps-title-wrap">
          <h5 className="title-h5">{step.title}</h5>
        </div>
        <div className="hero-congrats_steps-text-wrap">
          <p className="text-body-regular secondary-text">{step.text}</p>
        </div>
        <div className="hero-congrats_steps-image">
          <img src={imageSrc(step.image, "")} alt="" />
        </div>
        <div className="hero-congrats_steps-image-mobile">
          <img src="/images/sections/congrats/item-mible.webp" alt="" />
        </div>
        <div className="hero-congrats_steps-action">
          <ActionIcon />
          <p className="text-body-small">{step.actionLabel}</p>
        </div>
      </div>
    );
  }

  if (step.kind === "copy") {
    return (
      <div className="hero-congrats_steps-item-body">
        <div className="hero-congrats_steps-title-wrap">
          <h5 className="title-h5">{step.title}</h5>
        </div>
        <div className="hero-congrats_steps-text-wrap">
          <p className="text-body-regular secondary-text">{step.text}</p>
        </div>
        {/* all.js reads the text out of this block to put on the clipboard. */}
        <div className="hero-congrats_steps-text-copy">
          <p className="text-body-regular">{step.copyText}</p>
        </div>
        <div className="hero-congrats_steps-text-copy-btn">
          <CopyIcon />
          <p className="text-label-medium fw-600">{step.copyButton}</p>
        </div>
      </div>
    );
  }

  if (step.kind === "videoList") {
    return (
      <div className="hero-congrats_steps-item-list">
        {step.videos?.map((video, i) => (
          <div
            className="hero-congrats_steps-item-video"
            data-video={video.videoUrl || undefined}
            key={i}
          >
            {/* Прев'ю задано локальним файлом (перекриває CMS video.thumb). */}
            <img src="/images/sections/congrats/faq-video.webp" alt="" />
            <img
              className="hero-congrats_steps-video-play"
              src="/images/sections/congrats/play.webp"
              alt=""
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export function HeroCongrats({ data }: { data: HeroCongratsType | null }) {
  if (!data) return null;

  return (
    <section className="hero-congrats">
      <div className="padding-global decor">
        <div className="container-large">
          <div className="hero-congrats_wrapper">
            <div className="hero-congrats_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>
            <div className="hero-congrats_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>

            <div className="hero-congrats_steps-list">
              {data.steps?.map((step, i) => (
                <div className="hero-congrats_steps-item" key={i}>
                  <div className="hero-congrats_steps-head">
                    {step.num && (
                      <div className="hero-congrats_steps-item-num">{step.num}</div>
                    )}
                    <p className="text-label-mini-large">
                      <RichText value={step.head} boldClassName="purple" />
                    </p>
                  </div>

                  {/* Video cards put the spacer before the body, others after. */}
                  {step.kind === "video" && <div></div>}
                  <StepBody step={step} />
                  {step.kind !== "video" && <div></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
