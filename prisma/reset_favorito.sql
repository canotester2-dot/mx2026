DROP TABLE IF EXISTS Favorito;
CREATE TABLE Favorito (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuarioId INTEGER NOT NULL,
  peliculaId INTEGER NOT NULL,
  creadoEn TEXT DEFAULT (datetime('now')),
  UNIQUE(usuarioId, peliculaId)
);
