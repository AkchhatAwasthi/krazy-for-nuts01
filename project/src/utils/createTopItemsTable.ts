import { supabase } from '../lib/supabaseClient';

export async function createTopItemsTable() {
  try {
    // Check if the table already exists by trying to select from it
    const { data, error } = await supabase
      .from('top_items')
      .select('id')
      .limit(1);

    if (!error) {
      // Table exists, no need to create
      console.log('Top items table already exists');
      return true;
    }

    // If we get here, the table doesn't exist
    console.log('Top items table does not exist. Please run the migration in Supabase.');
    return false;
  } catch (error) {
    console.error('Error checking top items table:', error);
    return false;
  }
}