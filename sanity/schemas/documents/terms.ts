import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The legal pages (Terms, Privacy, MSA, ...) all share this shape: a hero and a
 * list of titled blocks of rich text. One document per page, keyed by slug.
 */
export const termsPage = defineType({
  name: "termsPage",
  title: "Legal page",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Browser title",
      type: "string",
      description: 'Shown in the tab, e.g. "Terms of Service | C17 Lab".',
    }),
    defineField({ name: "strapline", title: "Strapline", type: "string" }),
    defineField({ name: "title", title: "Title (H1)", type: "string" }),
    defineField({ name: "cta", title: "CTA", type: "ctaLink" }),
    defineField({
      name: "items",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "item",
          fields: [
            defineField({ name: "title", title: "Heading", type: "string" }),
            defineField({
              name: "titleStyle",
              title: "Heading style",
              type: "string",
              options: {
                list: [
                  { title: "Standard", value: "text-label-large" },
                  { title: "Large", value: "text-label-x-large" },
                  { title: "Section (H5)", value: "title-h5" },
                ],
              },
              initialValue: "text-label-large",
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [{ title: "Bullet", value: "bullet" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      // Renders <span class="terms-content_num">, used for the
                      // bolded lead-in labels inside legal paragraphs.
                      { title: "Label", value: "num" },
                    ],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          { name: "href", type: "string", title: "URL" },
                        ],
                      },
                    ],
                  },
                }),
                defineArrayMember({
                  type: "object",
                  name: "table",
                  title: "Table",
                  fields: [
                    defineField({
                      name: "head",
                      title: "Header row",
                      type: "array",
                      of: [{ type: "string" }],
                    }),
                    defineField({
                      name: "rows",
                      title: "Rows",
                      type: "array",
                      of: [
                        defineArrayMember({
                          type: "object",
                          name: "row",
                          fields: [
                            defineField({
                              name: "cells",
                              title: "Cells",
                              type: "array",
                              of: [{ type: "text", rows: 2 }],
                            }),
                          ],
                          preview: {
                            select: { cells: "cells" },
                            prepare: ({ cells }) => ({
                              title: (cells || []).join(" · ").slice(0, 60),
                            }),
                          },
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: { head: "head" },
                    prepare: ({ head }) => ({
                      title: `Table: ${(head || []).join(" · ")}`,
                    }),
                  },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "signatures",
      title: "Signature columns",
      type: "array",
      description: "Only on the contract pages (MSA, Pilot SOW).",
      of: [
        defineArrayMember({
          type: "object",
          name: "signCol",
          fields: [
            defineField({ name: "party", title: "Party", type: "string" }),
            defineField({
              name: "lines",
              title: "Lines",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "party" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
