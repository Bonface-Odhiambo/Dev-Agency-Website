-- Migration: Add expected_timeline column to service_requests table
-- Date: 2025-10-28

-- Add expected_timeline column
ALTER TABLE service_requests 
ADD COLUMN IF NOT EXISTS expected_timeline VARCHAR(100);

-- Add comment
COMMENT ON COLUMN service_requests.expected_timeline IS 'Expected timeline for project completion (e.g., 2-3 weeks, 1 month)';
