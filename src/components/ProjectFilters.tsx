import { useEffect, useState } from "react";

export type FilterState = { q: string; tech: string[]; domain: string[]; year?: number | null; };

export default function ProjectFilters({
  allTech, allDomain, onChange
}: { allTech: string[]; allDomain: string[]; onChange: (f: FilterState) => void; }) {
  const [q, setQ] = useState(""); const [tech, setTech] = useState<string[]>([]); const [domain, setDomain] = useState<string[]>([]);
  useEffect(() => onChange({ q, tech, domain, year: null }), [q, tech, domain, onChange]);

  return (
    <div className="bg-card/90 backdrop-blur border border-line rounded-2xl p-5 flex flex-col gap-5">
      <input
        placeholder="Search projects…"
        value={q}
        onChange={e => setQ(e.target.value)}
        className="w-full rounded-lg bg-midnight/80 border border-line px-3 py-2 text-sm"
      />

      <FilterGroup label="Tech">
        {allTech.map(t => (
          <Pill key={t} active={tech.includes(t)} onClick={() =>
            setTech(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
          }>{t}</Pill>
        ))}
      </FilterGroup>

      <FilterGroup label="Domain">
        {allDomain.map(d => (
          <Pill key={d} active={domain.includes(d)} onClick={() =>
            setDomain(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
          }>{d}</Pill>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs uppercase tracking-wide text-sand/60">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition ${
        active ? "border-clay text-clay bg-clay/10" : "border-line hover:border-ball"
      }`}
    >
      {children}
    </button>
  );
}
