/*
  # Fix Admin Panel RLS Policies

  1. Products Table RLS
    - Admin can insert, update, delete products
    - Public can only read products
    
  2. Orders Table RLS  
    - Admin can read all orders
    - Users can only read their own orders
    - Users can insert their own orders
    
  3. Order Items Table RLS
    - Admin can read all order items
    - Users can read/insert items for their own orders
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Admin can manage products" ON products;
DROP POLICY IF EXISTS "Products are publicly readable" ON products;
DROP POLICY IF EXISTS "Admin can read all orders" ON orders;
DROP POLICY IF EXISTS "Admin can update orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can read their own orders" ON orders;
DROP POLICY IF EXISTS "Admin can read all order items" ON order_items;
DROP POLICY IF EXISTS "Users can create order items for their orders" ON order_items;
DROP POLICY IF EXISTS "Users can read their order items" ON order_items;

-- Products table policies
CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

CREATE POLICY "Admin can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

CREATE POLICY "Admin can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

-- Orders table policies
CREATE POLICY "Admin can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update all orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

-- Order items table policies
CREATE POLICY "Admin can read all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

CREATE POLICY "Users can read their order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create order items for their orders"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));