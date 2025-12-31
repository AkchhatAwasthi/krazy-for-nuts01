/*
  # Fix product_variants unique constraint for ON CONFLICT support

  ## Summary
  This migration fixes the issue where upsert operations fail with the error:
  "there is no unique or exclusion constraint matching the ON CONFLICT specification"

  ## Problem
  The existing unique index on (product_id, size_grams) has a WHERE clause (partial index),
  which cannot be used with PostgreSQL's ON CONFLICT clause in upsert operations.

  ## Changes Made

  ### 1. Data Cleanup
  - Update NULL size_grams values for variants with non-standard sizes:
    - Extract numeric values from variant_label for "pcs" and "g" units
    - Handle special cases: 20g, 50g, 1pcs, 5pcs, 10pcs, etc.
  
  ### 2. Index Management
  - Drop the existing partial unique index
  - Create a proper unique constraint on (product_id, size_grams)
  - Add NOT NULL constraint to size_grams column
  
  ### 3. Data Integrity
  - Ensure all variants have valid size_grams values
  - Maintain referential integrity with products table

  ## Impact
  - Enables admin panel to update product prices and stock status
  - Allows upsert operations using ON CONFLICT (product_id, size_grams)
  - Prevents duplicate variants for the same product and size
*/

-- Step 1: Update NULL size_grams values for remaining variants
UPDATE product_variants
SET size_grams = CASE 
  -- Handle piece-based variants (convert to approximate grams for uniqueness)
  WHEN variant_label ILIKE '%1pcs%' OR variant_label ILIKE '%1 pcs%' THEN 1
  WHEN variant_label ILIKE '%5pcs%' OR variant_label ILIKE '%5 pcs%' THEN 5
  WHEN variant_label ILIKE '%10pcs%' OR variant_label ILIKE '%10 pcs%' THEN 10
  WHEN variant_label ILIKE '%15pcs%' OR variant_label ILIKE '%15 pcs%' THEN 15
  WHEN variant_label ILIKE '%20pcs%' OR variant_label ILIKE '%20 pcs%' THEN 20
  
  -- Handle small gram sizes
  WHEN variant_label ILIKE '%20g%' OR variant_label ILIKE '%20 g%' THEN 20
  WHEN variant_label ILIKE '%25g%' OR variant_label ILIKE '%25 g%' THEN 25
  WHEN variant_label ILIKE '%50g%' OR variant_label ILIKE '%50 g%' THEN 50
  WHEN variant_label ILIKE '%75g%' OR variant_label ILIKE '%75 g%' THEN 75
  
  -- Fallback: try to extract any number from the label
  ELSE COALESCE(
    (regexp_match(variant_label, '(\d+)', 'i'))[1]::integer,
    100  -- Default to 100g if no number found
  )
END
WHERE size_grams IS NULL;

-- Step 2: Verify no NULL values remain
DO $$
DECLARE
  null_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO null_count
  FROM product_variants
  WHERE size_grams IS NULL;
  
  IF null_count > 0 THEN
    RAISE EXCEPTION 'Cannot proceed: % variants still have NULL size_grams', null_count;
  END IF;
END $$;

-- Step 3: Drop the existing partial unique index
DROP INDEX IF EXISTS product_variants_product_id_size_grams_key;

-- Step 4: Add NOT NULL constraint to size_grams
ALTER TABLE product_variants 
ALTER COLUMN size_grams SET NOT NULL;

-- Step 5: Create a proper unique constraint (not a partial index)
-- This allows ON CONFLICT to work correctly
ALTER TABLE product_variants
ADD CONSTRAINT product_variants_product_id_size_grams_unique 
UNIQUE (product_id, size_grams);

-- Step 6: Verify the constraint was created successfully
DO $$
DECLARE
  constraint_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'product_variants_product_id_size_grams_unique'
  ) INTO constraint_exists;
  
  IF NOT constraint_exists THEN
    RAISE EXCEPTION 'Failed to create unique constraint';
  END IF;
  
  RAISE NOTICE 'Successfully created unique constraint on (product_id, size_grams)';
END $$;
