import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { currentStationId, type StationId } from "@/content/camino";

export type VideoBack = "mapa" | "pregunta";

export type Screen =
  | "portada"
  | { name: "video"; station: StationId | "inicial" | "final"; back: VideoBack }
  | "mapa"
  | { name: "pregunta"; id: StationId }
  | "cierre";

const empty = [false, false, false, false, false, false];

export type MapEntry =
  | { kind: "intro" }
  | { kind: "video"; id: StationId }
  | { kind: "solved"; id: StationId }
  | { kind: "stay"; id: StationId }
  | { kind: "finale" };

type SessionApi = {
  screen: Screen;
  done: boolean[];
  watched: boolean[];
  entry: MapEntry;
  logoSrc: string | null;
  logoHref: string;
  setLogo: (src: string | null, href: string) => void;
  begin: () => void;
  finishVideo: () => void;
  openQuestion: (id: StationId) => void;
  replayVideo: (id: StationId) => void;
  playStation: (id: StationId) => void;
  solve: (id: StationId) => void;
  celebrate: () => void;
  finishRun: () => void;
  restart: () => void;
  playAgain: () => void;
};

const SessionContext = createContext<SessionApi | null>(null);

function keyOf(screen: Screen) {
  if (screen === "portada" || screen === "mapa" || screen === "cierre") return screen;
  if (screen.name === "video") return `video-${screen.station}`;
  return `pregunta-${screen.id}`;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("portada");
  const [done, setDone] = useState<boolean[]>(empty);
  const [watched, setWatched] = useState<boolean[]>(empty);
  const [entry, setEntry] = useState<MapEntry>({ kind: "intro" });
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoHref, setLogoHref] = useState("");
  const clip = useRef<{ station: StationId | "inicial" | "final"; back: VideoBack } | null>(null);
  const doneRef = useRef(done);
  doneRef.current = done;

  const playClip = useCallback((station: StationId | "inicial" | "final", back: VideoBack) => {
    clip.current = { station, back };
    setScreen({ name: "video", station, back });
  }, []);

  const begin = useCallback(() => playClip("inicial", "mapa"), [playClip]);
  const playStation = useCallback((id: StationId) => playClip(id, "pregunta"), [playClip]);
  const replayVideo = useCallback((id: StationId) => playClip(id, "pregunta"), [playClip]);

  const finishVideo = useCallback(() => {
    const video = clip.current;
    if (!video) {
      setEntry({ kind: "intro" });
      setScreen("mapa");
      return;
    }
    if (video.station === "final") {
      setScreen("cierre");
      return;
    }
    if (video.station !== "inicial") {
      const id = video.station;
      setWatched((prev) => prev.map((value, index) => (index === id - 1 ? true : value)));
      if (video.back === "pregunta") {
        setScreen({ name: "pregunta", id });
        return;
      }
      setEntry({ kind: "video", id });
      setScreen("mapa");
      return;
    }
    setEntry({ kind: "intro" });
    setScreen("mapa");
  }, []);

  const openQuestion = useCallback((id: StationId) => {
    setScreen({ name: "pregunta", id });
  }, []);

  const solve = useCallback((id: StationId) => {
    const already = doneRef.current[id - 1];
    setEntry(already ? { kind: "stay", id } : { kind: "solved", id });
    setDone((prev) => prev.map((value, index) => (index === id - 1 ? true : value)));
    setScreen("mapa");
  }, []);

  const celebrate = useCallback(() => {
    setDone([true, true, true, true, true, true]);
    setEntry({ kind: "finale" });
    setScreen("mapa");
  }, []);

  const finishRun = useCallback(() => playClip("final", "mapa"), [playClip]);

  const restart = useCallback(() => {
    setDone(empty);
    setWatched(empty);
    setEntry({ kind: "intro" });
    setScreen("portada");
  }, []);

  const playAgain = useCallback(() => {
    setDone(empty);
    setWatched(empty);
    setEntry({ kind: "intro" });
    setScreen("mapa");
  }, []);

  const setLogo = useCallback((src: string | null, href: string) => {
    setLogoSrc(src);
    setLogoHref(href);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const logo = params.get("logo");
    const href = params.get("href") || "";
    if (!logo) return;
    const ok =
      logo.startsWith("data:image/png") ||
      logo.startsWith("data:image/jpeg") ||
      logo.startsWith("data:image/webp") ||
      logo.startsWith("https://");
    if (!ok || logo.length > 250000) return;
    setLogoSrc(logo);
    if (href.startsWith("https://") || href.startsWith("http://")) setLogoHref(href);
  }, []);

  const api = useMemo(
    () => ({
      screen,
      done,
      watched,
      entry,
      logoSrc,
      logoHref,
      setLogo,
      begin,
      finishVideo,
      openQuestion,
      replayVideo,
      playStation,
      solve,
      celebrate,
      finishRun,
      restart,
      playAgain,
    }),
    [
      begin,
      done,
      entry,
      finishVideo,
      logoHref,
      logoSrc,
      openQuestion,
      playStation,
      replayVideo,
      restart,
      playAgain,
      screen,
      setLogo,
      solve,
      celebrate,
      finishRun,
      watched,
    ],
  );

  return (
    <SessionContext.Provider value={api}>
      <div data-screen={keyOf(screen)}>{children}</div>
    </SessionContext.Provider>
  );
}

export function useSession() {
  const api = useContext(SessionContext);
  if (!api) throw new Error("Sesión fuera de contexto");
  return api;
}

export function activeStation(done: boolean[]): StationId | null {
  return currentStationId(done);
}
