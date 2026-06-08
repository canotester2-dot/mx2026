export type Pelicula = {
  id: number;
  titulo: string;
  genero: string;
  duracion: string;
  año: number;
  color: string;
  rating: number;
  director: string;
  descripcion: string;
  reparto: string[];
};

// PARTIDOS DEL MUNDIAL 2026
export const peliculas: Pelicula[] = [
  { id: 1, titulo: "México vs Camerún", genero: "Grupo A", duracion: "90 min", año: 2026, color: "from-green-800", rating: 9.5, director: "Estadio Azteca · CDMX", descripcion: "El debut de México en el Mundial 2026 ante una Camerún que llega con grandes figuras. El Azteca rugirá como nunca.", reparto: ["Guillermo Ochoa", "Hirving Lozano", "Raúl Jiménez"] },
  { id: 2, titulo: "Brasil vs Argentina", genero: "Grupo B", duracion: "90 min", año: 2026, color: "from-yellow-700", rating: 9.9, director: "MetLife Stadium · Nueva York", descripcion: "El clásico sudamericano en la fase de grupos. Neymar vs Messi en el partido más esperado del torneo.", reparto: ["Neymar Jr.", "Lionel Messi", "Vinicius Jr."] },
  { id: 3, titulo: "España vs Alemania", genero: "Grupo C", duracion: "90 min", año: 2026, color: "from-red-800", rating: 9.2, director: "SoFi Stadium · Los Ángeles", descripcion: "Dos gigantes europeos chocan en la fase de grupos en un duelo de estilos y generaciones.", reparto: ["Pedri", "Gavi", "Jamal Musiala"] },
  { id: 4, titulo: "Francia vs Inglaterra", genero: "Grupo D", duracion: "90 min", año: 2026, color: "from-blue-800", rating: 9.1, director: "AT&T Stadium · Dallas", descripcion: "La revancha del Mundial de Qatar 2022 en fase de grupos. Mbappé vs Bellingham.", reparto: ["Kylian Mbappé", "Jude Bellingham", "Antoine Griezmann"] },
  { id: 5, titulo: "Portugal vs Marruecos", genero: "Grupo E", duracion: "90 min", año: 2026, color: "from-red-700", rating: 8.8, director: "Gillette Stadium · Boston", descripcion: "Cristiano Ronaldo busca su último gran título ante una Marruecos que sorprendió al mundo en Qatar.", reparto: ["Cristiano Ronaldo", "Achraf Hakimi", "Bruno Fernandes"] },
  { id: 6, titulo: "Estados Unidos vs México", genero: "Grupo A", duracion: "90 min", año: 2026, color: "from-indigo-800", rating: 9.7, director: "SoFi Stadium · Los Ángeles", descripcion: "El superclásico de CONCACAF en casa. El partido más esperado por la afición mexicana y estadounidense.", reparto: ["Christian Pulisic", "Hirving Lozano", "Ricardo Pepi"] },
  { id: 7, titulo: "Uruguay vs Colombia", genero: "Grupo F", duracion: "90 min", año: 2026, color: "from-sky-800", rating: 8.5, director: "Lumen Field · Seattle", descripcion: "Sudamérica se mide en un duelo de táctica y garra entre dos selecciones con hambre de gloria.", reparto: ["Darwin Núñez", "Luis Díaz", "Rodrigo Bentancur"] },
  { id: 8, titulo: "Japón vs Corea del Sur", genero: "Grupo G", duracion: "90 min", año: 2026, color: "from-rose-800", rating: 8.9, director: "NRG Stadium · Houston", descripcion: "El clásico asiático en el Mundial. Dos selecciones con gran técnica y disciplina táctica.", reparto: ["Heung-min Son", "Ritsu Doan", "Kim Min-jae"] },
  { id: 9, titulo: "Italia vs Holanda", genero: "Grupo H", duracion: "90 min", año: 2026, color: "from-emerald-800", rating: 8.7, director: "Mercedes-Benz Stadium · Atlanta", descripcion: "Los azzurri buscan redención ante una Holanda renovada con talentos de nueva generación.", reparto: ["Federico Chiesa", "Virgil van Dijk", "Cody Gakpo"] },
  { id: 10, titulo: "Cuartos de Final 1", genero: "Eliminatoria", duracion: "90 min", año: 2026, color: "from-amber-700", rating: 9.3, director: "MetLife Stadium · Nueva York", descripcion: "El primer partido de cuartos de final del Mundial 2026. Los mejores ocho equipos del mundo se miden.", reparto: ["Por definir", "Por definir", "Por definir"] },
  { id: 11, titulo: "Semifinal 1 — Mundial 2026", genero: "Semifinal", duracion: "90 min", año: 2026, color: "from-orange-700", rating: 9.8, director: "AT&T Stadium · Dallas", descripcion: "El primer boleto a la gran final del Mundial 2026. Emoción pura en 90 minutos.", reparto: ["Por definir", "Por definir", "Por definir"] },
  { id: 12, titulo: "Gran Final — Mundial 2026", genero: "Final", duracion: "90 min", año: 2026, color: "from-yellow-600", rating: 10.0, director: "MetLife Stadium · Nueva York", descripcion: "La gran final del Mundial 2026. El partido más importante del fútbol mundial. ¿Quién levantará la copa?", reparto: ["Por definir", "Por definir", "Por definir"] },
  { id: 13, titulo: "México vs Polonia", genero: "Grupo A", duracion: "90 min", año: 2026, color: "from-green-700", rating: 8.6, director: "Estadio Azteca · CDMX", descripcion: "México busca los tres puntos ante una Polonia liderada por Robert Lewandowski.", reparto: ["Guillermo Ochoa", "Robert Lewandowski", "Edson Álvarez"] },
  { id: 14, titulo: "Arabia Saudita vs Argentina", genero: "Grupo B", duracion: "90 min", año: 2026, color: "from-green-900", rating: 8.4, director: "Rose Bowl · Los Ángeles", descripcion: "La revancha del histórico resultado de Qatar 2022. Argentina busca el dominio desde el inicio.", reparto: ["Lionel Messi", "Lautaro Martínez", "Firas Al-Buraikan"] },
  { id: 15, titulo: "Alemania vs Costa Rica", genero: "Grupo C", duracion: "90 min", año: 2026, color: "from-gray-700", rating: 8.0, director: "Lincoln Financial · Filadelfia", descripcion: "Alemania busca redención tras la eliminación en grupos de Qatar 2022.", reparto: ["Florian Wirtz", "Leroy Sané", "Joel Campbell"] },
  { id: 16, titulo: "Selección Mexicana — Documental", genero: "Documental", duracion: "45 min", año: 2026, color: "from-green-600", rating: 9.0, director: "Producción MX2026", descripcion: "El camino del Tri hacia el Mundial 2026: entrenamientos, jugadores y la pasión de todo un país.", reparto: ["Jaime Lozano", "Hirving Lozano", "Santiago Giménez"] },
  { id: 17, titulo: "Historia del Mundial — Serie", genero: "Documental", duracion: "60 min", año: 2026, color: "from-purple-800", rating: 8.8, director: "Producción MX2026", descripcion: "Repaso por los momentos más icónicos de la historia de los Mundiales de Fútbol.", reparto: ["Pelé", "Diego Maradona", "Ronaldo Nazário"] },
  { id: 18, titulo: "Canadá vs Bélgica", genero: "Grupo D", duracion: "90 min", año: 2026, color: "from-red-900", rating: 8.2, director: "BC Place · Vancouver", descripcion: "Canadá debuta en casa en el Mundial 2026 ante una Bélgica en transición generacional.", reparto: ["Alphonso Davies", "Kevin De Bruyne", "Jonathan David"] },
];

export const peliculasPorId = Object.fromEntries(peliculas.map((p) => [p.id, p]));
