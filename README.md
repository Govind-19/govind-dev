# govind.dev — engineering journal & portfolio

Personal portfolio + blog for Govind, software engineer at Maahita Technologies.
A public record of growth: proof of work, not just LinkedIn.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, fully static (SSG).
Posts are MDX files in the repo — no CMS, no database.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production check:

```bash
npm run build
npm run start
```

## How to add a post (one step)

Drop a `.mdx` file into `content/posts/` and push. The filename is the URL slug.

```yaml
---
title: "I fought my team lead over extracting strings into constants"
summary: "One-line summary shown in lists and link previews."
date: "2026-03-14"
tag: "Engineering"        # one of: Engineering | Product | Production | Startup
arc: "resist → reject → real requirement → revelation"   # optional
readTime: 4               # optional; computed from word count (~200 wpm) if omitted
draft: false              # true = never rendered or listed
featured: false           # true = pinned to top of the journal
---

Post body in markdown. Two extra components are available without imports:

<Pull>A Fraunces-italic pull quote with the rust border.</Pull>

<Ex>Ex: the mono callout block for examples.</Ex>
```

That's it. Posts are sorted newest first; drafts are excluded from the build
entirely; OG preview cards, RSS, and the sitemap update automatically.

### Images in posts

Put the image in `public/journal/` and reference it from the post:

```markdown
![what the screenshot shows](/journal/day-6-receipt-flow.png)
*optional caption line, italic, right under the image*
```

Images render full-width with the journal border style. Keep files under
~300 KB (export PNG screenshots as 1200-1600px wide) so pages stay fast.

## How to change the domain

One spot: `lib/site.ts`. Either edit `url` there, or set the
`NEXT_PUBLIC_SITE_URL` environment variable (takes precedence). Social links
and the contact email live in the same file.

## How to deploy (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel
   auto-detects Next.js; no settings needed. Deploy.
3. Every `git push` to `main` now triggers a production deploy.
4. **Custom domain:** in the Vercel project → Settings → Domains → add
   `govind.dev` (and `www.govind.dev`). At your domain registrar, point the
   domain at Vercel:
   - `govind.dev` → A record → `76.76.21.21`
   - `www` → CNAME → `cname.vercel-dns.com`
   Vercel shows the exact records to copy and provisions HTTPS automatically.
5. Set `NEXT_PUBLIC_SITE_URL=https://govind.dev` in Vercel → Settings →
   Environment Variables, then redeploy (keeps canonical URLs, OG tags, RSS,
   and sitemap pointed at the right domain).
6. Analytics: Vercel Analytics is already wired in (`@vercel/analytics`);
   enable it in the Vercel dashboard → Analytics tab. Privacy-friendly, no
   cookie banner needed.

## Project layout

```
app/                  pages (App Router, all static)
  journal/            list + [slug] post pages + per-post OG images
  rss.xml/            RSS feed route
  sitemap.ts          sitemap.xml
  robots.ts           robots.txt
components/           Nav, Footer, EntryRow, JournalList, ShareRow, mdx
content/posts/        the journal — one .mdx file per post
lib/site.ts           domain, identity, social links (edit here)
lib/posts.ts          content pipeline (frontmatter, drafts, read time)
public/               resume PDF, static assets
```
