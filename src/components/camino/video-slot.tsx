import { Play } from "lucide-react";
import { useAudio } from "@/components/camino/audio";

type Props = {
  src: string;
  label: string;
  poster?: string;
};

export function VideoSlot({ src, label, poster }: Props) {
  const { stop } = useAudio();

  if (!src) {
    return (
      <section className="panel" aria-label={label}>
        <p className="text-sm font-semibold text-indigo">Video aún no incorporado</p>
        <h2 className="mt-1 text-2xl font-extrabold text-ink">{label}</h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed">
          Este espacio queda reservado para el archivo original, con su imagen y su
          sonido. No hay un video de reemplazo. Cuando el archivo esté en el proyecto,
          se podrá reproducir, pausar y repetir desde aquí.
        </p>
        <button type="button" className="btn btn-indigo mt-4" disabled>
          <Play aria-hidden="true" className="size-6" />
          Reproducir video
        </button>
        <p className="mt-4 text-base leading-relaxed text-indigo">
          Transcripción y subtítulos: se añadirán con el video. No se inventan diálogos.
        </p>
      </section>
    );
  }

  return (
    <figure className="panel">
      <figcaption className="mb-3 text-lg font-semibold text-ink">{label}</figcaption>
      <video
        className="aspect-video w-full rounded-2xl bg-ink"
        controls
        preload="none"
        poster={poster}
        playsInline
        onPlay={() => stop()}
      >
        <source src={src} />
      </video>
      <p className="mt-3 text-base leading-relaxed text-indigo">
        El sonido de este video solo parte cuando se pulsa reproducir. La interfaz no
        añade otra música. Subtítulos: pendientes del archivo original.
      </p>
    </figure>
  );
}
