---
paths:
  - "content/**/*.md"
---

# Adding images to a blog post

## Where image files live

`static/images/<series-or-post-slug>/<filename>.png`

Example: `static/images/my-setup/02-run-a-layout.png`

Hugo serves `static/` at the site root, so the URL is `/images/my-setup/02-run-a-layout.png`.

## How to reference an image in a post

```markdown
![Alt text for screen readers](/images/<slug>/<file>.png "Visible caption")
```

- **First arg (alt)**: description for screen readers. Required.
- **URL**: absolute, starts with `/images/...`. Do NOT use a relative path unless the post is a page bundle (none currently are).
- **Third arg (title, in quotes)**: visible caption rendered in italic under the thumbnail. Optional but encouraged.

Keep alt and caption distinct. Alt describes the image factually; caption labels what the image is showing in the context of the post.

## What the render hook does automatically

Every markdown image is wrapped by the Goldmark render hook at `themes/terminal-dev/layouts/_markup/render-image.html`. You get for free:

- Thumbnail capped at `max-height: 360px`, centered, with a subtle border.
- Italic caption underneath when a title is provided.
- Click-to-zoom modal (native `<dialog>`, no library) — Esc closes, backdrop closes, × button closes.

You do not need a shortcode, a figure tag, or any HTML. Plain markdown image syntax is enough.

## Where the moving parts live

- Render hook: `themes/terminal-dev/layouts/_markup/render-image.html`
- Lightbox JS: `themes/terminal-dev/assets/js/image-zoom.js` (wired in `partials/head.html`)
- Styles: `.article-figure`, `.article-image-trigger`, `.image-zoom-dialog` in `themes/terminal-dev/assets/sass/main.scss`

If image rendering breaks, start there.

## Local preview

`hugo server --buildDrafts` from the repo root.
