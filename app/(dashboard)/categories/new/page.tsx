import { getParentCategoryOptions } from '@/lib/queries/getParentCategoryOptions';
import { createCategory } from '@/lib/actions/createCategory';
import { getErrorMessage } from '@/lib/errors';
import CategoryForm from '../CategoryForm';

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
      <div className="p-8 text-destructive">
        Ошибка при попытке получить категории
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Новая категория
      </h1>
      {errorMessage && (
        <div className="mb-6 rounded-lg bg-destructive/15 p-4 text-sm text-destructive font-medium">
          {errorMessage}
        </div>
      )}
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <CategoryForm
          action={createCategory}
          parentOptions={parents ?? []}
          submitButtonText="Сохранить изменения"
        />
      </div>
    </div>
  );
}
