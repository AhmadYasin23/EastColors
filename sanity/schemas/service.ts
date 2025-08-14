import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Production", value: "production" },
          { title: "Promotions", value: "promotions" },
        ],
        layout: "dropdown", // ✅ no warning
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
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: 'Lucide icon name (e.g., "monitor", "printer", "scissors")',
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Features",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "English Features",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "detailedDescription",
      title: "Detailed Description",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English Content",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Service Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      media: "image",
      order: "order",
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        title,
        subtitle: `Order: ${order}`,
        media: selection.media,
      };
    },
  },
});
