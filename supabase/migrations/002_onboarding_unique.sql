-- Add unique constraint on user_id so upsert works in onboarding
ALTER TABLE public.onboarding_responses
  ADD CONSTRAINT onboarding_responses_user_id_key UNIQUE (user_id);
