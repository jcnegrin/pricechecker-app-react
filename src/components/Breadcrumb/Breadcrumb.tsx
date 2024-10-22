// Breadcrumb.tsx
import { Link, useLocation, useParams } from "react-router-dom";
import { Shop } from "../../hooks/fetchCategories";

interface BreadcrumbProps {
  categories: Shop[];
  location: ReturnType<typeof useLocation>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  const { shopId, categoryId } = useParams<{ shopId: string; categoryId: string }>();

  if (!categories || categories.length === 0) {
    return null; // No renderiza el breadcrumb si no hay categorías
  }

  const currentShop = categories.find(shop => shop.shopId === shopId);
  const currentCategory = currentShop?.categories.find(cat => cat.id === categoryId);

  return (
    <nav className="bg-gray-200 p-2 text-sm rounded">
      <ul className="flex space-x-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        {currentShop && (
          <>
            <li>/</li>
            <li>
              <Link to={`/shops/${currentShop.shopId}`}>{currentShop.shop}</Link>
            </li>
          </>
        )}
        {currentCategory && (
          <>
            <li>/</li>
            <li>{currentCategory.name}</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumb;