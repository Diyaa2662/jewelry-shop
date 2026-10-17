import { apiFetch } from "./api";

// ============ Products ============
export const productService = {
  // جميع المنتجات (بترجع الكل — نفلتر بالفرونت حالياً)
  getAll: () => apiFetch("/api/products"),

  // تفاصيل منتج واحد
  getById: (id) => apiFetch(`/api/products/${id}`),

  // ===== Homepage sections =====
  getFeatured: () => apiFetch("/api/products/featured"),
  getMostSold: () => apiFetch("/api/products/most-sold"),
  getNewlyArrived: () => apiFetch("/api/products/newly-arrived"),

  // ===== Filter by category + material =====
  getByCategoryMaterial: (categoryId, materialId) =>
    apiFetch(
      `/api/products/by-category-material?category_id=${categoryId}&material_id=${materialId}`,
    ),
};

// ============ Categories ============
export const categoryService = {
  getAll: () => apiFetch("/api/categories"),
  getById: (id) => apiFetch(`/api/categories/${id}`),
};

// ============ Materials ============
export const materialService = {
  getAll: () => apiFetch("/api/materials"),
};

// ============ Featured Categories ============
export const featuredCategoryService = {
  getAll: () => apiFetch("/api/featured-categories"),
  getById: (id) => apiFetch(`/api/featured-categories/${id}`),
};
