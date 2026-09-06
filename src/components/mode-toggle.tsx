"use client";

import { styleClass } from "@/styles/classes";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className={styleClass("componentsModeToggleStyle1")} />
      <Moon className={styleClass("componentsModeToggleStyle2")} />
      <span className={styleClass("componentsModeToggleStyle3")}>Toggle theme</span>
    </Button>
  );
}
