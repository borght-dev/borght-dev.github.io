import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { formatUptime } from '../assets/js/ps-live.js';

test('formatUptime: same day', () => {
  const since = '2026-04-30';
  const now = new Date('2026-04-30T15:00:00Z');
  assert.equal(formatUptime(since, now), '0d 15h');
});

test('formatUptime: years and days', () => {
  const since = '2023-07-23';
  const now = new Date('2026-04-30T08:00:00Z');
  // 2023-07-23 → 2026-07-23 = 3 years; minus ~84 days = 2y 281d 8h
  const out = formatUptime(since, now);
  assert.match(out, /^2y \d+d \d+h$/);
});

test('formatUptime: future date returns 0d 0h', () => {
  const since = '2099-01-01';
  const now = new Date('2026-04-30T00:00:00Z');
  assert.equal(formatUptime(since, now), '0d 0h');
});

test('formatUptime: exactly one year', () => {
  const since = '2025-04-30';
  const now = new Date('2026-04-30T00:00:00Z');
  assert.equal(formatUptime(since, now), '1y 0d 0h');
});

test('formatUptime: under one year skips year segment', () => {
  const since = '2026-01-01';
  const now = new Date('2026-04-30T12:00:00Z');
  assert.equal(formatUptime(since, now), '119d 12h');
});
