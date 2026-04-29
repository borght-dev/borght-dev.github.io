// Verbatim from personal-site-and-blog/project/site/shared.jsx
// Used by every /variants/* page so post titles, projects, and "now"
// stay consistent across the three directions (D, E, G).

export const KOEN = {
  name: 'Koen van der Borght',
  handle: 'koenvdborght',
  domain: 'koenvdborght.nl',
  location: 'Tilburg, NL',
  role: 'Senior Developer',
  company: 'Gomocha',
  since: 2017,
  tagline:
    'Senior dev with a passion for the craft — optimizing workflows, tools, and the code in between.',
  longBio: [
    "I'm a senior developer based in the Netherlands. I've been at Gomocha since I left college in 2017 — junior, then scrum master in 2023, now senior. I care about how systems are put together more than which framework wraps them this year.",
    "Outside the day job I'm building BorgDock — a developer dock I use every day, currently being used to re-implement Gomocha's main application end-to-end with AI-assisted development. It's most of the way there.",
    'I write here about workflow, tooling, architecture, and what AI-assisted development actually looks like once the novelty wears off.',
  ],
  aspirations: ['Architect', 'CTO', 'Founder'],
};

export type Post = {
  n: string;
  date: string;
  readTime: string;
  title: string;
  dek: string;
  tags: string[];
};

export const POSTS: Post[] = [
  {
    n: '01',
    date: '2026 · 04 · 18',
    readTime: '12 min',
    title: 'Rebuilding a 9-year-old codebase with Claude Code',
    dek: 'Six weeks, one developer, one model. What survived contact with the real domain — and what I would not do again.',
    tags: ['AI', 'Architecture', 'Field notes'],
  },
  {
    n: '02',
    date: '2026 · 03 · 27',
    readTime: '8 min',
    title: 'BorgDock: the tool I built because nothing else fit',
    dek: 'A native dock for PRs, SQL, checks and the small rituals of a workday. Notes on what I learned shipping for an audience of one.',
    tags: ['BorgDock', 'Tools'],
  },
  {
    n: '03',
    date: '2026 · 02 · 14',
    readTime: '6 min',
    title: 'On being told no — and shipping anyway',
    dek: 'I asked to be the Architect. The answer was no. So I built the case in code instead of slides.',
    tags: ['Career', 'Essay'],
  },
  {
    n: '04',
    date: '2026 · 01 · 30',
    readTime: '10 min',
    title: 'A workflow that survives bad days',
    dek: 'Keyboard layouts, focus rituals, queues, and the boring software glue holding it all together.',
    tags: ['Workflow', 'Setup'],
  },
  {
    n: '05',
    date: '2025 · 12 · 12',
    readTime: '5 min',
    title: 'Why I stopped writing weekly status reports',
    dek: 'And what replaced them — a single page, auto-generated from the work itself.',
    tags: ['Workflow', 'Essay'],
  },
];

export type Project = {
  code: string;
  name: string;
  status: string;
  statusKind: 'live' | 'wip' | 'idle';
  year: string;
  blurb: string;
  stack: string[];
  metric: [string, string];
};

export const PROJECTS: Project[] = [
  {
    code: 'BD',
    name: 'BorgDock',
    status: 'In daily use',
    statusKind: 'live',
    year: '2025 — now',
    blurb:
      'Native dock for developers. PR review, SQL playground, CI checks, release notes — surfacing the rituals of a workday in one always-on sidebar.',
    stack: ['Tauri', 'React', 'Rust', 'TypeScript'],
    metric: ['~2,400', 'commits'],
  },
  {
    code: 'GM',
    name: 'Gomocha · Field rebuild',
    status: 'Side project · ~95%',
    statusKind: 'wip',
    year: '2025 — 2026',
    blurb:
      'Re-implementing the main field-service application with AI-assisted development. Same domain, modern stack, fraction of the surface area. Quietly running in parallel.',
    stack: ['.NET 9', 'React', 'Claude Code'],
    metric: ['9 yrs', 'replatformed'],
  },
  {
    code: 'HM',
    name: 'Home stack',
    status: 'Always tinkering',
    statusKind: 'idle',
    year: 'Forever',
    blurb:
      'Home Assistant, ESP32 sensors, scenes that actually fire. The lab where setup ideas get tested before they end up in posts.',
    stack: ['Home Assistant', 'ESPHome', 'MQTT'],
    metric: ['38', 'devices'],
  },
];

export const NOW = [
  { k: 'Building', v: 'BorgDock v0.9 — release notes flow' },
  { k: 'Reading', v: 'A Philosophy of Software Design' },
  { k: 'Listening', v: 'Brian Eno · Music for Installations' },
  { k: 'Querying', v: 'Why Tuesday deploys are 2× as flaky' },
  { k: 'Avoiding', v: 'Yet another framework rewrite' },
];

export const SETUP = [
  { cat: 'Editor', item: 'Neovim · LazyVim', detail: 'with a Claude Code sidekick' },
  { cat: 'Terminal', item: 'WezTerm · zsh + zoxide', detail: 'JetBrains Mono Nerd Font' },
  { cat: 'Keyboard', item: 'Lily58 · Choc Sunset', detail: 'split, 36 keys, home-row mods' },
  { cat: 'Machine', item: 'Framework 13 · AMD', detail: 'Linux, NixOS-curious' },
  { cat: 'Window mgmt', item: 'Hyprland · Waybar', detail: 'one workspace per intent' },
  { cat: 'Dock', item: 'BorgDock', detail: 'because of course' },
];

// Common Google Fonts <link> tag re-used across all variants.
// Includes JetBrains Mono, Fraunces, and Inter — the three fonts the design specifies.
export const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap';
