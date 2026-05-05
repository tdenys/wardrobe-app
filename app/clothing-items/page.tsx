"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/app/lib/apiClient";
import ClothingCard from "@/app/components/ClothingCard";
import { ClothingItem, ClothingLayer } from "@/app/lib/types";

const LAYER_FILTER_OPTIONS: { value: ClothingLayer | ""; label: string }[] = [
  { value: "", label: "Tous" },
  { value: "TOP", label: "Hauts" },
  { value: "BOTTOM", label: "Bas" },
  { value: "OUTER", label: "Vestes / Manteaux" },
  { value: "MID", label: "Couches intermédiaires" },
  { value: "BASE", label: "Sous-vêtements" },
  { value: "SHOES", label: "Chaussures" },
  { value: "ACCESSORY", label: "Accessoires" },
];

export default function ClothingItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layerFilter, setLayerFilter] = useState<ClothingLayer | "">("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchItems(layerFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerFilter]);

  async function fetchItems(layer: ClothingLayer | "") {
    setLoading(true);
    setError(null);
    try {
      const params = layer ? { layer } : {};
      const response = await apiClient.get<ClothingItem[]>("/clothing-items", {
        params,
      });
      setItems(response.data);
    } catch {
      setError("Impossible de charger les vêtements.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Mon Dressing</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Déconnexion
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Mes vêtements
            {!loading && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({items.length})
              </span>
            )}
          </h2>

          <select
            value={layerFilter}
            onChange={(e) =>
              setLayerFilter(e.target.value as ClothingLayer | "")
            }
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            {LAYER_FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="flex justify-center py-20 text-gray-400">
            Chargement...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500">{error}</div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            Aucun vêtement dans le dressing.
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <ClothingCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
