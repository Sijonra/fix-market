import { createClient } from '@/lib/supabase/server';

export async function getBrands() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('brands')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    console.error(error);
  }

  return { data, error };
}
