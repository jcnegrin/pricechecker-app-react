import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchCategories, Shop } from "../src/hooks/fetchCategories";

// Mock de la API Response
const mockCategoriesResponse = {
  data: [
    {
      shopId: "1",
      shop: "Mercadona",
      categories: [
        { id: "1", name: "Carnes" },
        { id: "2", name: "Lácteos" },
      ],
    },
    {
      shopId: "2",
      shop: "Lidl",
      categories: [
        { id: "3", name: "Panadería" },
        { id: "4", name: "Frutas" },
      ],
    },
  ],
};

// Limpiar mocks después de cada prueba
afterEach(() => {
  vi.clearAllMocks();
});

describe("fetchCategories", () => {
  it("should fetch categories successfully", async () => {
    // Usa globalThis en lugar de global
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategoriesResponse),
      } as Response)
    );

    const categories = await fetchCategories();

    expect(categories).toEqual(mockCategoriesResponse.data);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://pricechecker.negrinjuan.com/api/categories");
  });

  it("should throw an error if the response is not ok", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response)
    );

    await expect(fetchCategories()).rejects.toThrow("Error fetching categories");

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array if data is not present", async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );

    const categories = await fetchCategories();

    expect(categories).toEqual([]);
  });
});