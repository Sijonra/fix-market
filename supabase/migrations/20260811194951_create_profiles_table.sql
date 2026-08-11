CREATE TYPE role AS ENUM ('admin', 'seller');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
