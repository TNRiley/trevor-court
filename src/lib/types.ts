// src/lib/types.ts
export type Project = {
  title: string;
  slug: string;
  summary: string;
  tech: string[];
  domain: string[];
  demoUrl: string;
  codeUrl: string;
  status: "live" | "wip" | "archived";
  thumbnail: string;
  year: number;
  badges?: string[];
};
