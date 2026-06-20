"use client";

import { useEffect, useMemo, useState } from "react";
import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/ui/SectionCard";

type Product = {
  name: string;
  category: string;
  price: string;
  stock: string;
};

const CATEGORIES = ["Vše", "SaaS", "Addon", "Custom", "Enterprise"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Vše");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "Vše" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  return (
    <>
      <Topbar
        title="Produkty"
        subtitle="Přehled produktů, modulů a nabízených řešení."
      />

      <section className="statsGrid">
        <StatCard label="Aktivní produkty" value="18" change="+2.4 %" positive />
        <StatCard label="Nejprodávanější" value="Dashboard licence" change="+9.1 %" positive />
        <StatCard label="Custom řešení" value="6" change="+1.2 %" positive />
        <StatCard label="Na objednávku" value="3" change="-0.4 %" positive={false} />
      </section>

      <section className="mainGrid">
        <SectionCard
          title="Katalog"
          subtitle="Produktové portfolio"
          className="wideCard"
        >
          <div className="tableControls">
            <input
              type="text"
              className="searchInput"
              placeholder="Hledat dle názvu…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filterGroup">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`filterBtn ${categoryFilter === c ? "filterActive" : ""}`}
                  onClick={() => setCategoryFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="tableMock">
            <div className="tableRow tableHead tableRowProducts">
              <span>Název</span>
              <span>Kategorie</span>
              <span>Cena</span>
              <span>Stav</span>
            </div>

            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="tableRow tableRowProducts skeletonRow"
                >
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              ))
            ) : filtered.length === 0 ? (
              <div className="emptyState">
                Žádné produkty neodpovídají filtru.
              </div>
            ) : (
              filtered.map((product) => (
                <div
                  key={product.name}
                  className="tableRow tableRowProducts"
                >
                  <span>{product.name}</span>
                  <span>{product.category}</span>
                  <span>{product.price}</span>
                  <span
                    className={
                      product.stock === "Aktivní" ? "badge ok" : "badge warn"
                    }
                  >
                    {product.stock}
                  </span>
                </div>
              ))
            )}
          </div>
        </SectionCard>

        <SectionCard title="Mix" subtitle="Kategorie produktů">
          <div className="trafficList">
            <div>
              <span>SaaS</span>
              <b>7</b>
            </div>
            <div>
              <span>Addon</span>
              <b>4</b>
            </div>
            <div>
              <span>Custom</span>
              <b>3</b>
            </div>
            <div>
              <span>Enterprise</span>
              <b>4</b>
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
