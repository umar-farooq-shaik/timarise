import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⏰</span>
          <h1 className="text-xl font-outfit font-bold text-primary">
            Timarise
          </h1>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-2xl border-primary/20 hover:bg-primary/10"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-energy" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;