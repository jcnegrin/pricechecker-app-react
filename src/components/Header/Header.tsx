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
      <header className="bg-white shadow p-4 flex items-center justify-between relative">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="flex flex-col items-center">
            <FaBars size={24} />
            <p className="text-sm">Productos</p>
          </button>
          <div className="border-r border-gray-300 h-8 mx-4"></div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-xl font-semibold">Price Checker</p>
        </div>

        {/* <div className="flex items-center">
          <FaUser size={24} className="cursor-pointer" />
        </div> */}
      </header>
      <NavSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} categories={categories} />
    </>
  );
}