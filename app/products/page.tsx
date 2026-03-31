"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import SectionCard from "../../components/ui/SectionCard";

type Product = {
  name: string;
  category: string;
  price: string;
  stock: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="appShell">
      <Sidebar />

      <section className="appContent">
        <Topbar
          title="Produkty"
          subtitle="Přehled produktů, modulů a nabízených řešení."
        />

        <section className="statsGrid">
          <article className="statCard">
            <span className="statLabel">Aktivní produkty</span>
            <strong className="statValue">18</strong>
            <small className="statChange up">+2.4 %</small>
          </article>

          <article className="statCard">
            <span className="statLabel">Nejprodávanější</span>
            <strong className="statValue">Dashboard licence</strong>
            <small className="statChange up">+9.1 %</small>
          </article>

          <article className="statCard">
            <span className="statLabel">Custom řešení</span>
            <strong className="statValue">6</strong>
            <small className="statChange up">+1.2 %</small>
          </article>

          <article className="statCard">
            <span className="statLabel">Na objednávku</span>
            <strong className="statValue">3</strong>
            <small className="statChange down">-0.4 %</small>
          </article>
        </section>

        <section className="mainGrid">
          <SectionCard title="Catalog" subtitle="Produktové portfolio" className="wideCard">
            <div className="tableMock">
              <div className="tableRow tableHead tableRowProducts">
                <span>Název</span>
                <span>Kategorie</span>
                <span>Cena</span>
                <span>Stav</span>
              </div>

              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="tableRow tableRowProducts skeletonRow">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.name} className="tableRow tableRowProducts">
                      <span>{product.name}</span>
                      <span>{product.category}</span>
                      <span>{product.price}</span>
                      <span className={product.stock === "Aktivní" ? "badge ok" : "badge warn"}>
                        {product.stock}
                      </span>
                    </div>
                  ))}
            </div>
          </SectionCard>

          <SectionCard title="Mix" subtitle="Kategorie produktů">
            <div className="trafficList">
              <div><span>SaaS</span><b>7</b></div>
              <div><span>Addon</span><b>4</b></div>
              <div><span>Custom</span><b>3</b></div>
              <div><span>Enterprise</span><b>4</b></div>
            </div>
          </SectionCard>
        </section>
      </section>
    </main>
  );
}