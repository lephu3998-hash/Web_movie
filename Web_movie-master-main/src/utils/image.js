// src/utils/image.js
export function buildImageUrl(path, size = "w500") {
  // path: "/abc123.jpg" hoặc null
  if (!path) return "/no-poster.jpg";

  let baseRaw = import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/";
  baseRaw = baseRaw.trim();

  // remove trailing slash
  if (baseRaw.endsWith("/")) baseRaw = baseRaw.slice(0, -1);

  // ensure base contains /t/p
  if (!baseRaw.includes("/t/p")) {
    // e.g. baseRaw might be "https://image.tmdb.org"
    baseRaw = `${baseRaw}/t/p`;
  }

  // If base ends with /t/p (no size) -> add size
  if (/\/t\/p(\/)?$/.test(baseRaw)) {
    baseRaw = `${baseRaw}/${size}`;
  } else {
    // base already contains size like /t/p/w500 or /t/p/original
    // keep it as-is
  }

  // final join: baseRaw (no trailing slash) + path (path usually starts with '/')
  return `${baseRaw}${path.startsWith("/") ? "" : "/"}${path}`;
}
