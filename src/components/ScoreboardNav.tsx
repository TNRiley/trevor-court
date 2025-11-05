import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { toggleTheme } from "../lib/utils";

export default function ScoreboardNav() {
  const { pathname } = useLocation();
  const score = useMemo(() => {
    switch (pathname) {
      case "/": return "0–0";
      case "/projects": return "15–Love";
      case "/lab": return "30–Love";
      case "/notes": return "40–30";
      case "/about": return "Adv";
      default: return "0–0";
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-midnight/75 backdrop-blur border-b border-line">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold tracking-wide hover:text-ball">Trevor Riley</Link>
          <div className="hidden md:flex items-center gap-5 text-sm">
            <Link to="/projects" className="hover:text-ball">Projects</Link>
            <Link to="/lab" className="hover:text-ball">Lab</Link>
            <Link to="/notes" className="hover:text-ball">Notes</Link>
            <Link to="/about" className="hover:text-ball">About</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-1 rounded-lg bg-card border border-line">SCORE: {score}</span>
          <button
            onClick={toggleTheme}
            className="text-xs px-3 py-1 rounded-lg bg-card border border-line hover:border-ball"
            aria-label="Toggle dark mode"
          >
            Night Match
          </button>
        </div>
      </nav>
    </header>
  );
}
