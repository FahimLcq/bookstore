"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import ReorderableImages from "@/components/ReorderableImages";
import { Book } from "@/types/book";

export default function EditBookForm({ book }: { book: Book }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: book.title,
    author: book.author || "",
    description: book.description,
    price: book.price,
    category: book.category,
    condition: book.condition,
  });

  const [existingImages, setExistingImages] = useState<string[]>(
    book.images || []
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles(Array.from(e.target.files));
    }
  };

  const handleDeleteImage = (url: string) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const toastId = toast.loading("Mise à jour...");

    try {
      const newImageUrls: string[] = [];

      for (const file of newFiles) {
        const ext = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${ext}`;
        const path = fileName;

        const { error: uploadError } = await supabase.storage
          .from("book-images")
          .upload(path, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("book-images")
          .getPublicUrl(path);
        newImageUrls.push(data.publicUrl);
      }

      const updatedImages = [...existingImages, ...newImageUrls];

      const { error: updateError } = await supabase
        .from("books")
        .update({
          ...form,
          price: form.price,
          images: updatedImages,
        })
        .eq("id", book.id);

      if (updateError) throw updateError;

      toast.success("Livre mis à jour ✅", { id: toastId });
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour ❌", { id: toastId });
      setError("Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📘 Modifier le livre</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInput}
          className="w-full border px-4 py-2 rounded"
          placeholder="Titre"
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleInput}
          className="w-full border px-4 py-2 rounded"
          placeholder="Auteur"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInput}
          className="w-full border px-4 py-2 rounded"
          rows={4}
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInput}
          className="w-full border px-4 py-2 rounded"
          placeholder="Prix"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleInput}
          className="w-full border px-4 py-2 rounded"
          placeholder="Catégorie"
        />
        <input
          type="text"
          name="condition"
          value={form.condition}
          onChange={handleInput}
          className="w-full border px-4 py-2 rounded"
          placeholder="État (ex: Comme neuf)"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images existantes
          </label>
          <ReorderableImages
            images={existingImages}
            onChange={(newOrder) => setExistingImages(newOrder)}
            onDelete={handleDeleteImage}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ajouter des images
          </label>
          <label
            htmlFor="fileUpload"
            className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded px-4 py-6 text-center text-gray-600 hover:border-black hover:text-black transition"
          >
            📁 Cliquez ou glissez vos images ici
            <input
              id="fileUpload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {newFiles.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Fichiers sélectionnés :
              <ul className="list-disc ml-5">
                {newFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </div>
    </main>
  );
}
