import { supabase } from '../lib/supabaseClient';

export interface GiftBasket {
  id: string;
  name: string;
  description?: string;
  price_1: number;
  price_10: number;
  price_20: number;
  price_50: number;
  in_stock: boolean;
  image_url?: string;
}

// Fetch all gift baskets from Supabase with all details
export const fetchGiftBaskets = async (): Promise<GiftBasket[]> => {
  try {
    // Explicitly select all columns to ensure we fetch everything from backend
    // Note: Database uses 'image' column, we map it to 'image_url' for frontend consistency
    const { data, error } = await supabase
      .from('gift_baskets')
      .select(`
        id,
        name,
        description,
        price_1,
        price_10,
        price_20,
        price_50,
        in_stock,
        image
      `)
      .order('name');

    if (error) {
      console.error('Error fetching gift baskets from backend:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return [];
    }

    if (!data || data.length === 0) {
      console.log('No gift baskets found in backend');
      return [];
    }

    console.log(`Successfully fetched ${data.length} gift baskets from backend`);

    // Return gift baskets with all details from backend
    return data.map((basket) => {
      const giftBasket: GiftBasket = {
        id: basket.id,
        name: basket.name,
        description: basket.description || undefined,
        price_1: parseFloat(basket.price_1) || 0,
        price_10: parseFloat(basket.price_10) || 0,
        price_20: parseFloat(basket.price_20) || 0,
        price_50: parseFloat(basket.price_50) || 0,
        in_stock: basket.in_stock ?? true,
        image_url: basket.image || 'https://raw.githubusercontent.com/codeandcanvas18/Krazy-For-Nuts/main/Gemini_Generated_Image_uidgtjuidgtjuidg.png'
      };

      return giftBasket;
    });
  } catch (error) {
    console.error('Exception while fetching gift baskets from backend:', error);
    return [];
  }
};
