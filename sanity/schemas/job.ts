import { defineField, defineType } from "sanity"

export default defineType({
  name: "job",
  title: "Job Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
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
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Production", value: "production" },
          { title: "Sales", value: "sales" },
          { title: "Marketing", value: "marketing" },
          { title: "Technical", value: "technical" },
          { title: "Administration", value: "admin" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Location",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English Location",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Type",
          type: "string",
          options: {
            list: [
              { title: "دوام كامل", value: "دوام كامل" },
              { title: "دوام جزئي", value: "دوام جزئي" },
              { title: "عقد مؤقت", value: "عقد مؤقت" },
              { title: "تدريب", value: "تدريب" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English Type",
          type: "string",
          options: {
            list: [
              { title: "Full Time", value: "Full Time" },
              { title: "Part Time", value: "Part Time" },
              { title: "Contract", value: "Contract" },
              { title: "Internship", value: "Internship" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "salary",
      title: "Salary Range",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Salary",
          type: "string",
          placeholder: "5,000 - 8,000 ريال",
        },
        {
          name: "en",
          title: "English Salary",
          type: "string",
          placeholder: "5,000 - 8,000 SAR",
        },
      ],
    }),
    defineField({
      name: "experience",
      title: "Required Experience",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Experience",
          type: "string",
          placeholder: "2-4 سنوات",
        },
        {
          name: "en",
          title: "English Experience",
          type: "string",
          placeholder: "2-4 years",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Job Description",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "requirements",
      title: "Job Requirements",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Requirements",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "English Requirements",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "responsibilities",
      title: "Job Responsibilities",
      type: "object",
      fields: [
        {
          name: "ar",
          title: "Arabic Responsibilities",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "en",
          title: "English Responsibilities",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "active",
      title: "Active Job Listing",
      type: "boolean",
      initialValue: true,
      description: "Toggle to show/hide this job listing",
    }),
    defineField({
      name: "featured",
      title: "Featured Job",
      type: "boolean",
      initialValue: false,
      description: "Featured jobs appear at the top of the list",
    }),
    defineField({
      name: "applicationDeadline",
      title: "Application Deadline",
      type: "date",
      description: "Optional deadline for applications",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Featured First",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "order", direction: "asc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "Newest First",
      name: "newestFirst",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      department: "department",
      active: "active",
      featured: "featured",
    },
    prepare(selection) {
      const { title, department, active, featured } = selection
      return {
        title,
        subtitle: `${department} ${featured ? "• Featured" : ""} ${!active ? "• Inactive" : ""}`,
        media: selection.media,
      }
    },
  },
})
