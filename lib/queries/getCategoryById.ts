import { createClient } from '@/lib/supabase/server';

export async function getCategoryById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .select(
      `
      id,
      name,
      parent_id
    `
    )
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  return { data, error };
}
