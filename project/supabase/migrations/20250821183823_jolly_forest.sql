/*
  # Rename Products page to Dry Fruit Delights and add new products

  1. Clear existing products (except Crisps & Sips categories)
  2. Add new dry fruit products with automatic categorization
  3. Products categorized based on name patterns:
     - almonds: contains "Almond" or "Almonds"
     - cashews: contains "Cashew"
     - pista: contains "Pista"
     - kishmish: contains "Kishmish" or "Raisin"
     - elaichi: contains "Elaichi" or "Cardamom"
     - bites: contains "Bite" or "Barfi"
     - seeds: contains "Seed"
     - akhrot: contains "Akrot" or "Walnut"
     - dates: contains "Date"
     - chilgoza: contains "Chilgoza"
     - sun-dried-fruits: contains "Sundried"
     - apricots: contains "Apricot"
     - figs: contains "Fig" or "Anjeer"
     - miscellaneous: everything else
*/

-- Clear existing products (keep Crisps & Sips categories)
DELETE FROM products WHERE category NOT IN ('saunf', 'mukhwas', 'papad', 'juices-drinks');

-- Insert new dry fruit products with automatic categorization
INSERT INTO products (name, category, description, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES

-- Cashews Category
('Medium Cashews Delight(S4)', 'cashews', 'Premium medium-sized cashews with delightful taste and perfect crunch', 450, 1100, 2100, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Large Cashews Treat(S6)', 'cashews', 'Large premium cashews offering exceptional taste and nutrition', 520, 1250, 2400, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Extralarge Cashews Gold(S8)', 'cashews', 'Extra large golden cashews - the ultimate premium experience', 650, 1550, 2950, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Biscoff Cashews Magic', 'cashews', 'Cashews with magical Biscoff flavor coating for unique taste', 580, 1380, 2650, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kesar Pista Cashews Charm', 'cashews', 'Charming blend of cashews with kesar and pista flavoring', 620, 1480, 2850, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Honey Cinnamon Cashews Joy', 'cashews', 'Joyful combination of honey and cinnamon coated cashews', 590, 1420, 2720, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Cashews Bliss', 'cashews', 'Blissful rose-flavored cashews with aromatic essence', 570, 1370, 2620, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('BBQ Cashews Tandoor Style', 'cashews', 'Tandoor-style BBQ cashews with smoky barbecue flavor', 560, 1340, 2580, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Smoked Cashews Zest', 'cashews', 'Zesty smoked cashews with rich smoky flavor and aroma', 550, 1320, 2540, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Crispy Cashew Crackers', 'cashews', 'Crispy cashew crackers perfect for snacking anytime', 480, 1150, 2200, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Salted Cashews Classic', 'cashews', 'Classic salted cashews with perfect salt balance', 420, 1000, 1900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Green Masala Cashews', 'cashews', 'Green masala coated cashews with traditional spice blend', 540, 1290, 2480, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Korean Cashews Fusion', 'cashews', 'Fusion Korean-style cashews with unique Asian flavors', 600, 1440, 2760, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Black Pepper Cashews Kick', 'cashews', 'Cashews with a kick of black pepper for spice lovers', 530, 1270, 2440, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Peri Peri Cashews Fire', 'cashews', 'Fiery peri peri cashews with intense spicy flavor', 550, 1320, 2540, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chilli Garlic Cashews Punch', 'cashews', 'Punchy chilli garlic cashews with bold flavors', 540, 1290, 2480, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chocolate Cashews Indulgence', 'cashews', 'Indulgent chocolate-coated cashews for sweet cravings', 620, 1480, 2850, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mint Cashews Twist', 'cashews', 'Refreshing mint-flavored cashews with a cool twist', 560, 1340, 2580, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Salt & Pepper Cashews Duo', 'cashews', 'Perfect duo of salt and pepper seasoned cashews', 520, 1250, 2400, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Tandoori Masala Cashews Blaze', 'cashews', 'Blazing tandoori masala cashews with authentic spices', 570, 1370, 2620, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chilli Lemon Cashews Kick', 'cashews', 'Zesty chilli lemon cashews with tangy kick', 550, 1320, 2540, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Paan Flavoured Cashews Cool', 'cashews', 'Cool paan-flavored cashews with traditional taste', 580, 1380, 2650, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Hing Jeera Cashews Zest', 'cashews', 'Zesty hing jeera cashews with aromatic spice blend', 540, 1290, 2480, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Magic Masala Cashews Fun', 'cashews', 'Fun magic masala cashews with exciting flavor mix', 560, 1340, 2580, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Thai Sweet Chilli Cashews Fusion', 'cashews', 'Fusion Thai sweet chilli cashews with exotic taste', 590, 1420, 2720, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Jalapeno Cashews Spice', 'cashews', 'Spicy jalapeno cashews for heat lovers', 570, 1370, 2620, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cheese Cashews Temptation', 'cashews', 'Tempting cheese-flavored cashews with rich taste', 600, 1440, 2760, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Tomato Tang Cashews Pop', 'cashews', 'Popping tomato tang cashews with zesty flavor', 550, 1320, 2540, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Achari Cashews Punch', 'cashews', 'Punchy achari cashews with pickle spice blend', 560, 1340, 2580, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Coffee Cashews Buzz', 'cashews', 'Buzzing coffee-flavored cashews for energy boost', 580, 1380, 2650, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Butter Scotch Cashews Caramel', 'cashews', 'Caramel butterscotch cashews with sweet indulgence', 620, 1480, 2850, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Coconut Cashews Tropical', 'cashews', 'Tropical coconut cashews with exotic island flavor', 590, 1420, 2720, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Roasted Cashews Premium', 'cashews', 'Premium roasted cashews with perfect golden crunch', 480, 1150, 2200, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Almonds Category
('Chocolate Almonds Indulgence', 'almonds', 'Indulgent chocolate-coated almonds for sweet moments', 520, 1250, 2400, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Roasted Almonds Classic Crunch', 'almonds', 'Classic crunchy roasted almonds with perfect texture', 450, 1080, 2050, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Salted Almonds Perfection', 'almonds', 'Perfectly salted almonds with ideal flavor balance', 470, 1130, 2150, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('W240 Almonds Prime', 'almonds', 'Prime W240 grade almonds with superior quality', 580, 1390, 2650, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('W320 Almonds Select', 'almonds', 'Select W320 grade almonds with premium taste', 550, 1320, 2520, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('American Almonds Supreme', 'almonds', 'Supreme American almonds with exceptional quality', 620, 1490, 2850, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kesar Almonds Glow', 'almonds', 'Glowing kesar-flavored almonds with aromatic essence', 590, 1420, 2720, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Honey Almonds Golden', 'almonds', 'Golden honey-coated almonds with natural sweetness', 570, 1370, 2620, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Hing Jeera Almonds Twist', 'almonds', 'Twisted hing jeera almonds with traditional spices', 540, 1290, 2480, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chilli Almonds Kick', 'almonds', 'Spicy chilli almonds with fiery kick', 530, 1270, 2440, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Black Pepper Almonds Bold', 'almonds', 'Bold black pepper almonds with intense flavor', 540, 1290, 2480, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Peri Peri Almonds Fire', 'almonds', 'Fiery peri peri almonds with blazing taste', 550, 1320, 2540, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cheese Almonds Savory', 'almonds', 'Savory cheese-flavored almonds with rich taste', 580, 1380, 2650, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Choco Almond Rocks', 'almonds', 'Rocky chocolate almonds with crunchy texture', 600, 1440, 2760, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mango Almond Fusion', 'almonds', 'Fusion mango almonds with tropical flavor', 570, 1370, 2620, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cranberry Almond Delight', 'almonds', 'Delightful cranberry almonds with fruity taste', 590, 1420, 2720, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Strawberry Almond Bliss', 'almonds', 'Blissful strawberry almonds with sweet essence', 580, 1380, 2650, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Almond Elegance', 'almonds', 'Elegant rose almonds with floral aroma', 570, 1370, 2620, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Paan Almond Refresh', 'almonds', 'Refreshing paan almonds with traditional taste', 560, 1340, 2580, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Mamra Almonds Category
('Mamra Almonds Royalty', 'mamra-almonds', 'Royal mamra almonds with superior nutrition and taste', 750, 1800, 3450, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Kishmish Category
('Kishmish Raisins Sweet Treat', 'kishmish', 'Sweet treat kishmish raisins with natural sweetness', 320, 770, 1470, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Pista Category
('Premium Pista Delight', 'pista', 'Delightful premium pista with rich flavor', 680, 1630, 3120, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Salted Pistachios Crunch', 'pista', 'Crunchy salted pistachios with perfect seasoning', 650, 1560, 2980, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Salted Pistachios Premium', 'pista', 'Premium salted pistachios with superior quality', 670, 1610, 3080, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Elaichi Category
('Elaichi Cardamom Essence', 'elaichi', 'Pure cardamom essence with aromatic fragrance', 890, 2140, 4090, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Bites Category
('Cranberry Bites Bliss', 'bites', 'Blissful cranberry bites with fruity sweetness', 420, 1010, 1930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kiwi Bites Zing', 'bites', 'Zesty kiwi bites with tangy flavor', 450, 1080, 2060, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mango Bites Magic', 'bites', 'Magical mango bites with tropical taste', 430, 1030, 1970, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mixed Fruit bites', 'bites', 'Mixed fruit bites with variety of flavors', 440, 1060, 2020, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Strawberry Bites Joy', 'bites', 'Joyful strawberry bites with sweet essence', 460, 1100, 2100, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Apricot Glow Bites', 'bites', 'Glowing apricot bites with natural sweetness', 480, 1150, 2200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Almond Bites Crunch', 'bites', 'Crunchy almond bites with nutty flavor', 520, 1250, 2400, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cashew Bites Joy', 'bites', 'Joyful cashew bites with creamy texture', 540, 1290, 2480, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Nutty Fruit Bites Fusion', 'bites', 'Fusion nutty fruit bites with mixed flavors', 490, 1180, 2250, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Protein Nut Bites Boost', 'bites', 'Boosting protein nut bites for energy', 550, 1320, 2520, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Pista Bites Bliss', 'bites', 'Blissful pista bites with rich flavor', 620, 1490, 2850, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Walnut Bites Crunch', 'bites', 'Crunchy walnut bites with brain-boosting nutrition', 580, 1390, 2660, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Apricot Bites Chew', 'bites', 'Chewy apricot bites with natural sweetness', 470, 1130, 2160, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Anjeer Bites Delight', 'bites', 'Delightful anjeer bites with rich taste', 590, 1420, 2720, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Raisin Bites Sweetness', 'bites', 'Sweet raisin bites with natural flavor', 380, 910, 1740, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Seeds Category
('Flax Seeds', 'seeds', 'Nutritious flax seeds packed with omega-3 fatty acids', 180, 430, 820, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Pumpkin Seeds Crunch', 'seeds', 'Crunchy pumpkin seeds with nutty flavor', 320, 770, 1470, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sunflower Seeds Vitality', 'seeds', 'Vital sunflower seeds with energy-boosting properties', 250, 600, 1150, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Watermelon Seeds Freshness', 'seeds', 'Fresh watermelon seeds with cooling properties', 280, 670, 1280, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Akhrot Category
('Walnut Brain Boost', 'akhrot', 'Brain-boosting walnuts with omega-3 richness', 720, 1730, 3310, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Figs Category
('Figs Richness', 'figs', 'Rich figs with natural sweetness and nutrition', 650, 1560, 2980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Dates Category
('Dates Medjool Premium', 'dates', 'Premium Medjool dates with exceptional sweetness', 890, 2140, 4090, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Khajur Delight Sweet', 'dates', 'Sweet khajur delight with traditional taste', 420, 1010, 1930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Safawi Dates Royal', 'dates', 'Royal Safawi dates with rich flavor', 780, 1870, 3580, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mabroom Dates Luxury', 'dates', 'Luxury Mabroom dates with premium quality', 820, 1970, 3770, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Ajwa Dates Sacred', 'dates', 'Sacred Ajwa dates with spiritual significance', 950, 2280, 4360, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kimia Dates Classic', 'dates', 'Classic Kimia dates with traditional flavor', 680, 1630, 3120, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Chilgoza Category
('Pine Nut Prestige', 'chilgoza', 'Prestigious pine nuts with exotic flavor', 1200, 2880, 5510, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Sun-Dried Fruits Category
('Sundried Lemon Zest', 'sun-dried-fruits', 'Zesty sundried lemon with tangy flavor', 380, 910, 1740, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Cranberry Bliss', 'sun-dried-fruits', 'Blissful sundried cranberry with sweet-tart taste', 420, 1010, 1930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Pineapple Punch', 'sun-dried-fruits', 'Punchy sundried pineapple with tropical flavor', 450, 1080, 2060, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Strawberry Magic', 'sun-dried-fruits', 'Magical sundried strawberry with concentrated sweetness', 480, 1150, 2200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Black Grapes Essence', 'sun-dried-fruits', 'Essential sundried black grapes with rich flavor', 390, 940, 1790, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Amla Power', 'sun-dried-fruits', 'Powerful sundried amla with vitamin C richness', 350, 840, 1600, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Blueberry Joy', 'sun-dried-fruits', 'Joyful sundried blueberry with antioxidant power', 520, 1250, 2400, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Black Raisins Treat', 'sun-dried-fruits', 'Treating sundried black raisins with natural sweetness', 340, 820, 1560, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Green Raisins Sweetness', 'sun-dried-fruits', 'Sweet sundried green raisins with delicate flavor', 360, 860, 1640, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Black Plum Energy', 'sun-dried-fruits', 'Energizing sundried black plum with rich taste', 410, 980, 1870, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Mango Chews', 'sun-dried-fruits', 'Chewy sundried mango with tropical sweetness', 460, 1100, 2100, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Kiwi Zest', 'sun-dried-fruits', 'Zesty sundried kiwi with tangy-sweet flavor', 490, 1180, 2250, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Apple Crunch', 'sun-dried-fruits', 'Crunchy sundried apple with natural sweetness', 370, 890, 1700, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Cherries Spark', 'sun-dried-fruits', 'Sparkling sundried cherries with vibrant flavor', 550, 1320, 2520, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Gooseberry Vitality', 'sun-dried-fruits', 'Vital sundried gooseberry with health benefits', 380, 910, 1740, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Orange Zing', 'sun-dried-fruits', 'Zinging sundried orange with citrus burst', 400, 960, 1830, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Mix Delight', 'sun-dried-fruits', 'Delightful sundried mix with variety of fruits', 440, 1060, 2020, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Papaya Bites', 'sun-dried-fruits', 'Bite-sized sundried papaya with tropical taste', 430, 1030, 1970, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Jamun Burst', 'sun-dried-fruits', 'Bursting sundried jamun with unique flavor', 420, 1010, 1930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Coconut Treat', 'sun-dried-fruits', 'Treating sundried coconut with tropical essence', 350, 840, 1600, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Dates Royal', 'sun-dried-fruits', 'Royal sundried dates with concentrated sweetness', 480, 1150, 2200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sundried Talmakhana Pop', 'sun-dried-fruits', 'Popping sundried talmakhana with unique texture', 390, 940, 1790, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),

-- Miscellaneous Category
('Paan Shots Refresh', 'miscellaneous', 'Refreshing paan shots with traditional flavor', 320, 770, 1470, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chocolate Dip Nuts Treat', 'miscellaneous', 'Treating chocolate dip nuts with sweet coating', 580, 1390, 2660, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Misri Delight Sparkle', 'miscellaneous', 'Sparkling misri delight with crystalline sweetness', 280, 670, 1280, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Panch Ratan Mix Treasure', 'miscellaneous', 'Treasured panch ratan mix with five precious ingredients', 520, 1250, 2400, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Special Mix Celebration', 'miscellaneous', 'Celebratory special mix with festive flavors', 480, 1150, 2200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Diet Mix Balance', 'miscellaneous', 'Balanced diet mix for healthy lifestyle', 450, 1080, 2060, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Royal Mix Luxury', 'miscellaneous', 'Luxurious royal mix with premium ingredients', 650, 1560, 2980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Dry Fruit Mix Fusion', 'miscellaneous', 'Fusion dry fruit mix with variety of flavors', 520, 1250, 2400, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Protein Mix Strength', 'miscellaneous', 'Strengthening protein mix for fitness enthusiasts', 580, 1390, 2660, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Healthy Mix Everyday', 'miscellaneous', 'Everyday healthy mix for daily nutrition', 420, 1010, 1930, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Royal Nutty Mix Treat', 'miscellaneous', 'Treating royal nutty mix with premium nuts', 590, 1420, 2720, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Choco Nut Fusion', 'miscellaneous', 'Fusion choco nut with chocolate and nut combination', 620, 1490, 2850, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Healthy Nutty Mix', 'miscellaneous', 'Healthy nutty mix with nutritious ingredients', 480, 1150, 2200, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false);