import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "cards", title: "Result cards" },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "strapline",
      title: "Strapline",
      type: "string",
      group: "content",
      description:
        "Wrap text in **double asterisks** to make it bold, e.g. “[ For $2M+ **B2B Companies** with $20K+ Customer LTV ]”.",
    }),
    defineField({
      name: "title",
      title: "Title (H1)",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "ctaLink",
      group: "content",
    }),
    defineField({
      name: "innerTitle",
      title: "Results title",
      type: "string",
      group: "cards",
    }),
    defineField({
      name: "leftCards",
      title: "Left column",
      type: "array",
      of: [{ type: "heroCard" }],
      group: "cards",
      description:
        "Exactly 4 cards — each slot has its own size in CSS, so adding more will render unstyled.",
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "centerCard",
      title: "Center card",
      type: "object",
      group: "cards",
      fields: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "label",
          title: "Label",
          type: "string",
        }),
        defineField({
          name: "videoThumb",
          title: "Video thumbnail",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "videoUrl",
          title: "Video URL (YouTube)",
          type: "url",
          description: "Opens in a lightbox when the thumbnail is clicked.",
        }),
      ],
    }),
    defineField({
      name: "rightCards",
      title: "Right column",
      type: "array",
      of: [{ type: "heroCard" }],
      group: "cards",
      description:
        "Exactly 4 cards — each slot has its own size in CSS, so adding more will render unstyled.",
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hero" }),
  },
});
