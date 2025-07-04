"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault(); // Empêche la soumission classique du formulaire

    const toastId = toast.loading("Connexion en cours...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Échec de la connexion ❌", { id: toastId });
      setError("Email ou mot de passe incorrect");
    } else {
      toast.success("Connecté avec succès ✅", { id: toastId });

      await new Promise((res) => setTimeout(res, 500));
      router.refresh();
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion admin</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
