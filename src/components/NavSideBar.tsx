import { FaTimes } from "react-icons/fa";

interface NavSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NavSidebar = function(props: NavSidebarProps) {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex transition-opacity duration-300 ${
        props.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-64 bg-white p-4 transform transition-transform duration-300 ${
          props.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={props.toggleSidebar} className="mb-4">
          <FaTimes size={24} />
        </button>
        <ul>
          <li className="py-2"><a href="#">Category 1</a></li>
          <li className="py-2"><a href="#">Category 2</a></li>
          <li className="py-2"><a href="#">Category 3</a></li>
        </ul>
      </div>
      <div className="flex-1" onClick={props.toggleSidebar}></div>
    </div>
  );
};

export default NavSidebar;
