/*
  # Add Gift Box Products

  1. New Products
    - Add 7 new gift box products to the products table
    - Each product includes name, description, category, pricing for all weights, and image URL
    - All products are marked as in stock by default

  2. Product Details
    - Premium gift box collections with festive themes
    - Pricing structure for 200g, 500g, and 1kg variants
    - High-quality placeholder images from Pexels
    - Detailed descriptions for each gift box
*/

-- Insert 7 new gift box products
INSERT INTO products (name, description, category, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES
(
  'Festive Celebration Gift Box',
  'A beautiful collection of premium mixed nuts perfect for festivals and celebrations. Contains almonds, cashews, pistachios, and dates in an elegant wooden box.',
  'gift-boxes',
  899,
  1899,
  3499,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
),
(
  'Royal Wedding Gift Collection',
  'Luxurious gift box featuring the finest selection of dry fruits and nuts, beautifully packaged for weddings and special occasions.',
  'gift-boxes',
  1299,
  2799,
  4999,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
),
(
  'Corporate Diwali Hamper',
  'Professional gift hamper perfect for corporate gifting during Diwali. Contains premium nuts, sweets, and traditional treats.',
  'gift-boxes',
  1599,
  3299,
  5999,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
),
(
  'Health & Wellness Gift Set',
  'Curated selection of nutritious dry fruits and nuts promoting health and wellness. Perfect for health-conscious individuals.',
  'gift-boxes',
  799,
  1699,
  3199,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
),
(
  'Premium Assorted Nuts Hamper',
  'Elegant hamper containing the finest quality almonds, cashews, walnuts, and pistachios in premium packaging.',
  'gift-boxes',
  1099,
  2399,
  4299,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
),
(
  'Traditional Indian Sweets & Nuts Box',
  'Perfect blend of traditional Indian sweets and premium dry fruits, ideal for festivals and family gatherings.',
  'gift-boxes',
  999,
  2199,
  3999,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
),
(
  'Executive Gift Collection',
  'Sophisticated gift collection designed for executives and business professionals. Premium packaging with finest quality nuts.',
  'gift-boxes',
  1799,
  3799,
  6999,
  'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=500',
  false
);