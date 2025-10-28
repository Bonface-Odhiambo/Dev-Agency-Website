-- Dev Agency Database Schema
-- PostgreSQL Database Schema for Dev Agency Website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CONTACTS TABLE
-- Stores all contact form submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 5000),
    phone VARCHAR(50),
    company VARCHAR(255),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for contacts table
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- =====================================================
-- PROJECTS TABLE
-- Stores portfolio projects
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'mobile', 'design', 'consulting', 'other')),
    technologies TEXT[], -- Array of technology names
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    github_url VARCHAR(500),
    client_name VARCHAR(255),
    completion_date DATE,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('planning', 'in-progress', 'completed', 'archived')),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for projects table
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order ASC);

-- =====================================================
-- TRIGGER FUNCTIONS
-- Automatically update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample projects
INSERT INTO projects (
    title, 
    description, 
    short_description,
    category, 
    technologies, 
    image_url,
    project_url,
    featured,
    status,
    display_order
) VALUES 
(
    'E-Commerce Platform',
    'A full-featured e-commerce platform with payment integration, inventory management, and analytics dashboard.',
    'Modern e-commerce solution with advanced features',
    'web',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    'https://images.unsplash.com/photo-1557821552-17105176677c',
    'https://example.com',
    TRUE,
    'completed',
    1
),
(
    'Mobile Banking App',
    'Secure mobile banking application with biometric authentication, real-time transactions, and investment tracking.',
    'Next-gen mobile banking experience',
    'mobile',
    ARRAY['React Native', 'Firebase', 'Node.js', 'MongoDB'],
    'https://images.unsplash.com/photo-1563986768609-322da13575f3',
    'https://example.com',
    TRUE,
    'completed',
    2
),
(
    'Healthcare Management System',
    'Comprehensive healthcare management system for hospitals with patient records, appointment scheduling, and telemedicine.',
    'Digital transformation for healthcare',
    'web',
    ARRAY['Vue.js', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    'https://example.com',
    TRUE,
    'completed',
    3
),
(
    'Real Estate Portal',
    'Property listing and management platform with virtual tours, mortgage calculator, and agent dashboard.',
    'Modern real estate marketplace',
    'web',
    ARRAY['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Mapbox'],
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    'https://example.com',
    FALSE,
    'completed',
    4
),
(
    'Fitness Tracking App',
    'AI-powered fitness tracking app with workout plans, nutrition tracking, and progress analytics.',
    'Your personal fitness companion',
    'mobile',
    ARRAY['Flutter', 'TensorFlow', 'Firebase', 'Node.js'],
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    'https://example.com',
    FALSE,
    'completed',
    5
),
(
    'Corporate Website Redesign',
    'Complete redesign of corporate website with modern UI/UX, CMS integration, and performance optimization.',
    'Brand transformation through design',
    'design',
    ARRAY['Figma', 'Webflow', 'JavaScript', 'GSAP'],
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
    'https://example.com',
    FALSE,
    'completed',
    6
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- VIEWS
-- Useful database views for common queries
-- =====================================================

-- View for contact statistics
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
    COUNT(*) as total_contacts,
    COUNT(*) FILTER (WHERE status = 'new') as new_contacts,
    COUNT(*) FILTER (WHERE status = 'read') as read_contacts,
    COUNT(*) FILTER (WHERE status = 'replied') as replied_contacts,
    COUNT(*) FILTER (WHERE status = 'archived') as archived_contacts,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as contacts_last_7_days,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as contacts_last_30_days
FROM contacts;

-- View for project statistics
CREATE OR REPLACE VIEW project_stats AS
SELECT 
    COUNT(*) as total_projects,
    COUNT(*) FILTER (WHERE featured = TRUE) as featured_projects,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_projects,
    COUNT(*) FILTER (WHERE status = 'in-progress') as in_progress_projects,
    COUNT(*) FILTER (WHERE category = 'web') as web_projects,
    COUNT(*) FILTER (WHERE category = 'mobile') as mobile_projects,
    COUNT(*) FILTER (WHERE category = 'design') as design_projects
FROM projects;

-- View for recent contacts
CREATE OR REPLACE VIEW recent_contacts AS
SELECT 
    id,
    name,
    email,
    LEFT(message, 100) as message_preview,
    status,
    created_at
FROM contacts
ORDER BY created_at DESC
LIMIT 10;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE contacts IS 'Stores all contact form submissions from the website';
COMMENT ON TABLE projects IS 'Stores portfolio projects displayed on the website';

COMMENT ON COLUMN contacts.status IS 'Contact status: new, read, replied, or archived';
COMMENT ON COLUMN contacts.ip_address IS 'IP address of the person who submitted the form';
COMMENT ON COLUMN contacts.user_agent IS 'Browser user agent string';

COMMENT ON COLUMN projects.featured IS 'Whether the project should be featured on the homepage';
COMMENT ON COLUMN projects.display_order IS 'Order in which projects are displayed (lower numbers first)';
COMMENT ON COLUMN projects.technologies IS 'Array of technology/framework names used in the project';

-- =====================================================
-- GRANTS (Adjust based on your user setup)
-- =====================================================

-- Example: Grant permissions to a specific user
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dev_agency_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev_agency_user;

-- =====================================================
-- MAINTENANCE QUERIES
-- =====================================================

-- Clean up old archived contacts (run periodically)
-- DELETE FROM contacts WHERE status = 'archived' AND updated_at < CURRENT_DATE - INTERVAL '1 year';

-- Vacuum and analyze tables (run periodically for performance)
-- VACUUM ANALYZE contacts;
-- VACUUM ANALYZE projects;
