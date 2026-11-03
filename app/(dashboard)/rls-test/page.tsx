import { Button } from '@/components/ui/button';
import { getCategories } from './actions';
import { deleteCategory } from '@/lib/actions/deleteCategory';

export default async function TestRls() {
  const { data: categories, error } = await getCategories();

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>тест прав</h1>
      <form action={deleteCategory}>
        <Button type="submit">Удалить категорию</Button>
      </form>
      <div>{categories ? categories[0].name : ''}</div>
    </div>
  );
}
