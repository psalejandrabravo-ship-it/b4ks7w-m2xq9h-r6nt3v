import { Heart } from "lucide-react";

export function Hearts({ done }: { done: boolean[] }) {
  const count = done.filter(Boolean).length;
  return (
    <section aria-labelledby="corazones-titulo">
      <h2 id="corazones-titulo" className="text-lg font-extrabold text-indigo">
        Estaciones recorridas: {count} de 6
      </h2>
      <p className="mt-1 text-base text-ink">
        Cada corazón es una estación del camino. No son puntos, premios ni una medida
        de empatía.
      </p>
      <ol className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {done.map((ready, index) => (
          <li
            key={index}
            className="flex flex-col items-center gap-1 rounded-2xl border-2 border-indigo bg-cream px-2 py-3 text-center"
          >
            <Heart
              aria-hidden="true"
              className={
                ready ? "size-7 fill-coral text-coral" : "size-7 fill-none text-indigo"
              }
            />
            <span className="text-base font-extrabold text-ink">{index + 1}</span>
            <span className="text-sm font-semibold text-indigo">
              {ready ? "Recorrida" : "Pendiente"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
