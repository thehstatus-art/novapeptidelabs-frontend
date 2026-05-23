import { API } from "../config/api";

export const getProductImageUrl = (image) => {
  if (!image) return "/no-image.png";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads/")) return `${API}${image}`;
  return image;
};
