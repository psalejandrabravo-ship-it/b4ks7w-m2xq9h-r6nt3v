import { useEffect, useRef, useState, type CSSProperties } from "react";
import { stationById, type StationId } from "@/content/camino";
import { fichaById } from "@/content/fichas";
import { useSession } from "@/components/camino/session";

const gradients: Record<StationId, string> = {
  1: "linear-gradient(165deg, #9b59b6, #e7a0c4)",
  2: "linear-gradient(165deg, #c0392b, #f5b7b1)",
  3: "linear-gradient(165deg, #2471a3, #85c1e9)",
  4: "linear-gradient(165deg, #1e8449, #7dcea0)",
  5: "linear-gradient(165deg, #d68910, #f5b041)",
  6: "linear-gradient(165deg, #0e6655, #48c9b0)",
};

function stopClips(bucket: HTMLAudioElement[]) {
  bucket.forEach((audio) => audio.pause());
  bucket.length = 0;
}

export function PreguntaEstacion({ id }: { id: StationId }) {
  const station = stationById(id);
  const face = fichaById(id);
  const { replayVideo, solve, celebrate } = useSession();
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [right, setRight] = useState(false);
  const [fade, setFade] = useState(false);
  const clips = useRef<HTMLAudioElement[]>([]);

  useEffect(() => () => stopClips(clips.current), []);

  function choose(choiceId: string, recommended: boolean) {
    if (right || fade) return;
    stopClips(clips.current);
    if (recommended) {
      setRight(true);
      const effect = new Audio(face.sfx);
      clips.current.push(effect);
      void effect.play().catch(() => undefined);
      return;
    }
    setWrongId(choiceId);
  }

  function continuar() {
    if (fade) return;
    stopClips(clips.current);
    if (face.finale) {
      celebrate();
      return;
    }
    setFade(true);
    window.setTimeout(() => solve(id), 1000);
  }

  const shout = face.yes.match(/^¡[^!]+!/);
  const cheer = shout?.[0] ?? "¡Muy bien!";
  const yesBody = face.yes.replace(/^¡[^!]+!\s*/, "");

  return (
    <div className="q1">
      <img src={station.image} alt={station.alt} className={id === 4 || id === 6 ? "q1-bg q1-bg-full" : "q1-bg"} />
      <header className="q1-head" style={{ background: `${face.colors.main}b8` }}>
        <div>
          <p>Estación {id}</p>
          <h1>{face.title}</h1>
        </div>
      </header>
      {!right ? <p className="q1-ask">{face.question}</p> : null}
      {wrongId && !right ? (
        <div className="q1-retry">
          <p>{face.no}</p>
          <button type="button" className="btn btn-coral" onClick={() => replayVideo(id)}>
            Ver de nuevo
          </button>
        </div>
      ) : null}
      {!right ? (
        <div className="q1-options">
          {face.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={
                wrongId === choice.id ? "q1-pill q1-shake" : choice.recommended ? "q1-pill q1-yes" : "q1-pill q1-no"
              }
              onClick={() => choose(choice.id, choice.recommended)}
            >
              <span aria-hidden="true">{choice.emoji}</span>
              {choice.text}
            </button>
          ))}
        </div>
      ) : null}
      {right ? (
        <>
          <div className="q1-pop" role="status">
            <div className="q1-fairy" aria-hidden="true">
              {Array.from({ length: 14 }, (_, index) => (
                <i
                  key={index}
                  className="q1-bit"
                  style={{ "--i": index, background: index % 2 ? face.colors.main : "#ffd700" } as CSSProperties}
                />
              ))}
              <img src="/media/personajes/hada.png" alt="" />
            </div>
            <div className="q1-msg" style={{ background: gradients[id] }}>
              <h2>{cheer}</h2>
              <p>{yesBody}</p>
              <button type="button" className="q1-go" onClick={continuar}>
                Continuar
              </button>
            </div>
          </div>
          <aside className="q1-talk" aria-label="Preguntas para conversar">
            <h2>Para conversar</h2>
            <ul>
              {face.reflect.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </>
      ) : null}
      {fade ? <div className="white-fade" /> : null}
    </div>
  );
}
