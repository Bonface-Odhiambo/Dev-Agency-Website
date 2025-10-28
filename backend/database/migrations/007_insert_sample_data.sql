-- Migration 007: Insert Sample Data
-- Run this last (optional - for testing)

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample admin user
-- Password: admin123 (CHANGE IN PRODUCTION!)
-- Hash generated with: bcrypt.hash('admin123', 10)
INSERT INTO users (id, name, email, password_hash, role, status, email_verified, "createdAt", "updatedAt") VALUES 
(uuid_generate_v4(), 'Admin User', 'admin@devagency.com', '$2a$10$rOzJQjKqY5X.5Y5Y5Y5Y5uK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'admin', 'active', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'John Doe', 'john@example.com', '$2a$10$rOzJQjKqY5X.5Y5Y5Y5Y5uK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'client', 'active', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(uuid_generate_v4(), 'Jane Smith', 'jane@example.com', '$2a$10$rOzJQjKqY5X.5Y5Y5Y5Y5uK5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y', 'client', 'active', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert sample service requests
INSERT INTO service_requests (
    id,
    user_id,
    project_name,
    service_type,
    description,
    budget_range,
    status,
    progress,
    "createdAt",
    "updatedAt"
) 
SELECT 
    uuid_generate_v4(),
    u.id,
    'E-Commerce Platform',
    'Web Development',
    'Need a full-featured e-commerce platform with payment integration',
    '$10,000 - $25,000',
    'in-progress',
    65,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM users u WHERE u.email = 'john@example.com' AND NOT EXISTS (
    SELECT 1 FROM service_requests WHERE project_name = 'E-Commerce Platform'
);

INSERT INTO service_requests (
    id,
    user_id,
    project_name,
    service_type,
    description,
    budget_range,
    status,
    progress,
    "createdAt",
    "updatedAt"
)
SELECT 
    uuid_generate_v4(),
    u.id,
    'Mobile Fitness App',
    'Mobile Apps',
    'iOS and Android fitness tracking application',
    '$25,000 - $50,000',
    'review',
    90,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM users u WHERE u.email = 'jane@example.com' AND NOT EXISTS (
    SELECT 1 FROM service_requests WHERE project_name = 'Mobile Fitness App'
);

-- Insert sample notifications
INSERT INTO notifications (id, user_id, title, message, type, read, "createdAt")
SELECT 
    uuid_generate_v4(),
    u.id,
    'Welcome to Dev Agency!',
    'Thank you for joining our platform. We''re excited to work with you!',
    'success',
    FALSE,
    CURRENT_TIMESTAMP
FROM users u WHERE u.role = 'client' AND NOT EXISTS (
    SELECT 1 FROM notifications WHERE user_id = u.id AND title = 'Welcome to Dev Agency!'
);
