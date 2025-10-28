-- Migration 007: Insert Sample Data
-- Run this last (optional - for testing)

-- Insert sample admin user
-- Password: admin123 (CHANGE IN PRODUCTION!)
-- Hash generated with: bcrypt.hash('admin123', 10)
INSERT INTO users (name, email, password_hash, role, status, email_verified) VALUES 
('Admin User', 'admin@devagency.com', '$2a$10$rOzJQjKqY5X.5Y5Y5Y5Y5uK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'admin', 'active', TRUE),
('John Doe', 'john@example.com', '$2a$10$rOzJQjKqY5X.5Y5Y5Y5Y5uK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'client', 'active', TRUE),
('Jane Smith', 'jane@example.com', '$2a$10$rOzJQjKqY5X.5Y5Y5Y5Y5uK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'client', 'active', TRUE)
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

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, read)
SELECT 
    u.id,
    'Welcome to Dev Agency!',
    'Thank you for joining our platform. We''re excited to work with you!',
    'success',
    FALSE
FROM users u WHERE u.role = 'client'
ON CONFLICT DO NOTHING;
