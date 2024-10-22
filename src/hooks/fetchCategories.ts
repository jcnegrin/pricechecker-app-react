export interface Category {
  id: string;
  name: string;
}

export interface Shop {
  shopId: string;
  shop: string;
  categories: Category[];
}

export interface ApiResponse {
  data: Shop[];
}

export const fetchCategories = async (): Promise<Shop[]> => {
  const response = await fetch("https://pricechecker.negrinjuan.com/api/categories");
  if (!response.ok) {
    throw new Error("Error fetching categories");
  }
  const data = await response.json();

  // Asegúrate de que `data` sea un array o lo que esperas
  return data.data || []; // Retorna un array vacío si no hay categorías
};
