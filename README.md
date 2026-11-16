# Crestpane website

Static multi-page site (HTML, CSS, JavaScript). No build step is needed to host it.

## Deploy on GitHub Pages
1. In the `Crestpane.github.io` repository, delete the old files, then upload everything from this folder (keep `.nojekyll`).
2. Settings, Pages, deploy from the `main` branch root.
3. Live at https://crestpane.github.io/

## Edit content
Content lives in `_generator/data.py` (services, projects, blog articles, FAQ, pricing and the calculator rules).
Set the domain in `SITE_URL` there, then run `python3 build.py` inside `_generator` (output goes to the parent folder automatically), which regenerates all pages, sitemap and robots.txt.

## Forms
There is no server. Forms prepare a message that visitors send via Telegram or email themselves. To receive submissions directly, connect a form service and replace the handler in `assets/main.js`.


## Quality and maintenance notes
- The site is a static HTML/CSS/JavaScript project; it has no server-side runtime or database.
- Project/contact briefs are prepared locally and handed off through the visitor's email client or Telegram. They are not silently submitted to a server.
- Shared organisation and website structured data is included in page metadata. Keep the public domain and contact details in `_generator/data.py` accurate before publishing.
- The generated HTML in the site root is ready to deploy. The `_generator` directory contains the source data and page generator.
- After editing `_generator/build.py` or `_generator/css.py`, run the generator using the working-directory instructions above, then copy the generated site output into the deployment root.
- Test the navigation, project brief, pricing estimator, theme toggle, and mobile layouts on the published domain after every deployment.

## Design system (in `_generator/css.py`)
- Colour tokens live at the top of `_generator/css.py` (`:root` for light, `[data-theme=dark]` for the independent dark set). Every colour in the stylesheet resolves to a token; to change a brand colour, change it there only. See `COLOR-SYSTEM-REPORT.md` for the section-by-section map.
- Per-page palettes (hero / section base / accent) are set by a `pg-*` class on `<body>` (see `pgclass()` in `build.py` and the `.pg-*` rules at the end of `css.py`).
- Other tokens: `--r-sm 12px / --r 16px / --r-lg 24px` radii, `--sh` shadow, `--w` container, `--pad` gutter.
- Type: Inter for UI and Fraunces italic for the single editorial accent per heading.
- Buttons: `.b1` primary (orange), `.b2` outline, `.b3` solid dark, `.cpill` hero CTA. Cards: `.pj`, `.pk`, `.ac`, `.cb`, `.card2`.
- The hero device mockup is built in HTML/CSS (`.dm-*`), uses the Crestpane mark and real concept thumbnails, and has no baked-in third-party branding.
- Scroll reveal is gated by the `js` class on `<html>`, so content stays visible if scripts fail.


## Version 7 quality pass
- Replaced all 12 blog thumbnails with original, cohesive editorial artwork, optimized as 900×900 WebP files.
- Improved descriptive alternative text and intrinsic image dimensions for blog media.
- Fixed portfolio category deep links, including hyphenated categories such as `E-commerce`.
- See `QA-REPORT-fa.md` for the checks performed and the remaining owner/deployment checks.
