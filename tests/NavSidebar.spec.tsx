import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import NavSidebar from "../src/components/NavSideBar";
import { describe, it, expect, vi, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

const mockCategoriesResponse = {
  data: [
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
  ],
};

// Mock para fetch
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(mockCategoriesResponse),
    headers: new Headers(),
    redirected: false,
    statusText: "OK",
    type: "basic",
    url: "",
    clone: () => null as any,
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve(""),
  } as Response)
);

describe("NavSidebar Component", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpia los mocks después de cada test
  });

  it("should render and close sidebar when button is clicked", async () => {
    const toggleSidebar = vi.fn(); // Mock de la función toggleSidebar

    await act(async () => {
      render(
        <BrowserRouter>
          <NavSidebar isOpen={true} toggleSidebar={toggleSidebar} />
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

  it("should display shops and categories after data is fetched", async () => {
    const toggleSidebar = vi.fn();

    await act(async () => {
      render(
        <BrowserRouter>
          <NavSidebar isOpen={true} toggleSidebar={toggleSidebar} />
        </BrowserRouter>
      );
    });

    // Espera a que aparezcan los elementos de las tiendas
    const shopElement = await waitFor(() => screen.getByText("Mercadona"));
    expect(shopElement).toBeInTheDocument();

    // Verifica que al hacer clic en la tienda se desplieguen las categorías
    await act(async () => {
      fireEvent.click(shopElement);
    });

    // Verifica que las categorías estén visibles
    expect(await screen.findByText("Carne")).toBeInTheDocument();
    expect(await screen.findByText("Pescado")).toBeInTheDocument();
  });
});