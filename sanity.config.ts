import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";

import { schema } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
            S.listItem()
              .title("Services")
              .child(S.documentTypeList("service").title("Services")),
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("Authors")
              .child(S.documentTypeList("author").title("Authors")),
            S.listItem()
              .title("Client Logos")
              .child(S.documentTypeList("clientLogo").title("Client Logos")),
            S.listItem()
              .title("Job Title")
              .child(S.documentTypeList("job").title("Job Title")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
    imageHotspotArrayPlugin(),
  ],
});
