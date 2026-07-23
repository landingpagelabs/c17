import { imageSrc } from "../../sanity/lib/image";
import type { Faq as FaqType } from "../../sanity/types";

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="#1A1A1A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="#1A1A1A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Faq({ data }: { data: FaqType | null }) {
  if (!data) return null;

  return (
    <section className="faq">
      <div className="padding-global decor">
        <div className="container-large">
          <div className="faq_wrapper">
            <div className="faq_head">
              <h2 className="title-h2">{data.title}</h2>
            </div>
            <div className="faq_list">
              {data.items?.map((item, i) => (
                <div className="item-faq" key={i}>
                  <div className="item-faq_head">
                    <div className="item-faq-head_title-wrap">
                      <h4 className="text-label-mini-large">{item.question}</h4>
                    </div>
                    <div className="item-faq-head_icon-wrap">
                      <PlusIcon />
                    </div>
                  </div>
                  <div className="item-faq_panel">
                    <div className="item-faq-panel_text-wrap">
                      <p className="text-body-regular">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq_bottom">
              <img
                className="faq-bottom_img"
                src={imageSrc(
                  data.bottomImage,
                  "/images/sections/faq/faq_bottom_image.webp"
                )}
                alt="faq bottom image"
              />
            </div>
            <div className="faq_bottom-mobile">
              <img
                className="faq-bottom_img"
                src="/images/sections/faq/faq-mobile.webp" width={860} height={513}
                alt="faq bottom image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
