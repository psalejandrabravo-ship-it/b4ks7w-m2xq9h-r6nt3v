import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Square, Volume2 } from "lucide-react";

type Status = "idle" | "playing" | "paused";

type AudioApi = {
  activeId: string | null;
  status: Status;
  play: (id: string, sources: string[]) => void;
  pause: () => void;
  stop: () => void;
};

const AudioContext = createContext<AudioApi | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const ensure = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    queueRef.current = [];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
    }
    setStatus("idle");
    setActiveId(null);
  }, []);

  const play = useCallback(
    (id: string, sources: string[]) => {
      if (sources.length === 0 || sources.some((src) => src.length === 0)) return;
      const audio = ensure();
      queueRef.current = sources.slice(1);
      audio.onended = () => {
        const next = queueRef.current.shift();
        if (!next) {
          setStatus("idle");
          setActiveId(null);
          return;
        }
        audio.src = next;
        void audio.play();
      };
      audio.src = sources[0];
      audio.currentTime = 0;
      setActiveId(id);
      setStatus("playing");
      void audio.play().catch(() => {
        setStatus("idle");
        setActiveId(null);
      });
    },
    [ensure],
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || status !== "playing") return;
    audio.pause();
    setStatus("paused");
  }, [status]);

  const api = useMemo(
    () => ({ activeId, status, play, pause, stop }),
    [activeId, pause, play, status, stop],
  );

  return <AudioContext.Provider value={api}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const api = useContext(AudioContext);
  if (!api) throw new Error("Audio fuera de contexto");
  return api;
}

type ControlProps = {
  id: string;
  src: string | string[];
  label: string;
};

export function AudioControl({ id, src, label }: ControlProps) {
  const { activeId, status, play, pause, stop } = useAudio();
  const sources = Array.isArray(src) ? src : [src];
  const mine = activeId === id;
  const playing = mine && status === "playing";

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <button
        type="button"
        className="btn btn-coral min-w-0 flex-1 sm:flex-none"
        onClick={() => play(id, sources)}
      >
        <Volume2 aria-hidden="true" className="size-7 shrink-0" />
        <span>{playing ? "Otra vez" : label}</span>
      </button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={pause}
        disabled={!playing}
        aria-label={`Pausar: ${label}`}
      >
        <Pause aria-hidden="true" className="size-6" />
        <span>Pausa</span>
      </button>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={stop}
        disabled={!mine || status === "idle"}
        aria-label={`Detener: ${label}`}
      >
        <Square aria-hidden="true" className="size-6" />
        <span>Detener</span>
      </button>
    </div>
  );
}
