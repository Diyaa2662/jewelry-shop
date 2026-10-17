import { useState, useEffect, useCallback } from "react";
import { productService } from "../lib/services";
import { normalizeProductsResponse } from "../lib/utils";

// ============================================
// Hook رئيسي لصفحة المنتجات (كل المنتجات)
// ============================================
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getAll();
      setProducts(normalizeProductsResponse(res));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAll();
  }, [fetchAll]);

  return { products, loading, error, refetch: fetchAll };
}

// ============================================
// Hook لكل تاب بالـ Home (Featured / MostSold / NewlyArrived)
// ============================================
const HOME_ENDPOINTS = {
  all: () => productService.getFeatured(),
  best: () => productService.getMostSold(),
  new: () => productService.getNewlyArrived(),
};

export function useHomeProducts(tab) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    const fetchFn = HOME_ENDPOINTS[tab];
    if (!fetchFn) {
      setLoading(false);
      return;
    }

    fetchFn()
      .then((res) => {
        if (!cancelled) setProducts(normalizeProductsResponse(res));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab]);

  return { products, loading, error };
}
