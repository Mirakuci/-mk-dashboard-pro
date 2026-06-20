"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Přehled" },
  { href: "/orders", label: "Objednávky" },
  { href: "/customers", label: "Zákazníci" },
  { href: "/products", label: "Produkty" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${open ? "sidebarOpen" : ""}`}>
      <button
        className="sidebarClose"
        type="button"
        onClick={onClose}
        aria-label="Zavřít menu"
      >
        ✕
      </button>

      <div className="sidebarBrand">
        <div className="sidebarLogo">MK</div>
        <div>
          <div className="sidebarTitle">MK Cloud</div>
          <div className="sidebarSub">Dashboard</div>
        </div>
      </div>

      <nav className="sidebarNav">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebarLink ${pathname === item.href ? "activeLink" : ""}`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebarInfo">
        <div className="sidebarInfoTitle">Všechny systémy OK</div>
        <div className="sidebarInfoText">
          Uptime 99.98 % · Poslední sync před 2 min
        </div>
      </div>
    </aside>
  );
}
