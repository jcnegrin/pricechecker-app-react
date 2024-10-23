import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../Card/Card";

// Interfaces para las vistas
interface ShopView {
  id: string;
  name: string;
}

export interface ProductView {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  shop: ShopView;
}

interface GetProductsResponse {
  id: string;
  products: ProductView[];
}

const CategoryProducts = () => {
  const { shopId, categoryId } = useParams<{ shopId: string; categoryId: string }>();
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pricechecker.negrinjuan.com/api/products?categoryId=${categoryId}&shopId=${shopId}`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: GetProductsResponse = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, shopId]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }
  if (error) {
    return <div>Error al cargar productos: {error}</div>;
  }

  // Transformar los productos obtenidos a la estructura que espera el componente Card
  const formattedProducts = products.map(product => ({
    producto: product.name,
    price: `${product.price.toFixed(2)} €`,
    description: product.description,
    imgUrl: product.imageUrl,
    title: product.name,
  }));

  return (
    <div>
      <h1>Productos de la Categoría {categoryId} en la tienda {shopId}</h1>
      {products.map((producto, id) => (
        <Card key={id} producto={producto} />
      ))}
    </div>
  );
};

export default CategoryProducts;
