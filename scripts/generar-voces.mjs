import { writeFileSync } from "node:fs";

const key = process.env.XAI_API_KEY;
if (!key) {
  console.error("Sin clave de voz. No se generan audios.");
  process.exit(1);
}

/** Voz sintética Luna. Se guarda una sola vez; el juego no llama a la red. */
const clips = {
  "inicio-titulo":
    "El camino de la comprensión. Lucas invitó a jugar a Sofía, Emma y Mateo. Ellos dijeron que no era un buen momento. Lucas se fue triste. El Hada de la Comprensión lo acompaña a mirar lo que pasó.",
  "video-inicial":
    "Aquí irá el video del comienzo. Lo vemos solo cuando tú lo inicias. Si todavía no está, podemos seguir al mapa.",
  mapa: "Este es el camino de Lucas y el Hada. La casa está al comienzo y el parque es la meta. Cada corazón es una estación recorrida. No son puntos ni premios.",
  cierre:
    "Recorrimos el camino de la comprensión. Preguntar y escuchar puede ayudarnos a entender mejor.",
  "video-final":
    "Aquí irá el video del final. Cuando esté listo, podemos ver qué pasó.",
  "s1-intro":
    "Sofía, Emma y Mateo están sentados en un banco. Lucas los invita a jugar. Los tres responden que no es un buen momento.",
  "s1-hada":
    "Lucas se siente triste. Todavía no sabe qué les pasa a sus amigos. Podemos mirar con calma.",
  "s1-pausa":
    "Ahora hacemos una pausa para conversar. Nadie tiene que contar algo personal.",
  "s1-pregunta": "¿Podrían pasarles otras cosas a sus amigos?",
  "s1-a": "Sí, tal vez les pasa algo.",
  "s1-b": "Seguro es por Lucas.",
  "s1-c": "No importa.",
  "s1-si": "Una negativa puede tener distintas causas. Conviene preguntar.",
  "s1-no":
    "Podemos mirar el video otra vez y conversar. Un no puede tener otra causa. No es un castigo.",
  "s1-edu":
    "Preguntas para conversar. ¿Qué vio Lucas? ¿Qué sabe y qué no sabe todavía?",
  "s2-intro":
    "Sofía sigue molesta por una petición y un comentario que recibió en casa, antes de ir al parque.",
  "s2-hada":
    "Lo que Sofía siente empezó antes de ver a Lucas. No hace falta hablar de su familia.",
  "s2-pausa":
    "Pausa para conversar. No vamos a juzgar a su familia ni a pedir relatos personales.",
  "s2-pregunta": "¿Sofía estaba molesta con Lucas?",
  "s2-a": "No. Seguía molesta por lo ocurrido en casa.",
  "s2-b": "Sí. Lucas la hizo enojar.",
  "s2-c": "Sofía siempre está enojada.",
  "s2-si": "Su emoción no tenía necesariamente que ver con Lucas.",
  "s2-no":
    "Miremos de nuevo, con calma. Su emoción venía de antes. No se trata de decir que Sofía siempre está enojada.",
  "s2-edu":
    "¿Qué le pasó a Sofía antes del parque? ¿Eso quiere decir que estaba molesta con Lucas?",
  "s3-intro": "Emma se cayó. Tiene un raspón leve y le duele la rodilla.",
  "s3-hada":
    "Emma puede querer a sus amigos y, aun así, necesitar quedarse quieta.",
  "s3-pausa": "Pausa para conversar. No hace falta contar una caída propia.",
  "s3-pregunta": "¿Por qué Emma no quería correr y jugar?",
  "s3-a": "Le dolía la rodilla.",
  "s3-b": "Estaba enojada con Lucas.",
  "s3-c": "No le gusta jugar con él.",
  "s3-si": "Puede querer a sus amigos y necesitar descansar.",
  "s3-no":
    "Podemos ver la escena otra vez. Que le duela la rodilla no es estar enojada, ni dejar de querer jugar con Lucas.",
  "s3-edu":
    "¿Qué le pasó a Emma? ¿Se puede querer a los amigos y necesitar descanso?",
  "s4-intro": "Mateo está pendiente de Sofía y de Emma.",
  "s4-hada":
    "Mateo intenta cuidar a sus amigas. También podría haber explicado mejor por qué decía que no.",
  "s4-pausa": "Pausa para conversar, sin apuro.",
  "s4-pregunta": "¿Por qué Mateo dijo que no era buen momento?",
  "s4-a": "Estaba preocupado por ellas.",
  "s4-b": "No quería a Lucas allí.",
  "s4-c": "Prefería hacer otra cosa.",
  "s4-si":
    "Mateo intentaba cuidar a sus amigas. También habría podido explicarse mejor.",
  "s4-no":
    "Conversemos otra vez. Cuidar a sus amigas no significa que no quisiera a Lucas.",
  "s4-edu":
    "¿Por quién estaba pendiente Mateo? ¿Qué podría haber dicho con más claridad?",
  "s5-intro":
    "Cuando Lucas se fue, Sofía, Emma y Mateo se preocuparon. Quieren hablar con él.",
  "s5-hada": "No poder jugar ahora no es lo mismo que dejar de ser amigos.",
  "s5-pausa":
    "Pausa para conversar. Podemos pensar juntos, sin contar historias personales.",
  "s5-pregunta": "¿Querían dejar de ser amigos de Lucas?",
  "s5-a": "No. Estaban preocupados por él.",
  "s5-b": "Sí. Ya no lo quieren.",
  "s5-c": "No les importa.",
  "s5-si":
    "No poder jugar ahora no equivale necesariamente a dejar de querer a alguien.",
  "s5-no":
    "Volvamos a mirar. Estaban preocupados por cómo se fue Lucas. Querían hablar con él.",
  "s5-edu":
    "¿Qué pasó cuando Lucas se fue? ¿No jugar ahora es lo mismo que no querer?",
  "s6-intro": "Lucas está junto a su puerta. Piensa cómo acercarse a sus amigos.",
  "s6-hada":
    "Preguntar, escuchar y contar lo que sentimos puede ayudar. Otra idea no es una falta.",
  "s6-pausa": "Pausa para conversar sobre qué podría hacer Lucas.",
  "s6-pregunta": "¿Qué podría hacer Lucas para entenderse con sus amigos?",
  "s6-a": "Volver y conversar con ellos.",
  "s6-b": "Seguir enojado sin hablar.",
  "s6-c": "Esperar sin contarles cómo se sintió.",
  "s6-si": "Preguntar, escuchar y contar lo que sentimos puede ayudar.",
  "s6-no":
    "En esta historia, volver y conversar ayuda a Lucas. Las otras ideas no son una falta. También puede contar cómo se sintió.",
  "s6-edu": "¿Qué podría decir Lucas al volver? ¿Para qué sirve escuchar?",
};

async function one(name, text) {
  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, voice_id: "luna", language: "es" }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${name} ${res.status} ${body.slice(0, 180)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 800 || buf[0] !== 0xff) {
    throw new Error(`${name} no parece un mp3 (${buf.length})`);
  }
  const path = `public/audio/${name}.mp3`;
  writeFileSync(path, buf);
  console.log(name, buf.length);
}

const entries = Object.entries(clips);
let cursor = 0;
async function worker() {
  while (cursor < entries.length) {
    const index = cursor;
    cursor += 1;
    const [name, text] = entries[index];
    await one(name, text);
  }
}

await Promise.all([worker(), worker(), worker()]);
console.log("listo", entries.length);
