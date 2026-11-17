'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { validateCategoryFormData } from './validateCategory';
import { UUID_REGEX } from '@/lib/helpers/regex';
import { redirectToError } from '@/lib/helpers/redirectToError';

export async function updateCategory(id: string, formData: FormData) {
  if (!UUID_REGEX.test(id)) {
    redirect('/categories');
  }

  const validation = validateCategoryFormData(formData);
  if (!validation.ok) {
    redirectToError(`/categories/${id}`, validation.error);
  }

  const { name, parent_id } = validation.data;

  if (parent_id === id) {
    redirectToError(`/categories/${id}`, 'invalid_parent');
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('categories')
    .update({
      name,
      parent_id,
    })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) {
    console.error('Ошибка обновления категории в БД:', error);

    if (error.code === '23505') {
      redirectToError(`/categories/${id}`, 'duplicate_category');
    }
    if (error.code === '23503') {
      redirectToError(`/categories/${id}`, 'invalid_parent');
    }
    if (error.code === '23514') {
      redirectToError(`/categories/${id}`, 'invalid_name_format');
    }

    redirectToError(`/categories/${id}`, 'database_error');
  }

  if (!data) {
    redirectToError(`/categories/${id}`, 'database_error');
  }

  revalidatePath('/categories');
  redirect('/categories');
}
