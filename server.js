import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = new Database(path.join(__dirname, 'data', 'cards.db'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER NOT NULL,
      word TEXT NOT NULL,
      phonics TEXT,
      example TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(deck_id) REFERENCES decks(id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_id INTEGER NOT NULL,
      result TEXT CHECK(result IN ('known','unknown')) NOT NULL,
      reviewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(card_id) REFERENCES cards(id)
    );
  `);

  const deckCount = db.prepare('SELECT COUNT(*) AS c FROM decks').get().c;
  if (deckCount === 0) {
    const deckId = db.prepare('INSERT INTO decks (name, description) VALUES (?, ?)').run('Starter Deck', 'Built-in phonics starter deck').lastInsertRowid;
    const seed = [
      ['cat', '/kæt/', 'c-a-t'],
      ['dog', '/dɔːɡ/', 'd-o-g'],
      ['sun', '/sʌn/', 's-u-n'],
      ['map', '/mæp/', 'm-a-p'],
      ['fish', '/fɪʃ/', 'f-i-sh'],
      ['ship', '/ʃɪp/', 'sh-i-p'],
      ['chair', '/tʃer/', 'ch-air'],
      ['book', '/bʊk/', 'b-oo-k']
    ];
    const insert = db.prepare('INSERT INTO cards (deck_id, word, phonics, example) VALUES (?, ?, ?, ?)');
    const tx = db.transaction((rows) => rows.forEach(r => insert.run(deckId, r[0], r[1], r[2])));
    tx(seed);
  }

  // Auto-import Fry 1000 deck if seed file exists
  const fryDeck = db.prepare('SELECT id FROM decks WHERE name = ?').get('Fry 1000');
  const fryPath = path.join(__dirname, 'seed', 'fry-1000.csv');
  if (!fryDeck && fs.existsSync(fryPath)) {
    const deckId = db.prepare('INSERT INTO decks (name, description) VALUES (?, ?)').run('Fry 1000', 'Fry high-frequency words').lastInsertRowid;
    const lines = fs.readFileSync(fryPath, 'utf-8').split(/\r?\n/).filter(Boolean);
    const words = lines.slice(1).map(l => l.split(',')[0].trim()).filter(Boolean);
    const insert = db.prepare('INSERT INTO cards (deck_id, word, phonics, example) VALUES (?, ?, ?, ?)');
    const tx = db.transaction((arr) => arr.forEach(w => insert.run(deckId, w, null, null)));
    tx(words);
  }
}

initDb();

app.get('/api/decks', (_req, res) => {
  const decks = db.prepare('SELECT * FROM decks ORDER BY id DESC').all();
  res.json(decks);
});


app.get('/api/decks/:id/cards', (req, res) => {
  const startsWith = (req.query.startsWith || '').toString().trim();
  const minLen = Number.parseInt(req.query.minLen, 10);
  const maxLen = Number.parseInt(req.query.maxLen, 10);
  const limit = Math.min(Number.parseInt(req.query.limit, 10) || 10, 50);

  const conditions = ['deck_id = ?'];
  const params = [req.params.id];

  if (startsWith) {
    conditions.push('LOWER(word) LIKE LOWER(?)');
    params.push(`${startsWith}%`);
  }

  if (Number.isInteger(minLen) && minLen > 0) {
    conditions.push('LENGTH(word) >= ?');
    params.push(minLen);
  }

  if (Number.isInteger(maxLen) && maxLen > 0) {
    conditions.push('LENGTH(word) <= ?');
    params.push(maxLen);
  }

  const sql = `SELECT * FROM cards WHERE ${conditions.join(' AND ')} ORDER BY RANDOM() LIMIT ?`;
  params.push(limit);
  const cards = db.prepare(sql).all(...params);
  res.json(cards);
});

app.get('/api/decks/:id/random-card', (req, res) => {
  const startsWith = (req.query.startsWith || '').toString().trim();
  let card;

  if (startsWith) {
    card = db
      .prepare('SELECT * FROM cards WHERE deck_id = ? AND LOWER(word) LIKE LOWER(?) ORDER BY RANDOM() LIMIT 1')
      .get(req.params.id, `${startsWith}%`);
  } else {
    card = db.prepare('SELECT * FROM cards WHERE deck_id = ? ORDER BY RANDOM() LIMIT 1').get(req.params.id);
  }

  if (!card) return res.status(404).json({ error: 'No card found' });
  res.json(card);
});

app.post('/api/reviews', (req, res) => {
  const { card_id, result } = req.body;
  if (!card_id || !['known', 'unknown'].includes(result)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  db.prepare('INSERT INTO reviews (card_id, result) VALUES (?, ?)').run(card_id, result);
  res.json({ ok: true });
});

app.get('/api/stats', (_req, res) => {
  const total = db.prepare('SELECT COUNT(*) AS c FROM reviews').get().c;
  const known = db.prepare("SELECT COUNT(*) AS c FROM reviews WHERE result='known'").get().c;
  const unknown = db.prepare("SELECT COUNT(*) AS c FROM reviews WHERE result='unknown'").get().c;
  res.json({ total, known, unknown });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Cards MVP running: http://localhost:${PORT}`);
  console.log(`LAN access: http://<your-local-ip>:${PORT}`);
});
