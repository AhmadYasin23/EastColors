import { defineField, defineType } from "sanity"

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Bio",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English Bio",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Position",
          type: "string",
        },
        {
          name: "en",
          title: "English Position",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
})
