import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroServe() {
  return (
    <section className="relative overflow-hidden py-20 md:py-30 court-grid">
      {/* Clay glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(1000px 550px at 20% 20%, rgba(216,108,61,0.35), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <p className="uppercase tracking-widest text-sm text-sand/70">Data & Design</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-semibold leading-tight">
        Data, Set, Match.        </h1>
        <p className="mt-4 max-w-2xl text-sand/80">
          Welcome to my practice court
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ServeButton to="/projects" label="Live Demo Projects" />
          <ServeButton to="/about" label="About Me" secondary />
        </div>
      </div>
    </section>
  );
}

function ServeButton({ to, label, secondary = false }: { to: string; label: string; secondary?: boolean }) {
  return (
    <Link
      to={to}
      className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-xl border transition
        ${secondary ? "border-line bg-card hover:border-ball" : "border-clay bg-clay/15 hover:bg-clay/25"}`}
    >
      <motion.span
        className="inline-block h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--ball)" }}
        whileHover={{ y: [-1, -6, -1], transition: { repeat: Infinity, duration: 0.8 } }}
        aria-hidden
      />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
