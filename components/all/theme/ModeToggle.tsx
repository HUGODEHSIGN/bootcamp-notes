import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import TooltipAll from "../TooltipAll";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // dropdown item data
  const themeDropdownItems = [
    { theme: "light", displayName: "Light", icon: <Sun className="w-4 h-4" /> },
    { theme: "dark", displayName: "Dark", icon: <Moon className="w-4 h-4" /> },
    {
      theme: "system",
      displayName: "System",
      icon: <MonitorSmartphone className="w-4 h-4" />,
    },
  ];

  // renders dropdown items
  function renderThemeDropdownItems() {
    return themeDropdownItems.map((item) => (
      <DropdownMenuItem onClick={() => setTheme(item.theme)} key={item.theme}>
        {item.displayName}
        <DropdownMenuShortcut>{item.icon}</DropdownMenuShortcut>
      </DropdownMenuItem>
    ));
  }

  return (
    <DropdownMenu>
      <TooltipAll
        content={`Change to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {/* uses styles to conditionally render icons */}
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
      </TooltipAll>
      <DropdownMenuContent
        align="end"
        // prevent tooltip from showing after selection through focus
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {renderThemeDropdownItems()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
