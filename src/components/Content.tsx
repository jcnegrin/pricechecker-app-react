import { Outlet } from "react-router-dom";
import {Card} from "./Card";
export default function Content() {
    return (
      <main className="flex-grow p-6 bg-gray-100">
         <h1 className="text-3xl font-bold mb-6">Welcome to the PriceChecker!</h1>
         <Outlet />
    </main>
        
      );
};































/* 
import { useFetch } from "../useFetch";
  const {data, loading} = useFetch("https://jsonplaceholder.typicode.com/users");

<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        
            <h1>Nombres </h1>
            <div>
            <ul>
              {loading && <li>Loading...</li>}/*
              {data?.map((user) => (
                <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
         </div>*/