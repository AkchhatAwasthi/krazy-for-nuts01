/*
  # Add columns to product_variants for admin panel

  1. Changes
    - Add `size_grams` column (integer) to store size in grams (100, 200, 500)
    - Add `price_inr` column (numeric) to store price in INR (replaces price)
    - Add `in_stock` column (boolean) to track stock status per variant
    - Add unique constraint on (product_id, size_grams) to prevent duplicates
    - Migrate existing data from variant_label to size_grams
  
  2. Data Migration
    - Extract gram values from variant_label (e.g., "100g" -> 100)
    - Copy price to price_inr
    - Set in_stock to true for existing variants
  
  3. Notes
    - Preserves existing variant_label and price columns for backward compatibility
    - New columns allow proper admin panel management
*/

-- Add new columns to product_variants
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_variants' AND column_name = 'size_grams'
  ) THEN
    ALTER TABLE product_variants ADD COLUMN size_grams integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_variants' AND column_name = 'price_inr'
  ) THEN
    ALTER TABLE product_variants ADD COLUMN price_inr numeric DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_variants' AND column_name = 'in_stock'
  ) THEN
    ALTER TABLE product_variants ADD COLUMN in_stock boolean DEFAULT true;
  END IF;
END $$;

-- Migrate existing data
UPDATE product_variants
SET 
  size_grams = CASE 
    WHEN variant_label ILIKE '%100g%' THEN 100
    WHEN variant_label ILIKE '%200g%' THEN 200
    WHEN variant_label ILIKE '%500g%' THEN 500
    WHEN variant_label ILIKE '%1kg%' THEN 1000
    WHEN variant_label ILIKE '%250g%' THEN 250
    ELSE NULL
  END,
  price_inr = COALESCE(price::numeric, 0),
  in_stock = true
WHERE size_grams IS NULL;

-- Create unique constraint on product_id and size_grams (for standard sizes)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'product_variants_product_id_size_grams_key'
  ) THEN
    CREATE UNIQUE INDEX product_variants_product_id_size_grams_key 
    ON product_variants(product_id, size_grams)
    WHERE size_grams IS NOT NULL;
  END IF;
END $$;
