# Repository Guidelines

## Project Structure & Module Organization

This Traditional Chinese elementary science site runs on GitHub Pages using static HTML, CSS, and JavaScript, with no package manager or application framework.

- `第一單元 太陽與光/` and `第二單元 植物世界/` organize lessons by unit and topic. Pages contain their own styles and scripts; topic images live in adjacent `assets/` directories.
- `materials/` contains extension tools, `image/` contains the site icon, and `css/style.css` provides homepage styles.
- `build_index.py` generates the committed `index.html`. Edit its template or configuration for homepage changes; direct edits to generated HTML will be overwritten.

## Build, Test, and Development Commands

Run these commands from the repository root with Python 3; the generator needs only the standard library.

- `python build_index.py`: regenerate homepage cards after adding, renaming, or reorganizing resources.
- `python -m http.server 8000`: preview at `http://localhost:8000`, including Chinese paths and browser interactions.
- `git diff --check`: check changes for whitespace errors before committing.

No compilation is required. GitHub Pages serves the repository root; retain `.nojekyll`.

## Coding Style & Naming Conventions

Use UTF-8 and Traditional Chinese for teaching content. Follow surrounding formatting: Python uses four-space indentation; CSS and JavaScript blocks generally use two spaces. No formatter or linter is configured.

Name lesson files `<主題>_互動教材.html`, `<主題>_學習單.html`, or `<主題>_重點整理.html`, keeping the same topic prefix within each folder. Missing resource types are supported. Register new units and teaching order in `UNITS` within `build_index.py`; customize extension-tool cards through `MATERIALS`. Use relative asset links and descriptive filenames such as `icon-part-root.png`.

## Testing Guidelines

There is no automated test framework or coverage threshold. Preview changed pages and check homepage links, images, console errors, controls, answer feedback, and reset behavior where applicable. Check phone portrait, tablet, desktop, and classroom touch-screen layouts. Verify print previews for worksheets and summaries. After regeneration, inspect `git diff -- index.html` for expected cards and ordering.

## Commit & Pull Request Guidelines

Recent commits use concise Chinese descriptions, often `主題：具體變更`, such as `器官大跑酷：修直式手機必撞`. Keep commits focused and include regenerated `index.html` when needed.

Pull requests should describe affected lessons, student-visible behavior, and manual verification. Link relevant issues and include screenshots for visual changes, including mobile views when layout changes.
