import {
  Home,
  Calendar,
  ListTodo,
  BarChart2,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Taskify</h1>
        <nav className="flex flex-col gap-4 text-gray-700">
          <SidebarLink icon={<Home size={20} />} label="Dashboard" />
          <SidebarLink icon={<ListTodo size={20} />} label="Projects" />
          <SidebarLink icon={<ListTodo size={20} />} label="My Tasks" />
          <SidebarLink icon={<Calendar size={20} />} label="Calendar" />
          <SidebarLink icon={<BarChart2 size={20} />} label="Report" />
          <SidebarLink icon={<MessageCircle size={20} />} label="Messages" />
          <SidebarLink icon={<Settings size={20} />} label="Settings" />
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-indigo-100 p-4 rounded-lg text-center">
          <p className="text-sm font-semibold">Taskify Pro</p>
          <Button className="mt-2 w-full">Get Pro</Button>
        </div>
        <SidebarLink icon={<LogOut size={20} />} label="Sign Out" />
      </div>
    </aside>
  );
};

const SidebarLink = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
