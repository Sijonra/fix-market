import { createClient } from '@/lib/supabase/server';

export async function getProfiles() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('profiles').select('*');

  return { data, error };
}
