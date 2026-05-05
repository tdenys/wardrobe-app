import { ClothingItem } from "@/app/lib/types";

const LAYER_LABELS: Record<string, string> = {
  BASE: "Sous-vêtement",
  TOP: "Haut",
  MID: "Couche intermédiaire",
  OUTER: "Veste / Manteau",
  BOTTOM: "Bas",
  SHOES: "Chaussures",
  ACCESSORY: "Accessoire",
};

const STATUS_LABELS: Record<string, string> = {
  IN_WARDROBE: "Dans le dressing",
  WISHLIST: "Liste de souhaits",
  SUGGESTION: "Suggestion",
};

const STATUS_COLORS: Record<string, string> = {
  IN_WARDROBE: "bg-green-100 text-green-700",
  WISHLIST: "bg-yellow-100 text-yellow-700",
  SUGGESTION: "bg-blue-100 text-blue-700",
};

function WarmthIndicator({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${
            i < level ? "bg-orange-400" : "bg-gray-200"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{level}/5</span>
    </div>
  );
}

export default function ClothingCard({ item }: { item: ClothingItem }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {item.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-4xl">
          👕
        </div>
      )}

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-gray-800 text-sm truncate">
          {item.name}
        </h2>

        <p className="text-xs text-indigo-600 font-medium">
          {LAYER_LABELS[item.layer] ?? item.layer}
        </p>

        <div>
          <p className="text-xs text-gray-500 mb-1">Chaleur</p>
          <WarmthIndicator level={item.warmthLevel} />
        </div>

        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              STATUS_COLORS[item.status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {STATUS_LABELS[item.status] ?? item.status}
          </span>
          {item.isWaterproof && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-medium">
              Imperméable
            </span>
          )}
          {item.isWindproof && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 font-medium">
              Coupe-vent
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
