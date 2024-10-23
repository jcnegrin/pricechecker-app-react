import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Limpiar efecto al desmontar componente
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedProduct]);

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

    <>
      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-6 px-16">
        {products.length > 0 ? (
          products.map((producto) => (
            <div key={producto.id} onClick={() => openModal(producto)} className='cursor-pointer'>
              <Card producto={producto} />
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>
      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} closeModal={closeModal} />
      )}
    </>

  );
};

export default CategoryProducts;
