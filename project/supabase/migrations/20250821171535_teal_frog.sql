/*
  # Add Crisps & Sips Products

  1. New Categories
    - `saunf` - Fennel mixes and flavored varieties
    - `mukhwas` - Digestives and mouth fresheners
    - `papad` - Traditional crisps and crackers
    - `juices-drinks` - Refreshing beverages and drinks

  2. Products
    - 19 Saunf varieties
    - 11 Mukhwas varieties  
    - 30 Papad varieties
    - 54 Juices & Drinks varieties

  3. Security
    - All products follow existing RLS policies
    - Public read access, admin-only write access
*/

-- Insert Saunf (Fennel Mixes) products
INSERT INTO products (name, category, description, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES
('Sugar Coated Saunf Mix', 'saunf', 'Sweet sugar-coated fennel seeds perfect for after-meal refreshment', 120, 280, 520, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rainbow Colorful Saunf', 'saunf', 'Vibrant multi-colored fennel seeds with natural flavors', 150, 350, 650, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mint Flavored Saunf', 'saunf', 'Refreshing mint-flavored fennel seeds for cooling effect', 140, 320, 600, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Orange Flavored Saunf', 'saunf', 'Citrusy orange-flavored fennel seeds with zesty taste', 140, 320, 600, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Flavored Saunf', 'saunf', 'Aromatic rose-flavored fennel seeds with floral essence', 160, 370, 690, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chocolate Flavored Saunf', 'saunf', 'Rich chocolate-coated fennel seeds for sweet indulgence', 180, 420, 780, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Silver Coated Saunf', 'saunf', 'Premium silver-coated fennel seeds for special occasions', 200, 480, 900, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Meetha Pan Saunf', 'saunf', 'Traditional sweet paan-flavored fennel mix', 170, 390, 730, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kesar Saunf', 'saunf', 'Luxurious saffron-flavored fennel seeds with royal taste', 220, 520, 980, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Roasted Saunf Mix', 'saunf', 'Perfectly roasted fennel seeds with enhanced flavor', 130, 300, 560, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Madrasi Saunf', 'saunf', 'South Indian style spiced fennel mix', 140, 320, 600, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Khus Khus Saunf', 'saunf', 'Fennel seeds mixed with poppy seeds for unique taste', 160, 370, 690, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Jeera Saunf Mix', 'saunf', 'Cumin and fennel seed combination for digestive benefits', 150, 350, 650, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Elaichi Saunf', 'saunf', 'Cardamom-flavored fennel seeds with aromatic essence', 180, 420, 780, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Gulab Saunf', 'saunf', 'Rose-scented fennel seeds with traditional flavor', 160, 370, 690, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sada Saunf', 'saunf', 'Plain natural fennel seeds without any coating', 100, 230, 420, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Herbal Saunf Mix', 'saunf', 'Herbal blend of fennel with medicinal herbs', 190, 440, 820, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Ajwain Saunf', 'saunf', 'Carom seeds mixed with fennel for digestive properties', 140, 320, 600, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kesar Elaichi Saunf', 'saunf', 'Premium blend of saffron, cardamom and fennel', 250, 580, 1080, 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500', false);

-- Insert Mukhwas (Digestives & Mixes) products
INSERT INTO products (name, category, description, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES
('Til Mukhwas', 'mukhwas', 'Sesame seed mouth freshener with traditional spices', 130, 300, 560, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Coconut Mukhwas', 'mukhwas', 'Sweet coconut-based mouth freshener with aromatic spices', 150, 350, 650, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sweet Mix Mukhwas', 'mukhwas', 'Assorted sweet mouth freshener mix for after meals', 140, 320, 600, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Digestive Mukhwas', 'mukhwas', 'Specially blended digestive mouth freshener', 160, 370, 690, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Anardana Mukhwas', 'mukhwas', 'Pomegranate seed mouth freshener with tangy flavor', 170, 390, 730, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Tutti Frutti Mukhwas', 'mukhwas', 'Colorful tutti frutti mixed mouth freshener', 180, 420, 780, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Hing Peda Mukhwas', 'mukhwas', 'Asafoetida-flavored traditional mouth freshener', 150, 350, 650, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Calcutta Meetha Pan', 'mukhwas', 'Bengali-style sweet paan mouth freshener', 190, 440, 820, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Royal Silver Mukhwas', 'mukhwas', 'Premium silver-coated mouth freshener for special occasions', 220, 520, 980, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Black Salt Digestive Mukhwas', 'mukhwas', 'Black salt infused digestive mouth freshener', 140, 320, 600, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chocolate Coated Mukhwas', 'mukhwas', 'Rich chocolate-coated mouth freshener mix', 200, 480, 900, 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=500', false);

-- Insert Papad (Traditional Crisps) products
INSERT INTO products (name, category, description, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES
('Moong Dal Papad', 'papad', 'Traditional green gram lentil crispy papad', 80, 180, 320, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Urad Dal Papad', 'papad', 'Classic black gram lentil papad with authentic taste', 90, 200, 360, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Masala Papad', 'papad', 'Spiced papad with traditional Indian masala blend', 100, 220, 400, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Jeera Papad', 'papad', 'Cumin-flavored crispy papad with aromatic taste', 95, 210, 380, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kali Mirch Papad', 'papad', 'Black pepper infused papad with spicy kick', 100, 220, 400, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chana Dal Papad', 'papad', 'Bengal gram lentil papad with nutty flavor', 85, 190, 340, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Garlic Papad', 'papad', 'Garlic-flavored papad with strong aromatic taste', 110, 240, 440, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Onion Papad', 'papad', 'Onion-flavored crispy papad with sweet taste', 105, 230, 420, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Hing Papad', 'papad', 'Asafoetida-flavored papad with digestive properties', 95, 210, 380, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Green Chilli Papad', 'papad', 'Spicy green chilli papad with fiery taste', 100, 220, 400, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Red Chilli Papad', 'papad', 'Hot red chilli papad with intense spice', 100, 220, 400, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Punjabi Masala Papad', 'papad', 'North Indian style masala papad with rich spices', 120, 260, 480, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rajasthani Papad', 'papad', 'Traditional Rajasthani style papad with authentic flavor', 110, 240, 440, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Marwari Papad', 'papad', 'Marwari community special papad with unique taste', 115, 250, 460, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Plain Salted Papad', 'papad', 'Simple salted papad with classic taste', 75, 170, 300, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Ajwain Papad', 'papad', 'Carom seed papad with digestive benefits', 90, 200, 360, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Til Papad', 'papad', 'Sesame seed papad with nutty flavor', 95, 210, 380, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Multigrain Papad', 'papad', 'Healthy multigrain papad with mixed cereals', 130, 280, 520, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Palak Papad', 'papad', 'Spinach-flavored green papad with iron content', 120, 260, 480, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Tomato Papad', 'papad', 'Tomato-flavored papad with tangy taste', 110, 240, 440, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Beetroot Papad', 'papad', 'Beetroot-flavored colorful papad with natural sweetness', 125, 270, 500, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Carrot Papad', 'papad', 'Carrot-flavored orange papad with vitamin A', 120, 260, 480, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cabbage Papad', 'papad', 'Cabbage-flavored papad with crunchy texture', 115, 250, 460, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Methi Papad', 'papad', 'Fenugreek leaves papad with bitter-sweet taste', 110, 240, 440, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Nachni Papad', 'papad', 'Finger millet papad with high nutritional value', 140, 300, 560, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Besan Papad', 'papad', 'Gram flour papad with protein-rich content', 100, 220, 400, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Moong Chana Mix Papad', 'papad', 'Mixed lentil papad with green gram and chickpea', 105, 230, 420, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Dal Tadka Papad', 'papad', 'Tempered lentil papad with traditional tadka flavor', 115, 250, 460, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Pudina Papad', 'papad', 'Mint-flavored papad with cooling effect', 105, 230, 420, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sweet & Spicy Papad', 'papad', 'Perfect balance of sweet and spicy flavors', 120, 260, 480, 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500', false);

-- Insert Juices & Drinks products
INSERT INTO products (name, category, description, price_200g, price_500g, price_1kg, image_url, is_out_of_stock) VALUES
('Aam Panna', 'juices-drinks', 'Traditional raw mango drink with cooling spices', 60, 140, 250, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Jaljeera Drink', 'juices-drinks', 'Refreshing cumin water with mint and spices', 50, 120, 220, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Buttermilk Masala Chaas', 'juices-drinks', 'Spiced buttermilk with traditional Indian flavors', 45, 100, 180, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sweet Lassi', 'juices-drinks', 'Traditional sweet yogurt drink', 55, 130, 240, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Salted Lassi', 'juices-drinks', 'Savory yogurt drink with salt and spices', 50, 120, 220, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Lassi', 'juices-drinks', 'Aromatic rose-flavored yogurt drink', 65, 150, 280, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mango Lassi', 'juices-drinks', 'Creamy mango yogurt drink', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Badam Milk', 'juices-drinks', 'Rich almond milk with cardamom', 80, 180, 340, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Milk', 'juices-drinks', 'Fragrant rose-flavored milk drink', 60, 140, 260, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Elaichi Milk', 'juices-drinks', 'Cardamom-flavored aromatic milk', 65, 150, 280, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Thandai', 'juices-drinks', 'Traditional festival drink with nuts and spices', 90, 200, 380, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Masala Soda', 'juices-drinks', 'Spiced soda water with Indian masala', 40, 90, 160, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Lemon Jeera Soda', 'juices-drinks', 'Lemon cumin soda with refreshing taste', 45, 100, 180, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kala Khatta Drink', 'juices-drinks', 'Tangy black plum flavored drink', 50, 120, 220, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Orange Juice', 'juices-drinks', 'Fresh orange juice packed with vitamin C', 60, 140, 260, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mango Juice', 'juices-drinks', 'Sweet and pulpy mango juice', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Guava Juice', 'juices-drinks', 'Vitamin C rich guava juice', 55, 130, 240, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Pineapple Juice', 'juices-drinks', 'Tropical pineapple juice with natural sweetness', 65, 150, 280, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Apple Juice', 'juices-drinks', 'Fresh apple juice with natural flavor', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mixed Fruit Juice', 'juices-drinks', 'Blend of seasonal fruits in one glass', 75, 170, 320, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Sugarcane Juice', 'juices-drinks', 'Fresh sugarcane juice with natural sweetness', 40, 90, 160, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Coconut Water', 'juices-drinks', 'Natural coconut water with electrolytes', 50, 120, 220, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Tender Coconut Drink', 'juices-drinks', 'Fresh tender coconut water drink', 55, 130, 240, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Jamun Juice', 'juices-drinks', 'Antioxidant-rich black plum juice', 60, 140, 260, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Amla Juice', 'juices-drinks', 'Vitamin C packed Indian gooseberry juice', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Aloevera Juice', 'juices-drinks', 'Healthy aloe vera juice with natural benefits', 80, 180, 340, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Pomegranate Juice', 'juices-drinks', 'Antioxidant-rich pomegranate juice', 90, 200, 380, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Lychee Juice', 'juices-drinks', 'Exotic lychee fruit juice with sweet taste', 85, 190, 360, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Kiwi Juice', 'juices-drinks', 'Vitamin C rich kiwi fruit juice', 95, 210, 400, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Strawberry Juice', 'juices-drinks', 'Sweet and tangy strawberry juice', 90, 200, 380, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cold Coffee Shake', 'juices-drinks', 'Chilled coffee shake with ice cream', 80, 180, 340, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chocolate Milkshake', 'juices-drinks', 'Rich chocolate milkshake with whipped cream', 85, 190, 360, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Vanilla Milkshake', 'juices-drinks', 'Creamy vanilla milkshake with ice cream', 80, 180, 340, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Strawberry Milkshake', 'juices-drinks', 'Fresh strawberry milkshake with cream', 90, 200, 380, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Banana Shake', 'juices-drinks', 'Nutritious banana shake with milk', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mango Shake', 'juices-drinks', 'Thick mango shake with ice cream', 85, 190, 360, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Boba Tea Classic', 'juices-drinks', 'Traditional bubble tea with tapioca pearls', 100, 220, 420, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Brown Sugar Boba Tea', 'juices-drinks', 'Brown sugar flavored bubble tea', 110, 240, 460, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Matcha Boba Tea', 'juices-drinks', 'Green tea bubble tea with matcha flavor', 120, 260, 500, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Taro Boba Tea', 'juices-drinks', 'Purple taro flavored bubble tea', 115, 250, 480, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Strawberry Boba Tea', 'juices-drinks', 'Strawberry flavored bubble tea', 110, 240, 460, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Lychee Boba Tea', 'juices-drinks', 'Exotic lychee bubble tea', 115, 250, 480, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mango Boba Tea', 'juices-drinks', 'Tropical mango bubble tea', 110, 240, 460, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Coffee Boba Tea', 'juices-drinks', 'Coffee flavored bubble tea', 105, 230, 440, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Chocolate Boba Tea', 'juices-drinks', 'Rich chocolate bubble tea', 115, 250, 480, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Boba Tea', 'juices-drinks', 'Floral rose flavored bubble tea', 120, 260, 500, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Blueberry Boba Tea', 'juices-drinks', 'Antioxidant-rich blueberry bubble tea', 125, 270, 520, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Watermelon Juice Shake', 'juices-drinks', 'Refreshing watermelon juice shake', 60, 140, 260, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Green Tea Honey Lemon', 'juices-drinks', 'Healthy green tea with honey and lemon', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Iced Lemon Tea', 'juices-drinks', 'Chilled lemon tea with ice', 55, 130, 240, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Peach Iced Tea', 'juices-drinks', 'Fruity peach flavored iced tea', 65, 150, 280, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Rose Iced Tea', 'juices-drinks', 'Aromatic rose flavored iced tea', 70, 160, 300, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Mint Mojito Mocktail', 'juices-drinks', 'Refreshing mint mojito without alcohol', 75, 170, 320, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Virgin Pina Colada', 'juices-drinks', 'Tropical pineapple coconut mocktail', 90, 200, 380, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Virgin Margarita', 'juices-drinks', 'Tangy lime mocktail with salt rim', 80, 180, 340, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Aam Soda Masala', 'juices-drinks', 'Spiced mango soda with masala', 65, 150, 280, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Cold Brew Coffee', 'juices-drinks', 'Smooth cold brew coffee concentrate', 95, 210, 400, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Hazelnut Iced Coffee', 'juices-drinks', 'Nutty hazelnut flavored iced coffee', 100, 220, 420, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Caramel Iced Coffee', 'juices-drinks', 'Sweet caramel flavored iced coffee', 105, 230, 440, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false),
('Filter Coffee Classic', 'juices-drinks', 'Traditional South Indian filter coffee', 60, 140, 260, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=500', false);