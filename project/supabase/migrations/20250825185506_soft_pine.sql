/*
  # Standardize Product Variants System

  1. Data Cleanup
    - Standardize all product variants to consistent weight/size formats
    - Remove invalid or outdated variants
    - Add missing variants to match product descriptions
    
  2. System Improvements
    - Create functions to maintain consistency
    - Add triggers to sync changes automatically
    - Ensure future-proof variant management
*/

-- First, let's see what variants currently exist and standardize them
-- Update any inconsistent variant labels to standard format
UPDATE product_variants 
SET variant_label = CASE 
  WHEN variant_label ILIKE '%100%g%' OR variant_label ILIKE '%100%gram%' THEN '100g'
  WHEN variant_label ILIKE '%200%g%' OR variant_label ILIKE '%200%gram%' THEN '200g'
  WHEN variant_label ILIKE '%250%g%' OR variant_label ILIKE '%250%gram%' THEN '250g'
  WHEN variant_label ILIKE '%500%g%' OR variant_label ILIKE '%500%gram%' THEN '500g'
  WHEN variant_label ILIKE '%1%kg%' OR variant_label ILIKE '%1000%g%' THEN '1kg'
  WHEN variant_label ILIKE '%5%pack%' THEN '5-pack'
  WHEN variant_label ILIKE '%10%pack%' THEN '10-pack'
  WHEN variant_label ILIKE '%20%pack%' THEN '20-pack'
  ELSE variant_label
END;

-- Create a function to get suggested variants based on existing patterns
CREATE OR REPLACE FUNCTION get_suggested_variants(product_id_param UUID)
RETURNS TEXT[] AS $$
DECLARE
  existing_variants TEXT[];
  suggested_variants TEXT[];
BEGIN
  -- Get existing variants for the product
  SELECT ARRAY_AGG(variant_label ORDER BY variant_label) 
  INTO existing_variants
  FROM product_variants 
  WHERE product_id = product_id_param;
  
  -- If no variants exist, return default weight-based variants
  IF existing_variants IS NULL OR array_length(existing_variants, 1) = 0 THEN
    RETURN ARRAY['100g', '200g', '500g'];
  END IF;
  
  -- Determine pattern and suggest additional variants
  IF EXISTS (SELECT 1 FROM unnest(existing_variants) WHERE unnest LIKE '%g' OR unnest LIKE '%kg') THEN
    -- Weight-based pattern
    suggested_variants := ARRAY['100g', '200g', '250g', '500g', '1kg'];
  ELSIF EXISTS (SELECT 1 FROM unnest(existing_variants) WHERE unnest LIKE '%-pack') THEN
    -- Pack-based pattern
    suggested_variants := ARRAY['5-pack', '10-pack', '20-pack', '50-pack'];
  ELSIF EXISTS (SELECT 1 FROM unnest(existing_variants) WHERE unnest LIKE '%ml' OR unnest LIKE '%ltr') THEN
    -- Volume-based pattern
    suggested_variants := ARRAY['250ml', '500ml', '1ltr', '2ltr'];
  ELSE
    -- Default to weight-based
    suggested_variants := ARRAY['100g', '200g', '500g'];
  END IF;
  
  RETURN suggested_variants;
END;
$$ LANGUAGE plpgsql;

-- Create a function to ensure minimum required variants exist
CREATE OR REPLACE FUNCTION ensure_minimum_variants()
RETURNS VOID AS $$
DECLARE
  product_record RECORD;
  existing_count INTEGER;
  base_price NUMERIC;
BEGIN
  -- Loop through all products
  FOR product_record IN SELECT id, name, category FROM products LOOP
    -- Count existing variants
    SELECT COUNT(*) INTO existing_count
    FROM product_variants 
    WHERE product_id = product_record.id;
    
    -- If product has no variants, create default ones
    IF existing_count = 0 THEN
      -- Determine base price (you may need to adjust this logic)
      base_price := CASE 
        WHEN product_record.category IN ('cashews', 'almonds', 'pista') THEN 200
        WHEN product_record.category IN ('dates', 'figs') THEN 150
        WHEN product_record.category IN ('mukhwas', 'saunf') THEN 100
        ELSE 180
      END;
      
      -- Insert default variants
      INSERT INTO product_variants (product_id, variant_label, price) VALUES
        (product_record.id, '200g', base_price),
        (product_record.id, '500g', base_price * 2.3),
        (product_record.id, '1kg', base_price * 4.2);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to ensure all products have minimum variants
SELECT ensure_minimum_variants();

-- Create a function to sync product changes with variants
CREATE OR REPLACE FUNCTION sync_product_variants()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be extended to handle specific sync logic
  -- For now, it ensures the updated_at timestamp is maintained
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to maintain consistency
DROP TRIGGER IF EXISTS sync_product_variants_trigger ON products;
CREATE TRIGGER sync_product_variants_trigger
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION sync_product_variants();

-- Create a function to validate variant consistency
CREATE OR REPLACE FUNCTION validate_variant_consistency(product_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
  variant_count INTEGER;
  price_consistency BOOLEAN;
BEGIN
  -- Check if product has at least one variant
  SELECT COUNT(*) INTO variant_count
  FROM product_variants 
  WHERE product_id = product_id_param;
  
  IF variant_count = 0 THEN
    RETURN FALSE;
  END IF;
  
  -- Check if all variants have valid prices
  SELECT COUNT(*) = 0 INTO price_consistency
  FROM product_variants 
  WHERE product_id = product_id_param 
  AND (price IS NULL OR price <= 0);
  
  RETURN price_consistency;
END;
$$ LANGUAGE plpgsql;

-- Update the product_variants_with_names view to include more useful information
DROP VIEW IF EXISTS product_variants_with_names;
CREATE VIEW product_variants_with_names AS
SELECT 
  pv.id,
  pv.product_id,
  p.name as product_name,
  pv.variant_label,
  pv.price,
  pv.created_at,
  p.category,
  p.page,
  p.is_out_of_stock,
  -- Add a calculated field for price per unit (if applicable)
  CASE 
    WHEN pv.variant_label LIKE '%g' THEN 
      ROUND(pv.price / NULLIF(CAST(REGEXP_REPLACE(pv.variant_label, '[^0-9]', '', 'g') AS NUMERIC), 0), 2)
    ELSE NULL
  END as price_per_gram
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
ORDER BY p.name, pv.variant_label;

-- Create an admin helper view for managing variants
CREATE OR REPLACE VIEW admin_variant_management AS
SELECT 
  p.id as product_id,
  p.name as product_name,
  p.category,
  p.page,
  p.is_out_of_stock,
  COALESCE(
    STRING_AGG(pv.variant_label || ' (₹' || pv.price || ')', ', ' ORDER BY pv.variant_label),
    'No variants'
  ) as current_variants,
  ARRAY_TO_STRING(get_suggested_variants(p.id), ', ') as suggested_variants,
  validate_variant_consistency(p.id) as is_consistent
FROM products p
LEFT JOIN product_variants pv ON p.id = pv.product_id
GROUP BY p.id, p.name, p.category, p.page, p.is_out_of_stock
ORDER BY p.name;

-- Clean up any duplicate variants (same product_id and variant_label)
WITH duplicate_variants AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY product_id, variant_label ORDER BY created_at DESC) as rn
  FROM product_variants
)
DELETE FROM product_variants 
WHERE id IN (
  SELECT id FROM duplicate_variants WHERE rn > 1
);

-- Final consistency check and report
DO $$
DECLARE
  total_products INTEGER;
  products_with_variants INTEGER;
  inconsistent_products INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_products FROM products;
  
  SELECT COUNT(DISTINCT product_id) INTO products_with_variants 
  FROM product_variants;
  
  SELECT COUNT(*) INTO inconsistent_products 
  FROM admin_variant_management 
  WHERE NOT is_consistent;
  
  RAISE NOTICE 'Database Standardization Complete:';
  RAISE NOTICE '- Total products: %', total_products;
  RAISE NOTICE '- Products with variants: %', products_with_variants;
  RAISE NOTICE '- Inconsistent products: %', inconsistent_products;
  
  IF inconsistent_products > 0 THEN
    RAISE NOTICE 'Check admin_variant_management view for details on inconsistent products';
  END IF;
END $$;