import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  try {
    const { default: db } = await import("@/lib/db");
    const { id, nombre, passwordActual, passwordNueva } = await req.json();

    if (!id || !nombre) {
      return NextResponse.json({ error: "Datos incompletos." }, { status: 400 });
    }

    const result = await db.execute({ sql: "SELECT id, nombre, password FROM Usuario WHERE id = ?", args: [id] });
    const usuario = result.rows[0];
    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
    }

    if (passwordNueva) {
      if (!passwordActual) {
        return NextResponse.json({ error: "Debes ingresar tu contraseña actual." }, { status: 400 });
      }
      const valido = await bcrypt.compare(passwordActual, usuario.password as string);
      if (!valido) {
        return NextResponse.json({ error: "La contraseña actual es incorrecta." }, { status: 401 });
      }
      const hash = await bcrypt.hash(passwordNueva, 10);
      await db.execute({ sql: "UPDATE Usuario SET nombre = ?, password = ? WHERE id = ?", args: [nombre, hash, id] });
    } else {
      await db.execute({ sql: "UPDATE Usuario SET nombre = ? WHERE id = ?", args: [nombre, id] });
    }

    return NextResponse.json({ ok: true, nombre });
  } catch (err) {
    console.error("Error en perfil:", err);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
