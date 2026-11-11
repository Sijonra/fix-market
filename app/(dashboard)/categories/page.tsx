import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCategories } from '@/lib/queries/getCategories';
import Link from 'next/link';

export default async function CategoriesPage() {
  const { data: categories, error: categoriesError } = await getCategories();

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
          </TableRow>
        );
      })}
    </>
  );

  return (
    <div>
      <Button>
        <Link href={'/categories/new'}>Добавить Новую Категорию</Link>
      </Button>
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
