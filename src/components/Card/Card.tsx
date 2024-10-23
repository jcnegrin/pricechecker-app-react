import React from 'react';
import CategoryProducts, { ProductView } from '../CategoryProducts/CategoryProducts';

//Recibimos una estructura de objeto del Componente CategoryProduct
interface CardProps {
  producto: ProductView;
}

// Componente Card simplificado
const Card: React.FC<CardProps> = ({ producto }) => {
  //Retorna un vista de cada producto qyue lo implemente
  return (
    <div>
      <div>
        <img src={producto.imageUrl} alt="ImagenDeproducto" />
        <p>{producto.price}</p>
        <h4>{producto.name}</h4>
      </div>
    </div>
  );
};

export default Card;
