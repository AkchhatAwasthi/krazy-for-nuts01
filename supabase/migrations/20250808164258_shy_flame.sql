/*
  # Complete E-commerce Schema Setup

  1. New Tables
    - `products` (updated structure with weight-based pricing)
      - `id` (uuid, primary key)
      - `category` (text)
      - `name` (text)
      - `description` (text)
      - `price_200g` (numeric)
      - `price_500g` (numeric)
      - `price_1kg` (numeric)
      - `image_url` (text)
      - `is_out_of_stock` (boolean)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (serial, primary key) - serves as order_id
      - `user_id` (uuid, foreign key)
      - `customer_name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `address` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (integer, foreign key)
      - `product_id` (uuid, foreign key)
      - `product_name` (text)
      - `weight` (text)
      - `quantity` (integer)
      - `price` (numeric)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
    - Secure admin-only operations

  3. Storage
    - Create bucket for product images
    - Set up public access for product images
*/

-- Drop existing products table if it exists
DROP TABLE IF EXISTS products CASCADE;

-- Create updated products table with weight-based pricing
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  description text,
  price_200g numeric NOT NULL,
  price_500g numeric NOT NULL,
  price_1kg numeric NOT NULL,
  image_url text,
  is_out_of_stock boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  customer_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  address text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id integer REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  weight text NOT NULL CHECK (weight IN ('200g', '500g', '1kg')),
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'DeepakAgarwal@gmail.com');

-- Orders policies (users can read their own orders, admin can read all)
CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'DeepakAgarwal@gmail.com');

CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'DeepakAgarwal@gmail.com');

-- Order items policies
CREATE POLICY "Users can read their order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can read all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'DeepakAgarwal@gmail.com');

CREATE POLICY "Users can create order items for their orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample products with new structure
INSERT INTO products (category, name, description, price_200g, price_500g, price_1kg, image_url) VALUES
('almonds', 'Premium California Almonds', 'Hand-picked California almonds with exceptional taste and nutrition', 399, 899, 1799, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500'),
('almonds', 'Organic Raw Almonds', 'Certified organic raw almonds, perfect for healthy snacking', 449, 999, 1999, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500'),
('almonds', 'Roasted Salted Almonds', 'Perfectly roasted and lightly salted for enhanced flavor', 429, 949, 1899, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500'),
('almonds', 'Honey Glazed Almonds', 'Sweet honey-glazed almonds for a delightful treat', 479, 1099, 2199, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500'),
('almonds', 'Smoked Almonds', 'Naturally smoked almonds with a rich, smoky flavor', 499, 1149, 2299, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500'),

('cashews', 'Golden Roasted Cashews', 'Perfectly roasted cashews with a rich, buttery flavor', 549, 1249, 2499, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500'),
('cashews', 'Raw Cashew Nuts', 'Premium quality raw cashews, naturally sweet and creamy', 599, 1349, 2699, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500'),
('cashews', 'Salted Cashews', 'Lightly salted roasted cashews for the perfect snack', 569, 1299, 2599, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500'),
('cashews', 'Pepper Cashews', 'Spicy black pepper seasoned cashews', 589, 1349, 2699, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500'),
('cashews', 'Organic Cashews', 'Certified organic cashews, naturally processed', 649, 1449, 2899, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500'),

('pistachios', 'Turkish Pistachios', 'Authentic Turkish pistachios bursting with natural flavor', 699, 1599, 3199, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500'),
('pistachios', 'Roasted Pistachios', 'Perfectly roasted pistachios with enhanced flavor', 729, 1649, 3299, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500'),
('pistachios', 'Salted Pistachios', 'Lightly salted roasted pistachios', 749, 1699, 3399, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500'),
('pistachios', 'Raw Pistachios', 'Natural raw pistachios without any processing', 679, 1549, 3099, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500'),
('pistachios', 'Chili Lime Pistachios', 'Spicy chili lime flavored pistachios', 779, 1749, 3499, 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=500'),

('mixed', 'Premium Mixed Nuts', 'A delightful blend of almonds, cashews, and pistachios', 599, 1349, 2699, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('mixed', 'Roasted Mixed Nuts', 'Perfectly roasted mix of premium nuts', 629, 1399, 2799, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('mixed', 'Salted Mixed Nuts', 'Lightly salted mix of roasted nuts', 649, 1449, 2899, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('mixed', 'Spicy Mixed Nuts', 'Spiced mix of nuts with Indian masala', 679, 1549, 3099, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('mixed', 'Organic Mixed Nuts', 'Certified organic mix of premium nuts', 749, 1699, 3399, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),

('gift-baskets', 'Deluxe Gift Basket', 'Premium assortment of nuts in an elegant basket', 1299, 2999, 5999, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('gift-baskets', 'Corporate Gift Box', 'Professional gift box perfect for corporate gifting', 999, 2299, 4599, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('gift-baskets', 'Festival Special Box', 'Special festive collection of premium nuts', 1199, 2699, 5399, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('gift-baskets', 'Wedding Gift Hamper', 'Elegant wedding gift hamper with assorted nuts', 1499, 3499, 6999, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500'),
('gift-baskets', 'Health & Wellness Box', 'Curated selection of healthy nuts and dry fruits', 1099, 2499, 4999, 'https://images.pexels.com/photos/1295571/pexels-photo-1295571.jpeg?auto=compress&cs=tinysrgb&w=500');

-- Create storage bucket for product images (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public access to product images
CREATE POLICY "Public can view product images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- Create storage policy for admin to upload product images
CREATE POLICY "Admin can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' 
    AND auth.jwt() ->> 'email' = 'DeepakAgarwal@gmail.com'
  );