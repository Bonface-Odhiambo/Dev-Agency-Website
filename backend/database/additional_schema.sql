-- Additional Database Schema for Dev Agency Website
-- User Authentication, Service Requests, and Admin Features

-- =====================================================
-- USERS TABLE
-- Stores user accounts for authentication
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'admin', 'super_admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- =====================================================
-- SERVICE_REQUESTS TABLE
-- Stores client service requests from dashboard
-- =====================================================
CREATE TABLE IF NOT EXISTS service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    budget_range VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'review', 'completed', 'cancelled')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    assigned_to UUID REFERENCES users(id),
    estimated_completion DATE,
    actual_completion DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for service_requests table
CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_assigned_to ON service_requests(assigned_to);
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests(created_at DESC);

-- =====================================================
-- SESSIONS TABLE
-- Stores user sessions for authentication
-- =====================================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for sessions table
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- =====================================================
-- NOTIFICATIONS TABLE
-- Stores user notifications
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    read BOOLEAN DEFAULT FALSE,
    link VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for notifications table
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- ACTIVITY_LOGS TABLE
-- Tracks admin and user activities
-- =====================================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for activity_logs table
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);

-- =====================================================
-- TRIGGER FUNCTIONS
-- Automatically update updated_at timestamp
-- =====================================================

-- Apply triggers to new tables
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_requests_updated_at ON service_requests;
CREATE TRIGGER update_service_requests_updated_at
    BEFORE UPDATE ON service_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWS
-- Useful database views for common queries
-- =====================================================

-- View for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE role = 'client') as total_clients,
    COUNT(*) FILTER (WHERE role = 'admin') as total_admins,
    COUNT(*) FILTER (WHERE status = 'active') as active_users,
    COUNT(*) FILTER (WHERE status = 'inactive') as inactive_users,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as new_users_last_7_days,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_last_30_days
FROM users;

-- View for service request statistics
CREATE OR REPLACE VIEW service_request_stats AS
SELECT 
    COUNT(*) as total_requests,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_requests,
    COUNT(*) FILTER (WHERE status = 'in-progress') as in_progress_requests,
    COUNT(*) FILTER (WHERE status = 'review') as review_requests,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_requests,
    COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_requests,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as requests_last_7_days,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as requests_last_30_days,
    AVG(progress) as average_progress
FROM service_requests;

-- View for user dashboard
CREATE OR REPLACE VIEW user_dashboard_view AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    COUNT(sr.id) as total_requests,
    COUNT(sr.id) FILTER (WHERE sr.status = 'pending') as pending_requests,
    COUNT(sr.id) FILTER (WHERE sr.status = 'in-progress') as active_requests,
    COUNT(sr.id) FILTER (WHERE sr.status = 'completed') as completed_requests,
    COUNT(n.id) FILTER (WHERE n.read = FALSE) as unread_notifications
FROM users u
LEFT JOIN service_requests sr ON u.id = sr.user_id
LEFT JOIN notifications n ON u.id = n.user_id
WHERE u.role = 'client'
GROUP BY u.id, u.name, u.email;

-- View for admin panel overview
CREATE OR REPLACE VIEW admin_overview AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE role = 'client') as total_clients,
    (SELECT COUNT(*) FROM service_requests) as total_requests,
    (SELECT COUNT(*) FROM service_requests WHERE status = 'pending') as pending_requests,
    (SELECT COUNT(*) FROM service_requests WHERE status = 'in-progress') as in_progress_requests,
    (SELECT COUNT(*) FROM service_requests WHERE status = 'completed') as completed_requests,
    (SELECT COUNT(*) FROM contacts WHERE status = 'new') as new_contacts,
    (SELECT COUNT(*) FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_this_month,
    (SELECT COUNT(*) FROM service_requests WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_requests_this_month;

-- View for recent activity
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
    al.id,
    al.action,
    al.description,
    al.created_at,
    u.name as user_name,
    u.email as user_email
FROM activity_logs al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 50;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample admin user (password: admin123 - CHANGE IN PRODUCTION!)
-- Note: You'll need to hash this password properly in your application
INSERT INTO users (name, email, password_hash, role, status, email_verified) VALUES 
('Admin User', 'admin@devagency.com', '$2a$10$example_hash_here', 'admin', 'active', TRUE),
('John Doe', 'john@example.com', '$2a$10$example_hash_here', 'client', 'active', TRUE),
('Jane Smith', 'jane@example.com', '$2a$10$example_hash_here', 'client', 'active', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insert sample service requests
INSERT INTO service_requests (
    user_id,
    project_name,
    service_type,
    description,
    budget_range,
    status,
    progress
) 
SELECT 
    u.id,
    'E-Commerce Platform',
    'Web Development',
    'Need a full-featured e-commerce platform with payment integration',
    '$10,000 - $25,000',
    'in-progress',
    65
FROM users u WHERE u.email = 'john@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO service_requests (
    user_id,
    project_name,
    service_type,
    description,
    budget_range,
    status,
    progress
)
SELECT 
    u.id,
    'Mobile Fitness App',
    'Mobile Apps',
    'iOS and Android fitness tracking application',
    '$25,000 - $50,000',
    'review',
    90
FROM users u WHERE u.email = 'jane@example.com'
ON CONFLICT DO NOTHING;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE users IS 'Stores user accounts for authentication and authorization';
COMMENT ON TABLE service_requests IS 'Stores client service requests from the dashboard';
COMMENT ON TABLE sessions IS 'Stores active user sessions for authentication';
COMMENT ON TABLE notifications IS 'Stores user notifications and alerts';
COMMENT ON TABLE activity_logs IS 'Tracks all user and admin activities for audit purposes';

COMMENT ON COLUMN users.role IS 'User role: client, admin, or super_admin';
COMMENT ON COLUMN users.status IS 'Account status: active, inactive, or suspended';
COMMENT ON COLUMN service_requests.status IS 'Request status: pending, in-progress, review, completed, or cancelled';
COMMENT ON COLUMN service_requests.progress IS 'Project completion progress (0-100)';

-- =====================================================
-- SECURITY
-- =====================================================

-- Create function to automatically log activities
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO activity_logs (user_id, action, entity_type, entity_id, description)
    VALUES (
        COALESCE(NEW.user_id, OLD.user_id),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE 
            WHEN TG_OP = 'INSERT' THEN 'Created new ' || TG_TABLE_NAME
            WHEN TG_OP = 'UPDATE' THEN 'Updated ' || TG_TABLE_NAME
            WHEN TG_OP = 'DELETE' THEN 'Deleted ' || TG_TABLE_NAME
        END
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply activity logging to service_requests
DROP TRIGGER IF EXISTS log_service_request_activity ON service_requests;
CREATE TRIGGER log_service_request_activity
    AFTER INSERT OR UPDATE OR DELETE ON service_requests
    FOR EACH ROW
    EXECUTE FUNCTION log_activity();
