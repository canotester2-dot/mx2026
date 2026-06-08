import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { default: db } = await import("@/lib/db");
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
    }

    const result = await db.execute({ sql: "SELECT id, nombre, password FROM Usuario WHERE email = ?", args: [email] });
    const usuario = result.rows[0];
    if (!usuario) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
    }

    const valido = await bcrypt.compare(password, usuario.password as string);
    if (!valido) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
    }

    return NextResponse.json({ ok: true, id: Number(usuario.id), nombre: usuario.nombre }, { status: 200 });
  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
