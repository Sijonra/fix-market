import { createClient } from '@/lib/supabase/server';

export async function getLocationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('locations')
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
