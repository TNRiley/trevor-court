// src/components/ProjectCard.tsx
import { useMemo, useState } from "react";
import type { Project } from "../lib/types";
import { motion } from "framer-motion";

export default function ProjectCard({ p }: { p: Project }) {
  // Resolve thumbnail against the site base (works in dev “/” and GH Pages “/repo/”)
  const initialThumb = useMemo(() => {
    if (!p.thumbnail) return "";
    return p.thumbnail.startsWith("http")
      ? p.thumbnail
      : new URL(p.thumbnail, import.meta.env.BASE_URL).toString();
  }, [p.thumbnail]);

  // Fallback image (put a file at public/thumbs/fallback.png)
  const fallbackThumb = useMemo(
    () => new URL("thumbs/fallback.png", import.meta.env.BASE_URL).toString(),
    []
  );

  const [imgSrc, setImgSrc] = useState(initialThumb);
  const hasThumb = Boolean(p.thumbnail);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.01 }}
      className="bg-card/90 backdrop-blur border border-line rounded-2xl shadow-soft overflow-hidden flex flex-col"
      aria-label={`${p.title} project card`}
    >
      {/* Thumbnail area */}
      <div className="aspect-video bg-midnight/40">
        {hasThumb ? (
          <img
            src={imgSrc}
            alt={`${p.title} thumbnail`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // If primary image fails, swap to fallback once.
              if (imgSrc !== fallbackThumb) setImgSrc(fallbackThumb);
            }}
          />
        ) : (
          // Minimal visual if no thumbnail path provided
          <div className="h-full w-full grid place-items-center text-sand/60 text-sm">
            <div
              className="h-10 w-10 rounded-full"
              style={{ backgroundColor: "var(--ball)" }}
              aria-hidden
            />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
          <span
            className="text-[11px] px-2 py-0.5 rounded bg-midnight/60 border border-line"
            aria-label={`status ${p.status}`}
          >
            {p.status.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-sand/85">{p.summary}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {p.tech.slice(0, 6).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded bg-midnight/60 border border-line"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Badges (optional) */}
        {p.badges?.length ? (
          <div className="flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <span
                key={b}
                className="text-[10px] px-2 py-0.5 rounded border border-clay text-clay bg-clay/10"
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <a
            target="_blank"
            rel="noreferrer"
            href={p.demoUrl}
            className="text-sm px-3 py-1.5 rounded border border-clay bg-clay/10 hover:bg-clay/20"
          >
            Live Demo
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={p.codeUrl}
            className="text-sm px-3 py-1.5 rounded border border-line hover:border-ball"
          >
            Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}
