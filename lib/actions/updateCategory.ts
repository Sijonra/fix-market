'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { validateCategoryFormData } from '@/lib/validation/validateCategory';
import { UUID_REGEX } from '@/lib/helpers/regex';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { categoryEditRoute, ROUTE_CATEGORIES } from '@/lib/constants/routes';

export async function updateCategory(id: string, formData: FormData) {
  if (!UUID_REGEX.test(id)) {
    redirectToError(ROUTE_CATEGORIES, 'invalid_category_id');
  }

  const editPath = categoryEditRoute(id);

  const validation = validateCategoryFormData(formData);
  if (!validation.ok) {
    redirectToError(editPath, validation.error);
  }

  const { name, parent_id } = validation.data;

  if (parent_id === id) {
    redirectToError(editPath, 'invalid_parent');
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
      redirectToError(editPath, 'duplicate_category');
    }
    if (error.code === '23503') {
      redirectToError(editPath, 'invalid_parent');
    }
    if (error.code === '23514') {
      redirectToError(editPath, 'invalid_name_format');
    }

    redirectToError(editPath, 'database_error');
  }

  if (!data) {
    redirectToError(ROUTE_CATEGORIES, 'category_not_found');
  }

  revalidatePath(ROUTE_CATEGORIES);
  redirect(ROUTE_CATEGORIES);
}
