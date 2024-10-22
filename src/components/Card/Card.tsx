import React from 'react';
import CategoryProducts, { ProductView } from '../CategoryProducts/CategoryProducts';
// Interfaz para el producto
interface Producto {
  producto: string;
  price: string;
  description: string;
  imgUrl: string;
  title: string;
}

// Props para el componente Card
interface CardProps {
  producto: ProductView;
}

// Componente Card simplificado
const Card: React.FC<CardProps> = ({ producto }) => {
  return (
    <div>
      <div>
        <img src={producto.imageUrl} alt="ImagenDeproducto" />
        <p>{producto.price}€</p>
        <h4>{producto.name}</h4>
        
      </div>
    </div>
  );
};

export default Card;
