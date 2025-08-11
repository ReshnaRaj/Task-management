import { Bell, Sun,Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
 

const Header = () => {
const themeContext = useContext(ThemeContext);
 if (!themeContext) {
    throw new Error("Header must be used within a ThemeProvider");
  }
 const { theme, toggleTheme } = themeContext;
   
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-sm">
      <Input type="text" placeholder="Search..." className="max-w-sm" />
      <div className="flex items-center gap-4">
        
        <Bell className="text-gray-600 dark:text-gray-300 " />
          
       {theme === "dark" ?(
          <Sun
            className="cursor-pointer text-yellow-400"
              onClick={toggleTheme}
          />
        ) : (
          <Moon
            className="cursor-pointer text-gray-600 dark:text-gray-300"
               onClick={toggleTheme}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
