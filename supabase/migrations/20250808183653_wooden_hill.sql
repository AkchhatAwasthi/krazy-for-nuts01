/*
  # Fix Admin RLS Policies and Permissions

  1. Products Table
    - Admin can INSERT, UPDATE, DELETE products
    - Public can SELECT products
  
  2. Orders Table  
    - Admin can SELECT all orders and UPDATE status
    - Users can SELECT and INSERT their own orders
  
  3. Order Items Table
    - Admin can SELECT all order items
    - Users can SELECT and INSERT their own order items

  All policies use auth.email() for proper authentication checks.
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can insert products" ON products;
DROP POLICY IF EXISTS "Admin can update products" ON products;
DROP POLICY IF EXISTS "Admin can delete products" ON products;
DROP POLICY IF EXISTS "Products are publicly readable" ON products;

DROP POLICY IF EXISTS "Admin can read all orders" ON orders;
DROP POLICY IF EXISTS "Admin can update all orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can read their own orders" ON orders;

DROP POLICY IF EXISTS "Admin can read all order items" ON order_items;
DROP POLICY IF EXISTS "Users can create order items for their orders" ON order_items;
DROP POLICY IF EXISTS "Users can read their order items" ON order_items;

-- Products table policies
CREATE POLICY "Admin can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'deepakagarwal@gmail.com');

CREATE POLICY "Admin can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'deepakagarwal@gmail.com')
  WITH CHECK (auth.email() = 'deepakagarwal@gmail.com');

CREATE POLICY "Admin can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'deepakagarwal@gmail.com');

CREATE POLICY "Products are publicly readable"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Orders table policies
CREATE POLICY "Admin can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.email() = 'deepakagarwal@gmail.com');

CREATE POLICY "Admin can update all orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'deepakagarwal@gmail.com')
  WITH CHECK (auth.email() = 'deepakagarwal@gmail.com');

CREATE POLICY "Users can create their own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Order items table policies
CREATE POLICY "Admin can read all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (auth.email() = 'deepakagarwal@gmail.com');

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