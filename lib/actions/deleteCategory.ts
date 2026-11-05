'use server';

import { createClient } from '@/lib/supabase/server';

export async function deleteCategory() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', '28b89ae6-baf1-4fdf-a07b-904655072ef8')
    .select('*');

  console.log(data);

  if (error) {
    console.log('ошибка удаления: ', error);
  }
}
