import type { Project } from "../lib/types";
import { motion } from "framer-motion";

export default function ProjectCard({ p }: { p: Project }) {
  const hasThumb = Boolean(p.thumbnail);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.01 }}
      className="bg-card/90 backdrop-blur border border-line rounded-2xl shadow-soft overflow-hidden flex flex-col"
    >
      <div className="aspect-video bg-midnight/40">
        {hasThumb ? (
          <img src={p.thumbnail} alt={`${p.title} thumbnail`} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-sand/60 text-sm">
            {/* fallback visual */}
            <div className="h-8 w-8 rounded-full" style={{ backgroundColor: "var(--ball)" }} />
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
          <span className="text-[11px] px-2 py-0.5 rounded bg-midnight/60 border border-line">
            {p.status.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-sand/85">{p.summary}</p>

        <div className="flex flex-wrap gap-2">
          {p.tech.slice(0, 4).map(t => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-midnight/60 border border-line">
              {t}
            </span>
          ))}
        </div>

        {p.badges?.length ? (
          <div className="flex flex-wrap gap-2">
            {p.badges.map(b => (
              <span key={b} className="text-[10px] px-2 py-0.5 rounded border border-clay text-clay bg-clay/10">
                {b}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center gap-3 pt-2">
          <a target="_blank" rel="noreferrer" href={p.demoUrl}
             className="text-sm px-3 py-1.5 rounded border border-clay bg-clay/10 hover:bg-clay/20">Live Demo</a>
          <a target="_blank" rel="noreferrer" href={p.codeUrl}
             className="text-sm px-3 py-1.5 rounded border border-line hover:border-ball">Code</a>
        </div>
      </div>
    </motion.article>
  );
}
