import { imageSrc } from "../../sanity/lib/image";
import type { Results as ResultsType } from "../../sanity/types";

export function Results({ data }: { data: ResultsType | null }) {
  if (!data) return null;

  return (
    <section className="results">
      <div className="padding-global decor results">
        <div className="container-large">
          <div className="results_wrapper">
            <div className="results_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>
            <div className="results_list">
              {data.items?.map((item, i) => {
                const first = (
                  <div className="results_image" key="a">
                    <img src={imageSrc(item.image, "")} alt="" />
                  </div>
                );
                const second = (
                  <div className="results_image-2" key="b">
                    <img src={imageSrc(item.image2, "")} alt="" />
                  </div>
                );
                return (
                  <div className="results_item" key={i}>
                    {item.reversed ? [second, first] : [first, second]}
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
