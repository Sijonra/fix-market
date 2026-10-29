import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from './actions';
import { getErrorMessage } from './error-messages';

interface ILoginPage {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: ILoginPage) {
  const { error: errorCode } = await searchParams;
  const errorMessage = getErrorMessage(errorCode);

  return (
    <div className="login-container">
      <h1>Вход в систему</h1>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <form action={login}>
        <div>
          <Input type="email" id="email" name="email" required></Input>
        </div>
        <div>
          <Input type="password" id="password" name="password" required></Input>
        </div>
        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
}
