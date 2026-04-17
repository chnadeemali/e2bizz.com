import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase';

export async function Header() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-brand">E2BIZZ</Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
          <Link href="/">Browse</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/my-favorites">Favorites</Link>
          <Link href="/conversations">Messages</Link>
          {user ? (
            <form action="/api/auth/logout" method="post">
              <button className="rounded-xl border px-4 py-2">Logout</button>
            </form>
          ) : (
            <>
              <Link href="/login" className="rounded-xl border px-4 py-2">Login</Link>
              <Link href="/register" className="rounded-xl bg-brand px-4 py-2 text-white">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
