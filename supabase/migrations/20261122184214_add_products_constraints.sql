BEGIN;

ALTER TABLE public.products
  ALTER COLUMN is_active SET NOT NULL;

ALTER TABLE public.products
  ADD CONSTRAINT products_price_non_negative
  CHECK (price >= 0);

ALTER TABLE public.products
  ADD CONSTRAINT products_name_clean_check
  CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND name !~ '^\s|\s$'
  );

COMMIT;