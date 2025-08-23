import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
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
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Description",
          type: "text",
          rows: 4,
        },
        {
          name: "en",
          title: "English Description",
          type: "text",
          rows: 4,
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Outdoor Signage", value: "outdoor" },
          { title: "Indoor Signage", value: "indoor" },
          { title: "Promotional Campaigns", value: "promotional" },
          { title: "Booths & Exhibition Stands", value: "booths" },
          { title: "Vehicle", value: "vehicle" },
          {
            title: "Design & Production of Marketing Materials",
            value: "marketing-materials",
          },
          { title: "Design", value: "design" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
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
      name: "client",
      title: "Client",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Client Name",
          type: "string",
        },
        {
          name: "industry",
          title: "Industry",
          type: "string",
        },
        {
          name: "website",
          title: "Website",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "challenges",
      title: "Project Challenges",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Challenges",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English Challenges",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "solution",
      title: "Our Solution",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Solution",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English Solution",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Project Results",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Results",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English Results",
          type: "array",
          of: [{ type: "block" }],
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
      media: "mainImage",
      category: "category",
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        title,
        subtitle: category ? `Category: ${category}` : "No category",
        media: selection.media,
      };
    },
  },
});
