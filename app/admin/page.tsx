"use client";
import { useState, useEffect } from "react";

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const [titulo, setTitulo] = useState("");
  const [embedHtml, setEmbedHtml] = useState("");
  const [activa, setActiva] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (autenticado) cargarTransmision();
  }, [autenticado]);

  const cargarTransmision = async () => {
    const res = await fetch("/api/transmision");
    const data = await res.json();
    setTitulo(data.titulo || "");
    setEmbedHtml(data.embedHtml || "");
    setActiva(data.activa ?? true);
  };

  const verificarPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Verificación simple del lado cliente (la real está en el API)
    if (password.length < 4) {
      setErrorLogin("Contraseña demasiado corta.");
      return;
    }
    setAutenticado(true);
    setErrorLogin("");
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");

    const res = await fetch("/api/transmision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, titulo, embedHtml, activa }),
    });

    const data = await res.json();
    setGuardando(false);

    if (!res.ok) {
      setMensaje("❌ " + data.error);
    } else {
      setMensaje("✅ ¡Transmisión guardada! Ya está visible en /en-vivo");
    }
  };

  if (!autenticado) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0f0a" }}>
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🔐</div>
            <h1 className="text-2xl font-black text-white">Panel Admin</h1>
            <p className="text-gray-400 text-sm mt-1">MX2026 — Acceso restringido</p>
          </div>

          {errorLogin && (
            <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {errorLogin}
            </div>
          )}

          <form onSubmit={verificarPassword} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Contraseña de administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <span className="text-white font-black text-xl">MX<span className="text-yellow-400">2026</span></span>
          <span className="text-gray-500">|</span>
          <span className="text-yellow-400 font-semibold">Panel Admin</span>
        </div>
        <a href="/" className="text-sm text-gray-400 hover:text-white transition">← Volver al sitio</a>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-black mb-2">🎙️ Transmisión en vivo</h1>
        <p className="text-gray-400 mb-8">Actualiza el embed del partido. Los cambios se ven de inmediato en la página En Vivo.</p>

        {mensaje && (
          <div className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
            mensaje.startsWith("✅")
              ? "bg-green-500/20 border-green-500/50 text-green-400"
              : "bg-red-500/20 border-red-500/50 text-red-400"
          }`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={guardar} className="flex flex-col gap-6">
          {/* Título del partido */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">📋 Nombre del partido</label>
            <input
              type="text"
              placeholder="Ej: México vs Brasil — Cuartos de Final"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          {/* Embed */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">📺 Código embed de la transmisión</label>
            <textarea
              placeholder={'Pega aquí el código embed, por ejemplo:\n<iframe src="https://..." width="100%" height="500" ...></iframe>'}
              value={embedHtml}
              onChange={(e) => setEmbedHtml(e.target.value)}
              rows={8}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition font-mono text-sm resize-none"
            />
          </div>

          {/* Activa */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiva(!activa)}
              className={`relative w-12 h-6 rounded-full transition ${activa ? "bg-green-500" : "bg-gray-600"}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${activa ? "left-7" : "left-1"}`} />
            </button>
            <span className="text-sm">
              {activa ? <span className="text-green-400 font-semibold">🔴 Transmisión ACTIVA</span> : <span className="text-gray-400">Transmisión inactiva</span>}
            </span>
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-900 disabled:text-yellow-600 text-black font-bold py-4 rounded-xl transition text-lg"
          >
            {guardando ? "Guardando..." : "💾 Guardar transmisión"}
          </button>
        </form>

        {/* Preview */}
        {embedHtml && (
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4 text-gray-300">👁️ Vista previa</h2>
            <div
              className="rounded-xl overflow-hidden border border-white/10"
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
