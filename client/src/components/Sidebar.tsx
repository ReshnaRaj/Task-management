import React from "react";
import { FaTasks, FaClock, FaCheckCircle, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-16 bg-white shadow-md h-screen flex flex-col items-center py-4 gap-6">
      <FaHome className="text-xl cursor-pointer" title="Home" />
      <FaTasks className="text-xl cursor-pointer" title="Tasks" />
      <FaClock className="text-xl cursor-pointer" title="Timer" />
      <FaCheckCircle className="text-xl cursor-pointer" title="Completed" />
    </aside>
  );
};

export default Sidebar;