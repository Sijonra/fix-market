'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '../validation/validateLocations';
import { ROUTE_LOCATIONS } from '../constants/routes';

export async function createLocation(formData: FormData) {
  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(`${ROUTE_LOCATIONS}/new`, validation.error);
  }

  const { name } = validation.data;

  const supabase = await createClient();

  const { error } = await supabase.from('locations').insert({
    name,
  });

  if (error) {
    console.error('Ошибка создания локации в БД:', error);

    if (error.code === '23505') {
      redirectToError(`${ROUTE_LOCATIONS}/new`, 'duplicate_location');
    }
    if (error.code === '23514') {
      redirectToError(`${ROUTE_LOCATIONS}/new`, 'invalid_name_format');
    }

    redirectToError(`${ROUTE_LOCATIONS}/new`, 'database_error');
  }

  revalidatePath(ROUTE_LOCATIONS);
  redirect(ROUTE_LOCATIONS);
}
