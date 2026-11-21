import { ErrorBanner } from '@/components/shared/ErrorBanner';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getErrorMessage } from '@/lib/errors';
import { getCategories } from '@/lib/queries/getCategories';
import Link from 'next/link';

interface ICategoryPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function CategoriesPage({ searchParams }: ICategoryPage) {
  const { error: errorCode } = await searchParams;
  const { data: categories, error: categoriesError } = await getCategories();

  const errorMessage = getErrorMessage(errorCode);

  if (categoriesError) {
    return (
      <ErrorFallback errorMessage="Ошибка при попытке получить категории" />
    );
  }

  if (categories === null || categories.length === 0) {
    return <div>Нет категорий</div>;
  }

  const categoriesRows = (
    <>
      {categories.map((category) => {
        return (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.parent?.name ?? '---'}</TableCell>
            <TableCell>
              <Button
                render={<Link href={`/categories/${category.id}`}></Link>}
                nativeButton={false}
                variant="outline"
                type="button"
              >
                Изменить
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );

  return (
    <div>
      <Button
        render={<Link href={'/categories/new'}></Link>}
        nativeButton={false}
      >
        Добавить новую категорию
      </Button>
      <ErrorBanner message={errorMessage} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Родитель</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{categoriesRows}</TableBody>
      </Table>
    </div>
  );
}
