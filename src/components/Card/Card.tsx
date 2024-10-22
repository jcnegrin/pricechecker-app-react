import React from 'react';
import { useState } from 'react';




//Interfaz para el producto
interface Producto {
    producto: string;
    price: string;
    description: string;
    imgUrl: string;
    title: string;

}

//Props para el modal
interface ModalProps {
    producto : Producto | null;
    onClose: () => void;
}

//Componente para el modal
const Modal: React.FC<ModalProps> = ({producto, onClose}) => {
        if (!producto) return null;//No mostrar nada si no hay productos seleccionado

        return(
        <div className='fixed inset-7 bg-black bg-opacity-50 flex items-center justify-center'>
         <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
          {/*Boton para cerrar el modal */}
           <button onClick={onClose} className='absolute top-2 right-2 text-xl'>
             &times;
           </button>

         {/*Contenido del modal */}
        <img src={producto.imgUrl} alt={producto.title} className='w-full h-64 object-cover mb-4'/>
        <h4 className='font-serif text-xl mb-2'>{producto.producto}</h4>
        <p className='text-gray-700 mb-2'>{producto.price}</p>
        <p className='text-gray-700 mb-4'>{producto.description}</p>
     </div>
 </div>  
 );
};


//Componente principal donde definimos los productos 
export const Card: React.FC = () => {
    const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
    
    const productos: Producto[] = [
        {
        producto:"Zumo",
        price:"$10.00",
        description:"Jugos de los Frutos del bosque",
        imgUrl:"/producto1.jpg",
        title:"Product 1", 
      },
  
      {
        producto:"Pizza",
        price:"$15.00",
        description:"Pìzza de Peperoni",
        imgUrl:"/producto2.jpg",
        title:"Imagen de Pizza", 
      },

      {
        producto:"Hamburguesa",
        price:"$12.00",
        description:"Hamburguesa cogeladas pack x6",
        imgUrl:"./producto3.jpg",
        title:"Image de hamburguesa", 
      },
      {
        producto:"Leche",
        price:"$1.45",
        description:"Leche semi desnatada 60 ml",
        imgUrl:"/producto4.jpg",
        title:"Image de leche", 
      },
];

//Funcion para abrir el modal con el producto selecionado
const openModal = (producto: Producto) => {
setSelectedProducto(producto);

};

//Funcion para cerrar el modal
const closeModal = () => {
    setSelectedProducto(null);
};

return (
  
  <div className=' md:container md:mx-auto p-6  bg-gray-300 relative top-[300px] mx-auto  '>   {/*Container flexible que se adapta a cualquier resolucion /}  
   {/*Lista de productos*/}
   <div className='  flex flex-wrap justify-center'>
       {productos.map((producto, index) => (
         <div 
         key={index}
         className='2xl:bg-white-400 text-center font-wheight text-lg p-10 m-4 text-black  border-neutral-100 rounded-xl bg-neutral-50 shadow cursor-pointer'
         onClick={()=> openModal(producto)}

         >
            <img src={producto.imgUrl} alt={producto.title} className='mx-auto  w-64 h-64  flex items-center justify-center h-60 '/>
            <h4 className="font-serif py-7 ">{producto.producto}</h4>
            <p className="font-serif ">{producto.price}</p>
            <p className="font-serif ">{ producto.description}</p>
         </div>
         ))}
     </div>

     {/*Modal*/}
     <Modal producto={selectedProducto} onClose={closeModal} />

</div>


);



};
    
export default Card;

