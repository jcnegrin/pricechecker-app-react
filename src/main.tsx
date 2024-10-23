import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "./App";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import { fetchCategories } from "./hooks/fetchCategories";
import CategoriesOverview from "./components/CategoriesOverview/CategoriesOverview";

const categoryLoader = async () => {
  const categories = await fetchCategories();
  return categories;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // El diseño principal
    loader: categoryLoader, // El loader que queremos para cargar una sola vez
    children: [
      {
        index: true,
        element: <Navigate to="categories" replace={true} />
      },
      {
        path: "categories", // Ruta para /categories
        element: <CategoriesOverview /> // No necesita loader, ya que los datos se cargan en la raíz
      },
      {
        path: "shops/:shopId",
        element: <CategoriesOverview />
      },
      {
        path: "shops/:shopId/categories/:categoryId", // Ruta para categorías específicas
        element: <CategoryProducts />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);