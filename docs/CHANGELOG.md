# Changelog

## 2026-03-01

### Added
- Converted app to static frontend for GitHub Pages deployment.
- Added custom domain support with `CNAME` (`cards.simin.you`).
- Added root-level static publish files for GitHub Pages (`index.html`, `data/*`, `CNAME`).
- Added IPA phonics for Fry 1000 dataset.
- Added multi-select alphabet filters (A-Z).
- Added small "coming soon" badge on Sound button.

### Changed
- Dataset narrowed to only **Fry 1000** deck.

### Fixed
- Hidden `Sound-out: (pending)` when no example is available.

### Relevant commits
- `7e4432a` fix: hide pending sound-out text when example is missing
- `9f7f0b1` feat: allow multi-select alphabet filters
- `29006e0` ui: add 'coming soon' badge on Sound button
- `f51b152` feat: add IPA phonics for Fry 1000 words
- `958a3ab` chore: keep only Fry 1000 deck data
- `daddecc` chore: add root static files for GitHub Pages deployment
- `9005722` chore: add custom domain for GitHub Pages
- `e9b97b6` feat: convert cards to static frontend for GitHub Pages
