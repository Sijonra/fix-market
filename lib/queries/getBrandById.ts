import { createClient } from '@/lib/supabase/server';

export async function getBrandById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('brands')
    .select(
      `
      id,
      name
    `
    )
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  return { data, error };
}
