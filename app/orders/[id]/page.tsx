"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Topbar from "../../../components/layout/Topbar";
import SectionCard from "../../../components/ui/SectionCard";

type OrderItem = {
  name: string;
  qty: number;
  price: string;
};

type OrderDetail = {
  id: string;
  customer: string;
  email: string;
  status: string;
  amount: string;
  date: string;
  items: OrderItem[];
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.order) {
          setOrder(data.order);
          setLoading(false);
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (notFound) {
    return (
      <>
        <Topbar title="Objednávka" subtitle="Detail objednávky" />
        <SectionCard title="Chyba" subtitle="Objednávka nenalezena">
          <div className="emptyState">
            <p>Objednávka #{id} neexistuje.</p>
            <Link href="/orders" className="primaryBtn" style={{ display: "inline-flex", marginTop: 12 }}>
              Zpět na objednávky
            </Link>
          </div>
        </SectionCard>
      </>
    );
  }

  return (
    <>
      <Topbar
        title={loading ? "Načítání…" : `Objednávka #${order?.id}`}
        subtitle="Detail objednávky"
      />

      <div className="detailHeader">
        <Link href="/orders" className="backLink">
          ← Zpět na objednávky
        </Link>
      </div>

      <section className="statsGrid statsGridThree">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="statCard skeleton" />
          ))
        ) : (
          <>
            <article className="statCard">
              <span className="statLabel">Zákazník</span>
              <strong className="statValue">{order?.customer}</strong>
              <small className="statMuted">{order?.email}</small>
            </article>
            <article className="statCard">
              <span className="statLabel">Status</span>
              <strong className="statValue">
                <span
                  className={
                    order?.status === "Zaplaceno"
                      ? "badge ok"
                      : order?.status === "Čeká"
                      ? "badge warn"
                      : "badge danger"
                  }
                >
                  {order?.status}
                </span>
              </strong>
              <small className="statMuted">{order?.date}</small>
            </article>
            <article className="statCard">
              <span className="statLabel">Celkem</span>
              <strong className="statValue">{order?.amount}</strong>
              <small className="statMuted">
                {order?.items.length}{" "}
                {order?.items.length === 1 ? "položka" : "položky"}
              </small>
            </article>
          </>
        )}
      </section>

      <SectionCard title="Položky" subtitle="Obsah objednávky">
        <div className="tableMock">
          <div className="tableRow tableHead tableRowItems">
            <span>Produkt</span>
            <span>Množství</span>
            <span>Cena</span>
          </div>

          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="tableRow tableRowItems skeletonRow">
                  <span />
                  <span />
                  <span />
                </div>
              ))
            : order?.items.map((item) => (
                <div key={item.name} className="tableRow tableRowItems">
                  <span>{item.name}</span>
                  <span>{item.qty}×</span>
                  <span>{item.price}</span>
                </div>
              ))}
        </div>
      </SectionCard>
    </>
  );
}
