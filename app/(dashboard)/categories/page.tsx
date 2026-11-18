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
    return <div>Ошибка при попытке получить категории</div>;
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
      <Button>
        <Link href={'/categories/new'}>Добавить новую категорию</Link>
      </Button>
      {errorMessage && (
        <div className="mb-6 rounded-lg bg-destructive/15 p-4 text-sm text-destructive font-medium">
          {errorMessage}
        </div>
      )}
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
