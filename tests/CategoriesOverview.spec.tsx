import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoriesOverview from "../src/components/CategoriesOverview/CategoriesOverview";
import { MemoryRouter, useOutletContext } from "react-router-dom";
import { Shop } from "../src/hooks/fetchCategories";

// Mock de las categorías
const mockCategories: Shop[] = [
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
];

// Configura el mock del contexto antes de cada test
beforeEach(() => {
  vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: vi.fn(() => ({
        categories: mockCategories, // Proporcionamos las categorías simuladas
      })),
    };
  });
});

describe("CategoriesOverview Component", () => {
  it("should render loading state if categories are not available", () => {
    // Simula el caso donde no hay categorías cambiando el retorno del mock
    (vi.mocked(useOutletContext)).mockReturnValueOnce({
      categories: undefined, // Simula que no hay categorías
    });

    render(
      <MemoryRouter>
        <CategoriesOverview />
      </MemoryRouter>
    );

    // Verificar que el mensaje de carga se muestra
    expect(screen.getByText("Loading categories...")).toBeInTheDocument();
  });

  it("should render shops and categories", async () => {
    render(
      <MemoryRouter>
        <CategoriesOverview />
      </MemoryRouter>
    );

    // Espera a que los encabezados de los supermercados estén presentes
    await waitFor(() => {
      expect(screen.getByText("Mercadona")).toBeInTheDocument();
      expect(screen.getByText("Lidl")).toBeInTheDocument();
    });

    // Verifica que las categorías están presentes
    await waitFor(() => {
      expect(screen.getByText("Carnes")).toBeInTheDocument();
      expect(screen.getByText("Lácteos")).toBeInTheDocument();
      expect(screen.getByText("Panadería")).toBeInTheDocument();
      expect(screen.getByText("Frutas")).toBeInTheDocument();
    });
  });

  it("should render links for categories", async () => {
    render(
      <MemoryRouter>
        <CategoriesOverview />
      </MemoryRouter>
    );

    // Espera a que los enlaces de las categorías estén presentes
    await waitFor(() => {
      const carnesLink = screen.getByText("Carnes").closest("a");
      const lacteosLink = screen.getByText("Lácteos").closest("a");

      expect(carnesLink).toHaveAttribute("href", "/shops/1/categories/1");
      expect(lacteosLink).toHaveAttribute("href", "/shops/1/categories/2");
    });
  });
});