"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createPagesBrowserClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const isAdminRoute = pathname.startsWith("/admin");

      if (isAdminRoute && (event === "SIGNED_OUT" || !session)) {
        console.log("🔐 Session expirée — admin seulement");
        router.push("/auth/login");
      }

      if (event === "SIGNED_IN") {
        console.log("✅ Authentifié");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase, pathname]);

  return <>{children}</>;
}
