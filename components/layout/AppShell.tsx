"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="appShell">
      <button
        className="menuToggle"
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Otevřít menu"
      >
        <span />
        <span />
        <span />
      </button>

      {sidebarOpen && (
        <div
          className="sidebarOverlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <section className="appContent">{children}</section>
    </main>
  );
}
