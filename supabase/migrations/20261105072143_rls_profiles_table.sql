create policy "Profiles are viewable by admin or by profile owner"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()) or public.get_my_role() = 'admin');

create policy "Profiles can be updated by admins only"
  on public.profiles
  for update
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

alter table public.profiles enable row level security;