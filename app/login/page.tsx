"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setCargando(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    localStorage.setItem("usuario", JSON.stringify({ id: data.id, nombre: data.nombre }));
    router.push("/");
  };

  return (
    <main className="min-h-screen flex text-white" style={{ backgroundColor: "#0a0f0a" }}>
      {/* Panel izquierdo */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-emerald-900" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
          <div className="text-6xl mb-8">🎬</div>
          <h2 className="text-4xl font-black text-center mb-4">
            Miles de películas<br />y series te esperan
          </h2>
          <p className="text-gray-400 text-center max-w-sm">
            Accede a tu cuenta y disfruta del mejor contenido sin interrupciones.
          </p>
          <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
            {["★ Contenido ilimitado", "♥ Guarda tus favoritos", "▶ Sin anuncios"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-yellow-400 font-medium">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <a href="/" className="mb-10 text-2xl font-bold">
          <span className="text-white">streammx</span>
          <span className="text-yellow-400 ml-1">online</span>
        </a>

        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-black mb-2">Inicia sesión</h1>
          <p className="text-gray-400 mb-8">
            ¿No tienes cuenta? <a href="/registro" className="text-yellow-400 hover:underline">Regístrate gratis</a>
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-yellow-400 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-900 disabled:text-yellow-600 text-black font-bold py-3 rounded-xl transition mt-2"
            >
              {cargando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-sm">o continúa con</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-white/20 rounded-xl py-3 hover:bg-white/10 transition font-medium">
            <span className="text-xl">G</span>
            Continuar con Google
          </button>
        </div>
      </div>
    </main>
  );
}
