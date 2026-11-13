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
import { getParentCategoryOptions } from '@/lib/queries/getParentCategoryOptions';
import { createCategory } from '@/lib/actions/createCategory';

export default async function NewCategoryPage() {
  const { data: categories, error: categoriesError } =
    await getParentCategoryOptions();

  if (categoriesError) {
    return <div>Ошибка при попытке получить категории</div>;
  }

  const selectOptions = [
    { value: null, label: 'Нет, Верхний уровень' },
    ...(categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? []),
  ];

  return (
    <div className="w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Новая категория
      </h1>
      <div className="rounded-xl border bg-card p-5 sm:p-8">
        <form action={createCategory} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-base sm:text-lg">
              Название
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Например, Смесители"
              className="h-12 text-base sm:text-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="parentId" className="text-base sm:text-lg">
              Родительская категория
            </Label>
            <Select name="parentId" items={selectOptions}>
              <SelectTrigger
                id="parentId"
                className="h-12 text-base sm:text-lg"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Родительская категория</SelectLabel>
                  {selectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button type="submit" className="h-12 px-8">
              Сохранить
            </Button>
            <Button
              render={<Link href="/categories">Отмена</Link>}
              nativeButton={false}
              variant="outline"
              type="reset"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
