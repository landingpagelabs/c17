"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import {
  congratsSingletons,
  legalPages,
  schema,
  singletons,
} from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) => {
        // Most singletons use their type as the document id; congrats' footer
        // overrides it so both pages get their own footer document.
        const item = (s: { type: string; title: string; id?: string }) => {
          const id = s.id ?? s.type;
          return S.listItem()
            .title(s.title)
            .id(id)
            .child(S.document().schemaType(s.type).documentId(id).title(s.title));
        };

        return S.list()
          .title("C17")
          .items([
            S.listItem()
              .title("Home page")
              .id("home")
              .child(S.list().title("Home page").items(singletons.map(item))),
            S.listItem()
              .title("Congrats page")
              .id("congrats")
              .child(
                S.list().title("Congrats page").items(congratsSingletons.map(item))
              ),
            S.listItem()
              .title("Pre-call page")
              .id("preCall")
              .child(
                S.document().schemaType("preCall").documentId("preCall").title("Pre-call")
              ),
            S.listItem()
              .title("Legal pages")
              .id("legal")
              .child(
                S.list()
                  .title("Legal pages")
                  .items(
                    legalPages.map((p) =>
                      item({ type: "termsPage", title: p.title, id: p.id })
                    )
                  )
              ),
          ]);
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Singletons: one document per section, so no "create new" / "delete".
    actions: (input) =>
      input.filter(
        ({ action }) =>
          action && ["publish", "discardChanges", "restore"].includes(action)
      ),
  },
});
