import { Bell, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Input type="text" placeholder="Search..." className="max-w-sm" />
      <div className="flex items-center gap-4">
        <Globe className="text-gray-600" />
        <span>Eng (US)</span>
        <Bell className="text-gray-600" />
        <Avatar>
          <AvatarImage src="https://via.placeholder.com/40" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
