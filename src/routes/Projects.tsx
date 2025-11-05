/**
 * Projects gallery:
 * - Loads public/data/projects.json
 * - Builds unique tech/domain lists for filters
 * - Applies search + pill filters
 */
// src/routes/Projects.tsx
import { useEffect, useMemo, useState } from "react";
import ProjectFilters, { type FilterState } from "../components/ProjectFilters";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../lib/types";


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<FilterState>({ q: "", tech: [], domain: [], year: null });

  useEffect(() => {
    // Build a URL that works in dev (/) and on GH Pages (/trevor-court/)
    const dataUrl = new URL("data/projects.json", import.meta.env.BASE_URL).toString();
  
    fetch(dataUrl)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load ${dataUrl}: ${r.status}`);
        return r.json();
      })
      .then(setProjects)
      .catch(err => {
        console.error(err);
        setProjects([]); // keep UI stable
      });
  }, []);
  

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap(p => p.tech))).sort(),
    [projects]
  );
  const allDomain = useMemo(
    () => Array.from(new Set(projects.flatMap(p => p.domain))).sort(),
    [projects]
  );

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return projects.filter(p => {
      const matchesQ = !q || [p.title, p.summary].some(s => s.toLowerCase().includes(q));
      const matchesTech = !filters.tech.length || filters.tech.every(t => p.tech.includes(t));
      const matchesDomain = !filters.domain.length || filters.domain.every(d => p.domain.includes(d));
      return matchesQ && matchesTech && matchesDomain;
    });
  }, [projects, filters]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 court-grid">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-72 shrink-0">
          <ProjectFilters
            allTech={allTech}
            allDomain={allDomain}
            onChange={setFilters}
          />
        </aside>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 flex-1 items-start">
          {filtered.map(p => <ProjectCard key={p.slug} p={p} />)}
          {!filtered.length && (
            <div className="text-sand/70">No projects match your filters.</div>
          )}
        </div>
      </div>
    </section>
  );
}
