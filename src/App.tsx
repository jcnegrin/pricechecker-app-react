import "./index.css";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Shop } from "./hooks/fetchCategories";
import Header from "./components/Header/Header";

function App() {
  const categories = useLoaderData() as Shop[]; // Asegúrate de que sea un array de tiendas
  const location = useLocation();

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow">
          <Header categories={categories} />
          {categories && (
            <Breadcrumb categories={categories} location={location} />
          )}
          <main className="flex-grow p-6 bg-gray-100">
          <Outlet context={{ categories }} /> {/* Pasar categorías como contexto */}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
