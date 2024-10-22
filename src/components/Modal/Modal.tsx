import React from 'react';

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
  producto: Producto;
  onClick: () => void;  // Nueva prop para manejar el clic
}

// Componente Card simplificado
const Card: React.FC<CardProps> = ({ producto, onClick }) => {
  return (
    <div onClick={onClick}>
      <div>
        <img src={producto.imgUrl} alt={producto.title} />
        <h4>{producto.producto}</h4>
        <p>{producto.price}</p>
        <p>{producto.description}</p>
      </div>
    </div>
  );
};

export default Card;
