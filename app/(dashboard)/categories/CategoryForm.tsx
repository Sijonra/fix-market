import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NO_PARENT_VALUE } from '@/lib/constants/categories';

interface ParentOption {
  id: string;
  name: string;
}

interface ICategoryForm {
  action: (formData: FormData) => void | Promise<void>;
  defaultName?: string;
  defaultParentId?: string | null;
  parentOptions: ParentOption[];
  submitButtonText?: string;
}

export default function CategoryForm({
  action,
  defaultName = '',
  defaultParentId = null,
  parentOptions,
  submitButtonText = 'Сохранить',
}: ICategoryForm) {
  const selectItems = [
    { value: NO_PARENT_VALUE, label: 'Нет, Верхний уровень' },
    ...parentOptions.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const selectDefaultValue = defaultParentId ?? NO_PARENT_VALUE;

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
          placeholder="Например, Смесители"
          className="h-12 text-base sm:text-lg"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="parentId" className="text-base sm:text-lg">
          Родительская категория
        </Label>
        <Select
          name="parentId"
          items={selectItems}
          defaultValue={selectDefaultValue}
        >
          <SelectTrigger id="parentId" className="h-12 text-base sm:text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Категории</SelectLabel>
              {selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" className="h-12 px-8">
          {submitButtonText}
        </Button>
        <Button
          render={<Link href="/categories"></Link>}
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
