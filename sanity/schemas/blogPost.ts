import { defineField, defineType } from "sanity"

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Excerpt",
          type: "text",
          rows: 3,
        },
        {
          name: "en",
          title: "English Excerpt",
          type: "text",
          rows: 3,
        },
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Content",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
        {
          name: "en",
          title: "English Content",
          type: "array",
          of: [
            { type: "block" },
            {
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "object",
          fields: [
            { name: "ar", title: "Arabic Meta Title", type: "string" },
            { name: "en", title: "English Meta Title", type: "string" },
          ],
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "object",
          fields: [
            { name: "ar", title: "Arabic Meta Description", type: "text" },
            { name: "en", title: "English Meta Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
