'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { UUID_REGEX } from '../helpers/regex';

export async function createCategory(formData: FormData) {
  const nameRaw = formData.get('name');
  const parentIdRaw = formData.get('parentId');

  if (typeof nameRaw !== 'string') {
    redirectToError('/categories/new', 'invalid_form');
  }

  const name = nameRaw.trim();
  if (name.length === 0 || name.length > 50) {
    redirectToError('/categories/new', 'invalid_name_length');
  }

  let parentId: string | null = null;

  if (typeof parentIdRaw === 'string' && parentIdRaw !== '') {
    if (!UUID_REGEX.test(parentIdRaw)) {
      redirectToError('/categories/new', 'invalid_parent');
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

    if (error.code === '23505') {
      redirectToError('/categories/new', 'duplicate_category');
    }

    if (error.code === '23503') {
      redirectToError('/categories/new', 'invalid_parent');
    }

    redirectToError('/categories/new', 'database_error');
  }

  revalidatePath('/categories');
  redirect('/categories');
}
