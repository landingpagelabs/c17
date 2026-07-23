/**
 * The footer social icons, extracted verbatim from the original index.html.
 * Keyed by the link label so the CMS drives the label/href and the icon follows.
 */

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.33333 0H2.66667C1.28617 0 0 1.28617 0 2.66667V9.33333C0 10.7138 1.28617 12 2.66667 12H9.33333C10.7143 12 12 10.7138 12 9.33333V2.66667C12 1.28617 10.7143 0 9.33333 0ZM4 9.5H2.5V4H4V9.5ZM3.25 3.366C2.767 3.366 2.375 2.971 2.375 2.484C2.375 1.997 2.767 1.602 3.25 1.602C3.733 1.602 4.125 1.997 4.125 2.484C4.125 2.971 3.7335 3.366 3.25 3.366ZM10 9.5H8.5V6.698C8.5 5.014 6.5 5.1415 6.5 6.698V9.5H5V4H6.5V4.8825C7.198 3.5895 10 3.494 10 6.12053V9.5Z" fill="black" fillOpacity="0.4"></path>
                        </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.7492 1.31397C11.6112 0.796072 11.2047 0.388249 10.6883 0.24984C9.75252 -0.00170326 6 -0.00170326 6 -0.00170326C6 -0.00170326 2.2475 -0.00170326 1.31167 0.24984C0.795382 0.388249 0.388743 0.796072 0.250754 1.31397C0 2.25262 0 4.21106 0 4.21106C0 4.21106 0 6.16948 0.250754 7.10822C0.388743 7.62605 0.795382 8.03387 1.31167 8.17234C2.2475 8.42383 6 8.42383 6 8.42383C6 8.42383 9.75252 8.42383 10.6883 8.17234C11.2047 8.03387 11.6112 7.62605 11.7492 7.10822C12 6.16948 12 4.21106 12 4.21106C12 4.21106 12 2.25262 11.7492 1.31397Z" fill="black" fillOpacity="0.4"></path>
                          <path d="M4.77344 5.98828L7.9098 4.21026L4.77344 2.43206V5.98828Z" fill="white"></path>
                        </svg>
  );
}

export const SOCIAL_ICONS: Record<string, () => React.ReactElement> = {
  "linkedin": LinkedInIcon,
  "youtube": YouTubeIcon,
};
