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
import { getBrands } from '@/lib/queries/getBrands';
import Link from 'next/link';

interface IBrandsPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function BrandsPage({ searchParams }: IBrandsPage) {
  const { error: errorCode } = await searchParams;
  const { data: brands, error: brandError } = await getBrands();

  const errorMessage = getErrorMessage(errorCode);

  if (brandError) {
    return (
      <ErrorFallback errorMessage="Ошибка при попытке получить список брендов" />
    );
  }

  const brandsRows =
    brands?.length !== 0 && brands !== null ? (
      brands.map((brand) => {
        return (
          <TableRow key={brand.id}>
            <TableCell>{brand.name}</TableCell>
            <TableCell>
              <Button
                render={<Link href={`/brands/${brand.id}`}></Link>}
                nativeButton={false}
                variant="outline"
                type="button"
                aria-label={`Изменить бренд ${brand.name}`}
              >
                Изменить
              </Button>
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          Нет брендов
        </TableCell>
      </TableRow>
    );

  return (
    <div>
      <Button render={<Link href={'/brands/new'}></Link>} nativeButton={false}>
        Добавить новый бренд
      </Button>
      <ErrorBanner message={errorMessage} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{brandsRows}</TableBody>
      </Table>
    </div>
  );
}
