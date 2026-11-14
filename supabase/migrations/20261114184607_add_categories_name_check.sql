BEGIN;

ALTER TABLE public.categories
  DROP CONSTRAINT IF EXISTS categories_name_check;

ALTER TABLE public.categories
  ADD CONSTRAINT categories_name_clean_check
  CHECK (
    char_length(name) BETWEEN 1 AND 50 
    AND name !~ '^\s|\s$'
  );

COMMIT;