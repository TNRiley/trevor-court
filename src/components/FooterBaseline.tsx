export default function FooterBaseline() {
    const year = new Date().getFullYear();
    return (
      <footer className="border-t border-line mt-12">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm flex items-center justify-between">
          <span>© {year} Trevor Riley</span>
          <div className="flex items-center gap-4 text-sand/70">
            <a href="https://github.com/tnriley" target="_blank" rel="noreferrer" className="hover:text-ball">GitHub</a>
            <a href="https://www.linkedin.com/in/trevor-riley-6b3ba532/" target="_blank" rel="noreferrer" className="hover:text-ball">LinkedIn</a>
          </div>
        </div>
      </footer>
    );
  }
  