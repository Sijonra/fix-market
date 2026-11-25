import { getErrorMessage } from '@/lib/errors';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import BrandsForm from '@/app/(dashboard)/brands/BrandsForm';
import { createBrand } from '@/lib/actions/createBrand';

interface INewBrandPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewBrandPage({ searchParams }: INewBrandPage) {
  const { error: errorCode } = await searchParams;
  const errorMessage = getErrorMessage(errorCode);

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Новый бренд
      </h1>
      <ErrorBanner message={errorMessage} />
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <BrandsForm action={createBrand} submitButtonText="Добавить" />
      </div>
    </div>
  );
}
