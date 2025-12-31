/*
  # Add product name visibility to variants table

  1. Create a view that shows product variants with product names
  2. This will make it easier to see product names alongside variants in Supabase dashboard
*/

-- Create a view that joins product_variants with products to show product names
CREATE OR REPLACE VIEW product_variants_with_names AS
SELECT 
  pv.id,
  pv.product_id,
  p.name as product_name,
  pv.variant_label,
  pv.price,
  pv.created_at,
  p.category,
  p.page
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
ORDER BY p.name, pv.variant_label;

-- Grant access to the view
GRANT SELECT ON product_variants_with_names TO authenticated;
GRANT SELECT ON product_variants_with_names TO anon;

-- Create RLS policy for the view
ALTER VIEW product_variants_with_names OWNER TO postgres;