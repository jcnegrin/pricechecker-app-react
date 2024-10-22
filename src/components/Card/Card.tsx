import React from 'react';
import { ProductView } from '../CategoryProducts/CategoryProducts';

interface CardProps {
  producto: ProductView;
}

// Componente Card simplificado
const Card: React.FC<CardProps> = ({ producto }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      {/* Imagen del producto */}
      <div className="h-48 overflow-hidden">
        <img
          src={producto.imageUrl}
          alt={producto.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Precio del producto */}

        {/* Nombre del producto */}
        <h4 className="text-md font-medium text-gray-800 mt-2 mb-4 line-clamp-2">
          {producto.name}
        </h4>

        <p className="text-lg font-semibold text-gray-700">{producto.price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default Card;
