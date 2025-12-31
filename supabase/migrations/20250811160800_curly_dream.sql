/*
  # Complete Product Database Refresh

  1. Delete all existing products except gift-boxes category
  2. Add all new products with proper categorization
  3. Create categories based on product name keywords
  4. Set consistent pricing structure
  5. Add placeholder images for all products
*/

-- First, delete all existing products except gift-boxes
DELETE FROM products WHERE category != 'gift-boxes';

-- Insert all new products with auto-detected categories and proper pricing
INSERT INTO products (name, category, description, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES

-- CASHEWS (KAJU products)
('KAJU KNS2', 'cashews', 'Premium cashews with special KNS2 flavor coating', 200, 500, 900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KNS4', 'cashews', 'Premium cashews with special KNS4 flavor coating', 200, 500, 900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KNS6', 'cashews', 'Premium cashews with special KNS6 flavor coating', 200, 500, 900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KNS8', 'cashews', 'Premium cashews with special KNS8 flavor coating', 200, 500, 900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KNBISCOF', 'cashews', 'Cashews with delicious Biscoff flavor coating', 220, 520, 920, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KNKESAR PISTA', 'cashews', 'Premium cashews with saffron and pistachio flavor', 250, 550, 950, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN HONEY-DALCHINI', 'cashews', 'Cashews coated with honey and cinnamon', 230, 530, 930, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN ROSE', 'cashews', 'Cashews with aromatic rose flavor coating', 220, 520, 920, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN BBQ', 'cashews', 'Cashews with smoky BBQ flavor coating', 210, 510, 910, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN SMOKE', 'cashews', 'Cashews with rich smoky flavor', 210, 510, 910, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN CRAKERS', 'cashews', 'Cashews with crackers flavor coating', 200, 500, 900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN SALTED', 'cashews', 'Premium salted cashews', 190, 490, 890, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN GREEN PAKODI', 'cashews', 'Cashews with green pakodi flavor', 220, 520, 920, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN KOREAN', 'cashews', 'Cashews with Korean flavor coating', 240, 540, 940, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN BLACK PEPPER', 'cashews', 'Cashews with black pepper seasoning', 210, 510, 910, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN PERI PERI MASALA', 'cashews', 'Cashews with spicy peri peri masala', 220, 520, 920, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KAJU KN CHILLI GARLIC', 'cashews', 'Cashews with chilli garlic flavor', 210, 510, 910, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- ALMONDS (ALMOND products)
('ALMOND KN BOURNVITA', 'almonds', 'Almonds with Bournvita chocolate coating', 250, 550, 950, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN CHOCODIP', 'almonds', 'Almonds dipped in rich chocolate', 260, 560, 960, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN GEMS', 'almonds', 'Almonds with colorful gems coating', 270, 570, 970, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN TIRAMISU', 'almonds', 'Almonds with tiramisu flavor coating', 280, 580, 980, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN HONEY TIL', 'almonds', 'Almonds with honey and sesame coating', 240, 540, 940, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN SMOKE', 'almonds', 'Almonds with smoky flavor', 230, 530, 930, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN MASSALA', 'almonds', 'Almonds with spicy masala coating', 220, 520, 920, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND ROASTED', 'almonds', 'Premium roasted almonds', 200, 500, 900, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND KN PIZZA', 'almonds', 'Almonds with pizza flavor coating', 240, 540, 940, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND AMERICAN NORMAL', 'almonds', 'Premium American almonds', 300, 600, 1000, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND AMERICAN SANORA', 'almonds', 'Premium Sanora American almonds', 320, 620, 1020, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND HATH FOR', 'almonds', 'Premium hand-picked almonds', 280, 580, 980, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND IRANI MAMRA', 'almonds', 'Premium Iranian Mamra almonds', 400, 800, 1200, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND IN SHELL SATTAR', 'almonds', 'Premium in-shell Sattar almonds', 250, 550, 950, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ALMOND IN SHELL IRANI', 'almonds', 'Premium in-shell Iranian almonds', 280, 580, 980, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- MAMRA ALMONDS (BADAM MAMRA products)
('BADAM MAMRA KN SMALL', 'mamra-almonds', 'Small size premium Mamra almonds', 350, 750, 1150, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BADAM MAMRA KN MEDIUM', 'mamra-almonds', 'Medium size premium Mamra almonds', 380, 780, 1180, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BADAM MAMRA KN BOLD', 'mamra-almonds', 'Bold size premium Mamra almonds', 420, 820, 1220, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BADAM MAMRA BROKEN', 'mamra-almonds', 'Broken premium Mamra almonds', 300, 700, 1100, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- KISHMISH/RAISINS (KISHMISH products)
('KISHMISH KN KALA KHATTA', 'kishmish', 'Raisins with tangy kala khatta flavor', 180, 480, 880, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KISHMISH KN MIXED FRUITS', 'kishmish', 'Raisins with mixed fruits flavor', 190, 490, 890, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KISHMISH KN ELAICHI', 'kishmish', 'Raisins with cardamom flavor', 200, 500, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KISHMISH KANDHARI', 'kishmish', 'Premium Kandhari raisins', 220, 520, 920, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KISHMISH KN SINDUKHANI', 'kishmish', 'Premium Sindukhani raisins', 210, 510, 910, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KISHMISH COFFIE KN SPECIAL', 'kishmish', 'Special coffee flavored raisins', 230, 530, 930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- PISTA/PISTACHIOS (PISTA products)
('PISTA KN SALTED', 'pista', 'Premium salted pistachios', 400, 800, 1200, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('PISTA KN PERI PERI', 'pista', 'Pistachios with peri peri seasoning', 420, 820, 1220, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('PISTA KN BLACK PEPPER', 'pista', 'Pistachios with black pepper seasoning', 410, 810, 1210, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- ELAICHI/CARDAMOM (ELAICHI products)
('ELAICHI KN SILVER', 'elaichi', 'Premium silver cardamom', 800, 1600, 2400, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ELAICHI KN GOLDEN', 'elaichi', 'Premium golden cardamom', 750, 1550, 2350, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ELAICHI KN DANA SILVER', 'elaichi', 'Premium silver cardamom seeds', 850, 1650, 2450, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- BITES (BITES/BITS products)
('BITES KN CRANBERY', 'bites', 'Delicious cranberry bites', 250, 550, 950, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BITES KN KIWI', 'bites', 'Sweet and tangy kiwi bites', 260, 560, 960, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BITES KN MANGO', 'bites', 'Tropical mango flavor bites', 240, 540, 940, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BITES KN MIXED FRUITS', 'bites', 'Mixed fruits flavor bites', 250, 550, 950, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BITES KN ORIO', 'bites', 'Oreo flavor bites', 270, 570, 970, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BITE ALMOND BRITTLE', 'bites', 'Crunchy almond brittle bites', 280, 580, 980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BITS N FIVE MIX', 'bites', 'Five different flavors mixed bits', 260, 560, 960, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- SEEDS (SEEDS products)
('SEEDS KN FLEX ROASTED', 'seeds', 'Roasted flax seeds', 150, 450, 850, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN PUMPKIN ROASTED', 'seeds', 'Roasted pumpkin seeds', 180, 480, 880, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN MUSKMELON', 'seeds', 'Premium muskmelon seeds', 160, 460, 860, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN CHIA', 'seeds', 'Premium chia seeds', 200, 500, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN BASIL', 'seeds', 'Premium basil seeds', 180, 480, 880, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN SUNFLAWER', 'seeds', 'Premium sunflower seeds', 140, 440, 840, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN WATER MELON', 'seeds', 'Premium watermelon seeds', 150, 450, 850, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SEEDS KN QUEINUA', 'seeds', 'Premium quinoa seeds', 220, 520, 920, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- AKHROT/WALNUTS (AKHROT products)
('AKHROTE KN KARNAL BIG SIXE', 'akhrot', 'Big size Karnal walnuts', 350, 750, 1150, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('AKHROTE KN KERNEL REGULAR', 'akhrot', 'Regular walnut kernels', 320, 720, 1120, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('AKHROT GIRI VACUUMED', 'akhrot', 'Vacuum packed walnut kernels', 340, 740, 1140, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('AKHROT GOTA SPECIAL', 'akhrot', 'Special whole walnuts', 330, 730, 1130, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- DATES (DATES products)
('DRY DATES (CHUHARA)', 'dates', 'Premium dry dates', 200, 500, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('MEDJOOL DATES', 'dates', 'Premium Medjool dates', 400, 800, 1200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('AZMAH DATES', 'dates', 'Premium Azmah dates', 350, 750, 1150, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KIMIA DATES', 'dates', 'Premium Kimia dates', 380, 780, 1180, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('DATES FRAD', 'dates', 'Premium Frad dates', 320, 720, 1120, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- CHILGOZA/PINE NUTS (CHILGOZA products)
('CHILGOZA(PINENUTS)KN NOJA WHOLE', 'chilgoza', 'Whole pine nuts premium quality', 800, 1600, 2400, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('CHILGOZA (PINENUTS)SKINLESS', 'chilgoza', 'Skinless pine nuts premium quality', 850, 1650, 2450, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- APRICOTS (KHURMANI products)
('KHURMANI (APRICOTS DRY)', 'apricots', 'Premium dry apricots', 300, 600, 1000, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- FIGS (ANJEER products)
('ANJEER (FIGS) KN SPECIAL BOLD', 'figs', 'Special bold figs premium quality', 400, 800, 1200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ANJEER (FIGS)KN REGULAR', 'figs', 'Regular figs premium quality', 350, 750, 1150, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('ANJEER KN SPECIAL DRY WHOLE', 'figs', 'Special dry whole figs', 380, 780, 1180, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL ANJEER (FIGS) MIXED', 'figs', 'Special mixed figs variety', 420, 820, 1220, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- SUN-DRIED FRUITS (SUNDRIED products)
('SUNDRIED BABY LEMON', 'sun-dried-fruits', 'Sun-dried baby lemons', 250, 550, 950, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUN DRIED BLACK BERRYES', 'sun-dried-fruits', 'Sun-dried black berries', 300, 600, 1000, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED BLACK PLUM', 'sun-dried-fruits', 'Sun-dried black plums', 280, 580, 980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED BLUEBERRIES', 'sun-dried-fruits', 'Sun-dried blueberries', 350, 750, 1150, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED CHERRY SPECIAL', 'sun-dried-fruits', 'Special sun-dried cherries', 400, 800, 1200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED BABY TOMATO', 'sun-dried-fruits', 'Sun-dried baby tomatoes', 220, 520, 920, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED DICED CRANBERRY', 'sun-dried-fruits', 'Diced sun-dried cranberries', 320, 720, 1120, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED WHOLE CRANBERRY', 'sun-dried-fruits', 'Whole sun-dried cranberries', 340, 740, 1140, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED DATE PLUMS', 'sun-dried-fruits', 'Sun-dried date plums', 290, 590, 990, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED BLUEBERRY PLUM', 'sun-dried-fruits', 'Sun-dried blueberry plums', 310, 610, 1010, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED CHERRY PLUM', 'sun-dried-fruits', 'Sun-dried cherry plums', 300, 600, 1000, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED FRUITS COCKTAILS', 'sun-dried-fruits', 'Mixed sun-dried fruits cocktail', 280, 580, 980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED GINGER SLICED', 'sun-dried-fruits', 'Sliced sun-dried ginger', 200, 500, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED GINGER CUBS', 'sun-dried-fruits', 'Cubed sun-dried ginger', 210, 510, 910, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED GOLDEN BERRY', 'sun-dried-fruits', 'Sun-dried golden berries', 380, 780, 1180, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED GUAVA', 'sun-dried-fruits', 'Sun-dried guava pieces', 240, 540, 940, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED KIWI SPECIAL', 'sun-dried-fruits', 'Special sun-dried kiwi', 360, 760, 1160, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED MANGO FRUITS', 'sun-dried-fruits', 'Sun-dried mango pieces', 250, 550, 950, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED MIX BERRIES KALA KHATTA', 'sun-dried-fruits', 'Mixed berries with kala khatta flavor', 320, 720, 1120, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED PAPAYA STICKS', 'sun-dried-fruits', 'Sun-dried papaya sticks', 230, 530, 930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED PEACH GREEN', 'sun-dried-fruits', 'Green sun-dried peaches', 270, 570, 970, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED PINEAPPLE DICED', 'sun-dried-fruits', 'Diced sun-dried pineapple', 260, 560, 960, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED PINEAPPLE COIN', 'sun-dried-fruits', 'Coin-shaped sun-dried pineapple', 270, 570, 970, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED ROSE BERRY PLUM', 'sun-dried-fruits', 'Sun-dried rose berry plums', 330, 730, 1130, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('SUNDRIED STRAWBERRY SPECIAL', 'sun-dried-fruits', 'Special sun-dried strawberries', 380, 780, 1180, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- MISCELLANEOUS/SPECIALS (KN SPECIAL, MISRI, and other products)
('NUTTY CHOCODIP KN SPECIAL', 'miscellaneous', 'Special chocolate dipped nuts', 300, 600, 1000, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL PAAN SHOTS', 'miscellaneous', 'Special paan flavored shots', 250, 550, 950, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('MISRI CANDY BLUBERI', 'miscellaneous', 'Blueberry flavored misri candy', 180, 480, 880, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('MISRI CANDY GOLDEN', 'miscellaneous', 'Golden misri candy', 170, 470, 870, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('MISRI CANDY SILVER', 'miscellaneous', 'Silver misri candy', 180, 480, 880, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('MISRI CANDY KESAR', 'miscellaneous', 'Saffron flavored misri candy', 200, 500, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL ALMOND MIX PATELS', 'miscellaneous', 'Special almond mix patels', 280, 580, 980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL BADAM MOUTH FRESNERS', 'miscellaneous', 'Special almond mouth fresheners', 220, 520, 920, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL BREAKFAST KHATTA MITHA', 'miscellaneous', 'Special breakfast khatta mitha mix', 200, 500, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL HEALTHY MIX', 'miscellaneous', 'Special healthy nuts and seeds mix', 250, 550, 950, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL PINKSALT DRY FRUITS MIX', 'miscellaneous', 'Pink salt dry fruits mix', 280, 580, 980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL MIX PANCH RATAN', 'miscellaneous', 'Special panch ratan mix', 300, 600, 1000, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL MIXED 5 SEEDS', 'miscellaneous', 'Special mixed 5 seeds', 180, 480, 880, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL TIGER NUTS', 'miscellaneous', 'Special tiger nuts', 320, 720, 1120, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('GUTT (NARIAL) WHOLE', 'miscellaneous', 'Whole coconut pieces', 150, 450, 850, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('TALMAKHANA CHHAPPAN BOG', 'miscellaneous', 'Premium talmakhana chhappan bog', 400, 800, 1200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('TALMAKHANA KN SPECIAL BOLD SIZE', 'miscellaneous', 'Special bold size talmakhana', 450, 850, 1250, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('KN SPECIAL PRUNES', 'miscellaneous', 'Special premium prunes', 300, 600, 1000, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false);