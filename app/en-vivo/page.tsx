"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { peliculas } from "@/lib/peliculas";

export default function EnVivo() {
  const [transmision, setTransmision] = useState<{ titulo: string; embedHtml: string; activa: boolean } | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/transmision")
      .then((r) => r.json())
      .then((data) => {
        setTransmision(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const proximosPartidos = peliculas.slice(0, 5);

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <Navbar paginaActiva="en-vivo" />

      <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-64px)]">
        {/* Panel principal — transmisión */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-red-400 text-sm uppercase tracking-wider">En Vivo</span>
            {transmision?.titulo && (
              <>
                <span className="text-gray-600">—</span>
                <span className="text-white font-semibold">{transmision.titulo}</span>
              </>
            )}
          </div>

          {/* Área de video */}
          <div className="flex-1 flex items-center justify-center bg-black relative" style={{ minHeight: "480px" }}>
            {cargando ? (
              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">⚽</div>
                <p className="text-gray-400">Cargando transmisión...</p>
              </div>
            ) : transmision?.activa && transmision?.embedHtml ? (
              <div
                className="w-full h-full"
                style={{ minHeight: "480px" }}
                dangerouslySetInnerHTML={{ __html: transmision.embedHtml }}
              />
            ) : (
              <div className="text-center px-8">
                <div className="text-7xl mb-6">📺</div>
                <h2 className="text-2xl font-black mb-3">No hay transmisión activa</h2>
                <p className="text-gray-400 mb-2">La próxima transmisión comenzará pronto.</p>
                <p className="text-gray-600 text-sm">Revisa los próximos partidos abajo ↓</p>
              </div>
            )}
          </div>

          {/* Info del partido */}
          {transmision?.activa && transmision?.embedHtml && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <div>
                <p className="font-bold text-white">{transmision.titulo || "Partido en vivo"}</p>
                <p className="text-gray-400 text-sm">Mundial FIFA 2026</p>
              </div>
            </div>
          )}
        </div>

        {/* Panel lateral */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          {/* Próximos partidos */}
          <div className="px-4 py-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">⚽ Próximos Partidos</h3>
            <div className="flex flex-col gap-3">
              {proximosPartidos.map((partido) => (
                <a
                  key={partido.id}
                  href={`/pelicula/${partido.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${partido.color} to-black flex items-center justify-center text-2xl flex-shrink-0`}>
                    ⚽
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate group-hover:text-yellow-400 transition">{partido.titulo}</p>
                    <p className="text-gray-500 text-xs">{partido.genero}</p>
                  </div>
                </a>
              ))}
            </div>
            <a href="/catalogo" className="mt-4 block text-center text-sm text-yellow-400 hover:text-yellow-300 transition">
              Ver todos los partidos →
            </a>
          </div>

          {/* Info */}
          <div className="px-4 py-4">
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
              <p className="text-yellow-400 font-bold text-sm mb-1">🏆 Mundial FIFA 2026</p>
              <p className="text-gray-400 text-xs">México, Estados Unidos y Canadá son las sedes del torneo más grande del mundo.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
