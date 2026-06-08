"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ paginaActiva }: { paginaActiva?: string }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<{ id: number; nombre: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    router.push("/");
  };

  return (
    <nav className="flex items-center gap-8 px-8 py-4 border-b border-white/10" style={{ backgroundColor: "#0a0a0f" }}>
      {/* Logo */}
      <a href="/" className="text-xl font-black flex-shrink-0 flex items-center gap-2">
        <span className="text-2xl">⚽</span>
        <span className="text-white">MX</span>
        <span className="text-yellow-400">2026</span>
      </a>

      {/* Links */}
      <div className="flex gap-6 text-sm font-medium">
        <a href="/" className={`pb-1 transition ${paginaActiva === "inicio" ? "text-white border-b-2 border-yellow-400" : "text-gray-400 hover:text-white"}`}>
          Inicio
        </a>
        <a href="/catalogo" className={`pb-1 transition ${paginaActiva === "catalogo" ? "text-white border-b-2 border-yellow-400" : "text-gray-400 hover:text-white"}`}>
          Partidos
        </a>
        <a href="/favoritos" className={`pb-1 transition flex items-center gap-1 ${paginaActiva === "favoritos" ? "text-white border-b-2 border-yellow-400" : "text-gray-400 hover:text-white"}`}>
          ♥ Favoritos
        </a>
        <a href="/en-vivo" className={`pb-1 transition flex items-center gap-2 ${paginaActiva === "en-vivo" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          En Vivo
        </a>
      </div>

      {/* Derecha */}
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm text-gray-400">
          <span>🔍</span>
          <span>Buscar partidos...</span>
        </div>

        {usuario ? (
          <div className="flex items-center gap-3">
            <a href="/perfil" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-sm">
                {usuario.nombre.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-300">Hola, <span className="text-white font-semibold">{usuario.nombre}</span></span>
            </a>
            <button onClick={cerrarSesion} className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">
              Salir
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm text-gray-300 hover:text-white transition">Iniciar sesión</a>
            <a href="/registro" className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg text-sm transition">
              Registrarse
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
