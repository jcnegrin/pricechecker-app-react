import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ShopView {
  id: string;
  name: string;
}

interface ProductView {
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

  return (
    <>
      <h1>Productos de la Categoría {categoryId} en la tienda {shopId}</h1>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.imageUrl} alt={product.name} width="100" />
              <p>{product.description}</p>
              <p>Precio: {product.price.toFixed(2)} €</p>
              <p>Tienda: {product.shop.name}</p>
            </li>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </ul>
    </>
  );
};

export default CategoryProducts;