/*
  # Add missing columns to orders table

  ## Summary
  This migration adds columns to the orders table that are required by the checkout
  process but were missing from the original schema.

  ## Problem
  The CheckoutModal component tries to insert values for columns that don't exist:
  - discount_percentage
  - discount_amount
  - handling_charge
  - original_amount
  - final_amount

  This causes the error: "Could not find the 'discount_amount' column of 'orders' in the schema cache"

  ## Changes Made

  ### 1. New Columns Added to orders table
  - `discount_percentage` (numeric): Percentage of discount applied (0-100)
  - `discount_amount` (numeric): Actual discount amount in INR
  - `handling_charge` (numeric): Handling/processing charge
  - `original_amount` (numeric): Subtotal before any charges or discounts
  - `final_amount` (numeric): Final amount after all calculations

  ### 2. Data Integrity
  - All new columns allow NULL for existing records
  - Default values set to 0 for new orders
  - Numeric type chosen for monetary values to maintain precision

  ## Impact
  - Enables discount functionality in checkout process
  - Allows proper order amount tracking and calculations
  - Supports handling charge feature
  - Maintains order history with complete pricing breakdown
*/

-- Add discount_percentage column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE orders ADD COLUMN discount_percentage numeric DEFAULT 0;
  END IF;
END $$;

-- Add discount_amount column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'discount_amount'
  ) THEN
    ALTER TABLE orders ADD COLUMN discount_amount numeric DEFAULT 0;
  END IF;
END $$;

-- Add handling_charge column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'handling_charge'
  ) THEN
    ALTER TABLE orders ADD COLUMN handling_charge numeric DEFAULT 0;
  END IF;
END $$;

-- Add original_amount column (subtotal before charges and discounts)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'original_amount'
  ) THEN
    ALTER TABLE orders ADD COLUMN original_amount numeric DEFAULT 0;
  END IF;
END $$;

-- Add final_amount column (total after all calculations)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'final_amount'
  ) THEN
    ALTER TABLE orders ADD COLUMN final_amount numeric DEFAULT 0;
  END IF;
END $$;

-- Add check constraint to ensure discount_percentage is between 0 and 100
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'orders_discount_percentage_check'
  ) THEN
    ALTER TABLE orders
    ADD CONSTRAINT orders_discount_percentage_check 
    CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
  END IF;
END $$;

-- Add check constraint to ensure amounts are non-negative
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'orders_amounts_check'
  ) THEN
    ALTER TABLE orders
    ADD CONSTRAINT orders_amounts_check 
    CHECK (
      discount_amount >= 0 AND 
      handling_charge >= 0 AND 
      original_amount >= 0 AND 
      final_amount >= 0
    );
  END IF;
END $$;

-- Verify all columns were added successfully
DO $$
DECLARE
  missing_columns TEXT[];
BEGIN
  SELECT ARRAY_AGG(col) INTO missing_columns
  FROM (
    VALUES 
      ('discount_percentage'),
      ('discount_amount'),
      ('handling_charge'),
      ('original_amount'),
      ('final_amount')
  ) AS cols(col)
  WHERE NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = col
  );
  
  IF missing_columns IS NOT NULL AND array_length(missing_columns, 1) > 0 THEN
    RAISE EXCEPTION 'Failed to add columns: %', array_to_string(missing_columns, ', ');
  END IF;
  
  RAISE NOTICE 'Successfully added all order amount columns';
END $$;
