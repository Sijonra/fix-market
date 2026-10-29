import { Button } from "@/components/ui/button";
import { logout } from "./actions";

interface ILayout {
    children: React.ReactNode;
}

export default function Layout({children}: ILayout) {
  return (
    <div>
        <header>
            <form action={logout}> 
                <Button type="submit">Выйти</Button>
            </form>
        </header>
        <main>
            {children}
        </main>
    </div>
  );
}
