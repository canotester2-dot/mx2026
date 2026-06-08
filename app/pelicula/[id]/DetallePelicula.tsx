"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Pelicula = {
  titulo: string;
  genero: string;
  rating: number;
  año: number;
  color: string;
  duracion: string;
  descripcion: string;
  director: string;
  reparto: string[];
};

export default function DetallePelicula({ id, pelicula }: { id: number; pelicula: Pelicula }) {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState<{ id: number; nombre: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (!data) return;
    const u = JSON.parse(data);
    setUsuario(u);

    fetch(`/api/favoritos?usuarioId=${u.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.favoritos?.includes(id)) setEsFavorito(true);
      });
  }, [id]);

  const toggleFavorito = async () => {
    if (!usuario) { window.location.href = "/login"; return; }
    setCargando(true);
    const res = await fetch("/api/favoritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, peliculaId: id }),
    });
    const data = await res.json();
    setCargando(false);
    if (data.ok) setEsFavorito(data.accion === "agregado");
  };

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <Navbar />

      {/* Hero */}
      <section className={`bg-gradient-to-b ${pelicula.color} to-black px-12 py-20 flex gap-12 items-center`}>
        <div className={`w-64 h-96 bg-gradient-to-b ${pelicula.color} to-gray-900 rounded-xl flex items-center justify-center text-8xl flex-shrink-0`}>
          🎬
        </div>
        <div className="flex-1">
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-green-500 text-black rounded-full text-sm font-bold">{pelicula.genero}</span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{pelicula.año}</span>
            <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">{pelicula.duracion}</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{pelicula.titulo}</h1>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-2xl font-bold">{pelicula.rating}</span>
            <span className="text-gray-400">/ 10</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">{pelicula.descripcion}</p>
          <div className="flex gap-4">
            <button className="px-10 py-3 bg-white text-black rounded-lg text-lg font-semibold hover:bg-gray-200 transition">
              ▶ Reproducir
            </button>
            <button
              onClick={toggleFavorito}
              disabled={cargando}
              className={`px-10 py-3 rounded-lg text-lg font-semibold transition border ${
                esFavorito
                  ? "bg-green-500 text-black border-green-500 hover:bg-green-400"
                  : "border-white hover:bg-white hover:text-black"
              }`}
            >
              {cargando ? "..." : esFavorito ? "♥ En favoritos" : "♡ Añadir a favoritos"}
            </button>
          </div>
        </div>
      </section>

      {/* Detalles */}
      <section className="px-12 py-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-400 uppercase tracking-widest">Director</h2>
          <p className="text-xl">{pelicula.director}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-400 uppercase tracking-widest">Reparto principal</h2>
          <div className="flex flex-wrap gap-3">
            {pelicula.reparto.map((actor) => (
              <span key={actor} className="px-4 py-2 bg-white/10 rounded-full">{actor}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-600 py-8 border-t border-white/10">
        © 2025 StreamMX. Todos los derechos reservados.
      </footer>
    </main>
  );
}
