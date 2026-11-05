import { Button } from '@/components/ui/button';
import { deleteCategory } from '@/lib/actions/deleteCategory';
import { getCategories } from '@/lib/queries/getCategories';
import { getLocations } from '@/lib/queries/getLocations';
import { getProductLocations } from '@/lib/queries/getProductLocations';
import { getProducts } from '@/lib/queries/getProducts';

export default async function TestRls() {
  const { data: categories, error: categoriesError } = await getCategories();
  const { data: products, error: productsError } = await getProducts();
  const { data: locations, error: locationsError } = await getLocations();
  const { data: productLocations, error: productLocationsError } =
    await getProductLocations();

  [
    ['Categories', categoriesError],
    ['Products', productsError],
    ['Locations', locationsError],
    ['ProductLocations', productLocationsError],
  ].forEach(([name, error]) => {
    if (error) console.error(`Error in ${name}:`, error);
  });

  return (
    <div>
      <h1>тест прав</h1>
      <form action={deleteCategory}>
        <Button type="submit">Удалить категорию</Button>
      </form>
      <div>Products: {products?.length}</div>
      <div>Locations: {locations?.length}</div>
      <div>ProductLocations: {productLocations?.length}</div>
      <div>Categories: {categories?.length}</div>
    </div>
  );
}
