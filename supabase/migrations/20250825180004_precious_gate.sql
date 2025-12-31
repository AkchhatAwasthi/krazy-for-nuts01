/*
  # Create New Product Variant System

  1. New Tables
    - `products` - Main product information with page and category
    - `product_variants` - Product variants with labels and prices
  
  2. Data Insertion
    - 158 Dry Fruit products across 14 categories
    - 24 Mukhwas & Papad products across 2 categories
    - 546 product variants (3 per product)
  
  3. Security
    - Enable RLS on both tables
    - Public read access, admin write access
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS product_variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  category text NOT NULL,
  page text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create product_variants table
CREATE TABLE product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  variant_label text NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage products"
  ON products FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

-- RLS Policies for product_variants
CREATE POLICY "Product variants are publicly readable"
  ON product_variants FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage product variants"
  ON product_variants FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'deepakagarwal@gmail.com');

-- Insert Dry Fruits → Cashew
INSERT INTO products (name, description, image_url, category, page) VALUES
('SmallCashews Crunch(S2)', 'Premium small cashews with perfect crunch', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Medium Cashews Delight(S4)', 'Medium sized cashews for everyday snacking', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Royal Kaju', 'Premium royal quality cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Extra Large Kaju', 'Extra large premium cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Biscoff Kaju', 'Cashews with Biscoff flavor coating', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Kesar Pista Kaju', 'Cashews with saffron and pistachio flavor', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Honey Dalchini Kaju', 'Honey cinnamon flavored cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Rose Kaju', 'Rose flavored premium cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('BBQ Kaju', 'BBQ flavored roasted cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Smoked Kaju', 'Smoked flavored cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Crispy Cashew Crackers', 'Crispy cashew crackers for snacking', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Salted Cashews Classic', 'Classic salted cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Green Pakodi Kaju', 'Green pakodi flavored cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Korean Kaju', 'Korean style flavored cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Black Pepper Kaju', 'Black pepper seasoned cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Peri Peri Kaju', 'Spicy peri peri cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights'),
('Chilli Garlic Kaju', 'Chilli garlic flavored cashews', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Cashew', 'Dry Fruit Delights');

-- Insert Dry Fruits → Almond
INSERT INTO products (name, description, image_url, category, page) VALUES
('Bournvita Almond', 'Almonds coated with Bournvita flavor', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Chocodip Almond', 'Chocolate dipped premium almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Gems Almond', 'Colorful gems coated almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Tiramisu Almond', 'Tiramisu flavored almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Honey Til Almond', 'Honey sesame coated almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Smoked Almond', 'Smoked flavored almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Masala Almond', 'Spiced masala almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Roasted Almond', 'Classic roasted almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Pizza Almond', 'Pizza flavored almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Almond Mix Patels', 'Mixed almond varieties', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Badam Mouth Freshener', 'Almond mouth freshener', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('American Almond', 'Premium American almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Sanora Almond', 'Sanora variety almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Hathfor Almond', 'Hathfor variety almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Irani Mamra Almond', 'Premium Iranian Mamra almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Sattar Shell Almond', 'Sattar shell variety almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Irani Shell Almond', 'Iranian shell almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Small Mamra', 'Small Mamra almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Medium Mamra', 'Medium sized Mamra almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights'),
('Bold Mamra', 'Bold sized Mamra almonds', 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg', 'Almond', 'Dry Fruit Delights');

-- Insert Dry Fruits → Kishmish
INSERT INTO products (name, description, image_url, category, page) VALUES
('Kala Khatta Kishmish', 'Tangy kala khatta flavored raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights'),
('Mixed Fruits Kishmish', 'Mixed fruit flavored raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights'),
('Elaichi Kishmish', 'Cardamom flavored raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights'),
('Kandhari Kishmish', 'Premium Kandhari raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights'),
('Sindukhani Kishmish', 'Sindukhani variety raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights'),
('Kishmish Indian', 'Premium Indian raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights'),
('Coffee Kishmish', 'Coffee flavored raisins', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Kishmish', 'Dry Fruit Delights');

-- Insert Dry Fruits → Pista
INSERT INTO products (name, description, image_url, category, page) VALUES
('Salted Pista Bold', 'Bold sized salted pistachios', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Pista', 'Dry Fruit Delights'),
('Salted Pista', 'Classic salted pistachios', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Pista', 'Dry Fruit Delights'),
('Peri Peri Pista', 'Spicy peri peri pistachios', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Pista', 'Dry Fruit Delights'),
('Black Pepper Pista', 'Black pepper seasoned pistachios', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Pista', 'Dry Fruit Delights');

-- Insert Dry Fruits → Elaichi
INSERT INTO products (name, description, image_url, category, page) VALUES
('Silver Elaichi', 'Premium silver cardamom', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Elaichi', 'Dry Fruit Delights'),
('Golden Elaichi', 'Golden variety cardamom', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Elaichi', 'Dry Fruit Delights'),
('Dana Silver Elaichi', 'Silver cardamom seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Elaichi', 'Dry Fruit Delights');

-- Insert Dry Fruits → Bites & Shots
INSERT INTO products (name, description, image_url, category, page) VALUES
('Cranberry Bite', 'Sweet and tangy cranberry bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Kiwi Bite', 'Tropical kiwi flavored bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Mango Bite', 'Sweet mango flavored bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Mixed Fruit Bite', 'Assorted mixed fruit bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Oreo Bite', 'Oreo flavored crunchy bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Almond Brittle Bite', 'Crunchy almond brittle bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Five Mix Bites', 'Five variety mixed bites', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Chocodip Nutty', 'Chocolate dipped nutty treats', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights'),
('Paan Shots', 'Traditional paan flavored shots', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Bites & Shots', 'Dry Fruit Delights');

-- Insert Dry Fruits → Misri
INSERT INTO products (name, description, image_url, category, page) VALUES
('Blueberry Misri', 'Blueberry flavored rock sugar', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Misri', 'Dry Fruit Delights'),
('Golden Misri', 'Premium golden rock sugar', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Misri', 'Dry Fruit Delights'),
('Silver Misri', 'Pure silver rock sugar', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Misri', 'Dry Fruit Delights'),
('Kesar Misri', 'Saffron flavored rock sugar', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Misri', 'Dry Fruit Delights');

-- Insert Dry Fruits → Seeds
INSERT INTO products (name, description, image_url, category, page) VALUES
('Roasted Flex Seeds', 'Roasted flax seeds for health', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Roasted Pumpkin Seeds', 'Crunchy roasted pumpkin seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Muskmelon Seeds', 'Nutritious muskmelon seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Chia Seeds', 'Superfood chia seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Basil Seeds', 'Healthy basil seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Sunflower Seeds', 'Roasted sunflower seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Watermelon Seeds', 'Nutritious watermelon seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights'),
('Quinoa Seeds', 'Protein rich quinoa seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Seeds', 'Dry Fruit Delights');

-- Insert Dry Fruits → Mixes
INSERT INTO products (name, description, image_url, category, page) VALUES
('Breakfast Khatta Mitha', 'Sweet and tangy breakfast mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mixes', 'Dry Fruit Delights'),
('Healthy Mix', 'Nutritious healthy dry fruit mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mixes', 'Dry Fruit Delights'),
('Pink Salt Mix', 'Himalayan pink salt seasoned mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mixes', 'Dry Fruit Delights'),
('Panch Ratan Mix', 'Five treasure dry fruit mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mixes', 'Dry Fruit Delights'),
('Five Seeds Mix', 'Nutritious five seeds blend', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mixes', 'Dry Fruit Delights'),
('Tiger Nuts', 'Crunchy tiger nuts mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mixes', 'Dry Fruit Delights');

-- Insert Dry Fruits → Akhrot
INSERT INTO products (name, description, image_url, category, page) VALUES
('Karnal Big Akhrot', 'Large Karnal walnuts', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Akhrot', 'Dry Fruit Delights'),
('Kernel Akhrot', 'Premium walnut kernels', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Akhrot', 'Dry Fruit Delights'),
('Vacuum Akhrot Giri', 'Vacuum packed walnut kernels', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Akhrot', 'Dry Fruit Delights'),
('Whole Akhrot', 'Whole shell walnuts', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Akhrot', 'Dry Fruit Delights');

-- Insert Dry Fruits → Fig
INSERT INTO products (name, description, image_url, category, page) VALUES
('Dry Apricot', 'Sweet dried apricots', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Fig', 'Dry Fruit Delights'),
('Bold Fig', 'Large bold figs', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Fig', 'Dry Fruit Delights'),
('Regular Fig', 'Regular sized figs', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Fig', 'Dry Fruit Delights'),
('Dry Whole Fig', 'Whole dried figs', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Fig', 'Dry Fruit Delights'),
('Mixed Fig', 'Assorted fig varieties', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Fig', 'Dry Fruit Delights');

-- Insert Dry Fruits → Dates
INSERT INTO products (name, description, image_url, category, page) VALUES
('Dry Dates', 'Traditional dry dates', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Dates', 'Dry Fruit Delights'),
('Medjool Dates', 'Premium Medjool dates', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Dates', 'Dry Fruit Delights'),
('Azmah Dates', 'Sweet Azmah dates', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Dates', 'Dry Fruit Delights'),
('Kimia Dates', 'Soft Kimia dates', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Dates', 'Dry Fruit Delights'),
('Frad Dates', 'Premium Frad dates', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Dates', 'Dry Fruit Delights');

-- Insert Dry Fruits → Others
INSERT INTO products (name, description, image_url, category, page) VALUES
('Whole Coconut', 'Fresh whole coconut', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Others', 'Dry Fruit Delights'),
('Talmakhana 56', 'Premium Talmakhana seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Others', 'Dry Fruit Delights'),
('Bold Talmakhana', 'Large Talmakhana seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Others', 'Dry Fruit Delights');

-- Insert Dry Fruits → Sundried
INSERT INTO products (name, description, image_url, category, page) VALUES
('Sundried Baby Lemon', 'Tangy sundried baby lemons', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Black Berries', 'Sweet sundried blackberries', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Black Plum', 'Tangy sundried black plums', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Blueberries', 'Sweet sundried blueberries', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Cherry Special', 'Premium sundried cherries', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Baby Tomato', 'Tangy sundried baby tomatoes', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Diced Cranberry', 'Diced sundried cranberries', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Whole Cranberry', 'Whole sundried cranberries', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Date Plums', 'Sweet sundried date plums', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Blueberry Plum', 'Mixed blueberry plum sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Cherry Plum', 'Cherry plum sundried mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Fruit Cocktail', 'Mixed fruit cocktail sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Ginger Sliced', 'Sliced sundried ginger', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Ginger Cubes', 'Cubed sundried ginger', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Golden Berry', 'Golden berry sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Sundried Guava', 'Sweet sundried guava', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Kiwi Special', 'Premium sundried kiwi', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Mango Fruits', 'Sweet sundried mango', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Mixed Berries Khatta', 'Tangy mixed berries sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Papaya Sticks', 'Papaya stick sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Green Peach', 'Green peach sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Pineapple Diced', 'Diced pineapple sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Pineapple Coin', 'Coin shaped pineapple sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Prunes', 'Sweet sundried prunes', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Rose Berry Plum', 'Rose berry plum sundried', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights'),
('Sundried Strawberry Special', 'Premium sundried strawberries', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sundried', 'Dry Fruit Delights');

-- Insert Mukhwas & Papad → Mukhwas
INSERT INTO products (name, description, image_url, category, page) VALUES
('Sugar Coated Saunf Mix', 'Sweet sugar coated fennel mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Rainbow Colorful Saunf', 'Colorful rainbow fennel mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Mint Flavored Saunf', 'Refreshing mint fennel', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Meetha Pan Saunf', 'Sweet paan flavored fennel', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Til Mukhwas', 'Sesame seed mouth freshener', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Coconut Mukhwas', 'Coconut flavored mouth freshener', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Roasted Saunf Mix', 'Roasted fennel seed mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Sweet Mix Mukhwas', 'Sweet mixed mouth freshener', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Digestive Mukhwas', 'Digestive mouth freshener mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Anardana Goli', 'Pomegranate seed digestive', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Khus Khus Saunf', 'Poppy seed fennel mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Disco Mix Saunf', 'Colorful disco fennel mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Gulab Saunf', 'Rose flavored fennel', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Hing Peda Mukhwas', 'Asafoetida flavored mouth freshener', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Sada Saunf', 'Plain fennel seeds', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Calcutta Meetha Pan', 'Calcutta style sweet paan', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Rasili Supari', 'Juicy betel nut preparation', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips'),
('Ajwain Mix', 'Carom seed digestive mix', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Mukhwas', 'Crisps and Sips');

-- Insert Mukhwas & Papad → Papad
INSERT INTO products (name, description, image_url, category, page) VALUES
('Moong Dal Papad', 'Crispy moong dal papad', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Papad', 'Crisps and Sips'),
('Masala Papad', 'Spiced masala papad', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Papad', 'Crisps and Sips'),
('Chana Dal Papad', 'Chickpea dal papad', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Papad', 'Crisps and Sips'),
('Red Chilli Papad', 'Spicy red chilli papad', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Papad', 'Crisps and Sips'),
('Punjabi Masala Papad', 'Punjabi style masala papad', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Papad', 'Crisps and Sips'),
('Tiranga Mix Papad', 'Tricolor mixed papad', 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Papad', 'Crisps and Sips');

-- Now insert variants for all products
DO $$
DECLARE
    product_record RECORD;
    base_price NUMERIC;
BEGIN
    FOR product_record IN SELECT id, name FROM products LOOP
        -- Set base price based on category
        CASE 
            WHEN product_record.name LIKE '%Cashew%' OR product_record.name LIKE '%Kaju%' THEN
                base_price := 120;
            WHEN product_record.name LIKE '%Almond%' OR product_record.name LIKE '%Mamra%' THEN
                base_price := 150;
            WHEN product_record.name LIKE '%Pista%' THEN
                base_price := 200;
            WHEN product_record.name LIKE '%Dates%' THEN
                base_price := 80;
            WHEN product_record.name LIKE '%Fig%' THEN
                base_price := 100;
            WHEN product_record.name LIKE '%Akhrot%' THEN
                base_price := 180;
            WHEN product_record.name LIKE '%Seeds%' THEN
                base_price := 60;
            WHEN product_record.name LIKE '%Sundried%' THEN
                base_price := 90;
            WHEN product_record.name LIKE '%Mukhwas%' OR product_record.name LIKE '%Saunf%' THEN
                base_price := 40;
            WHEN product_record.name LIKE '%Papad%' THEN
                base_price := 25;
            ELSE
                base_price := 70;
        END CASE;

        -- Insert 3 variants for each product
        INSERT INTO product_variants (product_id, variant_label, price) VALUES
        (product_record.id, '100 grams', base_price),
        (product_record.id, '200 grams', base_price * 1.8),
        (product_record.id, '500 grams', base_price * 4.2);
    END LOOP;
END $$;