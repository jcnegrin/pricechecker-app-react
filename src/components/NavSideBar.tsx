import { useEffect, useState } from "react";
import { FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

interface Shop {
  shopId: string;
  shop: string;
  categories: Category[];
}

interface ApiResponse {
  data: Shop[];
}

interface NavSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NavSidebar = (props: NavSidebarProps) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openShops, setOpenShops] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories"); // Actualiza la URL
        if (!response.ok) {
          throw new Error("Error fetching categories");
        }
        const data: ApiResponse = await response.json();
        setShops(data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleShop = (shopId: string) => {
    setOpenShops((prevState) => ({
      ...prevState,
      [shopId]: !prevState[shopId],
    }));
  };

  return (
    <div
      className={`fixed z-50 inset-0 bg-gray-800 bg-opacity-75 flex transition-opacity duration-300 ${
        props.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-64 bg-white pt-0 p-4 transform transition-transform duration-300 h-screen overflow-y-auto ${
          props.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón para cerrar el sidebar */}
        <div className="sticky top-0 bg-white z-10 p-4">
          <button onClick={props.toggleSidebar} className="mb-4">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Mostrar mensaje de carga o error */}
        {loading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Lista de supermercados y categorías */}
        {!loading && !error && (
          <ul>
            {shops.map((shop: Shop) => (
              <li key={shop.shopId}>
                {/* Título del supermercado con acordeón */}
                <div
                  className="flex justify-between items-center cursor-pointer py-2"
                  onClick={() => toggleShop(shop.shopId)}
                >
                  <p className="font-bold text-lg">{shop.shop}</p>
                  {openShops[shop.shopId] ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </div>

                {/* Mostrar categorías solo si el acordeón está abierto */}
                {openShops[shop.shopId] && (
                  <ul className="ml-4">
                    {shop.categories.map((category) => (
                      <li key={category.name} className="py-1">
                        <Link
                          to={`/shops/${shop.shopId}/categories/${category.id}`}
                          className="text-neutral-600 hover:underline"
                          onClick={() => props.toggleSidebar()}
                        >
                          {category.name}
                        </Link>
                      </li>
                      // <li key={category.id} className="py-1">
                      //   {/* Enlace hacia la categoría, incluyendo shopId y categoryId */}
                      //   <Link
                      //     to={`/shops/${shop.shopId}/categories/${category.id}`}
                      //     className="text-blue-500 hover:underline"
                      //   >
                      //     {category.name}
                      //   </Link>
                      // </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Fondo para cerrar el sidebar al hacer clic */}
      <div className="flex-1" onClick={props.toggleSidebar}></div>
    </div>
  );
};

export default NavSidebar;
