-- Migration 003: Create Service Requests Table
-- Run this after creating users table

-- Create service_requests table (Sequelize naming convention)
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
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for service_requests table
CREATE INDEX IF NOT EXISTS idx_service_requests_user_id ON service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_assigned_to ON service_requests(assigned_to);
CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests("createdAt" DESC);

-- Add trigger for updatedAt
DROP TRIGGER IF EXISTS update_service_requests_updated_at ON service_requests;
CREATE TRIGGER update_service_requests_updated_at
    BEFORE UPDATE ON service_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments
COMMENT ON TABLE service_requests IS 'Stores client service requests from the dashboard';
COMMENT ON COLUMN service_requests.status IS 'Request status: pending, in-progress, review, completed, or cancelled';
COMMENT ON COLUMN service_requests.progress IS 'Project completion progress (0-100)';
