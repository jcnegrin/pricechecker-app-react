import { useState } from "react";
import { FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Shop } from "../../hooks/fetchCategories";

interface NavSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  categories: Shop[];  // Añade las categorías como prop
}

const NavSidebar = ({ isOpen, toggleSidebar, categories }: NavSidebarProps) => {
  const [openShops, setOpenShops] = useState<{ [key: string]: boolean }>({});

  const toggleShop = (shopId: string) => {
    setOpenShops((prevState) => ({
      ...prevState,
      [shopId]: !prevState[shopId],
    }));
  };

  return (
    <div
      className={`fixed z-50 inset-0 bg-gray-800 bg-opacity-75 flex transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-64 bg-white pt-0 p-4 transform transition-transform duration-300 h-screen overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="sticky top-0 bg-white z-10 p-4">
          <button onClick={toggleSidebar} className="mb-4">
            <FaTimes size={24} />
          </button>
        </div>

        <ul>
          {categories.map((shop: Shop) => (
            <li key={shop.shopId}>
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleShop(shop.shopId)}
              >
                <p className="font-bold text-lg">{shop.shop}</p>
                {openShops[shop.shopId] ? <FaChevronDown /> : <FaChevronRight />}
              </div>

              {openShops[shop.shopId] && (
                <ul className="ml-4">
                  {shop.categories.map((category) => (
                    <li key={category.id} className="py-1">
                      <Link
                        to={`/shops/${shop.shopId}/categories/${category.id}`}
                        className="text-neutral-600 hover:underline"
                        onClick={toggleSidebar}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1" onClick={toggleSidebar}></div>
    </div>
  );
};

export default NavSidebar;