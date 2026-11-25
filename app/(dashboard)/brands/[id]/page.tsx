import { UUID_REGEX } from '@/lib/helpers/regex';
import { notFound } from 'next/navigation';
import { getErrorMessage } from '@/lib/errors';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import { getBrandById } from '@/lib/queries/getBrandById';
import BrandsForm from '@/app/(dashboard)/brands/BrandsForm';
import { updateBrand } from '@/lib/actions/updateBrand';

interface IEditBrandPage {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditBrandPage({
  params,
  searchParams,
}: IEditBrandPage) {
  const { id } = await params;
  const { error: errorCode } = await searchParams;

  if (!UUID_REGEX.test(id)) {
    notFound();
  }

  const { data: brand, error: brandError } = await getBrandById(id);

  if (brandError) {
    return <ErrorFallback errorMessage="Ошибка при загрузке данных бренда" />;
  }

  if (!brand) {
    notFound();
  }

  const errorMessage = getErrorMessage(errorCode);

  const updateBrandWithId = updateBrand.bind(null, id);

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Редактирование бренда
      </h1>

      <ErrorBanner message={errorMessage} />

      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <BrandsForm defaultName={brand.name} action={updateBrandWithId} />
      </div>
    </div>
  );
}
