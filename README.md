# MIRARIM · El camino de la comprensión

Recorrido psicoeducativo para un grupo de cerca de 30 niñas y niños de 4 años, con mediación de una educadora y proyección en pantalla. No diagnostica, no puntúa empatía y no guarda datos de participantes.

No se hizo un piloto con niñas y niños.

## Cómo se usa

1. La portada ocupa toda la pantalla. Ahí están **Comenzar**, **Personalización** y **Ampliar pantalla**.
2. Personalización cambia el logo con un enlace a la imagen y, si se quiere, un enlace al pulsar ese logo.
3. **Comenzar** abre de inmediato el video inicial a pantalla completa. Solo se ofrece **Saltar video**.
4. Al terminar, aparece el mapa a pantalla completa. La estación actual se ilumina. Lucas y el Hada están en el camino. Abajo, seis puntos discretos marcan las estaciones recorridas.
5. Al pulsar la estación se reproduce su video a pantalla completa, con **Saltar video**.
6. Al terminar el video, la ilustración queda flotando y brillando sobre esa estación.
7. Al pulsarla, la imagen ocupa la pantalla: arriba el título y la pregunta, abajo las tres alternativas.
8. Si la respuesta es la de esta historia, se vuelve al mapa y Lucas y el Hada avanzan a la estación siguiente.
9. Si no lo es, se permanece ahí, con **Ver el video de nuevo** y las alternativas otra vez.
10. Tras la estación 6 se muestra el cierre. El octavo video, el final, todavía no está.

## Videos

Los siete archivos recibidos están en `public/videos/` y no dependen de un enlace externo. Falta el video final.

## Inventario

### Aportado

- Kit de marca en `public/brand/` (logotipos, isotipo, favicon de 16 px, íconos, paleta, tipografía y manual). No se redibujó el logotipo.
- Personajes en `public/media/personajes/`: Lucas, Sofía, Emma, Mateo y el Hada.
- Escenas en `public/media/escenas/01` a `09`: grupo, parque, seis estaciones y cierre.

### Creado para el juego

- `public/media/escenas/10-mapa.jpg`: mapa del camino, sin números ni logotipo. El letrero del quiosco quedó en blanco.
- 65 MP3 en `public/audio/`: voz sintética **Luna**, en español, generada una sola vez y guardada en el proyecto. No es una grabación de una persona. No se vuelve a generar al jugar.
- `public/audio/transicion-suave.wav`: dos notas suaves generadas en el proyecto, sin muestras de terceros. Solo suena con su botón.
- Interfaz, estados y textos.

## Voz, sonido y tipografía

- Voz: sintética, servicio de voz de xAI, voz Luna, idioma español. Uso limitado a este recorrido. No es una licencia de banco de voces ni una toma humana.
- Efecto: sintetizado aquí. Sin licencia de terceros.
- Texto de interfaz: Nunito Sans, pesos 400, 600 y 800, SIL Open Font License 1.1, archivos incluidos con `@fontsource/nunito-sans`. El nombre MIRARIM no se escribe con esa fuente: se usa el logotipo del kit.
- Crema del kit: `#F7F1E6`. Índigo `#2B2155`, coral `#E07A5F`, dorado `#E6B84C`, tinta `#1E1830`.

## Ficha de continuidad

Se usan las imágenes entregadas, sin redibujar personajes.

- Lucas: piel morena clara, flequillo negro, ojos café, camiseta azul con cohete, short beige, calcetines blancos, zapatillas rojas.
- Sofía: coletas con moños rojos, ojos verde claro, vestido fucsia de lunares, leggings morados, diadema roja.
- Emma: cabello rizado, diadema amarilla con flor, mariposa naranja, falda de mezclilla. La curita ya viene en las ilustraciones 3, 5 y 7. No se retocó.
- Mateo: camiseta verde a rayas, jogger gris, zapatillas azul marino. La gorra verde solo está en la ilustración de la estación 4.
- Hada: cerca de un tercio de la altura de los niños cuando aparece junto a ellos; piel lavanda, cabello azul, alas minerales, varita dorada.

## Privacidad

El avance vive solo en la memoria de la sesión. No hay cuentas, base de datos del juego, analítica ni registro de votos. Al recargar se pierde el recorrido.

## Comprobaciones hechas

- TypeScript sin errores.
- Compilación de producción correcta.
- Vista de inicio en escritorio y en teléfono, sin desborde horizontal y sin errores de consola.
- Recorrido probado con los siete videos locales: el inicial parte al pulsar Comenzar, se puede saltar, el mapa ilumina la estación, la ilustración brilla al terminar el video, la respuesta que no corresponde deja reintentar y la de la historia devuelve al mapa.

## Límites

- Falta el video final. Los otros siete ya están en el proyecto. No hay subtítulos de esos videos.
- La voz es sintética.
- El mapa es una imagen nueva, no una ilustración entregada.
- El favicon de 16 px es el archivo oficial. El isotipo completo solo se muestra desde 24 px.
