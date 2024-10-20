/*Funcion modularizada para que se le pueda pasar cualquir url de alguna Api*/

import { useState, useEffect } from "react";

export function useFetch(url) {
//Estados para almacenar los productos
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true); // Este estado controla si la peticion se esta realizando o ya a finalizado

//useEffect para haceer la solucitud al backend cuando el componente se monta
useEffect(() => {
    setLoading(true); //Por si recarga la pagina, que no haya un efecto secundario 
   fetch(url)
   .then((response) => response.json())
   .then((data) => setData(data))
   .finally(() => setLoading(false)); //Este metodo se ejecutara cundo hayan terminado las promesas

     }, []); //[] se asegura que esto solo se ejecute una vez al montar el componente
    
     return {data, loading} //Objeto
    }
