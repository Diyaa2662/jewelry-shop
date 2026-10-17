export const API_URL =
  import.meta.env.VITE_API_URL || "https://dahab.neotonicglobal.com";

/**
 * apiFetch — wrapper موحد لكل الطلبات
 * ملاحظة: المتجر ما بيعمل auth، فما في token
 */
export async function apiFetch(endpoint, options = {}) {
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}
