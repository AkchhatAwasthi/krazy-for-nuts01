/*
  # Update orders table with ordered_items column

  1. Changes
    - Add `ordered_items` column to store JSON data of ordered items
    - This will contain product details, quantities, weights, and prices

  2. Security
    - Maintain existing RLS policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'ordered_items'
  ) THEN
    ALTER TABLE orders ADD COLUMN ordered_items jsonb;
  END IF;
END $$;