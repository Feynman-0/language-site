-- ==========================================
-- MASTER SCHEMA FOR LANGUAGE SOCIETY
-- ==========================================

-- 1. Create the blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create the admin_config table
CREATE TABLE IF NOT EXISTS admin_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- 3. Create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create the registrations table
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

-- Initial Data
INSERT INTO admin_config (key, value) 
VALUES ('admin_password', 'admin123')
ON CONFLICT (key) DO NOTHING;

-- ==========================================
-- SECURITY POLICIES (RLS)
-- ==========================================

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts when re-running
DROP POLICY IF EXISTS "Public read approved blogs" ON blogs;
DROP POLICY IF EXISTS "Public insert blogs" ON blogs;
DROP POLICY IF EXISTS "Admin all on blogs" ON blogs;

DROP POLICY IF EXISTS "Public read admin_config" ON admin_config;
DROP POLICY IF EXISTS "Admin update admin_config" ON admin_config;

DROP POLICY IF EXISTS "Public insert contacts" ON contacts;
DROP POLICY IF EXISTS "Admin all on contacts" ON contacts;

DROP POLICY IF EXISTS "Public insert registrations" ON registrations;
DROP POLICY IF EXISTS "Admin all on registrations" ON registrations;

-- Re-create Blogs Policies
CREATE POLICY "Public read approved blogs" ON blogs FOR SELECT USING (status = 'approved');
CREATE POLICY "Public insert blogs" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all on blogs" ON blogs FOR ALL USING (true);

-- Re-create Admin Config Policies
CREATE POLICY "Public read admin_config" ON admin_config FOR SELECT USING (true);
CREATE POLICY "Admin update admin_config" ON admin_config FOR UPDATE USING (true);

-- Re-create Contacts Policies
CREATE POLICY "Public insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all on contacts" ON contacts FOR ALL USING (true);

-- Re-create Registrations Policies
CREATE POLICY "Public insert registrations" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all on registrations" ON registrations FOR ALL USING (true);

-- ==========================================
-- STORAGE SETUP
-- ==========================================

-- 1. Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

-- 2. Allow public access to images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- 3. Allow public upload
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' );

-- 4. Allow admin delete/update
CREATE POLICY "Admin Delete"
ON storage.objects FOR ALL
USING ( bucket_id = 'blog-images' );
