import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface Category {
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
  const [openShops, setOpenShops] = useState<{ [key: string]: boolean }>({}); // Estado para gestionar los acordeones abiertos

  // Efecto para hacer la llamada a la API cuando el componente se monte
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://pricechecker.negrinjuan.com/api/categories");
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

  // Función para alternar el estado abierto o cerrado de un supermercado en el acordeón
  const toggleShop = (shopId: string) => {
    setOpenShops((prevState) => ({
      ...prevState,
      [shopId]: !prevState[shopId], // Alternar entre abierto y cerrado
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
        <div className="sticky top-0 bg-white z-10 p-4">
          <button onClick={props.toggleSidebar} className="mb-4">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Loading or error message */}
        {loading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* List of shops and categories */}
        {!loading && !error && (
          <ul>
            {shops.map((shop: Shop) => (
              <li key={shop.shopId}>
                <div
                  className="flex justify-between items-center cursor-pointer py-2"
                  onClick={() => toggleShop(shop.shopId)}
                >
                  <p className="font-bold text-lg">{shop.shop}</p>
                  {openShops[shop.shopId] ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {/* Mostrar categorías solo si el acordeón está abierto */}
                {openShops[shop.shopId] && (
                  <ul className="ml-4">
                    {shop.categories.map((category) => (
                      <li key={category.name} className="py-1">
                        <a href="#">{category.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex-1" onClick={props.toggleSidebar}></div>
    </div>
  );
};

export default NavSidebar;