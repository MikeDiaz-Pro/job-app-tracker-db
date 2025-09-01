-- companies
CREATE TABLE IF NOT EXISTS company (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  website TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- job postings
CREATE TABLE IF NOT EXISTS job_posting (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  location VARCHAR(120),
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_job_posting_company ON job_posting(company_id);

-- application status catalog
CREATE TABLE IF NOT EXISTS application_status (
  code VARCHAR(30) PRIMARY KEY,
  label VARCHAR(60) NOT NULL,
  class_name VARCHAR(50) DEFAULT 'bg-gray-500'  -- tailwind-like class
);
INSERT INTO application_status(code, label, class_name) VALUES
('applied','Applied','bg-blue-500'),
('in_review','In review','bg-yellow-500'),
('interview','Interview','bg-purple-500'),
('offer','Offer','bg-green-600'),
('rejected','Rejected','bg-red-600')
ON CONFLICT (code) DO UPDATE
SET label = EXCLUDED.label,
    class_name = EXCLUDED.class_name;

-- applications
CREATE TABLE IF NOT EXISTS application (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id UUID NOT NULL REFERENCES job_posting(id) ON DELETE CASCADE,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status_code VARCHAR(30) NOT NULL REFERENCES application_status(code),
  source VARCHAR(100),
  salary_min NUMERIC(12,2),
  salary_max NUMERIC(12,2),
  notes TEXT
);
-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_application_status_date
  ON application(status_code, applied_at DESC);
CREATE INDEX IF NOT EXISTS idx_application_job ON application(job_posting_id);