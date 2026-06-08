"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ paginaActiva }: { paginaActiva?: string }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<{ id: number; nombre: string } | null>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    router.push("/");
    setMenuAbierto(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="text-xl font-black flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">⚽</span>
          <span className="text-white">MX</span>
          <span className="text-yellow-400">2026</span>
        </a>

        {/* Links escritorio */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="/" className={`pb-1 transition ${paginaActiva === "inicio" ? "text-white border-b-2 border-yellow-400" : "text-gray-400 hover:text-white"}`}>Inicio</a>
          <a href="/catalogo" className={`pb-1 transition ${paginaActiva === "catalogo" ? "text-white border-b-2 border-yellow-400" : "text-gray-400 hover:text-white"}`}>Partidos</a>
          <a href="/favoritos" className={`pb-1 transition ${paginaActiva === "favoritos" ? "text-white border-b-2 border-yellow-400" : "text-gray-400 hover:text-white"}`}>♥ Favoritos</a>
          <a href="/en-vivo" className={`pb-1 transition flex items-center gap-2 ${paginaActiva === "en-vivo" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"}`}>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />En Vivo
          </a>
        </div>

        {/* Derecha escritorio */}
        <div className="hidden md:flex items-center gap-4">
          {usuario ? (
            <div className="flex items-center gap-3">
              <a href="/perfil" className="flex items-center gap-2 hover:opacity-80 transition">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-sm">
                  {usuario.nombre.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300">Hola, <span className="text-white font-semibold">{usuario.nombre}</span></span>
              </a>
              <button onClick={cerrarSesion} className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">Salir</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <a href="/login" className="text-sm text-gray-300 hover:text-white transition">Iniciar sesión</a>
              <a href="/registro" className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg text-sm transition">Registrarse</a>
            </div>
          )}
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuAbierto ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuAbierto ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4" style={{ backgroundColor: "#0a0a0f" }}>
          <a href="/" onClick={() => setMenuAbierto(false)} className={`text-base font-medium py-2 border-b border-white/5 ${paginaActiva === "inicio" ? "text-yellow-400" : "text-gray-300"}`}>🏠 Inicio</a>
          <a href="/catalogo" onClick={() => setMenuAbierto(false)} className={`text-base font-medium py-2 border-b border-white/5 ${paginaActiva === "catalogo" ? "text-yellow-400" : "text-gray-300"}`}>⚽ Partidos</a>
          <a href="/favoritos" onClick={() => setMenuAbierto(false)} className={`text-base font-medium py-2 border-b border-white/5 ${paginaActiva === "favoritos" ? "text-yellow-400" : "text-gray-300"}`}>♥ Favoritos</a>
          <a href="/en-vivo" onClick={() => setMenuAbierto(false)} className="text-base font-medium py-2 border-b border-white/5 text-red-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />En Vivo
          </a>
          <div className="pt-2">
            {usuario ? (
              <div className="flex flex-col gap-3">
                <a href="/perfil" onClick={() => setMenuAbierto(false)} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                    {usuario.nombre.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-semibold">{usuario.nombre}</span>
                </a>
                <button onClick={cerrarSesion} className="w-full py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition text-gray-300">Cerrar sesión</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <a href="/login" onClick={() => setMenuAbierto(false)} className="w-full py-3 text-center border border-white/20 rounded-lg text-white font-medium">Iniciar sesión</a>
                <a href="/registro" onClick={() => setMenuAbierto(false)} className="w-full py-3 text-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg">Registrarse</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
