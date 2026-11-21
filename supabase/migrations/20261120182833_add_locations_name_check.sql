BEGIN;

CREATE UNIQUE INDEX locations_name_lower_uidx
  ON public.locations (lower(name));

ALTER TABLE public.locations
  ADD CONSTRAINT locations_name_clean_check
  CHECK (
    char_length(name) BETWEEN 1 AND 100 
    AND name !~ '^\s|\s$'
  );

COMMIT;