"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/ui/SectionCard";

type Order = {
  id: string;
  customer: string;
  status: string;
  amount: string;
};

const STATUSES = ["Vše", "Zaplaceno", "Čeká", "Storno"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Vše");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "Vše" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <>
      <Topbar
        title="Objednávky"
        subtitle="Přehled objednávek, stavů a plateb."
      />

      <section className="statsGrid">
        <StatCard label="Dnešní objednávky" value="18" change="+4.2 %" positive />
        <StatCard label="Zaplacené" value="14" change="+2.1 %" positive />
        <StatCard label="Čekající" value="3" change="-0.8 %" positive={false} />
        <StatCard label="Storno" value="1" change="-0.2 %" positive={false} />
      </section>

      <section className="mainGrid">
        <SectionCard
          title="Orders"
          subtitle="Seznam objednávek"
          className="wideCard"
        >
          <div className="tableControls">
            <input
              type="text"
              className="searchInput"
              placeholder="Hledat dle zákazníka nebo ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filterGroup">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`filterBtn ${statusFilter === s ? "filterActive" : ""}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

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
              : filtered.length === 0
              ? <div className="emptyState">Žádné objednávky neodpovídají filtru.</div>
              : filtered.map((order) => (
                  <Link
                    key={order.id}
                    href={`/orders/${order.id.replace("#", "")}`}
                    className="tableRow tableRowLink"
                  >
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
                  </Link>
                ))}
          </div>
        </SectionCard>

        <SectionCard title="Status" subtitle="Rozložení stavů">
          <div className="trafficList">
            <div>
              <span>Zaplaceno</span>
              <b>14</b>
            </div>
            <div>
              <span>Čeká</span>
              <b>3</b>
            </div>
            <div>
              <span>Storno</span>
              <b>1</b>
            </div>
            <div>
              <span>Celkem</span>
              <b>18</b>
            </div>
          </div>
        </SectionCard>
      </section>
    </>
  );
}
