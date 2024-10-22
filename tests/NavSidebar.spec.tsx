import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import NavSidebar from "../src/components/NavBar/NavSideBar";
import { describe, it, expect, vi, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Shop } from "../src/hooks/fetchCategories";  // Importa el tipo Shop si es necesario

// Datos de prueba (mock) para las categorías
const mockCategories: Shop[] = [
  {
    shopId: "1",
    shop: "Mercadona",
    categories: [
      { id: "1", name: "Carne" },
      { id: "2", name: "Pescado" },
    ],
  },
  {
    shopId: "2",
    shop: "Lidl",
    categories: [
      { id: "3", name: "Lácteos" },
      { id: "4", name: "Frutas" },
    ],
  },
];

describe("NavSidebar Component", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpia los mocks después de cada test
  });

  it("should render and close sidebar when button is clicked", async () => {
    const toggleSidebar = vi.fn(); // Mock de la función toggleSidebar

    await act(async () => {
      render(
        <BrowserRouter>
          <NavSidebar
            isOpen={true}
            toggleSidebar={toggleSidebar}
            categories={mockCategories} // Pasa las categorías como prop
          />
        </BrowserRouter>
      );
    });

    // Verifica que el botón de cerrar esté presente
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    // Simula un clic en el botón de cerrar
    fireEvent.click(closeButton);

    // Verifica que la función toggleSidebar haya sido llamada
    expect(toggleSidebar).toHaveBeenCalled();
  });

  it("should display shops and categories", async () => {
    const toggleSidebar = vi.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <NavSidebar
            isOpen={true}
            toggleSidebar={toggleSidebar}
            categories={mockCategories} // Pasa las categorías como prop
          />
        </BrowserRouter>
      );
    });

    // Verifica que los elementos de las tiendas se muestran
    const shopElement = await waitFor(() => screen.getByText("Mercadona"));
    expect(shopElement).toBeInTheDocument();

    // Simula clic en la tienda para mostrar las categorías
    fireEvent.click(shopElement);

    // Verifica que las categorías se muestran correctamente
    expect(await screen.findByText("Carne")).toBeInTheDocument();
    expect(await screen.findByText("Pescado")).toBeInTheDocument();
  });
});