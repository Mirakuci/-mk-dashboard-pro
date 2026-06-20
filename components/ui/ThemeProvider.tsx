"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("theme") as Theme) ?? "dark";
}

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return (
    <ThemeContext value={{ theme, toggle }}>
      {children}
    </ThemeContext>
  );
}
