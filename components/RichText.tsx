import { Fragment } from "react";

/**
 * Renders **bold** spans from a plain string. The design applies bold through a
 * class rather than <strong>, so editors get one text field instead of a
 * portable-text editor for what is only ever a highlighted word or two.
 */
export function RichText({
  value,
  boldClassName = "fw-600-black",
}: {
  value?: string | null;
  boldClassName?: string;
}) {
  if (!value) return null;

  return (
    <>
      {value.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={boldClassName}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
