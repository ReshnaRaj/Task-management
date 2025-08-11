import {
  Home,
  Calendar,
  ListTodo,
  BarChart2,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
   const dispatch = useDispatch();
   const navigate=useNavigate()

  const handleLogout = () => {
    dispatch(logout());
     
    navigate("/");
  };
  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 p-4 dark:bg-gray-900 shadow-md flex items-center gap-4">
        <Menu
          size={24}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />
      </div>
      <aside
        className={`fixed  lg:static top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900  shadow-md flex flex-col justify-between p-4 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <span className="font-bold text-lg">Taskify</span>
            <X
              size={24}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <h1 className="text-2xl font-bold mb-6 hidden lg:block">Taskify</h1>
          <nav className="flex flex-col gap-4 text-gray-700 dark:text-white">
            <SidebarLink icon={<Home size={20} />} label="Dashboard" />
            <SidebarLink icon={<ListTodo size={20} />} label="Projects" />
            <SidebarLink icon={<ListTodo size={20} />} label="Tasks" />
            <SidebarLink icon={<Calendar size={20} />} label="Calendar" />
            <SidebarLink icon={<BarChart2 size={20} />} label="Report" />
            <SidebarLink icon={<MessageCircle size={20} />} label="Messages" />
            <SidebarLink icon={<Settings size={20} />} label="Settings" />
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-indigo-100 p-4 rounded-lg text-center">
            <p className="text-sm font-semibold dark:text-black">Taskify Pro</p>
            <Button className="mt-2 w-full dark:bg-white">Get Pro</Button>
          </div>
          <SidebarLink icon={<LogOut size={20} />} label="Sign Out" onClick={handleLogout}/>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({
  icon,
  label,
  onClick,
  
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
 
}) => (
  <div onClick={onClick} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
