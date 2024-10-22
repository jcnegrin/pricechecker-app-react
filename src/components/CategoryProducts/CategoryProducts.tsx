import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal';
import Card from '../Card/Card';

export interface ShopView {
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

export interface GetProductsResponse {
  id: string;
  products: ProductView[];
}

const CategoryProducts = () => {
  const { shopId, categoryId } = useParams<{ shopId: string; categoryId: string }>();
  const [products, setProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductView | null>(null);

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

  const openModal = (product: ProductView) => {
    setSelectedProduct(product);  // Abre el modal con el producto seleccionado
  };

  const closeModal = () => {
    setSelectedProduct(null);  // Cierra el modal
  };

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
          products.map((producto, id) => (
            <li>
              <Card key={id} producto={producto} />
            </li>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )
      }
      </ul>
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} closeModal={closeModal} />
      )}
    </>
  );
};

export default CategoryProducts;
