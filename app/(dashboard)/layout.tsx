import { Button } from '@/components/ui/button';
import { getCurrentProfileData } from '@/lib/queries/getCurrentProfileData';
import { logout } from '@/lib/actions/logout';

interface ILayout {
  children: React.ReactNode;
}

export default async function Layout({ children }: ILayout) {
  const { full_name, role } = await getCurrentProfileData();

  return (
    <div>
      <header>
        <div>{full_name}</div>
        <div>Роль: {role}</div>
        <form action={logout}>
          <Button type="submit">Выйти</Button>
        </form>
      </header>
      <main>{children}</main>
    </div>
  );
}
