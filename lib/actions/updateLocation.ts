'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { UUID_REGEX } from '@/lib/helpers/regex';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '@/lib/validation/validateLocations';
import { categoryEditRoute, ROUTE_LOCATIONS } from '@/lib/constants/routes';

export async function updateLocation(id: string, formData: FormData) {
  if (!UUID_REGEX.test(id)) {
    redirectToError(ROUTE_LOCATIONS, 'invalid_location_id');
  }

  const editPath = categoryEditRoute(id);

  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(editPath, validation.error);
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
      redirectToError(editPath, 'duplicate_location');
    }

    if (error.code === '23514') {
      redirectToError(editPath, 'invalid_name_format');
    }

    redirectToError(editPath, 'database_error');
  }

  if (!data) {
    redirectToError(ROUTE_LOCATIONS, 'location_not_found');
  }

  revalidatePath(ROUTE_LOCATIONS);
  redirect(ROUTE_LOCATIONS);
}
