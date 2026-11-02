create policy "Categories are viewable by authenticated user"
  on public.categories
  for select
  to authenticated
  using (public.get_my_role() is not null);

create policy "Categories can be inserted by admins and sellers"
  on public.categories
  for insert
  to authenticated
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Categories can be updated by admins and sellers"
  on public.categories
  for update
  to authenticated
  using (public.get_my_role() in ('admin', 'seller'))
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Categories can be deleted by admins only"
  on public.categories
  for delete
  to authenticated
  using (public.get_my_role() = 'admin');

alter table public.categories enable row level security;