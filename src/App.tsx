import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Projects from "./routes/Projects";
import Lab from "./routes/Lab";
import Notes from "./routes/Notes";
import About from "./routes/About";
import ScoreboardNav from "./components/ScoreboardNav";
import FooterBaseline from "./components/FooterBaseline";

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <ScoreboardNav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <FooterBaseline />
    </div>
  );
}