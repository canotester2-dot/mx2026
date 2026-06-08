"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<{ id: number; nombre: string } | null>(null);
  const [form, setForm] = useState({ nombre: "", passwordActual: "", passwordNueva: "", confirmar: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (!data) { router.push("/login"); return; }
    const u = JSON.parse(data);
    setUsuario(u);
    setForm((f) => ({ ...f, nombre: u.nombre }));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setMensaje("");

    if (form.passwordNueva && form.passwordNueva !== form.confirmar) {
      setError("Las contraseñas nuevas no coinciden."); return;
    }
    if (form.passwordNueva && form.passwordNueva.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres."); return;
    }

    setCargando(true);
    const res = await fetch("/api/perfil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: usuario?.id, nombre: form.nombre, passwordActual: form.passwordActual, passwordNueva: form.passwordNueva }),
    });
    const data = await res.json();
    setCargando(false);

    if (!res.ok) { setError(data.error); return; }

    const nuevoUsuario = { id: usuario!.id, nombre: form.nombre };
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    setUsuario(nuevoUsuario);
    setMensaje("Perfil actualizado correctamente.");
    setForm((f) => ({ ...f, passwordActual: "", passwordNueva: "", confirmar: "" }));
  };

  if (!usuario) return null;

  return (
    <main className="min-h-screen text-white" style={{ backgroundColor: "#0a0f0a" }}>
      <Navbar paginaActiva="" />

      <section className="max-w-xl mx-auto px-8 py-16">
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-3xl font-black text-black">
            {usuario.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-black">{usuario.nombre}</h1>
            <p className="text-gray-400">Miembro de StreamMX</p>
          </div>
        </div>

        {mensaje && (
          <div className="mb-6 px-4 py-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Nombre */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Información personal</h2>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Nombre completo</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Cambiar contraseña <span className="text-gray-500 font-normal text-sm">(opcional)</span></h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Contraseña actual</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.passwordActual}
                  onChange={(e) => setForm({ ...form, passwordActual: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Nueva contraseña</label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.passwordNueva}
                  onChange={(e) => setForm({ ...form, passwordNueva: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmar}
                  onChange={(e) => setForm({ ...form, confirmar: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-900 disabled:text-green-600 text-black font-bold py-3 rounded-xl transition"
          >
            {cargando ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      </section>
    </main>
  );
}
