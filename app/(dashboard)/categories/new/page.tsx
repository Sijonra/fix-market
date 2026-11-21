import { getParentCategoryOptions } from '@/lib/queries/getParentCategoryOptions';
import { createCategory } from '@/lib/actions/createCategory';
import { getErrorMessage } from '@/lib/errors';
import CategoryForm from '@/app/(dashboard)/categories/CategoryForm';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import ErrorFallback from '@/components/shared/ErrorFallback';

interface INewCategoryPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewCategoryPage({
  searchParams,
}: INewCategoryPage) {
  const { error: errorCode } = await searchParams;
  const errorMessage = getErrorMessage(errorCode);

  const { data: parents, error: parentsError } =
    await getParentCategoryOptions();

  if (parentsError) {
    return (
      <ErrorFallback errorMessage="Ошибка при попытке получить категории" />
    );
  }

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Новая категория
      </h1>
      <ErrorBanner message={errorMessage} />
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <CategoryForm
          action={createCategory}
          parentOptions={parents ?? []}
          submitButtonText="Добавить категорию"
        />
      </div>
    </div>
  );
}
