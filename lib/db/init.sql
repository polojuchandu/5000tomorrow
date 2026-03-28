-- Create submissions table for storing all form data
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  form_type TEXT NOT NULL,
  data JSON NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_form_type ON submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
