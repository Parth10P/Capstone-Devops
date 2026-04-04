const API_BASE = "/api";

export interface Product {
  id: number;
  name: string;
  nameHi: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  const all = await fetchProducts();
  if (category === "all") return all;
  return all.filter((p) => p.category === category);
}
