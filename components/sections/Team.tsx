import { CtaMain } from "../CtaMain";
import { imageSrc } from "../../sanity/lib/image";
import type { Team as TeamType } from "../../sanity/types";

export function Team({ data }: { data: TeamType | null }) {
  if (!data) return null;

  return (
    <section className="team">
      <div className="team_image-top">
        <img
          src={imageSrc(data.topImage, "/images/sections/team/team-top-image.png")}
          alt=""
        />
      </div>
      <div className="padding-global decor tb-decor">
        <div className="container-large">
          <div className="team_wrapper">
            <div className="team_strapline">
              <p className="text-body-regular gray">{data.strapline}</p>
            </div>

            <div className="team_title-wrap">
              <h2 className="title-h2">{data.title}</h2>
            </div>

            <div className="team_text-wrap">
              <p className="text-label-x-large secondary">{data.text}</p>
            </div>

            <div className="team_image">
              <img src={imageSrc(data.image, "/images/sections/team/team.png")} alt="" />
            </div>

            <CtaMain cta={data.cta} />
          </div>
        </div>
      </div>
    </section>
  );
}
