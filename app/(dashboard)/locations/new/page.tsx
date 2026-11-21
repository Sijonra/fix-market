import { getErrorMessage } from '@/lib/errors';
import { createLocation } from '@/lib/actions/createLocation';
import LocationsForm from '@/app/(dashboard)/locations/locationsForm';
import { ErrorBanner } from '@/components/shared/ErrorBanner';

interface INewLocationPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewLocationPage({
  searchParams,
}: INewLocationPage) {
  const { error: errorCode } = await searchParams;
  const errorMessage = getErrorMessage(errorCode);

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Новая локация
      </h1>
      <ErrorBanner message={errorMessage} />
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <LocationsForm action={createLocation} submitButtonText="Добавить" />
      </div>
    </div>
  );
}
