import { imageProps } from "../../sanity/lib/image";
import type { Header as HeaderType } from "../../sanity/types";

export function Header({ data }: { data: HeaderType | null }) {
  if (!data) return null;

  return (
    <header className="header">
      <div className="padding-global">
        <div className="container-large">
          <div className="header_wrapper">
            <div className="header_logo">
              {/* Above the fold — stays eager. */}
              <img {...imageProps(data.logo, "/images/header/Logo.webp", { width: 114 })} alt="" />
            </div>

            <nav className="header_nav">
              <ul className="header_menu">
                {data.menu?.map((item, i) => (
                  <li className="header_menu-item" key={i}>
                    <a
                      className="header_menu-item-link text-body-regular"
                      href={item.href || "#"}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="header_right">
                {data.bookCall?.label && (
                  <a
                    className="header_cta-calendar text-label-medium"
                    href={data.bookCall.href || "#"}
                    // iClosed popup (widget.js turns this into a click trigger).
                    // Currently the Pilot Call event — swap the URL when Enzo
                    // creates a general book-a-call calendar.
                    data-iclosed-link="https://app.iclosed.io/e/c17lab/pilot-call-w-c17-lab"
                  >
                    {data.bookCall.label}
                  </a>
                )}
                {data.cta?.label && (
                  <a className="header_cta" href={data.cta.href || "#"}>
                    <p className="text-label-medium">{data.cta.label}</p>
                  </a>
                )}
              </div>
            </nav>

            <button
              className="header_burger"
              type="button"
              aria-label="Menu"
              aria-expanded="false"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
