import { defineField, defineType } from "sanity";

export const ctaLink = defineType({
  name: "ctaLink",
  title: "Link / CTA",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description:
        'Full URL, an anchor like "#campaign", or "#" to scroll to the application form.',
      initialValue: "#",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube)",
      type: "url",
      description:
        "Optional. On footer “Case Studies” links, clicking opens this video in a modal instead of navigating.",
    }),
    defineField({
      name: "noHover",
      title: "Disable hover",
      type: "boolean",
      description:
        "Footer only: renders the link as plain text (used for the address).",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
