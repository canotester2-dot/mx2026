import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_URL || "libsql://mx2026-canotester2-dot.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_TOKEN,
});

// Crear tablas si no existen
async function initDB() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS Usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      creadoEn TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Favorito (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuarioId INTEGER NOT NULL,
      peliculaId INTEGER NOT NULL,
      creadoEn TEXT DEFAULT (datetime('now')),
      UNIQUE(usuarioId, peliculaId)
    );
  `);
}

initDB().catch(console.error);

export default db;
