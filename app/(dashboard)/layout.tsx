import { Button } from "@/components/ui/button";
import { logout } from "./actions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface ILayout {
    children: React.ReactNode;
}

export default async function Layout({children}: ILayout) {

    const supabase = await createClient();
    const loginData = await supabase.auth.getClaims()

    if (loginData.data == null || loginData.error) redirect('/login')

    const userId = loginData.data.claims.sub;
    const profileData = await supabase.from('profiles').select('full_name, role').eq('id', userId).single();

    if(profileData.error){
        redirect('/profileError')
    }

    const profileName = profileData.data?.full_name
    const profileRole = profileData.data?.role;

    return (
        <div>
            <header>
                <div>{profileName}</div>
                <div>Роль: {profileRole}</div>
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
