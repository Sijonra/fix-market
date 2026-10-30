import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/logout';

export default function Error() {
  return (
    <div>
      <h1>Аккаунт не настроен, обратитесь к администратору</h1>
      <form action={logout}>
        <Button type="submit">Выйти</Button>
      </form>
    </div>
  );
}
