import { defineField, defineType } from "sanity";

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "menu",
      title: "Menu items",
      type: "array",
      of: [{ type: "ctaLink" }],
    }),
    defineField({
      name: "bookCall",
      title: "“Book Call” link",
      type: "ctaLink",
    }),
    defineField({
      name: "cta",
      title: "Primary CTA",
      type: "ctaLink",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Header" }),
  },
});
