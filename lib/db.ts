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

    CREATE TABLE IF NOT EXISTS Transmision (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL DEFAULT 'Partido en vivo',
      embedHtml TEXT NOT NULL DEFAULT '',
      activa INTEGER NOT NULL DEFAULT 1,
      actualizadoEn TEXT DEFAULT (datetime('now'))
    );
  `);
}

initDB().catch(console.error);

export default db;
