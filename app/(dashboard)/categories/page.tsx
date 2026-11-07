import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCategories } from '@/lib/queries/getCategories';

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
