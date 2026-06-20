"use client";

import { useEffect, useState } from "react";
import Topbar from "../components/layout/Topbar";
import StatCard from "../components/dashboard/StatCard";
import dynamic from "next/dynamic";

const RevenueChart = dynamic(
  () => import("../components/dashboard/RevenueChart"),
  { ssr: false, loading: () => <div style={{ width: "100%", height: 260 }} /> },
);
const OrdersBarChart = dynamic(
  () => import("../components/dashboard/OrdersBarChart"),
  { ssr: false, loading: () => <div style={{ width: "100%", height: 260 }} /> },
);
const TrafficDonutChart = dynamic(
  () => import("../components/dashboard/TrafficDonutChart"),
  { ssr: false, loading: () => <div style={{ width: "100%", height: 220 }} /> },
);
import SectionCard from "../components/ui/SectionCard";

type Stat = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

type Order = {
  id: string;
  customer: string;
  status: string;
  amount: string;
};

export default function HomePage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/stats").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
    ])
      .then(([statsData, ordersData]) => {
        setStats(statsData.stats);
        setOrders(ordersData.orders);
        setLoading(false);
      })
      .catch(() => {
        setStats([
          { label: "MRR", value: "428 900 Kč", change: "+8.1 %", positive: true },
          { label: "Aktivní uživatelé", value: "2 481", change: "+12.4 %", positive: true },
          { label: "Objednávky", value: "312", change: "+5.7 %", positive: true },
          { label: "Konverze", value: "3.84 %", change: "-0.3 %", positive: false },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Topbar
        title="Přehled"
        subtitle="Enterprise dashboard pro reporting, výkon a správu objednávek."
      />

        <section className="heroPanel">
          <div>
            <div className="eyebrow">Červen 2026</div>
            <h1>Dobrý den, Miroslave.</h1>
            <p>
              Vaše metriky rostou stabilně. MRR překročil cíl o 8 % a aktivní
              uživatelé stoupli na nové maximum. Podívejte se na detailní přehled níže.
            </p>
          </div>

          <div className="heroSideStats">
            <div className="miniCard">
              <span>Dnešní návštěvy</span>
              <strong>1 284</strong>
            </div>
            <div className="miniCard">
              <span>Open tickets</span>
              <strong>4</strong>
            </div>
            <div className="miniCard">
              <span>Aktivní kampaně</span>
              <strong>12</strong>
            </div>
          </div>
        </section>

        <section className="statsGrid">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="statCard skeleton" />
              ))
            : stats.map((item) => <StatCard key={item.label} {...item} />)}
        </section>

        <section className="mainGrid">
          <SectionCard title="Revenue" subtitle="Vývoj výkonu" rightLabel="30 dní">
            <RevenueChart />
          </SectionCard>

          <SectionCard title="Traffic" subtitle="Zdroje návštěvnosti">
            <TrafficDonutChart />
          </SectionCard>

          <SectionCard title="Objednávky" subtitle="Poslední aktivita" className="wideCard">
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

          <SectionCard title="Objednávky" subtitle="Týdenní přehled" rightLabel="7 dní">
            <OrdersBarChart />
          </SectionCard>

          <SectionCard title="Aktivita" subtitle="Feed systému">
            <ul className="activityList">
              <li>Nová objednávka od klienta Nordic Solutions.</li>
              <li>Vygenerován týdenní report.</li>
              <li>Potvrzená platba k objednávce #1048.</li>
              <li>Přidán nový produkt do katalogu.</li>
            </ul>
          </SectionCard>
        </section>
    </>
  );
}