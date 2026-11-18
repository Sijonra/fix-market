import { createClient } from '@/lib/supabase/server';

export async function getParentCategoryOptions(excludeId?: string) {
  const supabase = await createClient();

  let query = supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
  }

  return { data, error };
}
