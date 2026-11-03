import { createClient } from '@/lib/supabase/server';

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('categories').select('*');

  console.log(data);

  return { data, error };
}
