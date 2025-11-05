import HeroServe from "../components/HeroServe";

export default function Home() {
  return (
    <>
      <HeroServe />
      <section className="mx-auto max-w-6xl px-4 py-12 court-grid">
        <h2 className="text-xl font-semibold">Featured</h2>
        <p className="mt-2 text-sand/80 max-w-2xl">
          A few projects at the intersection of sport and data. Explore the full gallery to see more.
        </p>
      </section>
    </>
  );
}

