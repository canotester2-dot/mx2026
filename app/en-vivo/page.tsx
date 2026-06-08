"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// =====================================================
// PEGA TU CÓDIGO EMBED AQUÍ DENTRO DEL IFRAME O HTML
// =====================================================
const EMBED_URL = ""; // <-- Pega aquí la URL de tu embed si es un iframe simple
const EMBED_HTML = ``; // <-- O pega aquí el código HTML completo del embed

export default function EnVivo() {
  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <Navbar />

      <section className="px-8 py-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 font-bold text-sm tracking-widest">EN VIVO</span>
          </div>
          <h1 className="text-3xl font-black">Transmisión en vivo</h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* ÁREA DEL EMBED */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900 border border-white/10" style={{ aspectRatio: "16/9" }}>
              {EMBED_URL ? (
                <iframe
                  src={EMBED_URL}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                />
              ) : EMBED_HTML ? (
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: EMBED_HTML }}
                />
              ) : (
                /* Pantalla de espera cuando no hay embed */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-4xl">📡</span>
                  </div>
                  <p className="text-xl font-bold">Transmisión próximamente</p>
                  <p className="text-gray-400 text-sm">La transmisión comenzará en breve</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 text-sm">Esperando señal...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Info debajo del player */}
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">StreamMX Live</h2>
                  <p className="text-gray-400 text-sm">Transmisión oficial de StreamMX</p>
                </div>
                <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-sm font-bold">EN VIVO</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel lateral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {/* Chat simulado */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-96">
              <h3 className="font-bold mb-3 text-sm text-gray-400 uppercase tracking-widest">Chat en vivo</h3>
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto mb-3">
                {[
                  { usuario: "CineAmante", msg: "¡Esto está increíble! 🔥", color: "text-green-400" },
                  { usuario: "FilmFan99", msg: "Qué buena transmisión 👏", color: "text-blue-400" },
                  { usuario: "StreamMXFan", msg: "Primera vez aquí, me encanta", color: "text-purple-400" },
                  { usuario: "Cineasta_MX", msg: "¿Cuándo empieza?", color: "text-yellow-400" },
                  { usuario: "JorgeCano", msg: "Bienvenidos a StreamMX 🎬", color: "text-red-400" },
                ].map((item, i) => (
                  <div key={i} className="text-sm">
                    <span className={`font-bold ${item.color}`}>{item.usuario}: </span>
                    <span className="text-gray-300">{item.msg}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
                />
                <button className="px-3 py-2 bg-green-500 text-black font-bold rounded-lg text-sm hover:bg-green-400 transition">
                  ➤
                </button>
              </div>
            </div>

            {/* Próximas transmisiones */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="font-bold mb-3 text-sm text-gray-400 uppercase tracking-widest">Próximas transmisiones</h3>
              <div className="flex flex-col gap-3">
                {[
                  { titulo: "Noche de Acción", hora: "Hoy 8:00 PM" },
                  { titulo: "Clásicos del Cine", hora: "Mañana 7:00 PM" },
                  { titulo: "Maratón Nolan", hora: "Sábado 6:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm font-medium">{item.titulo}</span>
                    <span className="text-xs text-green-400">{item.hora}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="text-center text-gray-600 py-8 border-t border-white/10 mt-8">
        © 2025 StreamMX. Todos los derechos reservados.
      </footer>
    </main>
  );
}
