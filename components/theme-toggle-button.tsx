"use client";

import { useTheme } from "@/app/_context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} className="cursor-pointer">
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
