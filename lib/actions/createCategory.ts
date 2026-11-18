'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validateCategoryFormData } from '../validation/validateCategory';

export async function createCategory(formData: FormData) {
  const validation = validateCategoryFormData(formData);
  if (!validation.ok) {
    redirectToError(`/categories/new/`, validation.error);
  }

  const { name, parent_id } = validation.data;

  const supabase = await createClient();

  const { error } = await supabase.from('categories').insert({
    name,
    parent_id: parent_id,
  });

  if (error) {
    console.error('Ошибка создания категории в БД:', error);

    if (error.code === '23505') {
      redirectToError(`/categories/new/`, 'duplicate_category');
    }
    if (error.code === '23503') {
      redirectToError(`/categories/new/`, 'invalid_parent');
    }
    if (error.code === '23514') {
      redirectToError(`/categories/new/`, 'invalid_name_format');
    }

    redirectToError(`/categories/new/`, 'database_error');
  }

  revalidatePath('/categories');
  redirect('/categories');
}
