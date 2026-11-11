'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function createCategory(formData: FormData) {
  const nameRaw = formData.get('name');
  const parentIdRaw = formData.get('parentId');

  console.log('nameRaw: ', nameRaw);
  console.log('parentIdRaw: ', parentIdRaw);

  if (typeof nameRaw !== 'string') {
    redirect('/categories/new?error=invalid_form');
  }

  const name = nameRaw.trim();
  if (name.length === 0 || name.length > 50) {
    redirect('/categories/new?error=invalid_name_length');
  }

  let parentId: string | null = null;

  if (
    typeof parentIdRaw === 'string' &&
    parentIdRaw !== '' &&
    parentIdRaw !== 'none'
  ) {
    if (!UUID_REGEX.test(parentIdRaw)) {
      redirect('/categories/new?error=invalid_parent');
    }
    parentId = parentIdRaw;
  }

  const supabase = await createClient();

  const { error } = await supabase.from('categories').insert({
    name,
    parent_id: parentId,
  });

  if (error) {
    console.error('Ошибка создания категории в БД:', error.message);
    redirect('/categories/new?error=database_error');
  }

  revalidatePath('/categories');
  redirect('/categories');
}
