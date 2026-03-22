create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text,
  message text not null,
  created_at timestamptz default now()
);

alter table feedback enable row level security;

-- Users can insert their own feedback
create policy "Users can submit feedback"
  on feedback for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Only service role can read (you read via Supabase dashboard)
