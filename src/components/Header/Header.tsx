import { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import NavSidebar from "../NavBar/NavSideBar";
import { Shop } from "../../hooks/fetchCategories";

interface HeaderProps {
  categories: Shop[];
}

export default function Header({ categories }: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="bg-white shadow p-4 flex flex-row items-center justify-between">
        <div className="flex items-center basis-[33.33%]">
          <button onClick={toggleSidebar} className="flex flex-col items-center">
            <FaBars size={24} />
            <p className="text-sm">Productos</p>
          </button>
          <div className="border-r border-gray-300 h-8 mx-4"></div>
          <p className="text-xl text-center flex-nowrap">Price Checker</p>
        </div>
        <div className="flex items-center flex-grow basis-[33.33%]">
          <input
            type="text"
            placeholder="Buscador..."
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="flex items-center justify-end basis-[33.33%]">
          <FaUser size={24} className="cursor-pointer" />
        </div>
      </header>
      <NavSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} categories={categories} />
    </>
  );
}