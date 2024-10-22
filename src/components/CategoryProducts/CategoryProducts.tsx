import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { shopId, categoryId } = useParams<{ shopId: string; categoryId: string }>();

  return (
    <div>
      <h1>Productos de la Categoría {categoryId} en la tienda {shopId}</h1>
      {/* Aquí puedes cargar y mostrar productos filtrados */}
    </div>
  );
};

export default CategoryProducts;