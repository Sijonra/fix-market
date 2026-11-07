import { createClient } from '@/lib/supabase/server';

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .select(
      `
      id,
      name,
      parent:parent_id (
        name
      )
    `
    )
    .order('name', { ascending: true });

  if (error) {
    console.log(error);
  }

  return { data, error };
}
