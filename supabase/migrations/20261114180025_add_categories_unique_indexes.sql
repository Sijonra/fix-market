CREATE UNIQUE INDEX categories_name_null_parent_idx 
  ON public.categories (lower(name)) 
  WHERE parent_id IS NULL;

CREATE UNIQUE INDEX categories_name_with_parent_idx 
  ON public.categories (lower(name), parent_id) 
  WHERE parent_id IS NOT NULL;

alter table public.categories
  add constraint categories_name_check 
  check (char_length(btrim(name)) between 1 and 50);