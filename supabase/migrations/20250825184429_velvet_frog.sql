/*
  # Add is_out_of_stock column to products table

  1. Changes
    - Add `is_out_of_stock` boolean column to `products` table
    - Set default value to `false`
    - Update existing products to have `is_out_of_stock = false`

  2. Security
    - No changes to RLS policies needed
*/

-- Add is_out_of_stock column to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_out_of_stock'
  ) THEN
    ALTER TABLE products ADD COLUMN is_out_of_stock boolean DEFAULT false;
  END IF;
END $$;

-- Update existing products to have is_out_of_stock = false
UPDATE products SET is_out_of_stock = false WHERE is_out_of_stock IS NULL;