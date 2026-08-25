# AGENTS.md

## Project overview

This repository contains the public website for Alis Mardare, available at
`https://alismardare.it`.

It is a content-oriented static website built primarily with Astro, Tailwind
CSS, and Markdown content collections. Keep the site lightweight, accessible,
and easy for a non-technical editor to maintain.

The public-facing language is currently English. Do not translate existing
content or introduce another language unless explicitly requested.

## Technology

- Astro 5 with static generation
- Tailwind CSS 4 through the Vite integration
- Astro content collections and Markdown
- TypeScript with Astro's strict configuration
- React is available, but should be used only for components that genuinely
  require client-side interactivity
- The canonical production domain is `https://alismardare.it`

The repository currently contains both `package-lock.json` and `yarn.lock`,
while package scripts invoke Yarn. Do not remove either lockfile or change the
package manager as a side effect of unrelated work. When package installation
is required, first establish which package manager the user wants to retain.

## Repository map

- `src/pages/`: file-based routes
- `src/components/`: reusable Astro and UI components
- `src/layouts/`: shared page structure and metadata
- `src/content/`: Markdown content grouped by collection
- `src/content.config.ts`: authoritative content schemas
- `src/styles/global.css`: Tailwind entry point, fonts, and global styles
- `src/config.ts`: site settings sourced from public environment variables
- `src/assets/`: source assets processed by Astro
- `public/`: files served unchanged, including images, fonts, and downloads

Files named `*.backup.*`, pages named `test.astro` or `csstest.astro`, and
template-derived files are not automatically safe to delete. Treat them as
legacy material until the user authorizes cleanup.

## Working rules

- Inspect the relevant route, layout, component, and content schema before
  making changes.
- Preserve unrelated user changes and avoid broad refactors during focused
  tasks.
- Prefer Astro components and server-rendered HTML. Ship client-side
  JavaScript only when it provides necessary interaction.
- Reuse existing layouts and components rather than duplicating page markup.
- Use the `@/` alias for imports from `src/` when practical.
- Type component props and content structures.
- Do not edit generated directories such as `dist/`, `.astro/`, or
  `node_modules/`.
- Do not add dependencies when the same result can reasonably be achieved with
  Astro, browser APIs, or the packages already installed.
- Do not alter the domain, analytics script, cookie behavior, privacy pages,
  `CNAME`, `robots.txt`, or sitemap settings without calling it out explicitly.
- Never invent business figures, product specifications, certifications,
  event details, testimonials, or claims about Alis Mardare.

## Content authoring

Before creating or editing Markdown, read `src/content.config.ts` and inspect a
recent entry from the same collection.

- Store content in the appropriate directory under `src/content/`.
- Use lowercase kebab-case filenames and stable, human-readable slugs.
- Follow the collection schema exactly; update the schema deliberately when a
  new field is required.
- Use ISO dates in `YYYY-MM-DD` format.
- Keep frontmatter values consistent with facts stated in the body.
- Use root-relative paths such as `/imgs/example.jpg` for public images unless
  the consuming component explicitly expects a different format.
- Provide meaningful alternative text for editorial images.
- Preserve the established professional, direct, business-to-business tone.
- Do not silently rewrite factual or commercial copy. Flag inconsistencies and
  request confirmation when the correct value cannot be established locally.

When adding a new content field, update all affected schemas, listings, detail
pages, and types in the same change.

## Astro conventions

- Static generation is the default.
- Use content collection APIs for collection-backed pages.
- Keep `getStaticPaths()` deterministic and derived from content entries.
- Prefer semantic HTML and Astro-native composition with slots.
- Avoid hydration directives unless a component requires browser state or
  interaction.
- Centralize shared document metadata in a common layout instead of copying it
  among routes.
- Use Astro's asset pipeline for source assets when optimization is beneficial;
  keep intentionally static downloads and public files under `public/`.

## Tailwind and visual design

- Follow a mobile-first responsive approach.
- Reuse the site's existing colors, typography, spacing, radii, and shadows.
- Prefer shared components or named utilities when the same arbitrary value is
  repeated.
- Keep custom global CSS limited to fonts, true global rules, and reusable
  utilities that Tailwind does not express clearly.
- Preserve the existing EUR42, Rubik, Tangerine, and Passions Conflict font
  assets unless a broader typography change is requested.
- Respect `prefers-reduced-motion` for non-essential motion.
- Do not redesign unrelated sections while implementing a local change.

## Accessibility

- Use semantic landmarks and a logical heading hierarchy with one primary
  heading per page.
- Ensure interactive controls are usable with a keyboard and have visible
  focus states.
- Associate form controls with labels and provide useful error messages.
- Give informative images meaningful alt text and decorative images empty alt
  text.
- Maintain WCAG AA color contrast where possible.
- Do not rely on color, hover, or animation alone to convey information.
- Check layouts at narrow mobile and desktop widths after visual changes.

## SEO, privacy, and external services

- Each indexable page should have a unique title and description.
- Keep canonical URLs, sitemap output, robots directives, and Open Graph data
  aligned with the production domain.
- Preserve valid heading structure and descriptive link text.
- Add structured data only when it is supported by visible, verified content.
- Do not add trackers, embeds, forms, remote fonts, or other third-party
  services without explicit approval.
- Never expose secrets in source code. Only variables prefixed with `PUBLIC_`
  may be assumed to be visible in the browser.

## Validation

Use the package manager selected for the repository. The intended validation
sequence is:

1. Run Astro/content type checks when the required checker is available.
2. Run the production build.
3. Preview and inspect the routes affected by the change.
4. Check browser console errors, responsive layout, keyboard operation, and
   obvious accessibility issues for UI changes.
5. Verify links, images, metadata, and generated routes for content changes.

If dependencies are unavailable or a command cannot be run, state exactly what
was not verified. Do not claim that a build or browser check passed unless it
was actually executed.

## Definition of done

A change is complete when:

- the requested behavior or content is implemented;
- content conforms to its collection schema;
- affected routes build successfully when the environment permits validation;
- there are no known broken links, missing assets, invalid markup, or new
  console errors in the changed area;
- responsive and accessibility implications have been considered;
- no unrequested business facts or third-party services were introduced; and
- the final handoff summarizes changes, validation performed, and any remaining
  risks or manual checks.
