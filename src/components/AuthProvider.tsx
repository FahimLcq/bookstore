// components/AuthProvider.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createPagesBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Déconnexion automatique si la session expire
      if (event === "SIGNED_OUT" || !session) {
        console.log("⏳ Session expirée ou déconnectée");
        router.push("/auth/login");
      }

      // Optionnel : Log si reconnection
      if (event === "SIGNED_IN") {
        console.log("✅ Authentifié");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  return <>{children}</>;
}
