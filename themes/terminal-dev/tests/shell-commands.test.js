import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { tokenize, dispatch, commands } from '../assets/js/shell-commands.js';

function makeCtx() {
  const calls = { print: [], navigate: [], setTheme: [], clear: 0, close: 0 };
  return {
    calls,
    print: (line) => calls.print.push(line),
    navigate: (url) => calls.navigate.push(url),
    setTheme: (mode) => calls.setTheme.push(mode),
    clear: () => { calls.clear++; },
    close: () => { calls.close++; },
    site: {
      sections: ['posts', 'series', 'about', 'borgdock'],
      posts: ['hello-world.md', 'ai-native-dev.md'],
      series: ['terminal-redesign'],
    },
    history: [],
    dadModeSince: '2023-07-23',
  };
}

test('tokenize: simple words', () => {
  assert.deepEqual(tokenize('ls posts/'), ['ls', 'posts/']);
});

test('tokenize: collapses whitespace and trims', () => {
  assert.deepEqual(tokenize('   ls    posts/   '), ['ls', 'posts/']);
});

test('tokenize: empty input returns []', () => {
  assert.deepEqual(tokenize(''), []);
  assert.deepEqual(tokenize('   '), []);
});

test('dispatch: empty input is a no-op', () => {
  const ctx = makeCtx();
  dispatch('', ctx);
  assert.equal(ctx.calls.print.length, 0);
});

test('dispatch: unknown command prints zsh-style error', () => {
  const ctx = makeCtx();
  dispatch('frobnicate', ctx);
  assert.equal(ctx.calls.print.length, 1);
  assert.match(ctx.calls.print[0], /^zsh: command not found: frobnicate$/);
});

test('commands array: every entry has name + run', () => {
  for (const c of commands) {
    assert.equal(typeof c.name, 'string');
    assert.equal(typeof c.run, 'function');
  }
});

test('commands array: names are unique', () => {
  const names = commands.map((c) => c.name);
  assert.equal(new Set(names).size, names.length);
});
