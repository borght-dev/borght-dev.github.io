import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'shipped', 'archived', 'validation']).default('active'),
    stack: z.array(z.string()).default([]),
    link: z.string().url().optional(),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './content/series' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    seriesId: z.string(),
    status: z.enum(['planned', 'active', 'complete']).default('planned'),
    cadence: z.string().optional(),
    color: z.string().default('var(--accent)'),
  }),
});

const episodes = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/index.{md,mdx}'],
    base: './content/series',
  }),
  schema: z.object({
    title: z.string(),
    seriesId: z.string(),
    episode: z.number().int().positive(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    summary: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, projects, series, episodes, pages };
