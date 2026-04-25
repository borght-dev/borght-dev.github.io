import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const episodes = await getCollection('episodes', ({ data }) => !data.draft);
  const series = await getCollection('series');

  const items = [
    ...posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.subtitle ?? p.data.description ?? '',
      link: `/blog/${p.id}/`,
    })),
    ...episodes.map(e => {
      const s = series.find(x => x.data.seriesId === e.data.seriesId);
      const slug = e.id.split('/').pop();
      return {
        title: `${s?.data.title ?? ''} — ep${e.data.episode}: ${e.data.title}`,
        pubDate: e.data.date ?? new Date(),
        description: e.data.summary ?? '',
        link: `/series/${e.data.seriesId}/${slug}/`,
      };
    }),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Koen van der Borght',
    description: 'Senior developer, technical lead, and lifelong learner.',
    site: context.site!,
    items,
  });
}
