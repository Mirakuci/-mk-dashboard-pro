"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Přehled" },
  { href: "/orders", label: "Objednávky" },
  { href: "/customers", label: "Zákazníci" },
  { href: "/products", label: "Produkty" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebarBrand">
        <div className="sidebarLogo">MK</div>
        <div>
          <div className="sidebarTitle">Ops Console</div>
          <div className="sidebarSub">Enterprise UI</div>
        </div>
      </div>

      <nav className="sidebarNav">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebarLink ${pathname === item.href ? "activeLink" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebarInfo">
        <div className="sidebarInfoTitle">Systém běží stabilně</div>
        <div className="sidebarInfoText">
          Připraveno pro napojení API a reálných dat.
        </div>
      </div>
    </aside>
  );
}