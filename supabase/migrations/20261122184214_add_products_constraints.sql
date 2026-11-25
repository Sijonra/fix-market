BEGIN;

UPDATE public.products
SET is_active = true
WHERE is_active IS NULL;

ALTER TABLE public.products
  ALTER COLUMN is_active SET NOT NULL;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS brand_id UUID
  REFERENCES public.brands(id)
  ON DELETE RESTRICT;

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_name_clean_check;

ALTER TABLE public.products
  ADD CONSTRAINT products_name_clean_check
  CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND name !~ '^\s|\s$'
  );

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_description_clean_check;

ALTER TABLE public.products
  ADD CONSTRAINT products_description_clean_check
  CHECK (
    description IS NULL
    OR (
      char_length(description) BETWEEN 1 AND 1000
      AND description !~ '^\s|\s$'
    )
  );

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_price_non_negative;

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_price_range_check;

ALTER TABLE public.products
  ADD CONSTRAINT products_price_range_check
  CHECK (
    price >= 0
    AND price <= 1000000
  );

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_sku_clean_check;

ALTER TABLE public.products
  ADD CONSTRAINT products_sku_clean_check
  CHECK (
    sku IS NULL
    OR (
      char_length(sku) BETWEEN 1 AND 50
      AND sku !~ '^\s|\s$'
    )
  );

CREATE UNIQUE INDEX IF NOT EXISTS products_sku_unique_idx
  ON public.products (lower(sku))
  WHERE sku IS NOT NULL;

CREATE INDEX IF NOT EXISTS products_category_id_idx
  ON public.products (category_id);

CREATE INDEX IF NOT EXISTS products_brand_id_idx
  ON public.products (brand_id);

COMMIT;