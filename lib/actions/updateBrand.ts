'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { UUID_REGEX } from '@/lib/helpers/regex';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '@/lib/validation/validateLocations';
import { brandEditRoute, ROUTE_BRANDS } from '@/lib/constants/routes';

export async function updateBrand(id: string, formData: FormData) {
  if (!UUID_REGEX.test(id)) {
    redirectToError(ROUTE_BRANDS, 'invalid_brand_id');
  }

  const editPath = brandEditRoute(id);

  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(editPath, validation.error);
  }

  const { name } = validation.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('brands')
    .update({
      name,
    })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) {
    console.error('Ошибка обновления бренда в БД:', error);

    if (error.code === '23505') {
      redirectToError(editPath, 'duplicate_brand');
    }

    if (error.code === '23514') {
      redirectToError(editPath, 'invalid_name_format');
    }

    redirectToError(editPath, 'database_error');
  }

  if (!data) {
    redirectToError(ROUTE_BRANDS, 'brand_not_found');
  }

  revalidatePath(ROUTE_BRANDS);
  redirect(ROUTE_BRANDS);
}
