import { UUID_REGEX } from '@/lib/helpers/regex';
import { notFound } from 'next/navigation';
import { getErrorMessage } from '@/lib/errors';
import { getLocationById } from '@/lib/queries/getLocationById';
import LocationsForm from '@/app/(dashboard)/locations/locationsForm';
import { updateLocation } from '@/lib/actions/updateLocation';

interface IEditLocationPage {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditLocationPage({
  params,
  searchParams,
}: IEditLocationPage) {
  const { id } = await params;
  const { error: errorCode } = await searchParams;

  if (!UUID_REGEX.test(id)) {
    notFound();
  }

  const { data: location, error: locationError } = await getLocationById(id);

  if (locationError) {
    return (
      <div className="p-8 text-destructive">
        Ошибка при загрузке данных локации.
      </div>
    );
  }

  if (!location) {
    notFound();
  }

  const errorMessage = getErrorMessage(errorCode);

  const updateLocationWithId = updateLocation.bind(null, id);

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Редактирование локации
      </h1>

      {errorMessage && (
        <div className="mb-6 rounded-lg bg-destructive/15 p-4 text-sm text-destructive font-medium">
          {errorMessage}
        </div>
      )}

      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <LocationsForm
          defaultName={location.name}
          action={updateLocationWithId}
        />
      </div>
    </div>
  );
}
