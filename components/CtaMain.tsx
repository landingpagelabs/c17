import { ArrowCircleIcon } from "./icons";
import type { CtaLink } from "../sanity/types";

/**
 * The "Apply For Free Pilot" button. `.cta-main` is also the hook the scroll
 * script uses to jump to the campaign form, so the class must stay.
 */
export function CtaMain({
  cta,
  slim = false,
}: {
  cta?: CtaLink | null;
  slim?: boolean;
}) {
  if (!cta?.label) return null;

  return (
    <a className={slim ? "cta-main is-slim" : "cta-main"} href={cta.href || "#"}>
      <p className="text-label-large"> {cta.label}</p>
      <ArrowCircleIcon />
    </a>
  );
}
