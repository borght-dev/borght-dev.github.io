// scripts/og.ts — Render OG PNGs for koenvdborght.nl using Satori + resvg.
// Run: bun scripts/og.ts
//
// Walks content/, skips drafts, generates one 1200×630 PNG per published page
// at static/images/og/<slug>.png. Slug is derived from path (matches Hugo template).

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";
import { readFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SiteTerminalCard, type SeriesKey } from "./og-card.tsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content");
const FONTS = join(__dirname, "fonts");
const OUT = join(ROOT, "static", "images", "og");

mkdirSync(OUT, { recursive: true });

const fontRegular = readFileSync(join(FONTS, "JetBrainsMono-Regular.ttf"));
const fontBold = readFileSync(join(FONTS, "JetBrainsMono-Bold.ttf"));

// Map Hugo series identifiers → card accent slot.
const SERIES_MAP: Record<string, SeriesKey> = {
  borgdock: "engineering",
  "my-setup": "notes",
  "ai-native-engineering": "field",
  "fsp-horizon": "dispatches",
  "multi-worktree-dotnet": "essays",
};

interface PageInput {
  slug: string;
  title: string;
  series: SeriesKey;
  date?: string;
  tags: string[];
  path: string;
}

function listMarkdown(dir: string): string[] {
  const out: string[] = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listMarkdown(p));
    else if (ent.isFile() && ent.name.endsWith(".md")) out.push(p);
  }
  return out;
}

// Path → slug. Mirrors the Hugo template's slug derivation:
//   content/_index.md                        → home
//   content/about.md                         → about
//   content/posts/foo.md                     → posts-foo
//   content/series/_index.md                 → series
//   content/series/borgdock/_index.md        → series-borgdock
//   content/series/borgdock/01-foo.md        → series-borgdock-01-foo
function slugFromPath(absPath: string): string {
  let rel = relative(CONTENT, absPath).replace(/\\/g, "/");
  rel = rel.replace(/\.md$/, "");
  rel = rel.replace(/\/_index$/, "");
  if (rel === "_index" || rel === "") return "home";
  return rel.replace(/\//g, "-");
}

function formatDate(d: unknown): string | undefined {
  if (!d) return undefined;
  const s = typeof d === "string" ? d : (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]} · ${m[2]} · ${m[3]}` : undefined;
}

function detectSeries(rel: string, frontmatter: Record<string, unknown>): SeriesKey {
  const sid = frontmatter.seriesId as string | undefined;
  if (sid && SERIES_MAP[sid]) return SERIES_MAP[sid];
  const m = rel.match(/^series\/([^/]+)\//);
  if (m && SERIES_MAP[m[1]]) return SERIES_MAP[m[1]];
  return "engineering";
}

// Path widget label, mirroring the site's nav idiom (~/blog, ~/series/foo, etc.).
function pathLabel(rel: string): string {
  if (rel === "_index" || rel === "") return "~/";
  if (rel === "about") return "~/about";
  if (rel === "contact") return "~/contact";
  if (rel.startsWith("posts/")) return "~/blog";
  if (rel === "series/_index") return "~/series";
  const seriesMatch = rel.match(/^series\/([^/]+)/);
  if (seriesMatch) return `~/series/${seriesMatch[1]}`;
  return "~/" + rel.split("/")[0];
}

function buildInputs(): PageInput[] {
  const files = listMarkdown(CONTENT);
  const inputs: PageInput[] = [];

  for (const path of files) {
    const raw = readFileSync(path, "utf8");
    const { data } = matter(raw);
    if (data.draft === true) continue;

    const rel = relative(CONTENT, path).replace(/\\/g, "/");
    const slug = slugFromPath(path);

    // Title fallback chain: frontmatter.title → site title → slug
    const title =
      (data.title as string | undefined) ||
      (slug === "home" ? "Koen van der Borght" : slug);

    inputs.push({
      slug,
      title,
      series: detectSeries(rel, data),
      date: formatDate(data.date),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      path: pathLabel(rel.replace(/\.md$/, "")),
    });
  }

  return inputs;
}

async function renderOne(input: PageInput) {
  const tree = SiteTerminalCard({
    title: input.title,
    series: input.series,
    date: input.date,
    tags: input.tags,
    path: input.path,
    dark: false, // light only — social platforms render against light surrounds
  });

  const svg = await satori(tree, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "JetBrains Mono", data: fontRegular, weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: fontRegular, weight: 500, style: "normal" },
      { name: "JetBrains Mono", data: fontBold, weight: 600, style: "normal" },
      { name: "JetBrains Mono", data: fontBold, weight: 700, style: "normal" },
    ],
  });

  // Opaque background = LinkedIn-safe. RGBA PNGs sometimes pixelate in their
  // preview compositor; flattening to RGB against the card's site bg avoids it.
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    background: "#FAFBFC",
  })
    .render()
    .asPng();

  const outPath = join(OUT, `${input.slug}.png`);
  await Bun.write(outPath, png);

  const size = Bun.file(outPath).size;
  const titlePreview =
    input.title.length > 50 ? input.title.slice(0, 47) + "..." : input.title;
  console.log(
    `✓ ${input.slug.padEnd(38)} ${(size / 1024).toFixed(1).padStart(5)} KB  · ${input.series.padEnd(11)} · ${titlePreview}`,
  );
}

const inputs = buildInputs();
console.log(`Rendering ${inputs.length} OG cards → ${relative(ROOT, OUT)}\n`);
const t0 = performance.now();
for (const inp of inputs) await renderOne(inp);
const dt = performance.now() - t0;
console.log(`\nDone in ${(dt / 1000).toFixed(2)}s.`);
