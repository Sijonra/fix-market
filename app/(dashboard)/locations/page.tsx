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
import { getLocations } from '@/lib/queries/getLocations';
import Link from 'next/link';

interface ILocationsPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function LocationsPage({ searchParams }: ILocationsPage) {
  const { error: errorCode } = await searchParams;
  const { data: locations, error: locationsError } = await getLocations();

  const errorMessage = getErrorMessage(errorCode);

  if (locationsError) {
    return (
      <ErrorFallback errorMessage="Ошибка при попытке получить список локаций" />
    );
  }

  const locationsRows =
    locations?.length !== 0 && locations !== null ? (
      locations.map((location) => {
        return (
          <TableRow key={location.id}>
            <TableCell>{location.name}</TableCell>
            <TableCell>
              <Button
                render={<Link href={`/locations/${location.id}`}></Link>}
                nativeButton={false}
                variant="outline"
                type="button"
                aria-label={`Изменить локацию ${location.name}`}
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
          Нет локаций
        </TableCell>
      </TableRow>
    );

  return (
    <div>
      <Button
        render={<Link href={'/locations/new'}></Link>}
        nativeButton={false}
      >
        Добавить новую локацию
      </Button>
      <ErrorBanner message={errorMessage} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{locationsRows}</TableBody>
      </Table>
    </div>
  );
}
