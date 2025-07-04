import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Debug log si besoin (à retirer en prod)
  console.log("📡 Server-side session:", session?.user?.email);
  console.log("🔐 Session:", session);
  console.log("🔐 Email:", session?.user.email);
  console.log(
    "🎯 ADMIN OK?:",
    session?.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  );

  // Redirection si pas connecté
  if (!session) {
    redirect("/auth/login");
  }

  // Redirection si l'email ne correspond pas à celui autorisé
  if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <>
      <Toaster position="top-right" />
      {children}
    </>
  );
}
