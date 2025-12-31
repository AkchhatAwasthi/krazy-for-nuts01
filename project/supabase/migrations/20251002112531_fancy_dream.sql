/*
  # Remove get_next_order_id function

  This migration removes the get_next_order_id function since we're now using
  a different approach that doesn't increment the sequence until order is placed.
*/

DROP FUNCTION IF EXISTS get_next_order_id();