import { supabase } from '../lib/supabaseClient';

export interface Product {
  id: string;
  name: string;
  description?: string;
  image_url: string;
  category: string;
  page: string;
  is_out_of_stock?: boolean;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  variant_label: string;
  price: number;
  is_out_of_stock?: boolean;
  in_stock?: boolean;
}

// Fetch products with variants from Supabase
export const fetchProductsByPage = async (page: string): Promise<Product[]> => {
  try {
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('id, name, description, image_url, category, page, is_out_of_stock, created_at, updated_at')
      .eq('page', page)
      .order('name');

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return [];
    }

    if (!productsData || productsData.length === 0) {
      return [];
    }

    // Fetch variants for all products
    const productIds = productsData.map(p => p.id);
    const { data: variantsData, error: variantsError } = await supabase
      .from('product_variants')
      .select('*')
      .in('product_id', productIds)
      .order('price');

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      return [];
    }

    // Group variants by product_id
    const variantsByProduct = variantsData?.reduce((acc, variant) => {
      if (!acc[variant.product_id]) {
        acc[variant.product_id] = [];
      }
      acc[variant.product_id].push({
        id: variant.id,
        variant_label: variant.variant_label,
        price: variant.price,
        is_out_of_stock: !variant.in_stock
      });
      return acc;
    }, {} as Record<string, ProductVariant[]>) || {};

    // Combine products with their variants
    return productsData.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      category: product.category,
      page: product.page,
      is_out_of_stock: product.is_out_of_stock,
      variants: variantsByProduct[product.id] || []
    }));
  } catch (error) {
    console.error('Error fetching products with variants:', error);
    return [];
  }
};

// Fetch products by category
export const fetchProductsByPageAndCategory = async (page: string, category: string): Promise<Product[]> => {
  try {
    const allProducts = await fetchProductsByPage(page);
    return allProducts.filter(product => product.category === category);
  } catch (error) {
    console.error('Error fetching products by page and category:', error);
    return [];
  }
};

// Get unique categories for a page
export const getCategoriesByPage = async (page: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('page', page);

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
    return uniqueCategories.sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Validate product variant consistency
export const validateProductVariants = async (productId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('validate_variant_consistency', { product_id_param: productId });

    if (error) {
      console.error('Error validating variants:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Error validating variants:', error);
    return false;
  }
};

// Get suggested variants for a product
export const getSuggestedVariants = async (productId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .rpc('get_suggested_variants', { product_id_param: productId });

    if (error) {
      console.error('Error getting suggested variants:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting suggested variants:', error);
    return [];
  }
};

// Get top 15 items from database
export const getTopItems = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .rpc('get_top_items');
      
    if (error) throw error;
    
    return (data || []).map((item: any) => ({
      id: item.product_id,
      name: item.product_name,
      description: item.description,
      image_url: item.image_url,
      category: item.category,
      page: item.page,
      variants: item.variants || []
    }));
  } catch (error) {
    console.error('Error fetching top items:', error);
    return [];
  }
};