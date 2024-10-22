import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../src/components/Header/Header";
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

describe("Header Component", () => {
  it("should render the header with the basic elements", () => {
    render(<Header categories={mockCategories} />);

    // Verifica que el título está presente
    expect(screen.getByText("Price Checker")).toBeInTheDocument();

    // Verifica que el input de búsqueda está presente
    expect(screen.getByPlaceholderText("Buscador...")).toBeInTheDocument();
  });

  it("should open and close the sidebar when the button is clicked", () => {
    render(<Header categories={mockCategories} />);

    const toggleButton = screen.getByText("Productos");

    // Simula un clic para abrir el sidebar
    fireEvent.click(toggleButton);

    // Verifica que el sidebar muestra las categorías de los supermercados
    expect(screen.getByText("Mercadona")).toBeVisible();
    expect(screen.getByText("Lidl")).toBeVisible();

    // Simula otro clic para cerrar el sidebar
    fireEvent.click(toggleButton);
  });
});