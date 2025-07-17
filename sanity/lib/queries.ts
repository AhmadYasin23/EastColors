import { groq } from "next-sanity"

// Projects queries
export const projectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    mainImage,
    gallery,
    client,
    completionDate,
    featured,
    publishedAt
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    mainImage,
    client,
    completionDate,
    publishedAt
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    category,
    mainImage,
    gallery,
    client,
    completionDate,
    technologies,
    challenges,
    solution,
    results,
    publishedAt
  }
`

// Services queries
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    features,
    image,
    order,
    featured
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon,
    features,
    detailedDescription,
    image,
    gallery
  }
`

// Blog queries
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      _id,
      name,
      image
    },
    featured,
    publishedAt
  }
`

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{
      _id,
      name,
      image
    },
    publishedAt
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    categories[]->{
      _id,
      title,
      slug
    },
    tags,
    author->{
      _id,
      name,
      image,
      bio,
      position
    },
    seo,
    publishedAt
  }
`

// Categories query
export const categoriesQuery = groq`
  *[_type == "category"] | order(title.en asc) {
    _id,
    title,
    slug,
    description
  }
`

// Jobs queries
export const jobsQuery = groq`
  *[_type == "job" && active == true] | order(featured desc, order asc, publishedAt desc) {
    _id,
    title,
    slug,
    department,
    location,
    type,
    salary,
    experience,
    description,
    requirements,
    responsibilities,
    featured,
    applicationDeadline,
    publishedAt
  }
`

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug && active == true][0] {
    _id,
    title,
    slug,
    department,
    location,
    type,
    salary,
    experience,
    description,
    requirements,
    responsibilities,
    featured,
    applicationDeadline,
    publishedAt
  }
`

export const featuredJobsQuery = groq`
  *[_type == "job" && active == true && featured == true] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    department,
    location,
    type,
    salary,
    experience,
    description,
    featured,
    publishedAt
  }
`
