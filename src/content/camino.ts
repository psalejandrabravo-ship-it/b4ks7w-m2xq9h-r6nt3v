export type StationId = 1 | 2 | 3 | 4 | 5 | 6;
export type ChoiceId = "a" | "b" | "c";

export type Choice = {
  id: ChoiceId;
  text: string;
  recommended: boolean;
};

export type Station = {
  id: StationId;
  title: string;
  image: string;
  alt: string;
  intro: string;
  hada: string;
  pausa: string;
  question: string;
  choices: [Choice, Choice, Choice];
  yes: string;
  no: string;
  educator: [string, string];
};

const audio = (id: StationId, name: string) => `/audio/s${id}-${name}.mp3`;

export const estacionUno = {
  kicker: "Estación 1",
  title: "¿Será por mí?",
  sceneTitle: "Mis amigos no querían jugar conmigo",
  description:
    "Lucas vio a sus amigos en el parque. Pero cuando les preguntó si querían jugar, todos le dijeron que no. Lucas se sintió muy triste y confundido.",
  lead: "Esto es lo que Lucas vio. Sus amigos no querían jugar. Pero... ¿será que no querían jugar con él? ¿O podría haber otra razón?",
  reflect: [
    "¿Alguna vez alguien no quiso jugar con ustedes?",
    "¿Pensaron que era por ustedes?",
    "¿Podría haber sido por otra razón?",
    "¿Qué podemos hacer antes de pensar que todo es por nosotros?",
  ],
  audioYes: "/audio/s1-fb-si.mp3",
  audioNo: "/audio/s1-fb-no.mp3",
  sfxYes: "/audio/s1-campanas.wav",
  sfxNo: "/audio/s1-mmm.mp3",
};

export function stationAudio(id: StationId) {
  return {
    intro: audio(id, "intro"),
    hada: audio(id, "hada"),
    pausa: audio(id, "pausa"),
    pregunta: audio(id, "pregunta"),
    a: audio(id, "a"),
    b: audio(id, "b"),
    c: audio(id, "c"),
    si: audio(id, "si"),
    no: audio(id, "no"),
    edu: audio(id, "edu"),
  };
}

export const stations: Station[] = [
  {
    id: 1,
    title: "¿Será por mí?",
    image: "/media/escenas/03-estacion-1-banco.jpg",
    alt: "Sofía, Emma y Mateo sentados en un banco del parque. Emma tiene una curita pequeña en la rodilla. No está Lucas.",
    intro:
      "Sofía, Emma y Mateo están sentados en un banco. Lucas los invita a jugar. Los tres responden que no es un buen momento.",
    hada: "Lucas se siente triste. Todavía no sabe qué les pasa a sus amigos. Podemos mirar con calma.",
    pausa: "Ahora hacemos una pausa para conversar. Nadie tiene que contar algo personal.",
    question: "¿Crees que los amigos tenían otros problemas que no eran por Lucas?",
    choices: [
      { id: "a", text: "Sí, tal vez tenían sus propios problemas", recommended: true },
      { id: "b", text: "No, definitivamente era por Lucas", recommended: false },
      { id: "c", text: "No importa", recommended: false },
    ],
    yes: "¡Muy bien! A veces cuando alguien no quiere jugar o está molesto, puede ser por muchas razones... no siempre es por nosotros. Vamos a descubrir qué les pasaba a cada uno",
    no: "Piensa un poco más... ¿Será que todo lo que pasa es siempre por nosotros? ¿O a veces las personas tienen sus propias razones?",
    educator: [
      "¿Qué vio Lucas?",
      "¿Qué sabe y qué no sabe todavía?",
    ],
  },
  {
    id: 2,
    title: "¿Qué le pasó a Sofía?",
    image: "/media/escenas/04-estacion-2-sofia.jpg",
    alt: "Sofía apartada en el parque, con el ceño serio y los brazos cruzados. Al fondo se ve una casa.",
    intro:
      "Sofía sigue molesta por una petición y un comentario que recibió en casa, antes de ir al parque.",
    hada: "Lo que Sofía siente empezó antes de ver a Lucas. No hace falta hablar de su familia.",
    pausa:
      "Pausa para conversar. No vamos a juzgar a su familia ni a pedir relatos personales.",
    question: "¿Sofía estaba molesta con Lucas?",
    choices: [
      {
        id: "a",
        text: "No. Seguía molesta por lo ocurrido en casa",
        recommended: true,
      },
      { id: "b", text: "Sí. Lucas la hizo enojar", recommended: false },
      { id: "c", text: "Sofía siempre está enojada", recommended: false },
    ],
    yes: "Su emoción no tenía necesariamente que ver con Lucas.",
    no: "Miremos de nuevo, con calma. Su emoción venía de antes. No se trata de decir que Sofía siempre está enojada.",
    educator: [
      "¿Qué le pasó a Sofía antes del parque?",
      "¿Eso quiere decir que estaba molesta con Lucas?",
    ],
  },
  {
    id: 3,
    title: "¿Qué le pasó a Emma?",
    image: "/media/escenas/05-estacion-3-emma.jpg",
    alt: "Emma sentada en el pasto, con una curita pequeña en la rodilla y una mano cerca de esa rodilla.",
    intro: "Emma se cayó. Tiene un raspón leve y le duele la rodilla.",
    hada: "Emma puede querer a sus amigos y, aun así, necesitar quedarse quieta.",
    pausa: "Pausa para conversar. No hace falta contar una caída propia.",
    question: "¿Por qué Emma no quería correr y jugar?",
    choices: [
      { id: "a", text: "Le dolía la rodilla", recommended: true },
      { id: "b", text: "Estaba enojada con Lucas", recommended: false },
      { id: "c", text: "No le gusta jugar con él", recommended: false },
    ],
    yes: "Puede querer a sus amigos y necesitar descansar.",
    no: "Podemos ver la escena otra vez. Que le duela la rodilla no es estar enojada, ni dejar de querer jugar con Lucas.",
    educator: [
      "¿Qué le pasó a Emma?",
      "¿Se puede querer a los amigos y necesitar descanso?",
    ],
  },
  {
    id: 4,
    title: "¿Qué le pasó a Mateo?",
    image: "/media/escenas/06-estacion-4-mateo.jpg",
    alt: "Mateo de pie en el parque, con gorra verde y la mano en la barbilla, mirando hacia un lado con preocupación.",
    intro: "Mateo está pendiente de Sofía y de Emma.",
    hada: "Mateo intenta cuidar a sus amigas. También podría haber explicado mejor por qué decía que no.",
    pausa: "Pausa para conversar, sin apuro.",
    question: "¿Por qué Mateo dijo que no era buen momento?",
    choices: [
      { id: "a", text: "Estaba preocupado por ellas", recommended: true },
      { id: "b", text: "No quería a Lucas allí", recommended: false },
      { id: "c", text: "Prefería hacer otra cosa", recommended: false },
    ],
    yes: "Mateo intentaba cuidar a sus amigas. También habría podido explicarse mejor.",
    no: "Conversemos otra vez. Cuidar a sus amigas no significa que no quisiera a Lucas.",
    educator: [
      "¿Por quién estaba pendiente Mateo?",
      "¿Qué podría haber dicho con más claridad?",
    ],
  },
  {
    id: 5,
    title: "¿Ya no me quieren?",
    image: "/media/escenas/07-estacion-5-amigos.jpg",
    alt: "Sofía, Emma y Mateo miran a Lucas, que se aleja por el sendero. Se les ve preocupados.",
    intro:
      "Cuando Lucas se fue, Sofía, Emma y Mateo se preocuparon. Quieren hablar con él.",
    hada: "No poder jugar ahora no es lo mismo que dejar de ser amigos.",
    pausa:
      "Pausa para conversar. Podemos pensar juntos, sin contar historias personales.",
    question: "¿Querían dejar de ser amigos de Lucas?",
    choices: [
      { id: "a", text: "No. Estaban preocupados por él", recommended: true },
      { id: "b", text: "Sí. Ya no lo quieren", recommended: false },
      { id: "c", text: "No les importa", recommended: false },
    ],
    yes: "No poder jugar ahora no equivale necesariamente a dejar de querer a alguien.",
    no: "Volvamos a mirar. Estaban preocupados por cómo se fue Lucas. Querían hablar con él.",
    educator: [
      "¿Qué pasó cuando Lucas se fue?",
      "¿No jugar ahora es lo mismo que no querer?",
    ],
  },
  {
    id: 6,
    title: "Ahora que entiendo, ¿qué hago?",
    image: "/media/escenas/08-estacion-6-puerta.jpg",
    alt: "Lucas de pie frente a la puerta azul de una casa de madera, con una mano en la barbilla.",
    intro: "Lucas está junto a su puerta. Piensa cómo acercarse a sus amigos.",
    hada: "Preguntar, escuchar y contar lo que sentimos puede ayudar. Otra idea no es una falta.",
    pausa: "Pausa para conversar sobre qué podría hacer Lucas.",
    question: "¿Qué podría hacer Lucas para entenderse con sus amigos?",
    choices: [
      { id: "a", text: "Volver y conversar con ellos", recommended: true },
      { id: "b", text: "Seguir enojado sin hablar", recommended: false },
      { id: "c", text: "Esperar sin contarles cómo se sintió", recommended: false },
    ],
    yes: "Preguntar, escuchar y contar lo que sentimos puede ayudar.",
    no: "En esta historia, volver y conversar ayuda a Lucas. Las otras ideas no son una falta. También puede contar cómo se sintió.",
    educator: [
      "¿Qué podría decir Lucas al volver?",
      "¿Para qué sirve escuchar?",
    ],
  },
];

export function stationById(id: number): Station {
  const found = stations.find((station) => station.id === id);
  if (!found) throw new Error("Estación desconocida");
  return found;
}

export function currentStationId(done: boolean[]): StationId | null {
  const index = done.findIndex((value) => !value);
  if (index === -1) return null;
  return (index + 1) as StationId;
}

export type StationAccess = "recorrida" | "actual" | "bloqueada";

export function stationAccess(id: StationId, done: boolean[]): StationAccess {
  if (done[id - 1]) return "recorrida";
  if (currentStationId(done) === id) return "actual";
  return "bloqueada";
}
