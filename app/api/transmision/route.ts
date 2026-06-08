import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "mx2026admin";

export async function GET() {
  try {
    const { default: db } = await import("@/lib/db");
    const result = await db.execute({
      sql: "SELECT titulo, embedHtml, activa FROM Transmision WHERE activa = 1 ORDER BY id DESC LIMIT 1",
      args: []
    });
    if (result.rows.length === 0) {
      return NextResponse.json({ titulo: "", embedHtml: "", activa: false });
    }
    const t = result.rows[0];
    return NextResponse.json({ titulo: t.titulo, embedHtml: t.embedHtml, activa: Boolean(t.activa) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { default: db } = await import("@/lib/db");
    const { password, titulo, embedHtml, activa } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
    }

    // Desactivar transmisiones anteriores
    await db.execute({ sql: "UPDATE Transmision SET activa = 0", args: [] });

    // Insertar nueva transmisión
    await db.execute({
      sql: "INSERT INTO Transmision (titulo, embedHtml, activa) VALUES (?, ?, ?)",
      args: [titulo || "Partido en vivo", embedHtml || "", activa ? 1 : 0]
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
