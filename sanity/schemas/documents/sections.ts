import { defineArrayMember, defineField, defineType } from "sanity";

/** Fields every section shares: the "[ Label ]" eyebrow and the H2. */
const strapline = defineField({
  name: "strapline",
  title: "Strapline",
  type: "string",
  description: 'Shown in brackets, e.g. "[ Services ]".',
});

const title = defineField({
  name: "title",
  title: "Title (H2)",
  type: "string",
});

const intro = defineField({
  name: "text",
  title: "Intro text",
  type: "text",
  rows: 4,
});

const cta = defineField({
  name: "cta",
  title: "CTA",
  type: "ctaLink",
});

export const howItWorks = defineType({
  name: "howItWorks",
  title: "How It Works",
  type: "document",
  fields: [
    strapline,
    title,
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      description:
        "Exactly 3 steps — the scroll animation drives one panel per step.",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "day", title: "Day label", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            defineField({
              name: "note",
              title: "Scroll note",
              type: "string",
              description: 'Small caps note, e.g. "SCROLL TO SEE NEXT STEP".',
            }),
          ],
          preview: { select: { title: "title", subtitle: "day" } },
        }),
      ],
    }),
    cta,
    defineField({
      name: "ctaSteps",
      title: "CTA steps",
      type: "array",
      description: 'The numbered strip under the CTA, e.g. "Short Form".',
      of: [{ type: "string" }],
    }),
  ],
  preview: { prepare: () => ({ title: "How It Works" }) },
});

export const banner = defineType({
  name: "banner",
  title: "Banner (stats)",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Stats",
      type: "array",
      description:
        "Exactly 4 stats — each slot has its own icon and colour in code.",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Banner (stats)" }) },
});

export const services = defineType({
  name: "services",
  title: "Services",
  type: "document",
  fields: [
    strapline,
    title,
    intro,
    defineField({
      name: "items",
      title: "Services",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "service",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "size",
              title: "Card size",
              type: "string",
              options: {
                list: [
                  { title: "Small (1/3 width)", value: "small" },
                  { title: "Big (1/2 width)", value: "big" },
                ],
                layout: "radio",
              },
              initialValue: "small",
            }),
          ],
          preview: { select: { title: "title", subtitle: "size", media: "image" } },
        }),
      ],
    }),
    cta,
  ],
  preview: { prepare: () => ({ title: "Services" }) },
});

export const compare = defineType({
  name: "compare",
  title: "How We Compare",
  type: "document",
  fields: [
    strapline,
    title,
    intro,
    defineField({
      name: "columns",
      title: "Column headers",
      type: "object",
      fields: [
        defineField({
          name: "c17Logo",
          title: "C17 logo",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "c17Note", title: "C17 note", type: "string" }),
        defineField({ name: "agencyTitle", title: "Agency title", type: "string" }),
        defineField({ name: "agencyNote", title: "Agency note", type: "string" }),
        defineField({ name: "inhouseTitle", title: "In-house title", type: "string" }),
        defineField({ name: "inhouseNote", title: "In-house note", type: "string" }),
      ],
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      description:
        "Exactly 6 rows — each row's icon lives in code and is matched by position.",
      validation: (rule) => rule.max(6),
      of: [
        defineArrayMember({
          type: "object",
          name: "row",
          fields: [
            defineField({ name: "label", title: "Row label", type: "string" }),
            defineField({ name: "c17", title: "C17", type: "text", rows: 2 }),
            defineField({ name: "agency", title: "Agency retainer", type: "text", rows: 2 }),
            defineField({ name: "inhouse", title: "In-house SDRs", type: "text", rows: 2 }),
            defineField({
              name: "emphasise",
              title: "Emphasise C17 cell",
              type: "boolean",
              description: "Renders the C17 cell in the larger label style.",
              initialValue: false,
            }),
          ],
          preview: { select: { title: "label", subtitle: "c17" } },
        }),
      ],
    }),
    defineField({
      name: "bottomImage",
      title: "Footnote image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bottomText", title: "Footnote text", type: "text", rows: 2 }),
    cta,
    defineField({
      name: "straplineTestimonials",
      title: "Bottom testimonials",
      type: "array",
      description:
        "The two quote cards under the CTA. On mobile only the first is shown.",
      validation: (rule) => rule.max(2),
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "string" }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "How We Compare" }) },
});

export const carousel = defineType({
  name: "carousel",
  title: "Video Reviews (carousel)",
  type: "document",
  fields: [
    strapline,
    title,
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      description:
        "Order sets the carousel order. The dock below the stage mirrors this list.",
      of: [
        defineArrayMember({
          type: "object",
          name: "card",
          fields: [
            defineField({
              name: "brand",
              title: "Brand key",
              type: "string",
              description:
                'Lowercase slug, e.g. "acquisition". The card matching "activeBrand" opens first.',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "name", title: "Display name", type: "string" }),
            defineField({
              name: "image",
              title: "Card image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "icon",
              title: "Dock icon",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "name", subtitle: "brand", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "activeBrand",
      title: "Brand shown first",
      type: "string",
      description: 'Brand key of the card that starts centred, e.g. "acquisition".',
      initialValue: "acquisition",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube)",
      type: "url",
      description: "Opens in the lightbox when the play button is clicked.",
    }),
    defineField({ name: "modalCta", title: "Lightbox CTA", type: "ctaLink" }),
  ],
  preview: { prepare: () => ({ title: "Video Reviews (carousel)" }) },
});

export const team = defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "topImage",
      title: "Top image",
      type: "image",
      options: { hotspot: true },
    }),
    strapline,
    title,
    intro,
    defineField({
      name: "image",
      title: "Team image",
      type: "image",
      options: { hotspot: true },
    }),
    cta,
  ],
  preview: { prepare: () => ({ title: "Team" }) },
});

export const reviews = defineType({
  name: "reviews",
  title: "Reviews",
  type: "document",
  fields: [
    strapline,
    title,
    defineField({
      name: "items",
      title: "Reviews",
      type: "array",
      description:
        "Laid out with Masonry. 12 show on desktop (3 on mobile); the rest appear behind “Load More”.",
      of: [
        defineArrayMember({
          type: "object",
          name: "review",
          fields: [
            defineField({
              name: "kind",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Text quote", value: "text" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
              },
              initialValue: "text",
            }),
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
              description: "Shown on both text and video reviews.",
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
              name: "source",
              title: "Source badge",
              type: "string",
              options: {
                list: [
                  { title: "Verified review", value: "verified" },
                  { title: "None", value: "none" },
                ],
                layout: "radio",
              },
              initialValue: "verified",
            }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role / company", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "avatar" },
          },
        }),
      ],
    }),
    defineField({
      name: "ctaImage",
      title: "Trust bar image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "trustText",
      title: "Trust bar text",
      type: "string",
      description: 'Shown next to the “Load more” toggle, e.g. "250+ Companies Trust C17".',
    }),
    defineField({
      name: "moreLabel",
      title: "“Load more” label",
      type: "string",
      initialValue: "Load More Reviews",
    }),
    defineField({
      name: "lessLabel",
      title: "“Show less” label",
      type: "string",
      initialValue: "Show Less Reviews",
    }),
  ],
  preview: { prepare: () => ({ title: "Reviews" }) },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    title,
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 5 }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "bottomImage",
      title: "Bottom image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "FAQ" }) },
});
