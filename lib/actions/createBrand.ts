'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '@/lib/validation/validateLocations';
import { ROUTE_BRANDS } from '@/lib/constants/routes';

export async function createBrand(formData: FormData) {
  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(`${ROUTE_BRANDS}/new`, validation.error);
  }

  const { name } = validation.data;

  const supabase = await createClient();

  const { error } = await supabase.from('brands').insert({
    name,
  });

  if (error) {
    console.error('Ошибка создания бренда в БД:', error);

    if (error.code === '23505') {
      redirectToError(`${ROUTE_BRANDS}/new`, 'duplicate_brand');
    }
    if (error.code === '23514') {
      redirectToError(`${ROUTE_BRANDS}/new`, 'invalid_name_format');
    }

    redirectToError(`${ROUTE_BRANDS}/new`, 'database_error');
  }

  revalidatePath(ROUTE_BRANDS);
  redirect(ROUTE_BRANDS);
}
