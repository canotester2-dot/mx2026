"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { peliculasPorId } from "@/lib/peliculas";

export default function Favoritos() {
  const router = useRouter();
  const [ids, setIds] = useState<number[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (!data) { router.push("/login"); return; }
    const u = JSON.parse(data);

    fetch(`/api/favoritos?usuarioId=${u.id}`)
      .then((r) => r.json())
      .then((data) => { setIds(data.favoritos ?? []); setCargando(false); });
  }, [router]);

  const peliculas = ids.map((id) => peliculasPorId[id]).filter(Boolean);

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <Navbar paginaActiva="favoritos" />

      <section className="px-8 py-12">
        <h1 className="text-4xl font-black mb-2">♥ Mis favoritos</h1>
        <p className="text-gray-400 mb-8">Las películas que guardaste para ver después.</p>

        {cargando ? (
          <p className="text-gray-500">Cargando...</p>
        ) : peliculas.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🎬</p>
            <p className="text-xl text-gray-400 mb-6">Aún no tienes favoritos.</p>
            <a href="/catalogo" className="px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition">
              Explorar catálogo
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {peliculas.map((p) => (
              <a key={p.id} href={`/pelicula/${p.id}`} className="group cursor-pointer">
                <div className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-b ${p.color} to-black`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">🎬</div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">{p.duracion}</div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl">▶</div>
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <p className="text-green-400 text-xs font-bold tracking-wider">{p.genero?.toUpperCase()}</p>
                  <p className="text-white font-semibold text-sm">{p.titulo}</p>
                </div>
              </a>
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
