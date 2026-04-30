import { formatUptime } from './ps-live.js';

export function tokenize(input) {
  return input.trim().split(/\s+/).filter(Boolean);
}

export const commands = [
  {
    name: 'help',
    summary: 'show available commands',
    run(ctx) {
      ctx.print('available commands:');
      for (const c of commands) {
        ctx.print(`  ${c.name.padEnd(10)} ${c.summary || ''}`);
      }
    },
  },
  {
    name: 'whoami',
    summary: 're-print the hero tagline',
    run(ctx) {
      ctx.print('koen — senior dev shipping tools, not slides');
      ctx.print('full-stack engineer at Gomocha · building developer tools by night');
    },
  },
  {
    name: 'pwd',
    summary: 'print working directory',
    run(ctx) { ctx.print('~'); },
  },
  {
    name: 'clear',
    summary: 'clear the terminal',
    run(ctx) { ctx.clear(); },
  },
  {
    name: 'date',
    summary: 'print current date/time',
    run(ctx) { ctx.print(new Date().toISOString().replace('T', ' ').slice(0, 19)); },
  },
  {
    name: 'uptime',
    summary: 'show dad-mode uptime',
    run(ctx) {
      const since = ctx.dadModeSince || '2023-07-23';
      ctx.print(formatUptime(since));
    },
  },
  {
    name: 'history',
    summary: 'show command history',
    run(ctx) {
      const h = ctx.history || [];
      h.forEach((cmd, i) => ctx.print(`${String(i + 1).padStart(4)}  ${cmd}`));
    },
  },
  {
    name: 'exit',
    summary: 'close the shell',
    run(ctx) { ctx.close(); },
  },
  {
    name: ':q!',
    summary: 'close the shell (vim-style)',
    run(ctx) { ctx.close(); },
  },
];

export function dispatch(input, ctx) {
  const tokens = tokenize(input);
  if (tokens.length === 0) return;
  const [name, ...args] = tokens;
  const cmd = commands.find((c) => c.name === name);
  if (!cmd) {
    ctx.print(`zsh: command not found: ${name}`);
    return;
  }
  cmd.run(ctx, args);
}
