import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';

export async function getCurrentProfileData() {
  const supabase = await createClient();

  const { data: loginData, error: loginError } =
    await supabase.auth.getClaims();

  if (!loginData || loginError) redirect('/login');

  const userId = loginData.claims.sub;
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', userId)
    .single();

  if (profileError) {
    redirect('/profile-error');
  }
  return { full_name: profileData.full_name, role: profileData.role };
}
