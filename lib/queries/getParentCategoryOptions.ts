import { createClient } from '@/lib/supabase/server';

export async function getParentCategoryOptions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .select(
      `
      id,
      name
    `
    )
    .order('name', { ascending: true });

  if (error) {
    console.log(error);
  }

  return { data, error };
}
