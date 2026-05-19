"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { CreatePropertySchema } from "@/views/TenantProperties/property.schema";
import { useCategories } from "@/hooks/useCategories";
import { useSnackbar } from "notistack";

export default function PropertyCreateForm({ onSuccess }: { onSuccess: () => void }) {
  const { enqueueSnackbar } = useSnackbar(); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const {data : categories} = useCategories();

  async function submit() {
    try {
      await CreatePropertySchema.validate(
        {
          name,
          description,
          categoryId,
          address,
        },
        { abortEarly: false }
      );
    } catch (err: any) {
      enqueueSnackbar(err.errors[0], { variant: "error" });
      return;
    }

    if (!images.length) {
      enqueueSnackbar("Please upload at least 1 image", { variant: "warning" });
      return;
    }

    const fd = new FormData();
    fd.append("name", name.trim());
    fd.append("description", description.trim());
    fd.append("categoryId", categoryId);
    fd.append("address", address.trim());

    images.forEach((file) => {
      fd.append("images", file);
    });

    try {
      setLoading(true);
      await api.post("/tenant/properties", fd);
      onSuccess();
      enqueueSnackbar("Property created successfully", { variant: "success" });
    } catch (e: any) {
      enqueueSnackbar(e.response?.data?.message || "Gagal menyimpan properti", { variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Add Property</h2>

      <Input
        placeholder="Property name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2">
      <textarea
        className="rounded-md border px-4 py-2 text-sm"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="h-10 rounded-md border bg-background px-10 text-sm"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select category</option>
        {Array.isArray(categories) &&
        categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      </div>

      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) =>
          setImages(Array.from(e.target.files || []))
        }
      />
      <Input
      placeholder="Nama Tempat, Kecamatan, Kota/Kabupaten, Provinsi, Negara"
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />

      <Button 
      onClick={submit} 
      disabled={loading} 
      className={loading ? "cursor-wait" : "cursor-pointer"}
      >
        {loading ? "Saving..." : "Save Property"}
      </Button>
    </div>
  );
}
