import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ILocationsForm {
  action: (formData: FormData) => void | Promise<void>;
  defaultName?: string;
  submitButtonText?: string;
}

export default function LocationsForm({
  action,
  defaultName = '',
  submitButtonText = 'Сохранить',
}: ILocationsForm) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-base sm:text-lg">
          Название
        </Label>
        <Input
          id="name"
          name="name"
          defaultValue={defaultName}
          placeholder="Название локации"
          className="h-12 text-base sm:text-lg"
          required
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" className="h-12 px-8">
          {submitButtonText}
        </Button>
        <Button
          render={<Link href="/locations"></Link>}
          nativeButton={false}
          variant="outline"
          type="button"
        >
          Отмена
        </Button>
      </div>
    </form>
  );
}
