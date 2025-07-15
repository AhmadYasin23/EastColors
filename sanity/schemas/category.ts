import { defineField, defineType } from "sanity"

export default defineType({
  name: "category",
  title: "Category",
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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Description",
          type: "text",
        },
        {
          name: "en",
          title: "English Description",
          type: "text",
        },
      ],
    }),
  ],
})
