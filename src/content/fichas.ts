import type { StationId } from "@/content/camino";

export type Ficha = {
  id: StationId;
  kicker: string;
  title: string;
  sceneTitle: string;
  narration?: string;
  narrationAudio?: string;
  lead?: string;
  question: string;
  colors: { main: string; soft: string; accent: string };
  choices: { id: "a" | "b" | "c"; emoji: string; text: string; recommended: boolean }[];
  yes: string;
  no: string;
  yesAudio: string;
  noAudio: string;
  sfx: string;
  reflect: string[];
  videoLabel?: string;
  colorsBurst: string[];
  heart: 1 | 2 | 3 | 4 | 5 | 6;
  wide?: boolean;
  epic?: boolean;
  finale?: boolean;
};

export const fichas: Ficha[] = [
  {
    id: 1,
    kicker: "Estación 1",
    title: "¿Será por mí?",
    sceneTitle: "Mis amigos no querían jugar conmigo",
    lead: "Esto es lo que Lucas vio. Sus amigos no querían jugar. Pero... ¿será que no querían jugar con él? ¿O podría haber otra razón?",
    question: "¿Crees que los amigos tenían otros problemas que no eran por Lucas?",
    colors: { main: "#9B59B6", soft: "#D7BDE2", accent: "#E6B84C" },
    choices: [
      { id: "b", emoji: "🤔", text: "No, definitivamente era por Lucas", recommended: false },
      { id: "a", emoji: "💡", text: "Sí, tal vez tenían sus propios problemas", recommended: true },
      { id: "c", emoji: "🤷", text: "No importa", recommended: false },
    ],
    yes: "¡Muy bien! A veces cuando alguien no quiere jugar o está molesto, puede ser por muchas razones... no siempre es por nosotros. Vamos a descubrir qué les pasaba a cada uno",
    no: "Piensa un poco más... ¿Será que todo lo que pasa es siempre por nosotros? ¿O a veces las personas tienen sus propias razones?",
    yesAudio: "/audio/s1-fb-si.mp3",
    noAudio: "/audio/s1-fb-no.mp3",
    sfx: "/audio/s1-campanas.wav",
    reflect: [
      "¿Alguna vez alguien no quiso jugar con ustedes?",
      "¿Pensaron que era por ustedes?",
      "¿Podría haber sido por otra razón?",
      "¿Qué podemos hacer antes de pensar que todo es por nosotros?",
    ],
    colorsBurst: ["#9B59B6", "#E6B84C"],
    heart: 1,
  },
  {
    id: 2,
    kicker: "Estación 2",
    title: "¿Qué le pasó a Sofía?",
    sceneTitle: "Sofía estaba molesta",
    narration: "Sofía llegó al parque con cara de enojo. Pero... ¿por qué estaba molesta?",
    narrationAudio: "/audio/s2-nar.mp3",
    question: "¿Por qué estaba molesta Sofía esa mañana?",
    colors: { main: "#E74C3C", soft: "#F8B4B4", accent: "#E6B84C" },
    choices: [
      { id: "b", emoji: "😠", text: "Estaba enojada con Lucas", recommended: false },
      { id: "c", emoji: "😤", text: "Sofía siempre está enojada", recommended: false },
      { id: "a", emoji: "😔", text: "Estaba molesta por el regaño en su casa", recommended: true },
    ],
    yes: "¡Exacto! Sofía había tenido un mal momento en su casa esa mañana. No tenía nada que ver con Lucas, pero él no lo sabía.",
    no: "Recuerda... ¿qué le pasó a Sofía en su casa esa mañana? ¿Tenía algo que ver con Lucas?",
    yesAudio: "/audio/s2-fb-si.mp3",
    noAudio: "/audio/s2-fb-no.mp3",
    sfx: "/audio/s1-campanas.wav",
    videoLabel: "Ver la historia de Sofía",
    reflect: [
      "¿Alguna vez los han regañado y después siguieron molestos?",
      "¿Alguien pensó que estaban enojados con ellos?",
      "¿Qué podría haber preguntado Lucas a Sofía?",
      "¿Cómo se habrá sentido Sofía cuando Lucas pensó que era por él?",
    ],
    colorsBurst: ["#E74C3C", "#E6B84C"],
    heart: 2,
  },
  {
    id: 3,
    kicker: "Estación 3",
    title: "Emma",
    sceneTitle: "Emma no quería jugar",
    narration: "Emma se cayó cuando llegaba al parque. Le dolía la rodilla y por eso no tenía ganas de jugar",
    narrationAudio: "/audio/s3-nar.mp3",
    question: "¿Por qué Emma no quería jugar?",
    colors: { main: "#3498DB", soft: "#AED6F1", accent: "#E6B84C" },
    choices: [
      { id: "b", emoji: "😒", text: "No le gusta jugar con Lucas", recommended: false },
      { id: "a", emoji: "🤕", text: "Le dolía la rodilla porque se cayó", recommended: true },
      { id: "c", emoji: "😴", text: "Estaba cansada", recommended: false },
    ],
    yes: "¡Muy bien! Emma se había caído y le dolía mucho la rodilla. Por eso no quería correr ni jugar. No era porque no quisiera estar con Lucas.",
    no: "Piensa... ¿qué le pasó a Emma cuando llegaba al parque? ¿Viste su rodilla?",
    yesAudio: "/audio/s3-fb-si.mp3",
    noAudio: "/audio/s3-fb-no.mp3",
    sfx: "/audio/s1-campanas.wav",
    reflect: [
      "¿Alguna vez les ha dolido algo y no tenían ganas de jugar?",
      "¿Cómo se sintieron cuando alguien insistía en que jugaran?",
      "¿Qué podría haber hecho Lucas para ayudar a Emma?",
      "¿Por qué es importante preguntar «¿estás bien?»?",
    ],
    colorsBurst: ["#3498DB", "#E6B84C"],
    heart: 3,
  },
  {
    id: 4,
    kicker: "Estación 4",
    title: "Mateo",
    sceneTitle: "Mateo dijo que no era buen momento",
    question: "¿Por qué Mateo dijo que no era buen momento para jugar?",
    colors: { main: "#27AE60", soft: "#A9DFBF", accent: "#E6B84C" },
    choices: [
      { id: "b", emoji: "🙅", text: "No le gusta jugar con Lucas", recommended: false },
      { id: "a", emoji: "💚", text: "Estaba preocupado por sus amigas", recommended: true },
      { id: "c", emoji: "📚", text: "Tenía que estudiar", recommended: false },
    ],
    yes: "¡Correcto! Mateo vio que Sofía estaba molesta y Emma se había lastimado. Quería quedarse con ellas para ayudarlas. Era un buen amigo.",
    no: "Recuerda... ¿qué vio Mateo cuando llegó al parque? ¿Cómo estaban Sofía y Emma?",
    yesAudio: "/audio/s4-fb-si.mp3",
    noAudio: "/audio/s4-fb-no.mp3",
    sfx: "/audio/s1-campanas.wav",
    reflect: [
      "¿Alguna vez han visto a un amigo triste o lastimado?",
      "¿Qué hicieron para ayudar?",
      "¿Por qué creen que Mateo se quedó con sus amigas?",
      "¿Qué significa ser un buen amigo?",
    ],
    colorsBurst: ["#27AE60", "#E6B84C"],
    heart: 4,
  },
  {
    id: 5,
    kicker: "Estación 5",
    title: "¿Ya no me quieren?",
    sceneTitle: "Ya no quieren ser mis amigos",
    narration: "Los amigos de Lucas estaban preocupados por él. No querían que se fuera enojado. Lo quieren mucho",
    narrationAudio: "/audio/s5-nar.mp3",
    question: "¿Cómo se sintieron los amigos cuando Lucas se fue triste?",
    colors: { main: "#F39C12", soft: "#F9E79F", accent: "#E6B84C" },
    choices: [
      { id: "b", emoji: "😊", text: "Contentos de estar solos", recommended: false },
      { id: "c", emoji: "😐", text: "No les importó", recommended: false },
      { id: "a", emoji: "😟", text: "Preocupados y tristes por Lucas", recommended: true },
    ],
    yes: "¡Así es! Los tres amigos sí querían mucho a Lucas. Se sintieron mal cuando lo vieron irse triste, pero no sabían cómo explicarle lo que les pasaba.",
    no: "Piensa en lo que viste... ¿Los amigos se veían contentos de que Lucas se fuera? ¿O se veían preocupados y tristes?",
    yesAudio: "/audio/s5-fb-si.mp3",
    noAudio: "/audio/s5-fb-no.mp3",
    sfx: "/audio/s5-emotiva.wav",
    reflect: [
      "¿Alguna vez alguien pensó que no lo querían?",
      "¿Cómo se sintieron ustedes?",
      "¿Qué podrían haber hecho los amigos para que Lucas entendiera?",
      "¿Por qué es importante decir lo que nos pasa?",
    ],
    colorsBurst: ["#F39C12", "#E91E63", "#3498DB", "#27AE60", "#E6B84C"],
    heart: 5,
    wide: true,
  },
  {
    id: 6,
    kicker: "Estación 6",
    title: "¿Qué hago?",
    sceneTitle: "Ahora que entiendo... ¿qué hago?",
    narration:
      "Lucas ahora entiende lo que les pasaba a sus amigos. Cada uno tenía sus propias razones. Sofía estaba molesta por el regaño, Emma se lastimó, y Mateo estaba preocupado por ellas. Ninguno estaba enojado con Lucas. Ahora Lucas tiene que decidir: ¿qué va a hacer?",
    narrationAudio: "/audio/s6-nar.mp3",
    question: "Ahora que Lucas entiende lo que pasó, ¿qué debería hacer?",
    colors: { main: "#16A085", soft: "#A2D9CE", accent: "#E6B84C" },
    choices: [
      { id: "b", emoji: "😔", text: "Quedarse en su casa triste", recommended: false },
      { id: "a", emoji: "🤗", text: "Volver y preguntarles cómo están", recommended: true },
      { id: "c", emoji: "😤", text: "Enojarse con ellos", recommended: false },
    ],
    yes: "¡Perfecto! Lucas aprendió que cuando alguien no quiere jugar, puede ser por muchas razones. Lo mejor es preguntar con cariño «¿estás bien?» y ofrecer ayuda.",
    no: "Piensa Lucas... ahora que entiendes que tus amigos no estaban enojados contigo, ¿es mejor quedarse solo o ir a hablar con ellos?",
    yesAudio: "/audio/s6-fb-si.mp3",
    noAudio: "/audio/s6-fb-no.mp3",
    sfx: "/audio/s6-epica.wav",
    reflect: [
      "¿Qué aprendió Lucas en este viaje?",
      "¿Qué harían ustedes si alguien no quiere jugar con ustedes?",
      "¿Por qué es importante preguntar antes de pensar cosas malas?",
      "¿Cómo pueden ser buenos amigos cuando alguien está triste?",
    ],
    colorsBurst: ["#E74C3C", "#F39C12", "#F9E79F", "#27AE60", "#3498DB", "#9B59B6", "#E6B84C"],
    heart: 6,
    epic: true,
    finale: true,
  },
];

export function fichaById(id: StationId) {
  const face = fichas.find((item) => item.id === id);
  if (!face) throw new Error("Estación sin ficha");
  return face;
}
