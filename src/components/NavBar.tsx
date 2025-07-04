"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import LogoutButton from "./LogoutButton";
import { Database } from "@/types/database";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createPagesBrowserClient<Database>();

    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email && user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav>
      <ul className="flex items-center space-x-6 text-sm text-[#4e4039]">
        <li>
          <Link href="/" className="hover:underline transition">
            Accueil
          </Link>
        </li>
        <li>
          <Link href="/favoris" className="hover:underline transition ">
            Favoris
          </Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link href="/admin" className="hover:underline transition">
                Admin
              </Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
