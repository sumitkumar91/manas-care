create table if not exists daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  type text not null check (type in ('morning', 'evening')),
  sleep_hours numeric(3,1),
  energy int check (energy between 1 and 5),
  stress int check (stress between 1 and 5),
  note text,
  created_at timestamptz default now(),
  unique (user_id, date, type)
);

alter table daily_checkins enable row level security;

create policy "Users can manage own checkins"
  on daily_checkins for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
