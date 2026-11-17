import { UUID_REGEX } from '@/lib/helpers/regex';
import { getCategoryById } from '@/lib/queries/getCategoryById';
import { getParentCategoryOptions } from '@/lib/queries/getParentCategoryOptions';
import { notFound } from 'next/navigation';
import { getErrorMessage } from '@/lib/errors';
import CategoryForm from '@/app/(dashboard)/categories/CategoryForm';

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
      <div className="p-8 text-destructive">
        Ошибка при загрузке данных категории.
      </div>
    );
  }

  if (!category) {
    notFound();
  }

  const errorMessage = getErrorMessage(errorCode);

  const updateCategoryWithId = async () => {
    'use server';
  };

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Редактирование категории
      </h1>

      {errorMessage && (
        <div className="mb-6 rounded-lg bg-destructive/15 p-4 text-sm text-destructive font-medium">
          {errorMessage}
        </div>
      )}

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
