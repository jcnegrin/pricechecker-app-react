import {describe, it, expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import Card from './Card';


interface ShopView {
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



//Definimos si el compoente Card cumple con loque esperamos
describe("Funcionalidad del componente Card", () => {

    //Describimos lo que queremos que haga  nuestro componente
    it("Deberia recibir los tipos de datos de una interfaz exportada (ProductView) correctamente y mostrar en el renderizado los datos recibidos ", () => {

     //Datos de pruebas para el componente
     const testProduct: ProductView ={
        id:"123",
        name: "Producto de prueba",
        description: "Descripción del producto de prueba",
        imageUrl: "http://ejemplo.com/image.jpg",
        price: 50,
        shop:{
            id:"1",
            name:"Tienda de prueba"
        }
     };
    
     //Renderizamos el componente Card con los datos de prueba
     render(<Card producto={testProduct}/>);

     //Comprobamos que los elementos renderizados contengan los valores esperados
     const image = screen.getByAltText("ImagenDeproducto");
     const price = screen.getByText("50");
     const name = screen.getByText("Producto de prueba");



     //Realizamos las expectativas 
     expect(image).toBeInTheDocument();//Verifica que la imagen se haya renderizado
     expect(price).toBeInTheDocument();//Verifica que el precio se haya renderizado
     expect(name).toBeInTheDocument();//Verifica que el nombre  se haya renderizado


    })//Cierre del it 
})//Cierre del describe