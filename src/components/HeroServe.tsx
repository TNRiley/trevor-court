import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroServe() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 court-grid">
      {/* Clay glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(700px 350px at 20% 5%, rgba(216,108,61,0.35), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <p className="uppercase tracking-widest text-sm text-sand/70">Data & Design</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-semibold leading-tight">
          Turning messy data into clean shots.
        </h1>
        <p className="mt-4 max-w-2xl text-sand/80">
          Tennis-flavored interfaces, rigorous data visuals, and creative tools.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ServeButton to="/projects" label="Serve a Project" />
          <ServeButton to="/lab" label="Explore Lab" secondary />
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
