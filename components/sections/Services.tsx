import { imageProps } from "../../sanity/lib/image";
import type { Services as ServicesType } from "../../sanity/types";

export function Services({ data }: { data: ServicesType | null }) {
  if (!data) return null;

  return (
    <section className="services" id="services">
      <div className="padding-global decor">
        <div className="container-large">
          <div className="services_wrapper">
            <div className="services_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>
            <div className="services_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>

            <div className="services_text-wrap">
              <p className="text-label-x-large secondary fw-400">{data.text}</p>
            </div>

            <div className="services_list">
              {data.items?.map((item, i) => {
                const big = item.size === "big";
                return (
                  <div className={`services_item ${big ? "big" : "small"}`} key={i}>
                    <div className="services_item-title-wrap">
                      <h5 className="title-h5">{item.title}</h5>
                    </div>

                    <div className="services_item-text-wrap">
                      <p className="text-body-regular">{item.text}</p>
                    </div>

                    <div className={big ? "services_image big" : "services_image"}>
                      <img
                        {...imageProps(
                          item.image,
                          `/images/sections/services/item-${i + 1}.webp`,
                          { width: big ? 726 : 330 }
                        )}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
