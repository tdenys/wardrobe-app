export type ClothingLayer =
  | "BASE"
  | "TOP"
  | "MID"
  | "OUTER"
  | "BOTTOM"
  | "SHOES"
  | "ACCESSORY";

export type ItemStatus = "IN_WARDROBE" | "WISHLIST" | "SUGGESTION";

export interface ClothingItem {
  id: number;
  name: string;
  imageUrl?: string;
  layer: ClothingLayer;
  warmthLevel: number;
  isWaterproof: boolean;
  isWindproof: boolean;
  status: ItemStatus;
}
