"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registro() {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirmar: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password }),
    });

    const data = await res.json();
    setCargando(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push("/login?registro=ok");
  };

  return (
    <main className="min-h-screen flex text-white" style={{ backgroundColor: "#0a0f0a" }}>
      {/* Panel izquierdo */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-black to-emerald-900" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
          <div className="text-6xl mb-8">🚀</div>
          <h2 className="text-4xl font-black text-center mb-4">
            Empieza gratis<br />hoy mismo
          </h2>
          <p className="text-gray-400 text-center max-w-sm">
            Crea tu cuenta en segundos y accede a todo el catálogo de StreamMX sin límites.
          </p>
          <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
            {["★ 30 días gratis", "♥ Cancela cuando quieras", "▶ Acceso inmediato"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-green-400 font-medium">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <a href="/" className="mb-10 text-2xl font-bold">
          <span className="text-white">streammx</span>
          <span className="text-green-400 ml-1">online</span>
        </a>

        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-black mb-2">Crear cuenta</h1>
          <p className="text-gray-400 mb-8">
            ¿Ya tienes cuenta? <a href="/login" className="text-green-400 hover:underline">Inicia sesión</a>
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nombre completo</label>
              <input
                type="text"
                placeholder="Jorge García"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Contraseña</label>
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.confirmar}
                onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
              />
            </div>
            <p className="text-xs text-gray-500">
              Al registrarte aceptas los <a href="#" className="text-green-400 hover:underline">términos de uso</a> y la <a href="#" className="text-green-400 hover:underline">política de privacidad</a>.
            </p>
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-900 disabled:text-green-600 text-black font-bold py-3 rounded-xl transition mt-2"
            >
              {cargando ? "Creando cuenta..." : "Crear cuenta gratis"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
