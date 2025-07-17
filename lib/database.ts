import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type?: string;
  message: string;
  language: "ar" | "en";
}

// Job application types
export interface JobApplicationData {
  job_id?: string;
  job_title: string;
  applicant_name: string;
  email: string;
  phone?: string;
  experience_years?: number;
  current_position?: string;
  cv_file_url?: string;
  cover_letter?: string;
  language: "ar" | "en";
}

// Database functions
export async function createContact(data: ContactFormData) {
  const result = await sql`
    INSERT INTO contacts (name, email, phone, company, service_type, message, language)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.company || null}, ${data.service_type || null}, ${data.message}, ${data.language})
    RETURNING id, created_at
  `;
  return result[0];
}
export async function createJobApplication(data: JobApplicationData) {
  const result = await sql`
    INSERT INTO job_applications (
      job_id, job_title, applicant_name, email, phone, 
      experience_years, current_position, cv_file_url, cover_letter, language
    )
    VALUES (
      ${data.job_id || null}, ${data.job_title}, ${data.applicant_name}, ${data.email}, ${data.phone || null},
      ${data.experience_years || null}, ${data.current_position || null}, ${data.cv_file_url || null}, ${data.cover_letter || null}, ${data.language}
    )
    RETURNING id, application_date
  `;
  return result[0];
}

export async function subscribeToNewsletter(
  email: string,
  language: "ar" | "en" = "ar"
) {
  try {
    const result = await sql`
      INSERT INTO newsletter_subscribers (email, language)
      VALUES (${email}, ${language})
      ON CONFLICT (email) DO UPDATE SET
        language = ${language},
        subscribed_at = CURRENT_TIMESTAMP,
        status = 'active'
      RETURNING id
    `;
    return result[0];
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error;
  }
}

export async function getTestimonials(featured = true) {
  const result = await sql`
    SELECT * FROM testimonials 
    WHERE featured = ${featured}
    ORDER BY created_at DESC
  `;
  return result;
}

export async function getProjects(category?: string, featured = false) {
  let query = sql`SELECT * FROM projects WHERE 1=1`;

  if (category && category !== "all") {
    query = sql`SELECT * FROM projects WHERE category = ${category}`;
  }

  if (featured) {
    query = sql`SELECT * FROM projects WHERE featured = true`;
  }

  const result = await query;
  return result;
}


export async function getJobApplications(jobId?: string) {
  let query = sql`
    SELECT * FROM job_applications 
    ORDER BY application_date DESC
  `

  if (jobId) {
    query = sql`
      SELECT * FROM job_applications 
      WHERE job_id = ${jobId}
      ORDER BY application_date DESC
    `
  }

  const result = await query
  return result
}
