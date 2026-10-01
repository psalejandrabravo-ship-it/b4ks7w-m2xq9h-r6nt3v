import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Maximize, Minimize } from "lucide-react";
import { stationById, type StationId } from "@/content/camino";
import { fichaById } from "@/content/fichas";
import { videoSources } from "@/content/videos";
import { activeStation, useSession } from "@/components/camino/session";
import { PreguntaEstacion } from "@/components/camino/estacion-uno";

const WHITE_LOGO = "/brand/01-Logotipo/MIRARIM-horizontal-blanco.svg";

const panels: Record<StationId, { title: string; text: string; guide: string }> = {
  1: {
    title: "¿Será por mí?",
    text: "Lucas vio a sus amigos en el parque. Pero cuando les preguntó si querían jugar, todos le dijeron que no. Lucas se sintió muy triste y confundido.",
    guide: "¿Qué estaba pasando?",
  },
  2: {
    title: "Sofía",
    text: "Sofía llegó al parque con cara de enojo. Pero... ¿por qué estaba molesta?",
    guide: "Ver la historia de Sofía",
  },
  3: {
    title: "Emma",
    text: "Emma se veía triste y no quería jugar. ¿Qué le habrá pasado?",
    guide: "Ver la historia de Emma",
  },
  4: {
    title: "Mateo",
    text: "Mateo vio a sus amigas y dijo que no era buen momento para jugar. ¿Por qué habrá dicho eso?",
    guide: "Ver la historia de Mateo",
  },
  5: {
    title: "¿Ya no me quieren?",
    text: "Lucas pensó que sus amigos ya no lo querían. Pero... ¿será verdad?",
    guide: "¿Qué sintieron sus amigos?",
  },
  6: {
    title: "¿Qué hago?",
    text: "Lucas ahora entiende lo que les pasaba a sus amigos. ¿Qué crees que debería hacer?",
    guide: "La decisión de Lucas",
  },
};
const SPOTS = [
  { x: 11, y: 61 },
  { x: 20.9, y: 67.5 },
  { x: 31.2, y: 72.2 },
  { x: 42.8, y: 75.4 },
  { x: 55.7, y: 75.8 },
  { x: 67.8, y: 73.4 },
  { x: 78.3, y: 68.7 },
];

function httpUrl(value: string): string | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function shrinkLogo(file: File) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    const local = URL.createObjectURL(file);
    img.onload = () => {
      const max = 280;
      const scale = Math.min(1, max / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const png = file.type === "image/png" || file.type === "image/webp";
      resolve(png ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", 0.72));
      URL.revokeObjectURL(local);
    };
    img.onerror = () => {
      URL.revokeObjectURL(local);
      reject(new Error("image"));
    };
    img.src = local;
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    void document.documentElement.requestFullscreen?.().catch(() => undefined);
    return;
  }
  void document.exitFullscreen?.().catch(() => undefined);
}

function useFullscreenFlag() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const sync = () => setOn(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);
  return on;
}

export function CaminoSwitch() {
  const { screen } = useSession();
  if (screen === "portada") return <Portada />;
  if (typeof screen !== "string" && screen.name === "video") return <VideoCapa />;
  if (screen === "mapa") return <Mapa />;
  if (screen === "cierre") return <Cierre />;
  return <PreguntaEstacion id={screen.id} />;
}

function LogoMark() {
  const { logoSrc, logoHref } = useSession();
  const src = logoSrc || WHITE_LOGO;
  const image = (
    <img
      src={src}
      alt={logoSrc ? "Logo del jardín" : "MIRARIM"}
      className="logo-plain h-12 w-auto max-w-56 object-contain md:h-14"
    />
  );
  const href = httpUrl(logoHref);
  if (!href) return image;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {image}
    </a>
  );
}

function Portada() {
  const { begin, setLogo, logoSrc } = useSession();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [share, setShare] = useState("");
  const [copied, setCopied] = useState(false);
  const full = useFullscreenFlag();
  const titleId = useId();

  function saveLogo() {
    const href = link.trim();
    if (href && !httpUrl(href)) {
      setError("El enlace del logo debe empezar por https://");
      return;
    }
    if (image && !image.startsWith("data:image/") && !httpUrl(image)) {
      setError("Adjunta una imagen o usa un enlace https://");
      return;
    }
    setError("");
    setLogo(image || null, href ? httpUrl(href) || "" : "");
    setOpen(false);
  }

  async function onFile(file: File) {
    setError("");
    setCopied(false);
    try {
      const data = await shrinkLogo(file);
      if (data.length > 180000) {
        setError("Esa imagen es muy pesada. Prueba con un logo más simple.");
        return;
      }
      setImage(data);
    } catch {
      setError("No se pudo leer esa imagen.");
    }
  }

  async function createLink() {
    const src = image || logoSrc || "";
    if (!src) {
      setError("Primero adjunta el logo.");
      return;
    }
    const href = link.trim();
    if (href && !httpUrl(href)) {
      setError("El enlace del logo debe empezar por https://");
      return;
    }
    setError("");
    setLogo(src, href ? httpUrl(href) || "" : "");
    const params = new URLSearchParams();
    params.set("logo", src);
    if (href && httpUrl(href)) params.set("href", httpUrl(href) || "");
    const url = `${window.location.origin}${window.location.pathname}#${params.toString()}`;
    setShare(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative min-h-dvh">
      <img
        src="/media/escenas/01-grupo-inicio.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo/85 via-indigo/15 to-indigo/25" />
      <header className="relative z-10 flex items-start justify-between p-4 md:p-8">
        <LogoMark />
        <button type="button" className="plain-action" onClick={toggleFullscreen}>
          {full ? <Minimize aria-hidden="true" className="size-6" /> : <Maximize aria-hidden="true" className="size-6" />}
          {full ? "Salir de pantalla completa" : "Ampliar pantalla"}
        </button>
      </header>
      <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-end px-4 pb-10 text-center">
        <h1 id="titulo-pantalla" className="text-4xl font-extrabold leading-tight text-cream md:text-6xl">
          El camino de la comprensión
        </h1>
        <p className="mt-3 max-w-xl text-lg text-cream">
          Lucas, Sofía, Emma, Mateo y el Hada. La educadora conduce el recorrido.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="btn btn-coral px-10 text-xl" onClick={begin}>
            Comenzar
          </button>
          <a className="btn btn-ghost bg-cream no-underline" href="/guias/laberinto-buenas-decisiones.pdf" download="El-laberinto-de-las-buenas-decisiones.pdf">
            Descargar guía
          </a>
          <button type="button" className="btn btn-ghost bg-cream" onClick={() => setOpen(true)}>
            Personalización
          </button>
        </div>
      </div>
      {open ? (
        <div className="absolute inset-0 z-20 flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="panel w-full max-w-lg bg-cream"
          >
            <h2 id={titleId} className="text-2xl font-extrabold text-indigo">
              Personalización
            </h2>
            <p className="mt-2 text-base">Adjunta el logo del jardín. Reemplaza a MIRARIM. Luego puedes crear un enlace para compartirlo.</p>
            <label className="mt-4 block text-base font-extrabold text-indigo" htmlFor="logo-file">
              Logo
            </label>
            <input
              id="logo-file"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="mt-1 w-full text-base"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onFile(file);
              }}
            />
            {image.startsWith("data:image/") ? (
              <img src={image} alt="Vista previa del logo" className="mt-3 h-14 w-auto bg-indigo p-2" />
            ) : null}
            <label className="mt-4 block text-base font-extrabold text-indigo" htmlFor="logo-href">
              Enlace al pulsar el logo
            </label>
            <input
              id="logo-href"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://"
              className="mt-1 w-full rounded-xl border-2 border-indigo bg-cream px-3 py-3 text-lg"
            />
            {share ? (
              <label className="mt-4 block text-base font-extrabold text-indigo" htmlFor="logo-share">
                Enlace para compartir {copied ? "(copiado)" : ""}
              </label>
            ) : null}
            {share ? (
              <input id="logo-share" readOnly value={share} className="mt-1 w-full rounded-xl border-2 border-indigo bg-cream px-3 py-3 text-sm" />
            ) : null}
            {error ? <p className="mt-2 text-base font-semibold text-indigo">{error}</p> : null}
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" className="btn btn-indigo" onClick={saveLogo}>
                Guardar
              </button>
              <button type="button" className="btn btn-coral" onClick={() => void createLink()}>
                Crear enlace
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setImage("");
                  setLink("");
                  setError("");
                  setLogo(null, "");
                  setOpen(false);
                }}
              >
                Logo MIRARIM
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function VideoCapa() {
  const { screen, finishVideo } = useSession();
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const station = typeof screen === "string" || screen.name !== "video" ? "inicial" : screen.station;
  const src =
    station === "inicial" ? videoSources.inicial : station === "final" ? videoSources.final : videoSources.estaciones[station - 1];

  useEffect(() => {
    if (!src) {
      finishVideo();
      return;
    }
    const video = ref.current;
    if (!video) return;
    const pending = video.play();
    if (pending) pending.catch(() => setBlocked(true));
  }, [finishVideo, src]);

  if (!src) return null;

  return (
    <div className="fixed inset-0 z-40 bg-ink">
      <video
        ref={ref}
        className="h-full w-full object-contain"
        src={src}
        autoPlay
        playsInline
        onEnded={finishVideo}
        onPlaying={() => setPlaying(true)}
        onPlay={() => setBlocked(false)}
      />
      {!playing && !blocked ? (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-extrabold text-cream">
          Cargando el video…
        </p>
      ) : null}
      {blocked ? (
        <button
          type="button"
          className="btn btn-coral absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => void ref.current?.play()}
        >
          Reproducir
        </button>
      ) : null}
      <button type="button" className="btn btn-ghost absolute right-4 bottom-4 bg-cream" onClick={finishVideo}>
        Saltar video
      </button>
    </div>
  );
}

function Mapa() {
  const { done, entry, watched, playStation, openQuestion, finishRun } = useSession();
  const frontier = activeStation(done) ?? 6;
  const [place, setPlace] = useState(entry.kind === "intro" || entry.kind === "finale" ? 0 : entry.id);
  const [card, setCard] = useState<StationId | null>(
    entry.kind === "video" || entry.kind === "stay" ? entry.id : null,
  );
  const [walking, setWalking] = useState(false);
  const [walkMs, setWalkMs] = useState(entry.kind === "solved" && entry.id === 1 ? 2000 : 1150);
  const [reached, setReached] = useState(entry.kind === "intro" ? 0 : entry.kind === "finale" ? 6 : done.filter(Boolean).length);
  const [gold, setGold] = useState(false);
  const [veil, setVeil] = useState(false);
  const timer = useRef<number | null>(null);

  function walkTo(next: number, show: StationId | null, ms = 1150) {
    if (timer.current) window.clearTimeout(timer.current);
    setCard(null);
    setWalking(true);
    setWalkMs(ms);
    setPlace(next);
    setReached((value) => Math.max(value, next));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => {
      setWalking(false);
      setCard(show);
    }, reduce ? 40 : ms);
  }

  useEffect(() => {
    if (entry.kind === "finale") {
      setReached(6);
      setWalking(true);
      setWalkMs(450);
      let step = 0;
      const hop = () => {
        step += 1;
        if (step > 6) {
          setWalking(false);
          setGold(true);
          timer.current = window.setTimeout(() => finishRun(), 2000);
          return;
        }
        setPlace(step);
        timer.current = window.setTimeout(hop, 480);
      };
      timer.current = window.setTimeout(hop, 180);
      return () => {
        if (timer.current) window.clearTimeout(timer.current);
      };
    }
    let start = 0;
    if (entry.kind === "intro") {
      start = window.setTimeout(() => walkTo(frontier, frontier), 420);
    } else if (entry.kind === "solved" && entry.id < 6) {
      const ms = entry.id === 1 ? 2000 : 1150;
      walkTo((entry.id + 1) as StationId, (entry.id + 1) as StationId, ms);
    }
    return () => {
      if (start) window.clearTimeout(start);
      if (timer.current) window.clearTimeout(timer.current);
    };
    // El mapa se monta de nuevo en cada llegada.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spot = SPOTS[place] ?? SPOTS[0];
  const mapLevel = Math.min(6, Math.max(1, reached));
  const mapSrc = `/media/mapas/mapa-${mapLevel}.jpg`;
  const here = place >= 1 && place <= 6 ? (place as StationId) : null;
  const panel = here ? panels[here] : null;
  const tone = here ? fichaById(here).colors.main : "#9B59B6";

  function openHex(id: StationId) {
    if (veil) return;
    const bell = new Audio("/audio/clic.wav");
    void bell.play().catch(() => undefined);
    setVeil(true);
    window.setTimeout(() => playStation(id), 500);
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-indigo">
      <img src={mapSrc} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover blur-md" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="stage">
          <h1 className="map-title">El camino de la comprensión</h1>
          <img
            src={mapSrc}
            alt="Mapa del camino, de la casa de Lucas al parque."
            className="h-full w-full object-cover"
          />
          {!walking && here && panel ? (
            <div className="st-anchor" style={{ left: `${SPOTS[here].x}%`, top: `${SPOTS[here].y}%` }}>
              <div className="st-box" style={{ background: `${tone}d9`, boxShadow: `0 4px 12px ${tone}73` }}>
                <p>Estación {here}</p>
                <h2>{panel.title}</h2>
                <span className="st-line" />
                <p className="st-copy">{panel.text}</p>
              </div>
              <img className="st-lucas" src="/media/personajes/lucas.png" alt="" />
              <div className="st-below">
                <span className="st-badge" aria-hidden="true">{here}</span>
                <button type="button" className="st-hex" onClick={() => openHex(here)}>
                  <span className="st-hex-gold">
                    <span className="st-hex-color" style={{ background: tone }}>
                      <img src={stationById(here).image} alt="" />
                    </span>
                  </span>
                  <span className="sr-only">Ver el video de la estación {here}</span>
                </button>
                <p className="st-guide">{panel.guide}</p>
              </div>
            </div>
          ) : null}
          <div
            className={here && !walking ? "walker s1-hide" : walking ? "walker walking" : "walker"}
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, ["--walk" as string]: `${walkMs}ms` }}
          >
            <img className="sprite lucas" src="/media/personajes/lucas.png" alt="" />
            <span className="sr-only">Lucas camina por el sendero. El Hada acompaña la pregunta.</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          className="step-btn"
          onClick={() => {
            if (place <= 0) return;
            if (place === 1) walkTo(0, null);
            else walkTo(place - 1, (place - 1) as StationId);
          }}
          disabled={place <= 0}
        >
          Anterior
        </button>
        <ol className="flex items-center gap-1" aria-label="Estaciones. Se puede avanzar o retroceder.">
          {done.map((ready, index) => {
            const id = (index + 1) as StationId;
            const locked = id > frontier;
            return (
              <li key={id}>
                <button
                  type="button"
                  className={place === id ? "dot-btn dot-on" : "dot-btn"}
                  disabled={locked}
                  onClick={() => walkTo(id, id)}
                  aria-label={
                    locked
                      ? `Estación ${id} todavía no`
                      : ready
                        ? `Volver a la estación ${id}`
                        : `Ir a la estación ${id}`
                  }
                >
                  <span className={ready ? "dot dot-done" : "dot"} />
                </button>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          className="step-btn"
          onClick={() => place < frontier && walkTo(place + 1, (place + 1) as StationId)}
          disabled={place >= frontier}
        >
          Siguiente
        </button>
      </div>
      {entry.kind === "solved" ? <div className="map-veil" /> : null}
      {gold ? <div className="gold-fade" /> : null}
      {veil ? <div className="white-fade" /> : null}
    </div>
  );
}

function Pregunta({ id }: { id: StationId }) {
  const station = stationById(id);
  const { solve, replayVideo } = useSession();
  const [wrong, setWrong] = useState(false);

  return (
    <div className="relative min-h-dvh">
      <img src={station.image} alt={station.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-indigo/88 to-transparent px-4 pt-5 pb-16 text-center">
        <h1 className="text-xl font-extrabold text-cream md:text-2xl">{station.title}</h1>
        <p className="mx-auto mt-2 max-w-3xl text-lg text-cream md:text-xl">{station.question}</p>
      </div>
      {wrong ? (
        <div className="wrong-banner" aria-live="polite">
          <p>{station.no}</p>
          <button type="button" className="btn btn-coral mt-4" onClick={() => replayVideo(id)}>
            Ver el video de nuevo
          </button>
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-indigo/90 to-transparent px-4 pt-16 pb-5">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
          {station.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className="choice-btn"
              onClick={() => {
                if (choice.recommended) solve(id);
                else setWrong(true);
              }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const cierrePreguntas = [
  { icon: "🤔", text: "¿Alguna vez pensaron que alguien estaba molesto con ustedes?" },
  { icon: "💡", text: "¿Qué podrían hacer la próxima vez antes de sentirse mal?" },
  { icon: "🗣️", text: "¿Por qué es importante decir lo que nos pasa a nuestros amigos?" },
  { icon: "❤️", text: "¿Cómo pueden ayudar a un amigo que está triste o preocupado?" },
  { icon: "🤝", text: "¿Qué aprendieron sobre ser un buen amigo?" },
  { icon: "⭐", text: "¿Qué fue lo que más les gustó del viaje de Lucas?" },
];

function Cierre() {
  const { restart, playAgain } = useSession();
  const [hada, setHada] = useState(false);

  useEffect(() => {
    const music = new Audio("/audio/s6-epica.wav");
    void music.play().catch(() => undefined);
    return () => music.pause();
  }, []);

  return (
    <div className="fin">
      <img src="/media/mapas/mapa-6.jpg" alt="" className="fin-bg" />
      <div className="fin-gold" aria-hidden="true" />
      {Array.from({ length: 16 }, (_, index) => (
        <i key={index} className="fin-bit" style={{ "--i": index } as CSSProperties} />
      ))}
      <button type="button" className="fin-hada" onClick={() => setHada(true)} aria-label="Mensaje del Hada">
        <img src="/media/personajes/hada.png" alt="" />
      </button>
      <h1>¡Completaste el viaje!</h1>
      <section className="fin-story">
        <h2>El viaje de Lucas</h2>
        <p>
          Lucas aprendió algo muy importante: cuando alguien no quiere jugar o está molesto, no siempre es por
          nosotros. Todos tenemos días difíciles y problemas que resolver. Lo mejor es preguntar con cariño «¿estás
          bien?» y ofrecer nuestra ayuda.
        </p>
      </section>
      <p className="fin-hearts-title">Estaciones completadas</p>
      <ol className="fin-hearts">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <li key={n} style={{ animationDelay: `${n * 0.3}s` }}>
            {n}
          </li>
        ))}
      </ol>
      <section className="fin-talk">
        <h2>💭 Ahora conversemos juntos</h2>
        <div>
          {cierrePreguntas.map((item) => (
            <p key={item.text}>
              <span aria-hidden="true">{item.icon}</span>
              {item.text}
            </p>
          ))}
        </div>
      </section>
      <div className="fin-actions">
        <button type="button" className="fin-home" onClick={restart}>
          🏠 Volver al inicio
        </button>
        <button type="button" className="fin-again" onClick={playAgain}>
          🔄 Jugar de nuevo
        </button>
      </div>
      <details className="fin-guide">
        <summary>Guía para el facilitador</summary>
        <p>Permita que cada niño comparta sin interrupciones. Valide todas las respuestas.</p>
        <p>Conecte las experiencias personales con la historia de Lucas.</p>
        <p>Refuerce el mensaje: no todo es personal.</p>
        <p>Cierre con un compromiso: la próxima vez que alguien no quiera jugar, voy a…</p>
        <p>Tiempo sugerido: 10 a 15 minutos.</p>
      </details>
      {hada ? (
        <div className="fin-note" role="dialog" aria-modal="true" aria-labelledby="hada-cierre">
          <div>
            <h2 id="hada-cierre">¡Gracias por acompañar a Lucas en este viaje!</h2>
            <p>Preguntar antes de asumir. Ser amables con los demás. Todos tenemos días difíciles.</p>
            <p>Un buen amigo pregunta «¿estás bien?». ¡Hasta la próxima aventura!</p>
            <button type="button" className="q1-go" onClick={() => setHada(false)}>
              Cerrar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
