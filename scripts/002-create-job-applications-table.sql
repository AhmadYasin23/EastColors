-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id SERIAL PRIMARY KEY,
  job_id VARCHAR(255),
  job_title VARCHAR(255) NOT NULL,
  applicant_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  experience_years INTEGER,
  current_position VARCHAR(255),
  cv_file_url VARCHAR(500),
  cover_letter TEXT,
  language VARCHAR(2) DEFAULT 'ar',
  application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'new'
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_date ON job_applications(application_date);
