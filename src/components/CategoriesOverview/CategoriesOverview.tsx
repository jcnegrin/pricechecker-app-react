import React from "react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { Shop } from "../../hooks/fetchCategories";

const CategoriesOverview: React.FC = () => {
  const { categories } = useOutletContext<{ categories: Shop[] }>();

  if (!categories) {
    return <div>Loading categories...</div>; // Muestra un estado de carga mientras se obtiene la data
  }

  return (
    <div className="p-4 space-y-8">
      {" "}
      {/* Espacio entre los diferentes supermercados */}
      {categories.map((shop) => (
        <div key={shop.shopId}>
          {/* Encabezado del supermercado */}
          <h2 className="font-bold text-2xl text-gray-800 mb-4">{shop.shop}</h2>

          {/* Contenedor de las tarjetas de categorías */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {shop.categories.map((category) => (
              <Link
                key={category.id}
                to={`/shops/${shop.shopId}/categories/${category.id}`}
                className="block p-4 border rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <div className="flex flex-col justify-center items-center h-20">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesOverview;
