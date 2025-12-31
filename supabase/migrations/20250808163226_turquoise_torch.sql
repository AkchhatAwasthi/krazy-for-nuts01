/*
  # Create products table for K-R-A-Z-Y for Nuts

  1. New Tables
    - `products`
      - `id` (integer, primary key, auto-increment)
      - `name` (text, not null)
      - `price` (integer, not null) - price in rupees
      - `original_price` (integer, nullable) - original price for discounts
      - `image` (text, not null) - product image URL
      - `category` (text, not null) - product category
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access to products
    - Products are publicly readable for e-commerce functionality

  3. Sample Data
    - Insert all existing sample products into the table
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (products should be visible to everyone)
CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Insert sample products data
INSERT INTO products (name, price, original_price, image, category) VALUES
  ('Premium California Almonds', 399, 499, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Golden Roasted Cashews', 549, NULL, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Turkish Salted Pistachios', 649, 749, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500', 'pistachios'),
  ('Mixed Nuts Deluxe', 699, NULL, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'mixed'),
  ('Raw Cashews Premium', 479, 529, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Honey Roasted Almonds', 449, NULL, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Pistachio Premium Pack', 799, 899, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500', 'pistachios'),
  ('Trail Mix Supreme', 399, NULL, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'mixed'),
  ('Smoked Almonds', 429, NULL, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Cashew Butter Crunch', 599, 679, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Festive Gift Box', 1299, 1499, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'gift-boxes'),
  ('Organic Almonds', 529, NULL, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Spiced Cashews', 459, NULL, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Pistachio & Cranberry Mix', 749, 849, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'mixed'),
  ('Corporate Gift Hamper', 1999, NULL, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'gift-boxes'),
  ('Salted Roasted Almonds', 379, 429, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Cashew Clusters', 519, NULL, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Turkish Pistachios Premium', 899, 999, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500', 'pistachios'),
  ('Protein Power Mix', 549, NULL, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'mixed'),
  ('Birthday Special Box', 899, 1099, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'gift-boxes'),
  ('Blanched Almonds', 489, NULL, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Garlic Cashews', 479, NULL, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Chili Lime Pistachios', 699, 779, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500', 'pistachios'),
  ('Antioxidant Berry Mix', 629, NULL, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'mixed'),
  ('Premium Gift Collection', 2499, 2899, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'gift-boxes'),
  ('Chocolate Almonds', 549, NULL, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', 'almonds'),
  ('Wasabi Cashews', 599, 649, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', 'cashews'),
  ('Sweet & Salty Pistachios', 679, NULL, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500', 'pistachios'),
  ('Energy Boost Mix', 459, NULL, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'mixed'),
  ('Wedding Favor Boxes', 199, 249, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500', 'gift-boxes');