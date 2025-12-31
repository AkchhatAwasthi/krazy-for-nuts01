/*
  # Create gift_baskets table

  1. New Tables
    - `gift_baskets`
      - `id` (bigserial, primary key)
      - `name` (text, not null)
      - `description` (text, nullable)
      - `price_10` (numeric, not null) - Price for 10 pieces
      - `price_20` (numeric, not null) - Price for 20 pieces
      - `price_50` (numeric, not null) - Price for 50 pieces
      - `in_stock` (boolean, default true)

  2. Security
    - Enable RLS on `gift_baskets` table
    - Add policy for public read access
    - Add policy for admin management

  3. Sample Data
    - Insert sample gift basket products
*/

-- Create the gift_baskets table
CREATE TABLE IF NOT EXISTS gift_baskets (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_10 NUMERIC NOT NULL,
    price_20 NUMERIC NOT NULL,
    price_50 NUMERIC NOT NULL,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE gift_baskets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Gift baskets are publicly readable"
    ON gift_baskets
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Admin can manage gift baskets"
    ON gift_baskets
    FOR ALL
    TO authenticated
    USING ((jwt() ->> 'email'::text) = 'deepakagarwal@gmail.com'::text)
    WITH CHECK ((jwt() ->> 'email'::text) = 'deepakagarwal@gmail.com'::text);

-- Insert sample gift basket data
INSERT INTO gift_baskets (name, description, price_10, price_20, price_50, in_stock) VALUES
('Nutri-Delight Supreme', 'Premium collection of finest almonds and mixed nuts perfect for gifting', 299, 549, 1299, true),
('Classic Nut Duo', 'Traditional combination of premium almonds and cashews', 279, 519, 1199, true),
('Roasted & Salted Crunch', 'Perfectly roasted and salted almonds with a delightful crunch', 259, 489, 1149, true),
('Wholesome Energy Box', 'Energy-packed assortment of nuts and dry fruits for active lifestyles', 319, 589, 1399, true),
('Royal DryFruit Medley', 'Luxurious mix of premium dry fruits including dates, figs, and apricots', 349, 649, 1549, true),
('Gourmet Snack Indulgence', 'Artisanal selection of gourmet nuts and exotic dry fruits', 389, 719, 1699, true),
('Healthy Harvest Basket', 'Nutritious blend of almonds, walnuts, and seasonal dry fruits', 299, 549, 1299, true),
('Sweet Surprise Baby Set', 'Pink-themed gift set perfect for baby celebrations and new parents', 249, 459, 1099, true),
('Nature\'s Treat Hamper', 'Natural and organic selection of premium almonds and mixed nuts', 329, 609, 1449, true),
('Essential Nut Combo', 'Essential daily nutrition pack with almonds, cashews, and walnuts', 269, 499, 1179, true),
('Festive Joy Collection', 'Special festive collection perfect for celebrations and gifting', 359, 669, 1599, true),
('Luxury Celebration Hamper', 'Grand celebration hamper with premium nuts and exotic dry fruits', 449, 829, 1999, true),
('Premium Indulgence Box', 'Indulgent selection of premium nuts with rich flavors', 399, 739, 1749, true),
('Mini Treat Box', 'Compact gift box perfect for small celebrations and personal treats', 199, 369, 899, true),
('Classic Snack & Sip Hamper', 'Traditional snack hamper with nuts and complementary beverages', 339, 629, 1499, true);