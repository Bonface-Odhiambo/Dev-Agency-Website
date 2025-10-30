-- Contact Messages Table
-- Stores all messages submitted through the "Get in Touch" form

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    status VARCHAR(50) DEFAULT 'unread',
    priority VARCHAR(50) DEFAULT 'normal',
    admin_notes TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    replied_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Create a view for message statistics
CREATE OR REPLACE VIEW contact_message_stats AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(*) FILTER (WHERE status = 'unread') as unread_count,
    COUNT(*) FILTER (WHERE status = 'read') as read_count,
    COUNT(*) FILTER (WHERE status = 'replied') as replied_count,
    COUNT(*) FILTER (WHERE status = 'archived') as archived_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as today_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as week_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as month_count
FROM contact_messages;

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_message_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_contact_message_timestamp ON contact_messages;
CREATE TRIGGER update_contact_message_timestamp
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_message_timestamp();

-- Insert some sample data for testing
INSERT INTO contact_messages (name, email, subject, message, phone, company, status, priority)
VALUES 
    ('John Doe', 'john@example.com', 'Website Development Inquiry', 'Hi, I am interested in building a custom e-commerce website for my business. Can we schedule a call?', '+1234567890', 'Tech Startup Inc', 'unread', 'high'),
    ('Sarah Smith', 'sarah@company.com', 'Mobile App Development', 'Looking for a team to develop a mobile app for iOS and Android. What is your pricing?', '+9876543210', 'Mobile Solutions Ltd', 'read', 'normal'),
    ('Mike Johnson', 'mike@email.com', 'General Inquiry', 'Do you offer maintenance services for existing websites?', NULL, NULL, 'replied', 'normal')
ON CONFLICT DO NOTHING;

-- Grant permissions (adjust based on your setup)
-- GRANT SELECT, INSERT, UPDATE ON contact_messages TO authenticated;
-- GRANT SELECT ON contact_message_stats TO authenticated;

COMMENT ON TABLE contact_messages IS 'Stores all contact form submissions from the website';
COMMENT ON COLUMN contact_messages.status IS 'Message status: unread, read, replied, archived';
COMMENT ON COLUMN contact_messages.priority IS 'Message priority: low, normal, high, urgent';
