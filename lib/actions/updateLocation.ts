'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { UUID_REGEX } from '@/lib/helpers/regex';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '@/lib/validation/validateLocations';

export async function updateLocation(id: string, formData: FormData) {
  if (!UUID_REGEX.test(id)) {
    redirectToError('/locations', 'invalid_location_id');
  }

  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(`/locations/${id}`, validation.error);
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
      redirectToError(`/locations/${id}`, 'duplicate_location');
    }

    if (error.code === '23514') {
      redirectToError(`/locations/${id}`, 'invalid_name_format');
    }

    redirectToError(`/locations/${id}`, 'database_error');
  }

  if (!data) {
    redirectToError(`/locations/`, 'location_not_found');
  }

  revalidatePath('/locations');
  redirect('/locations');
}
