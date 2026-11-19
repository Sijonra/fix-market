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
    return <div>Ошибка при попытке получить список локаций</div>;
  }

  if (locations === null || locations.length === 0) {
    return <div>Нет категорий</div>;
  }

  const locationsRows = locations.map((location) => {
    return (
      <TableRow key={location.id}>
        <TableCell>{location.name}</TableCell>
        <TableCell>
          <Button
            render={<Link href={`/locations/${location.id}`}></Link>}
            nativeButton={false}
            variant="outline"
            type="button"
          >
            Изменить
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <Button>
        <Link href={'/locations/new'}>Добавить новую локацию</Link>
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
        <TableBody>{locationsRows}</TableBody>
      </Table>
    </div>
  );
}
