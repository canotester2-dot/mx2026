"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const destacados = [
  { id: 12, titulo: "Gran Final — Mundial 2026", categoria: "FINAL · METLIFE STADIUM", autor: "Nueva York, EUA", color: "from-yellow-700" },
  { id: 1, titulo: "México vs Camerún", categoria: "GRUPO A", autor: "Estadio Azteca · CDMX", color: "from-green-800" },
  { id: 2, titulo: "Brasil vs Argentina", categoria: "GRUPO B", autor: "MetLife Stadium · NY", color: "from-yellow-800" },
  { id: 3, titulo: "España vs Alemania", categoria: "GRUPO C", autor: "SoFi Stadium · LA", color: "from-red-800" },
  { id: 6, titulo: "Estados Unidos vs México", categoria: "GRUPO A", autor: "SoFi Stadium · LA", color: "from-indigo-800" },
];

const partidos = [
  { id: 1, titulo: "México vs Camerún", grupo: "Grupo A", hora: "11 Jun · 3:00 PM", color: "from-green-800", emoji: "🇲🇽🆚🇨🇲" },
  { id: 6, titulo: "EUA vs México", grupo: "Grupo A", hora: "17 Jun · 6:00 PM", color: "from-indigo-800", emoji: "🇺🇸🆚🇲🇽" },
  { id: 2, titulo: "Brasil vs Argentina", grupo: "Grupo B", hora: "13 Jun · 7:00 PM", color: "from-yellow-700", emoji: "🇧🇷🆚🇦🇷" },
  { id: 4, titulo: "Francia vs Inglaterra", grupo: "Grupo D", hora: "15 Jun · 5:00 PM", color: "from-blue-800", emoji: "🇫🇷🆚🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
];

export default function Home() {
  const principal = destacados[0];
  const secundarios = destacados.slice(1);

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0f" }}>
      <Navbar paginaActiva="inicio" />

      {/* Hero */}
      <section className="px-4 sm:px-8 py-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-yellow-400 text-xs font-bold tracking-widest mb-4"
        >
          ⚽ PARTIDOS DESTACADOS — MUNDIAL 2026
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`relative w-full lg:flex-1 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br ${principal.color} to-black flex items-end p-5 sm:p-8`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute top-4 right-6 text-6xl sm:text-8xl opacity-20">⚽</div>
            <div className="relative z-10 w-full">
              <p className="text-yellow-400 text-xs font-bold tracking-widest mb-1">{principal.categoria}</p>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-1 leading-tight">{principal.titulo}</h1>
              <p className="text-gray-300 mb-4 flex items-center gap-2 text-sm">
                <span>📍</span> {principal.autor}
              </p>
              <div className="flex flex-wrap gap-2">
                <motion.a href="/en-vivo" whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-300 transition text-sm">
                  ▶ Ver en vivo
                </motion.a>
                <motion.a href={`/pelicula/${principal.id}`} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-white/20 px-5 py-2 rounded-lg font-semibold hover:bg-white/30 transition text-sm backdrop-blur-sm">
                  ⓘ Más info
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Secundarios */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:w-56">
            {secundarios.map((item, i) => (
              <motion.a key={item.id} href={`/pelicula/${item.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                className={`relative h-24 lg:h-full rounded-xl overflow-hidden bg-gradient-to-b ${item.color} to-black flex items-end p-3 cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-2 left-3 text-white font-bold text-sm z-10">{i + 2}</div>
                <div className="absolute top-2 right-3 text-sm z-10">⚽</div>
                <div className="relative z-10">
                  <p className="text-yellow-400 text-xs font-bold tracking-wider">{item.categoria}</p>
                  <p className="text-white text-xs font-semibold leading-tight">{item.titulo}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos partidos */}
      <section className="px-4 sm:px-8 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6 flex items-center gap-2"
        >
          🗓️ Próximos partidos
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {partidos.map((p, i) => (
            <motion.a key={p.id} href={`/pelicula/${p.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="group cursor-pointer"
            >
              <div className={`relative h-44 rounded-xl overflow-hidden bg-gradient-to-b ${p.color} to-black`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">{p.emoji}</div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded font-bold">EN VIVO</div>
                <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-4xl transition-opacity">▶</span>
                </div>
              </div>
              <div className="mt-2 px-1">
                <p className="text-yellow-400 text-xs font-bold">{p.grupo.toUpperCase()} · {p.hora}</p>
                <p className="text-white font-semibold text-sm leading-tight">{p.titulo}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Sedes */}
      <section className="px-4 sm:px-8 py-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-6"
        >
          🏟️ Sedes del Mundial 2026
        </motion.h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {["CDMX 🇲🇽", "Nueva York 🇺🇸", "Los Ángeles 🇺🇸", "Dallas 🇺🇸", "Vancouver 🇨🇦", "Guadalajara 🇲🇽"].map((sede, i) => (
            <motion.div key={sede}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-center text-sm hover:border-yellow-400/50 hover:bg-yellow-400/5 transition cursor-pointer"
            >
              {sede}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mx-4 sm:mx-8 my-8 rounded-2xl bg-gradient-to-r from-yellow-700 to-amber-600 p-8 sm:p-12 text-center"
      >
        <p className="text-5xl mb-4">⚽</p>
        <h2 className="text-3xl font-black mb-3">No te pierdas ningún partido</h2>
        <p className="text-yellow-100 mb-6">Todos los partidos del Mundial 2026 en un solo lugar.</p>
        <motion.a href="/catalogo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="inline-block px-8 py-3 bg-black text-yellow-400 font-bold rounded-xl hover:bg-gray-900 transition border border-yellow-400/30"
        >
          Ver todos los partidos →
        </motion.a>
      </motion.section>

      <footer className="text-center text-gray-600 py-8 border-t border-white/10">
        © 2026 MX2026. Todos los derechos reservados.
      </footer>
    </main>
  );
}
