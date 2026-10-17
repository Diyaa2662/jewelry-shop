import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price) {
  return `$${Number(price).toLocaleString()}`;
}

/**
 * normalizeProduct — يحول الحقول الرقمية من string لـ number
 * ويضبط القيم null إلى false للـ flags
 */
export function normalizeProduct(p) {
  return {
    ...p,
    weight: parseFloat(p.weight) || 0,
    tax: parseFloat(p.tax) || 0,
    rating: parseFloat(p.rating) || 0,
    price: Number(p.price) || 0,
    status: p.status ?? false,
    featured: p.featured ?? false,
    most_sold: p.most_sold ?? false,
    newly_arrived: p.newly_arrived ?? false,
  };
}

/**
 * normalizeProductsResponse — يتعامل مع { data: [...] } أو [...]
 */
export function normalizeProductsResponse(res) {
  const list = Array.isArray(res) ? res : res?.data || [];
  return list.map(normalizeProduct);
}
