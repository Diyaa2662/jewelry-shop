import {
  products as mockProducts,
  categories as mockCategories,
} from "../data/products";

// لما يجهز الباك إند، منبدل هالجسم بـ fetch
export function useProducts() {
  return { products: mockProducts, categories: mockCategories };
}

export function useProduct(id) {
  const product = mockProducts.find((p) => p.id === Number(id));
  return { product };
}
