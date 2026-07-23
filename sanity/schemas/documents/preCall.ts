import { defineField, defineType } from "sanity";

/** The reminder page shown before a scheduled call. */
export const preCall = defineType({
  name: "preCall",
  title: "Pre-call",
  type: "document",
  fields: [
    defineField({
      name: "bannerText",
      title: "Top banner",
      type: "string",
      description: "The strip above the header. Leave empty to hide it.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "title", title: "Title (H2)", type: "string" }),
    defineField({
      name: "dateLabel",
      title: "Date label",
      type: "string",
      initialValue: "Your Call Is Scheduled For:",
    }),
    defineField({
      name: "dateValue",
      title: "Date value",
      type: "string",
      description:
        'The original ships the placeholder "Dynamic date" — nothing fills it in yet.',
    }),
    defineField({ name: "linkLabel", title: "Link label", type: "string" }),
    defineField({ name: "linkValue", title: "Link value", type: "string" }),
    defineField({ name: "linkHref", title: "Link URL", type: "string", initialValue: "#" }),
    defineField({ name: "footNote", title: "Footnote", type: "text", rows: 2 }),
    defineField({ name: "questionTitle", title: "Questions title", type: "string" }),
    defineField({ name: "questionText", title: "Questions text", type: "string" }),
    defineField({
      name: "videos",
      title: "Question videos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "footerImage",
      title: "Footer banner image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "footerText", title: "Footer banner text", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Pre-call" }) },
});
