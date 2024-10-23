import { useEffect, useState } from "react";
import { ProductView } from "../CategoryProducts/CategoryProducts";

interface ModalProps {
  product: ProductView;
  closeModal: () => void;
}

const ProductDetailModal = ({ product, closeModal }: ModalProps) => {
  const [similarProducts, setSimilarProducts] = useState<ProductView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para obtener productos similares
    const fetchSimilarProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pricechecker.negrinjuan.com/api/products/similar?productId=${product.id}`
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setSimilarProducts(data.products);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [product.id]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-2 sm:mx-4 sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col md:flex-row overflow-hidden relative">
        {/* Botón de cierre */}
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 z-20"
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Sección de detalles del producto */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-center items-center">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-4 text-center">
            {product.name}
          </h2>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-h-40 sm:max-h-64 object-contain rounded-lg mb-2 sm:mb-4"
          />
          <p className="text-gray-600 mb-2 sm:mb-4 text-center text-sm sm:text-base">
            {product.description}
          </p>
          <p className="text-base sm:text-lg font-semibold">
            Precio: {product.price.toFixed(2)} €
          </p>
          <p className="text-sm sm:text-md text-gray-600">Tienda: {product.shop.name}</p>
        </div>

        {/* Sección de productos similares con scroll */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 border-t md:border-t-0 md:border-l flex flex-col">
          <div className="sticky top-0 bg-white z-10">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-4">
              Productos similares
            </h3>
          </div>
          <div className="overflow-y-auto max-h-40 sm:max-h-60 md:max-h-80 lg:max-h-96">
            {loading ? (
              <p className="text-center">Cargando productos similares...</p>
            ) : error ? (
              <p className="text-center text-red-600">Error: {error}</p>
            ) : similarProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:gap-4">
                {similarProducts.map((similarProduct) => (
                  <div
                    key={similarProduct.id}
                    className="flex items-center border-b pb-2 sm:pb-4"
                  >
                    <img
                      src={similarProduct.imageUrl}
                      alt={similarProduct.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h4 className="text-sm sm:text-md font-semibold">
                        {similarProduct.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {similarProduct.price.toFixed(2)} €
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Tienda: {similarProduct.shop.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No hay productos similares disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;