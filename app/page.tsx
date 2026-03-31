"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import SectionCard from "../components/ui/SectionCard";

type Stat = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

export default function HomePage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
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
    <main className="appShell">
      <Sidebar />

      <section className="appContent">
        <Topbar
          title="Přehled"
          subtitle="Enterprise dashboard pro reporting, výkon a správu objednávek."
        />

        <section className="heroPanel">
          <div>
            <div className="eyebrow">Ops Console</div>
            <h1>Dashboard, který působí jako reálný SaaS produkt.</h1>
            <p>
              Čistý enterprise layout, KPI karty, analytické panely a připravený základ
              pro další podstránky.
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
            <div className="trafficList">
              <div>
                <span>Organic</span>
                <b>48 %</b>
              </div>
              <div>
                <span>Referral</span>
                <b>21 %</b>
              </div>
              <div>
                <span>Ads</span>
                <b>17 %</b>
              </div>
              <div>
                <span>Direct</span>
                <b>14 %</b>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Objednávky" subtitle="Poslední aktivita" className="wideCard">
            <div className="tableMock">
              <div className="tableRow tableHead">
                <span>ID</span>
                <span>Zákazník</span>
                <span>Status</span>
                <span>Částka</span>
              </div>

              <div className="tableRow">
                <span>#1048</span>
                <span>David Figar</span>
                <span className="badge ok">Zaplaceno</span>
                <span>8 490 Kč</span>
              </div>

              <div className="tableRow">
                <span>#1047</span>
                <span>MK Studio</span>
                <span className="badge warn">Čeká</span>
                <span>3 290 Kč</span>
              </div>

              <div className="tableRow">
                <span>#1046</span>
                <span>Auto Care Zlín</span>
                <span className="badge ok">Zaplaceno</span>
                <span>12 900 Kč</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Aktivita" subtitle="Feed systému">
            <ul className="activityList">
              <li>Nová objednávka od klienta Auto Care Zlín.</li>
              <li>Vygenerován týdenní report.</li>
              <li>Potvrzená platba k objednávce #1048.</li>
              <li>Přidán nový produkt do katalogu.</li>
            </ul>
          </SectionCard>
        </section>
      </section>
    </main>
  );
}