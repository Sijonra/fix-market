'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { redirectToError } from '@/lib/helpers/redirectToError';
import { validatedLocationData } from '../validation/validateLocations';

export async function createLocation(formData: FormData) {
  const validation = validatedLocationData(formData);
  if (!validation.ok) {
    redirectToError(`/locations/new`, validation.error);
  }

  const { name } = validation.data;

  const supabase = await createClient();

  const { error } = await supabase.from('locations').insert({
    name,
  });

  if (error) {
    console.error('Ошибка создания локации в БД:', error);

    if (error.code === '23505') {
      redirectToError(`/locations/new`, 'duplicate_location');
    }
    if (error.code === '23514') {
      redirectToError(`/locations/new`, 'invalid_name_format');
    }

    redirectToError(`/locations/new`, 'database_error');
  }

  revalidatePath('/locations');
  redirect('/locations');
}
