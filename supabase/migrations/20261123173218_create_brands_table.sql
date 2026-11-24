BEGIN;

CREATE TABLE public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),

    CONSTRAINT brands_name_clean_check CHECK (
        char_length(name) BETWEEN 1 AND 100
        AND name !~ '^\s|\s$'
    )
);

CREATE UNIQUE INDEX brands_name_lower_uidx
  ON public.brands (lower(name));

CREATE POLICY "Brands are viewable by authenticated users with a profile"
  ON public.brands
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() is not null);

CREATE POLICY "Brands can be inserted by admins and sellers"
  ON public.brands
  FOR INSERT
  TO authenticated
  WITH CHECK (public.get_my_role() in ('admin', 'seller'));

CREATE POLICY "Brands can be updated by admins and sellers"
  ON public.brands
  FOR UPDATE
  TO authenticated
  USING (public.get_my_role() in ('admin', 'seller'))
  WITH CHECK (public.get_my_role() in ('admin', 'seller'));

CREATE POLICY "Brands can be deleted by admins only"
  ON public.brands
  FOR DELETE
  TO authenticated
  USING (public.get_my_role() = 'admin');

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;


COMMIT;