import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { default: db } = await import("@/lib/db");
    const usuarioId = req.nextUrl.searchParams.get("usuarioId");
    if (!usuarioId) return NextResponse.json({ error: "Falta usuarioId." }, { status: 400 });

    const result = await db.execute({ sql: "SELECT peliculaId FROM Favorito WHERE usuarioId = ?", args: [Number(usuarioId)] });
    return NextResponse.json({ favoritos: result.rows.map((f: any) => Number(f.peliculaId)) });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { default: db } = await import("@/lib/db");
    const { usuarioId, peliculaId } = await req.json();
    if (!usuarioId || !peliculaId) return NextResponse.json({ error: "Datos incompletos." }, { status: 400 });

    const check = await db.execute({ sql: "SELECT id FROM Favorito WHERE usuarioId = ? AND peliculaId = ?", args: [usuarioId, peliculaId] });
    if (check.rows.length > 0) {
      await db.execute({ sql: "DELETE FROM Favorito WHERE usuarioId = ? AND peliculaId = ?", args: [usuarioId, peliculaId] });
      return NextResponse.json({ ok: true, accion: "eliminado" });
    }

    await db.execute({ sql: "INSERT INTO Favorito (usuarioId, peliculaId) VALUES (?, ?)", args: [usuarioId, peliculaId] });
    return NextResponse.json({ ok: true, accion: "agregado" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
