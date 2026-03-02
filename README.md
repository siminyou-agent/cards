# cards (static frontend)

This project is now a pure frontend flashcard app that can be hosted on GitHub Pages.

## Features

- Random card draw
- Flip card front/back
- Letter filter (A-Z)
- Word-length range filter
- Card count filter
- Built-in data:
  - Starter Deck
  - Fry 1000

## Run locally

From repo root:

```bash
cd /Users/bot/Projects/cards
python3 -m http.server 3000
```

Open: <http://localhost:3000/public/>

## Deploy to GitHub Pages

Option A (recommended for this repo layout):
- In GitHub repo settings, open **Pages**
- Source: `main` branch, folder `/public`

Option B:
- Move/copy `public/*` to root and publish `/root`

## Data files

- `public/data/decks.json`
- `public/data/cards.json`
