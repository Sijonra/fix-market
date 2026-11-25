import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BRAND_NAME_MAX_LENGTH } from '@/lib/constants/brands';

interface IBrandsForm {
  action: (formData: FormData) => void | Promise<void>;
  defaultName?: string;
  submitButtonText?: string;
}

export default function BrandsForm({
  action,
  defaultName = '',
  submitButtonText = 'Сохранить',
}: IBrandsForm) {
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
          placeholder="Название бренда"
          className="h-12 text-base sm:text-lg"
          maxLength={BRAND_NAME_MAX_LENGTH}
          required
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" className="h-12 px-8">
          {submitButtonText}
        </Button>
        <Button
          render={<Link href="/brands"></Link>}
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
