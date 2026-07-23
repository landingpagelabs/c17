import type { BannerCongrats as BannerCongratsType } from "../../sanity/types";

function WarningIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5442 0.375128L15.6889 12.7502C15.8961 13.1089 15.7732 13.5676 15.4144 13.7746C15.3004 13.8405 15.1711 13.8752 15.0394 13.8752H0.75C0.33579 13.8752 0 13.5394 0 13.1252C0 12.9935 0.0346575 12.8642 0.100485 12.7502L7.2452 0.375128C7.45228 0.0164032 7.91098 -0.106499 8.2697 0.100606C8.3837 0.166433 8.47843 0.261113 8.5442 0.375128ZM7.1447 10.1252V11.6252H8.6447V10.1252H7.1447ZM7.1447 4.87513V8.62515H8.6447V4.87513H7.1447Z"
        fill="white"
      />
    </svg>
  );
}

/** The red warning strip that sits above the page, where the header would be. */
export function BannerCongrats({ data }: { data: BannerCongratsType | null }) {
  if (!data?.text) return null;

  return (
    <div className="banner-congrats">
      <div className="padding-global">
        <div className="container-large">
          <div className="banner-congrats_wrapper">
            <WarningIcon />
            <p className="text-label-medium white">{data.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
