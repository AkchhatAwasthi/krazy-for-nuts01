/*
  # Update Order ID Sequence

  1. Changes
    - Set the orders table ID sequence to start from 55 (next order will be 55)
    - This ensures continuity from the existing 54 orders
    - All future orders will increment from this point regardless of user

  2. Technical Details
    - Updates the PostgreSQL sequence for the orders table
    - Maintains global order ID sequence across all customers
*/

-- Set the sequence for orders table to continue from 54
-- Next order will be ID 55
SELECT setval('orders_id_seq', 54, true);