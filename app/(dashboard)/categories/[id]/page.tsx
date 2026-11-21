import { UUID_REGEX } from '@/lib/helpers/regex';
import { getCategoryById } from '@/lib/queries/getCategoryById';
import { getParentCategoryOptions } from '@/lib/queries/getParentCategoryOptions';
import { notFound } from 'next/navigation';
import { getErrorMessage } from '@/lib/errors';
import CategoryForm from '@/app/(dashboard)/categories/CategoryForm';
import { updateCategory } from '@/lib/actions/updateCategory';
import { ErrorBanner } from '@/components/shared/ErrorBanner';
import ErrorFallback from '@/components/shared/ErrorFallback';

interface IEditCategoriesPage {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditCategoryPage({
  params,
  searchParams,
}: IEditCategoriesPage) {
  const { id } = await params;
  const { error: errorCode } = await searchParams;

  if (!UUID_REGEX.test(id)) {
    notFound();
  }

  const [categoryResult, parentsResult] = await Promise.all([
    getCategoryById(id),
    getParentCategoryOptions(id),
  ]);

  const { data: category, error: categoryError } = categoryResult;
  const { data: parents, error: parentsError } = parentsResult;

  if (categoryError || parentsError) {
    return (
      <ErrorFallback errorMessage="Ошибка при загрузке данных категории" />
    );
  }

  if (!category) {
    notFound();
  }

  const errorMessage = getErrorMessage(errorCode);

  const updateCategoryWithId = updateCategory.bind(null, id);

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Редактирование категории
      </h1>

      <ErrorBanner message={errorMessage} />
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <CategoryForm
          action={updateCategoryWithId}
          defaultName={category.name}
          defaultParentId={category.parent_id}
          parentOptions={parents ?? []}
          submitButtonText="Сохранить изменения"
        />
      </div>
    </div>
  );
}
