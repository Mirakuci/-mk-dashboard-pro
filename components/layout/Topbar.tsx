"use client";

import { useTheme } from "../ui/ThemeProvider";
import { useToast } from "../ui/ToastProvider";

type Props = {
  title: string;
  subtitle: string;
};

export default function Topbar({ title, subtitle }: Props) {
  const { theme, toggle } = useTheme();
  const { addToast } = useToast();

  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="topbarActions">
        <button className="themeToggle" type="button" onClick={toggle} aria-label="Přepnout téma">
          {theme === "dark" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <button
          className="ghostBtn"
          type="button"
          onClick={() => addToast("Report exportován do CSV.", "success")}
        >
          Export
        </button>
        <button
          className="primaryBtn"
          type="button"
          onClick={() => addToast("Nový report byl vytvořen.", "info")}
        >
          Nový report
        </button>
      </div>
    </header>
  );
}
