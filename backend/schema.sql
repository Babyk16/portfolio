-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name) VALUES
('Portrait'),
('Landscape'),
('Abstract'),
('Nature'),
('Digital')
ON CONFLICT DO NOTHING;