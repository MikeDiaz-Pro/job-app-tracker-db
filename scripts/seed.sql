INSERT INTO company(name, website) VALUES
('Acme Corp','https://acme.example'), ('Globex','https://globex.example');

INSERT INTO job_posting(company_id, title, location, url)
SELECT id, 'Fullstack Engineer','Remote','https://jobs.example/acme-1' FROM company WHERE name='Acme Corp';
INSERT INTO job_posting(company_id, title, location, url)
SELECT id, 'Backend Engineer','CDMX','https://jobs.example/globex-1' FROM company WHERE name='Globex';

INSERT INTO application(job_posting_id, status_code, source, salary_min, salary_max, notes)
SELECT id, 'applied', 'LinkedIn', 45000, 70000, 'Applied today'
FROM job_posting ORDER BY created_at LIMIT 1;