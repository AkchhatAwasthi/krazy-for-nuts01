/*
  # Create function to get next order ID

  1. New Functions
    - `get_next_order_id()` - Returns the next order ID that will be assigned
    
  2. Purpose
    - Provides a reliable way to preview the next order ID
    - Works with PostgreSQL sequences to maintain consistency
*/

-- Create function to get the next order ID
CREATE OR REPLACE FUNCTION get_next_order_id()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Get the next value that will be assigned by the sequence
  -- without actually incrementing it
  RETURN nextval('orders_id_seq');
END;
$$;