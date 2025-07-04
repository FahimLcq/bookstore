"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function AddBookPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(fileList);
      setPreviews(fileList.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const toastId = toast.loading("Ajout du livre...");

    try {
      const imageUrls: string[] = [];

      for (const file of files) {
        const ext = file.name.split(".").pop();
        const filename = `${uuidv4()}.${ext}`;
        const path = filename;

        const { error: uploadError } = await supabase.storage
          .from("book-images")
          .upload(path, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("book-images")
          .getPublicUrl(path);

        imageUrls.push(data.publicUrl);
      }

      const { error: insertError } = await supabase.from("books").insert({
        ...form,
        price: parseFloat(form.price),
        images: imageUrls,
      });

      if (insertError) throw insertError;

      toast.success("Livre ajouté avec succès ✅", { id: toastId });
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'ajout ❌", { id: toastId });
      setError("Une erreur est survenue lors de l'ajout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Ajouter un livre</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          required
          className="w-full border px-4 py-2 rounded"
          onChange={handleInput}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border px-4 py-2 rounded"
          rows={4}
          onChange={handleInput}
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          required
          className="w-full border px-4 py-2 rounded"
          onChange={handleInput}
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          className="w-full border px-4 py-2 rounded"
          onChange={handleInput}
        />

        <select
          name="condition"
          required
          className="w-full border px-4 py-2 rounded bg-white text-gray-700"
          onChange={handleInput}
          defaultValue=""
        >
          <option value="" disabled>
            Sélectionnez l’état du livre
          </option>
          <option value="Neuf">Neuf</option>
          <option value="Comme neuf">Comme neuf</option>
          <option value="Bon état">Bon état</option>
          <option value="Acceptable">Acceptable</option>
        </select>

        {/* Upload images */}
        <div>
          <label
            htmlFor="fileUpload"
            className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded px-4 py-6 text-center text-gray-600 hover:border-black hover:text-black transition"
          >
            📁 Cliquez pour ajouter des images
            <input
              id="fileUpload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
              {previews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Image ${i + 1}`}
                  className="w-full h-40 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Ajout en cours..." : "Ajouter le livre"}
        </button>
      </div>
    </main>
  );
}
