-- Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create the registrations table (handles both basic and course-specific registrations)
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  language TEXT NOT NULL,
  level TEXT NOT NULL,
  batch TEXT,
  hear_about TEXT,
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policies for public insertion
CREATE POLICY "Allow public to insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public to insert registrations" ON registrations FOR INSERT WITH CHECK (true);

-- Policies for admin read/all
CREATE POLICY "Allow all for authenticated users on contacts" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users on registrations" ON registrations FOR ALL USING (true);
