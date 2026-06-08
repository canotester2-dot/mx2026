import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { default: db } = await import("@/lib/db");
    const { nombre, email, password } = await req.json();

    if (!nombre || !email || !password) {
      return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres." }, { status: 400 });
    }

    const existente = await db.execute({ sql: "SELECT id FROM Usuario WHERE email = ?", args: [email] });
    if (existente.rows.length > 0) {
      return NextResponse.json({ error: "Ya existe una cuenta con ese correo." }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await db.execute({
      sql: "INSERT INTO Usuario (nombre, email, password) VALUES (?, ?, ?)",
      args: [nombre, email, hash]
    });

    return NextResponse.json({ ok: true, id: Number(result.lastInsertRowid), nombre }, { status: 201 });
  } catch (err) {
    console.error("Error en registro:", err);
    return NextResponse.json({ error: "Error interno del servidor." }, { status: 500 });
  }
}
