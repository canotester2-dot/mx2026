import { peliculasPorId } from "@/lib/peliculas";
import DetallePelicula from "./DetallePelicula";

export default async function PeliculaDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pelicula = peliculasPorId[Number(id)];

  if (!pelicula) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: "#0a0f0a" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Película no encontrada</h1>
          <a href="/catalogo" className="text-green-400 hover:underline">Volver al catálogo</a>
        </div>
      </main>
    );
  }

  return <DetallePelicula id={Number(id)} pelicula={pelicula} />;
}
