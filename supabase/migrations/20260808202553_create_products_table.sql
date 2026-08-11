CREATE TYPE product_unit AS ENUM ('pcs', 'kg', 'pack', 'm', 'l');

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    sku TEXT,
    category_id UUID NOT NULL REFERENCES categories(id),
    unit product_unit NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);
