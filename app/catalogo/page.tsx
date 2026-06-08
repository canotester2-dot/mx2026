"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { peliculas } from "@/lib/peliculas";

const filtros = ["Todos", "Grupo A", "Grupo B", "Grupo C", "Grupo D", "Grupo E", "Grupo F", "Semifinal", "Final", "Documental"];

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [generoActivo, setGeneroActivo] = useState("Todos");

  const resultados = peliculas.filter((p) => {
    const coincideBusqueda =
      p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.genero.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.director.toLowerCase().includes(busqueda.toLowerCase());
    const coincideGenero = generoActivo === "Todos" || p.genero === generoActivo;
    return coincideBusqueda && coincideGenero;
  });

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <Navbar paginaActiva="catalogo" />

      <section className="px-8 pt-8 pb-4">
        <h1 className="text-4xl font-black mb-1 flex items-center gap-3">⚽ Todos los partidos</h1>
        <p className="text-gray-400 mb-6">Explora todos los partidos del Mundial 2026 filtrados por grupo.</p>

        <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-6 max-w-2xl focus-within:border-green-400 transition">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por partido, grupo o sede..."
            className="bg-transparent text-white placeholder-gray-500 outline-none flex-1 text-sm"
          />
          {busqueda && (
            <button onClick={() => setBusqueda("")} className="text-gray-500 hover:text-white transition text-lg">✕</button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setGeneroActivo(f)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                generoActivo === f
                  ? "border-green-400 text-green-400 bg-green-400/10"
                  : "border-white/20 text-gray-300 hover:border-white hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="px-8 py-4">
        <p className="text-gray-400 text-sm">
          {resultados.length} {resultados.length === 1 ? "película" : "películas"}
          {busqueda && <span> para "<span className="text-white">{busqueda}</span>"</span>}
        </p>
      </section>

      <section className="px-8 pb-16">
        {resultados.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-xl text-gray-400 mb-2">No encontramos resultados.</p>
            <p className="text-gray-600">Intenta con otro título, género o director.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {resultados.map((pelicula, i) => (
              <motion.a
                key={pelicula.id}
                href={`/pelicula/${pelicula.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                whileHover={{ scale: 1.04 }}
                className="group cursor-pointer"
              >
                <div className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-b ${pelicula.color} to-black`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🎬</div>
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">⚽</div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">{pelicula.duracion}</div>
                  <div className="absolute top-2 right-2 bg-yellow-400/90 text-black text-xs px-2 py-1 rounded font-bold">★ {pelicula.rating}</div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl">▶</div>
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <p className="text-green-400 text-xs font-bold tracking-wider">{pelicula.genero.toUpperCase()}</p>
                  <p className="text-white font-semibold text-sm leading-tight">{pelicula.titulo}</p>
                  <p className="text-gray-500 text-xs">{pelicula.año}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </section>

      <footer className="text-center text-gray-600 py-8 border-t border-white/10">
        © 2025 StreamMX. Todos los derechos reservados.
      </footer>
    </main>
  );
}
