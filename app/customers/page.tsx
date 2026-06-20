"use client";

import { useEffect, useMemo, useState } from "react";
import Topbar from "../../components/layout/Topbar";
import SectionCard from "../../components/ui/SectionCard";

type Customer = {
  name: string;
  segment: string;
  company: string;
  spend: string;
  status: string;
};

const SEGMENTS = ["Vše", "Enterprise", "Agency", "Startup", "B2B"];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("Vše");

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase());
      const matchesSegment =
        segmentFilter === "Vše" || c.segment === segmentFilter;
      return matchesSearch && matchesSegment;
    });
  }, [customers, search, segmentFilter]);

  return (
    <>
      <Topbar
        title="Zákazníci"
        subtitle="Přehled klientů a jejich hodnoty."
      />

      <section className="mainGrid">
        <SectionCard
          title="CRM"
          subtitle="Seznam zákazníků"
          className="wideCard"
        >
          <div className="tableControls">
            <input
              type="text"
              className="searchInput"
              placeholder="Hledat dle jména nebo firmy…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filterGroup">
              {SEGMENTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`filterBtn ${segmentFilter === s ? "filterActive" : ""}`}
                  onClick={() => setSegmentFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

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
                  <div
                    key={i}
                    className="tableRow tableRowCustomers skeletonRow"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                ))
              : filtered.length === 0
              ? <div className="emptyState">Žádní zákazníci neodpovídají filtru.</div>
              : filtered.map((c) => (
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
    </>
  );
}
