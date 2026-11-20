'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { UUID_REGEX } from '@/lib/helpers/regex';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '@/lib/validation/validateLocations';
import { ROUTE_LOCATIONS } from '../constants/routes';

export async function updateLocation(id: string, formData: FormData) {
  if (!UUID_REGEX.test(id)) {
    redirectToError(ROUTE_LOCATIONS, 'invalid_location_id');
  }

  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(`${ROUTE_LOCATIONS}/${id}`, validation.error);
  }

  const { name } = validation.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('locations')
    .update({
      name,
    })
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) {
    console.error('Ошибка обновления локации в БД:', error);

    if (error.code === '23505') {
      redirectToError(`${ROUTE_LOCATIONS}/${id}`, 'duplicate_location');
    }

    if (error.code === '23514') {
      redirectToError(`${ROUTE_LOCATIONS}/${id}`, 'invalid_name_format');
    }

    redirectToError(`${ROUTE_LOCATIONS}/${id}`, 'database_error');
  }

  if (!data) {
    redirectToError(ROUTE_LOCATIONS, 'location_not_found');
  }

  revalidatePath(ROUTE_LOCATIONS);
  redirect(ROUTE_LOCATIONS);
}
