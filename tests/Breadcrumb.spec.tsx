import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Breadcrumb from "../src/components/Breadcrumb/Breadcrumb";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Shop } from "../src/hooks/fetchCategories";

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

describe("Breadcrumb Component", () => {
  it("should render breadcrumb with shop and category", () => {
    render(
      <MemoryRouter initialEntries={["/shops/1/categories/1"]}>
        <Routes>
          <Route
            path="/shops/:shopId/categories/:categoryId"
            element={
              <Breadcrumb
                categories={mockCategories}
                location={{ pathname: "/shops/1/categories/1" } as any}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Mercadona")).toBeInTheDocument();
    expect(screen.getByText("Carnes")).toBeInTheDocument();
  });

  it("should render links correctly", () => {
    render(
      <MemoryRouter initialEntries={["/shops/2/categories/3"]}>
        <Routes>
          <Route
            path="/shops/:shopId/categories/:categoryId"
            element={
              <Breadcrumb
                categories={mockCategories}
                location={{ pathname: "/shops/2/categories/3" } as any}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const homeLink = screen.getByText("Home");
    const shopLink = screen.getByText("Lidl");

    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
    expect(shopLink.closest("a")).toHaveAttribute("href", "/shops/2");
  });
});