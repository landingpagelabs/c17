import { defineField, defineType } from "sanity";

export const heroCard = defineType({
  name: "heroCard",
  title: "Result card",
  type: "object",
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", media: "image" },
  },
});
