"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import SectionCard from "../../components/ui/SectionCard";

type Order = {
  id: string;
  customer: string;
  status: string;
  amount: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="appShell">
      <Sidebar />

      <section className="appContent">
        <Topbar
          title="Objednávky"
          subtitle="Přehled objednávek, stavů a plateb."
        />

        <section className="statsGrid">
          <article className="statCard">
            <span className="statLabel">Dnešní objednávky</span>
            <strong className="statValue">18</strong>
            <small className="statChange up">+4.2 %</small>
          </article>

          <article className="statCard">
            <span className="statLabel">Zaplacené</span>
            <strong className="statValue">14</strong>
            <small className="statChange up">+2.1 %</small>
          </article>

          <article className="statCard">
            <span className="statLabel">Čekající</span>
            <strong className="statValue">3</strong>
            <small className="statChange down">-0.8 %</small>
          </article>

          <article className="statCard">
            <span className="statLabel">Storno</span>
            <strong className="statValue">1</strong>
            <small className="statChange down">-0.2 %</small>
          </article>
        </section>

        <section className="mainGrid">
          <SectionCard title="Orders" subtitle="Seznam objednávek" className="wideCard">
            <div className="tableMock">
              <div className="tableRow tableHead">
                <span>ID</span>
                <span>Zákazník</span>
                <span>Status</span>
                <span>Částka</span>
              </div>

              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="tableRow skeletonRow">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ))
                : orders.map((order) => (
                    <div key={order.id} className="tableRow">
                      <span>{order.id}</span>
                      <span>{order.customer}</span>
                      <span
                        className={
                          order.status === "Zaplaceno"
                            ? "badge ok"
                            : order.status === "Čeká"
                            ? "badge warn"
                            : "badge danger"
                        }
                      >
                        {order.status}
                      </span>
                      <span>{order.amount}</span>
                    </div>
                  ))}
            </div>
          </SectionCard>

          <SectionCard title="Status" subtitle="Rozložení stavů">
            <div className="trafficList">
              <div><span>Zaplaceno</span><b>14</b></div>
              <div><span>Čeká</span><b>3</b></div>
              <div><span>Storno</span><b>1</b></div>
              <div><span>Celkem</span><b>18</b></div>
            </div>
          </SectionCard>
        </section>
      </section>
    </main>
  );
}