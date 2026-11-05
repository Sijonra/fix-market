-- LOCATIONS

create policy "Locations are viewable by authenticated users with a profile"
  on public.locations
  for select
  to authenticated
  using (public.get_my_role() is not null);

create policy "Locations can be inserted by admins and sellers"
  on public.locations
  for insert
  to authenticated
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Locations can be updated by admins and sellers"
  on public.locations
  for update
  to authenticated
  using (public.get_my_role() in ('admin', 'seller'))
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Locations can be deleted by admins only"
  on public.locations
  for delete
  to authenticated
  using (public.get_my_role() = 'admin');

alter table public.locations enable row level security;


-- PRODUCTS

create policy "Products are viewable by authenticated users with a profile"
  on public.products
  for select
  to authenticated
  using (public.get_my_role() is not null);

create policy "Products can be inserted by admins and sellers"
  on public.products
  for insert
  to authenticated
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Products can be updated by admins and sellers"
  on public.products
  for update
  to authenticated
  using (public.get_my_role() in ('admin', 'seller'))
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Products can be deleted by admins only"
  on public.products
  for delete
  to authenticated
  using (public.get_my_role() = 'admin');

alter table public.products enable row level security;


-- PRODUCT_LOCATIONS

create policy "Product locations are viewable by authenticated users with a profile"
  on public.product_locations
  for select
  to authenticated
  using (public.get_my_role() is not null);

create policy "Product locations can be inserted by admins and sellers"
  on public.product_locations
  for insert
  to authenticated
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Product locations can be updated by admins and sellers"
  on public.product_locations
  for update
  to authenticated
  using (public.get_my_role() in ('admin', 'seller'))
  with check (public.get_my_role() in ('admin', 'seller'));

create policy "Product locations can be deleted by admins and sellers"
  on public.product_locations
  for delete
  to authenticated
  using (public.get_my_role() in ('admin', 'seller'));

alter table public.product_locations enable row level security;