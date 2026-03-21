-- Add guna column to mood_logs
ALTER TABLE public.mood_logs
ADD COLUMN IF NOT EXISTS guna TEXT CHECK (guna IN ('sattva', 'rajas', 'tamas'));
