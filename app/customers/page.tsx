"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import SectionCard from "../../components/ui/SectionCard";

type Customer = {
  name: string;
  segment: string;
  company: string;
  spend: string;
  status: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="appShell">
      <Sidebar />

      <section className="appContent">
        <Topbar
          title="Zákazníci"
          subtitle="Přehled klientů a jejich hodnoty."
        />

        <section className="mainGrid">
          <SectionCard title="CRM" subtitle="Seznam zákazníků" className="wideCard">
            <div className="tableMock">
              <div className="tableRow tableHead tableRowCustomers">
                <span>Jméno</span>
                <span>Segment</span>
                <span>Firma</span>
                <span>Útrata</span>
                <span>Status</span>
              </div>

              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="tableRow tableRowCustomers skeletonRow">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ))
                : customers.map((c) => (
                    <div key={c.name} className="tableRow tableRowCustomers">
                      <span>{c.name}</span>
                      <span>{c.segment}</span>
                      <span>{c.company}</span>
                      <span>{c.spend}</span>
                      <span className="badge ok">{c.status}</span>
                    </div>
                  ))}
            </div>
          </SectionCard>
        </section>
      </section>
    </main>
  );
}