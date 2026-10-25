import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div className="login-container">
      <h1>Вход в систему</h1>
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