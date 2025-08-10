import { Bell, Sun,Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState,useEffect } from "react";
 

const Header = () => {
 const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-sm">
      <Input type="text" placeholder="Search..." className="max-w-sm" />
      <div className="flex items-center gap-4">
        
        <Bell className="text-gray-600 dark:text-gray-300 " />
          
       {darkMode ? (
          <Sun
            className="cursor-pointer text-yellow-400"
            onClick={() => setDarkMode(false)}
          />
        ) : (
          <Moon
            className="cursor-pointer text-gray-600 dark:text-gray-300"
            onClick={() => setDarkMode(true)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
