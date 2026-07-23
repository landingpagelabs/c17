/**
 * The Studio ships its own styles — this layout keeps the site's global CSS
 * (imported in the root layout) from leaking into it.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
