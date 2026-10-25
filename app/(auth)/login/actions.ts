'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login (formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
        const safeMessage = 'Заполните поля корректно'
        redirect('/login?error=' + encodeURIComponent(safeMessage))
    }

    const supabase = await createClient();
  
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {    
        console.error('Ошибка входа:', error.message)

        const safeMessage = 'Неверный email или пароль'
        redirect('/login?error=' + encodeURIComponent(safeMessage))
    }

    redirect('/')

}