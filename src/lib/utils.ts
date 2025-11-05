export const cls = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

export function toggleTheme() {
  const el = document.documentElement;
  const isDark = el.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}
