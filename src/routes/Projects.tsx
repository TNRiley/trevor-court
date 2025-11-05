// src/routes/Projects.tsx
/**
 * Projects gallery (GH Pages safe):
 * - Builds the data URL using import.meta.env.BASE_URL so it works at / and /<repo>/
 * - Shows a visible error if the JSON can't be loaded
 * - Keeps simple search + pill filters
 */
import { useEffect, useMemo, useState } from "react";
import ProjectFilters, { type FilterState } from "../components/ProjectFilters";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../lib/types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<FilterState>({ q: "", tech: [], domain: [], year: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Build a URL that works in dev (/) and on GH Pages (/trevor-court/)
    // BASE_URL already includes the leading slash, so we just need to ensure proper joining
    const base = import.meta.env.BASE_URL.endsWith('/') 
      ? import.meta.env.BASE_URL 
      : import.meta.env.BASE_URL + '/';
    const dataUrl = `${base}data/projects.json`;

    fetch(dataUrl, { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${dataUrl}`);
        return r.json();
      })
      .then((json: Project[]) => {
        setProjects(Array.isArray(json) ? json : []);
        setError(null);
      })
      .catch((e: unknown) => {
        console.error(e);
        setError(e instanceof Error ? e.message : "Failed to load projects.json");
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
    [projects]
  );
  const allDomain = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.domain))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQ = !q || [p.title, p.summary].some((s) => s.toLowerCase().includes(q));
      const matchesTech = !filters.tech.length || filters.tech.every((t) => p.tech.includes(t));
      const matchesDomain = !filters.domain.length || filters.domain.every((d) => p.domain.includes(d));
      return matchesQ && matchesTech && matchesDomain;
    });
  }, [projects, filters]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 court-grid">
      <h1 className="text-2xl font-semibold mb-4">Projects</h1>

      {loading && <div className="text-sand/70">Loading projects…</div>}

      {error && (
         <div className="mt-2 text-sand/60">
         Tip: open <code className="text-sand">{(() => {
           const base = import.meta.env.BASE_URL.endsWith('/') 
             ? import.meta.env.BASE_URL 
             : import.meta.env.BASE_URL + '/';
           return `${base}data/projects.json`;
         })()}</code> directly in your browser. It should download JSON.
       </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-72 shrink-0">
          <ProjectFilters allTech={allTech} allDomain={allDomain} onChange={setFilters} />
        </aside>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 flex-1 items-start">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-sand/70">No projects match your filters.</div>
          )}
        </div>
      </div>
    </section>
  );
}
