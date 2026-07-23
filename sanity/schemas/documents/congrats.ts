import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The post-application page. Each step card has its own body layout in code, so
 * `kind` picks which one renders and only the matching fields are shown.
 */
export const heroCongrats = defineType({
  name: "heroCongrats",
  title: "Congrats — Hero",
  type: "document",
  fields: [
    defineField({
      name: "bannerText",
      title: "Warning banner",
      type: "string",
      description:
        "The red strip above the page. Leave empty to hide it entirely.",
    }),
    defineField({ name: "strapline", title: "Strapline", type: "string" }),
    defineField({ name: "title", title: "Title (H2)", type: "string" }),
    defineField({
      name: "steps",
      title: "Step cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "kind",
              title: "Card type",
              type: "string",
              options: {
                list: [
                  { title: "Video", value: "video" },
                  { title: "Calendar (image + action)", value: "calendar" },
                  { title: "Copy message", value: "copy" },
                  { title: "Video list", value: "videoList" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "num",
              title: "Step label",
              type: "string",
              description: 'e.g. "Step 1/3". Leave empty to hide the badge.',
            }),
            defineField({
              name: "head",
              title: "Heading",
              type: "string",
              description:
                "Wrap text in **double asterisks** to colour it purple, e.g. “Watch The **Short Video** Below”.",
            }),
            defineField({
              name: "title",
              title: "Body title",
              type: "string",
              hidden: ({ parent }) =>
                parent?.kind === "video" || parent?.kind === "videoList",
            }),
            defineField({
              name: "text",
              title: "Body text",
              type: "text",
              rows: 4,
              hidden: ({ parent }) =>
                parent?.kind === "video" || parent?.kind === "videoList",
            }),
            defineField({
              name: "videoThumb",
              title: "Video thumbnail",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.kind !== "video",
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL (YouTube)",
              type: "url",
              hidden: ({ parent }) => parent?.kind !== "video",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.kind !== "calendar",
            }),
            defineField({
              name: "actionLabel",
              title: "Action badge",
              type: "string",
              hidden: ({ parent }) => parent?.kind !== "calendar",
            }),
            defineField({
              name: "copyText",
              title: "Message to copy",
              type: "text",
              rows: 6,
              hidden: ({ parent }) => parent?.kind !== "copy",
            }),
            defineField({
              name: "copyButton",
              title: "Copy button label",
              type: "string",
              hidden: ({ parent }) => parent?.kind !== "copy",
            }),
            defineField({
              name: "videos",
              title: "Videos",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "video",
                  fields: [
                    defineField({
                      name: "thumb",
                      title: "Thumbnail",
                      type: "image",
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: "videoUrl",
                      title: "Video URL (YouTube)",
                      type: "url",
                      description: "Plays inline when the thumbnail is clicked.",
                    }),
                  ],
                  preview: { select: { media: "thumb", title: "videoUrl" } },
                }),
              ],
              hidden: ({ parent }) => parent?.kind !== "videoList",
            }),
          ],
          preview: { select: { title: "head", subtitle: "num" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Congrats — Hero" }) },
});

export const results = defineType({
  name: "results",
  title: "Congrats — Results",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title (H2)", type: "string" }),
    defineField({
      name: "items",
      title: "Result cards",
      type: "array",
      description: "Each card holds two stacked screenshots.",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [
            defineField({
              name: "image",
              title: "First image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "image2",
              title: "Second image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "reversed",
              title: "Swap order",
              type: "boolean",
              description:
                "Renders the second image first — matches the alternating layout.",
              initialValue: false,
            }),
          ],
          preview: { select: { media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Congrats — Results" }) },
});

export const bannerInfo = defineType({
  name: "bannerInfo",
  title: "Congrats — Sign-off banner",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "trustText", title: "Trust statement", type: "string" }),
    defineField({ name: "cta", title: "CTA", type: "ctaLink" }),
    defineField({ name: "listTitle", title: "Logo strip heading", type: "string" }),
    defineField({
      name: "logos",
      title: "Client logos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "image",
      title: "Bottom image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Congrats — Sign-off banner" }) },
});
