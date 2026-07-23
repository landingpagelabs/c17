import { defineArrayMember, defineField, defineType } from "sanity";

export const quote = defineType({
  name: "quote",
  title: "Pricing (quote form)",
  type: "document",
  fields: [
    defineField({ name: "strapline", title: "Strapline", type: "string" }),
    defineField({ name: "title", title: "Title (H2)", type: "string" }),
    defineField({ name: "text", title: "Intro text", type: "text", rows: 3 }),
    defineField({
      name: "meetings",
      title: "Q1 — Meetings",
      type: "object",
      fields: [
        defineField({ name: "question", title: "Question", type: "string" }),
        defineField({
          name: "options",
          title: "Options",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({ name: "error", title: "Error message", type: "string" }),
      ],
    }),
    defineField({
      name: "budget",
      title: "Q2 — Budget",
      type: "object",
      fields: [
        defineField({ name: "question", title: "Question", type: "string" }),
        defineField({
          name: "options",
          title: "Options",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({ name: "error", title: "Error message", type: "string" }),
      ],
    }),
    defineField({
      name: "clv",
      title: "Q3 — Customer lifetime value",
      type: "object",
      fields: [
        defineField({ name: "question", title: "Question", type: "string" }),
        defineField({
          name: "min",
          title: "Minimum",
          type: "number",
          initialValue: 20000,
        }),
        defineField({
          name: "max",
          title: "Maximum",
          type: "number",
          initialValue: 1000000,
        }),
        defineField({
          name: "step",
          title: "Stepper increment",
          type: "number",
          initialValue: 1000,
        }),
        defineField({ name: "error", title: "Error message", type: "string" }),
      ],
    }),
    defineField({
      name: "closeRate",
      title: "Q4 — Close rate",
      type: "object",
      fields: [
        defineField({ name: "question", title: "Question", type: "string" }),
        defineField({
          name: "initial",
          title: "Initial value (%)",
          type: "number",
          initialValue: 20,
        }),
      ],
    }),
    defineField({
      name: "contacts",
      title: "Q5 — Contact details",
      type: "object",
      fields: [
        defineField({ name: "question", title: "Question", type: "string" }),
        defineField({ name: "namePlaceholder", title: "Name placeholder", type: "string" }),
        defineField({ name: "nameError", title: "Name error", type: "string" }),
        defineField({ name: "emailPlaceholder", title: "Email placeholder", type: "string" }),
        defineField({ name: "emailError", title: "Email error", type: "string" }),
        defineField({ name: "urlPlaceholder", title: "Company URL placeholder", type: "string" }),
        defineField({ name: "urlError", title: "Company URL error", type: "string" }),
      ],
    }),
    defineField({ name: "submitLabel", title: "Submit button label", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Pricing (quote form)" }) },
});

export const campaign = defineType({
  name: "campaign",
  title: "Campaign (application form)",
  type: "document",
  fields: [
    defineField({
      name: "straplineItems",
      title: "Rotating straplines",
      type: "array",
      description:
        "Cycles every 5 seconds. Rendered inside brackets. Each item has its own text and icon.",
      of: [
        defineArrayMember({
          type: "object",
          name: "straplineItem",
          title: "Strapline",
          fields: [
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({ name: "icon", title: "Icon", type: "image" }),
          ],
          preview: { select: { title: "text", media: "icon" } },
        }),
        // Legacy: straplines used to be plain strings. Kept valid so existing
        // content doesn't break; new items should use the object above.
        defineArrayMember({ type: "string" }),
      ],
    }),
    defineField({ name: "title", title: "Title (H2)", type: "string" }),
    defineField({ name: "text", title: "Intro text", type: "text", rows: 6 }),
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      description:
        "Each is a Yes/No question. Answering advances a step; any “No” leads to the negative outcome screen.",
      of: [
        defineArrayMember({
          type: "object",
          name: "question",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "yesLabel", title: "Yes label", type: "string", initialValue: "Yes" }),
            defineField({ name: "noLabel", title: "No label", type: "string", initialValue: "No" }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "outcomeYes",
      title: "Outcome — all Yes",
      type: "object",
      description:
        "Shown when every answer is Yes. Note: the original markup has no booking link here, only this heading.",
      fields: [defineField({ name: "title", title: "Title", type: "string" })],
    }),
    defineField({
      name: "outcomeNo",
      title: "Outcome — any No",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
        defineField({ name: "secondaryText", title: "Secondary text", type: "string" }),
        defineField({ name: "cta", title: "CTA", type: "ctaLink" }),
        defineField({
          name: "mistakeTitle",
          title: "“Made a mistake?” heading",
          type: "string",
        }),
        defineField({
          name: "mistakeText",
          title: "“Made a mistake?” text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "formBottom",
      title: "Form footer",
      description: "The testimonial and pricing note pinned under the form.",
      type: "object",
      fields: [
        defineField({
          name: "avatar",
          title: "Avatar",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "quote", title: "Quote", type: "string" }),
        defineField({ name: "name", title: "Name / role", type: "string" }),
        defineField({ name: "note", title: "Pricing note", type: "string" }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image under the form",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Campaign (application form)" }) },
});

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Wrap text in **double asterisks** to apply the accent style, e.g. “AI Sales As **A Service**”.",
    }),
    defineField({ name: "cta", title: "CTA", type: "ctaLink" }),
    defineField({
      name: "columns",
      title: "Link columns",
      type: "array",
      description:
        'Mark a column as "Socials" to render each link with its social icon.',
      of: [
        defineArrayMember({
          type: "object",
          name: "column",
          fields: [
            defineField({ name: "title", title: "Column title", type: "string" }),
            defineField({
              name: "isSocial",
              title: "Socials column",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "isLong",
              title: "Wide column",
              type: "boolean",
              description:
                "Adds .is-long, which caps the column at 182px — used for columns with longer link labels.",
              initialValue: false,
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "ctaLink" }],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "askTitle",
      title: "“Ask about us on” heading",
      type: "string",
    }),
    defineField({
      name: "askLinks",
      title: "“Ask about us on” links",
      type: "array",
      description:
        "Exactly 5 — each slot's icon lives in code and is matched by position.",
      validation: (rule) => rule.max(5),
      of: [
        defineArrayMember({
          type: "object",
          name: "askLink",
          fields: [
            defineField({ name: "href", title: "URL", type: "string", initialValue: "#" }),
          ],
          preview: { select: { title: "href" } },
        }),
      ],
    }),
    defineField({
      name: "awards",
      title: "Award badges",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "award",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({ name: "href", title: "URL", type: "string", initialValue: "#" }),
          ],
          preview: { select: { media: "image", title: "href" } },
        }),
      ],
    }),
    defineField({
      name: "builtBy",
      title: "“Built by” credit",
      type: "object",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "URL", type: "string" }),
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
      description:
        "Use {year} where the current year should appear, e.g. “© {year} C17 Lab. All Rights Reserved.”",
    }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});
