import { createClient } from '@/lib/supabase/server';

export async function getProductLocations() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('product_locations').select('*');

  return { data, error };
}
