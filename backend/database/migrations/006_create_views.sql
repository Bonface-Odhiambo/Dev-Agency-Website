-- Migration 006: Create Database Views
-- Run this after all tables are created

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
