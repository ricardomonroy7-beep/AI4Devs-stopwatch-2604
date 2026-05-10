# prompts.md — Stopwatch Exercise (stopwatch-RMA)

**Chatbot utilizado:** Claude (Anthropic) — Claude Opus 4.6  
**Fecha:** 9 de mayo de 2026  
**Nota de transparencia:** El prompt DRASTIC consolidado fue generado con asistencia de Claude y revisado/modificado por el usuario.

---

## Prompt 1 — Solicitud inicial (usuario)

> ANALIZA LA TAREA PRESENTE EN README.md, LA ESTRUCTURA DE TRABAJO DE LOS ARCHIVOS REQUERIDOS index.html, prompts.md, script.js Y LOS REQUISITOS DEL INGENIERO, PARA GENERAR LO SIGUIENTE:  
> PROMPT SKILL DRASTIC PARA LLEVAR A CABO LA TAREA DE CREAR:  
> ARCHIVOS .HTML, .MD Y .JS COMPLETOS, TESTEADOS Y LISTOS PARA DESCARGAR Y MANDAR.  
> EL ARCHIVO DE PROMPTS.MD CON ESTE PROMPT Y EL GENERADO.  
> REQUISITOS DEL INGENIERO:  
> REALIZA UNA INVESTIGACION ACERCA DE CODIGO EFICIENTE PARA CREAR ESTRUCTURAS DE CONTEO COMO LA PROPUESTA, PARA CREAR PROYECTOS EN HTML, CSS, JS. PARA, A PARTIR DE LA INFORMACIÓN OBTENIDA, GENERAR EL PROMPT DRASTIC CORTO Y EFICIENTE.  
> REALIZA UNA PAGINA WEB QUE CONTENGA UN STOPWATCH Y UN CUENTA ATRÁS.  
> EL DISEÑO DEBE SER IDENTICO AL DE LA IMAGEN ANEXA. POR LO TANTO DEBE CONTENER MINUTOS, SEGUNDOS, MILISEGUNDOS. BOTON DE INICIO COLOR VERDE, BOTON DE FIN COLOR ROJO.  
> LA PAGINA SOLO DEBE TENER EL FORMATO Y UNA LISTA DE QUE USAR SI STOPWATCH O CUENTA ATRÁS.  
> COMPLEMENTOS:  
> CODIGO SIMPLE, EXPLICADO PASO A PASO PARA SER DIDACTICO.

*(Se adjuntó imagen de referencia: stopwatch.png)*

---

## Prompt 2 — DRASTIC v1 (generado con Prompt 1)

```
Actúa como un senior frontend developer especializado en JavaScript vanilla y timers de alta precisión.

CONTEXTO:
- Ejercicio del máster AI4Devs: crear un cronómetro (stopwatch) y cuenta atrás (countdown).
- Archivos base: index.html (seed con solo <h1> y <script>), script.js (vacío).
- Diseño de referencia: imagen adjunta (display LCD con MM:SS:CC + ms, botón Start verde, botón Clear rojo).
- Soy ingeniero estructural aprendiendo JS; necesito comentarios didácticos.

DIRECCIÓN:
Genera 2 archivos completos y funcionales:

1. **index.html** — Página completa con CSS embebido que replica el diseño de la imagen:
   - Selector de modo: Stopwatch / Countdown (dos botones tipo tab).
   - Display tipo LCD: MM:SS:CC en grande + milisegundos pequeños abajo.
   - Botón Start (verde #00e000) y botón Clear (rojo #ff0000) con bordes gruesos.
   - En modo Countdown: inputs para minutos y segundos.
   - Centrado vertical y horizontal.

2. **script.js** — Lógica completa con estas reglas:
   - Usar `Date.now()` para calcular tiempo real transcurrido (NO contar intervalos).
   - `setInterval` a 10ms solo para refrescar la pantalla.
   - Funciones: startTimer, stopTimer, clearTimer, setMode, formatTime.
   - Control de estado: isRunning, elapsedTime, startTime.
   - Botón Start → al pausar cambia a "Resume".
   - Countdown: al llegar a 0, se detiene y parpadea en rojo.

AUDIENCIA: Ingeniero con experiencia en Python pero sin conocimiento de JS/HTML/CSS.

ESTRUCTURA DEL CÓDIGO:
- Secciones numeradas: 1) Referencias DOM, 2) Estado, 3) Formato, 4) Timer, 5) Modo, 6) Events, 7) Init.

TONO: Didáctico y técnico. Comentarios en español, código en inglés.

RESULTADO: Código listo para copiar, guardar y abrir en Chrome. Sin dependencias externas.
```

---

## Iteración 1 — Correcciones del usuario (con capturas de pantalla)

El usuario probó el resultado del Prompt 2 en Chrome y reportó los siguientes problemas visuales:

1. **Milisegundos fuera del recuadro (Imagen 1):** El texto "000" de milisegundos se desbordaba fuera del borde inferior del display LCD. Se necesita asegurar que TODO el contenido quede dentro del recuadro.

2. **Proporción del display no rectangular (Imagen 2):** El display LCD era casi cuadrado. La imagen de referencia original muestra un recuadro marcadamente rectangular (mucho más ancho que alto). Se debe alargar horizontalmente.

3. **Iniciales incorrectas:** La carpeta se nombró `stopwatch-RGD` pero las iniciales correctas son **RMA**.

**Ajustes aplicados al código:**
- `font-size` del tiempo principal reducido de 80px a 72px.
- `font-size` de milisegundos reducido de 28px a 22px.
- `overflow: hidden` agregado al `.display` para que nada se salga.
- `white-space: nowrap` en `.time-main` para evitar saltos de línea.
- Contenedor principal ampliado de 480px a 560px.
- Padding horizontal del display aumentado de 20px a 30px.
- Carpeta renombrada a `stopwatch-RMA`.

---

## Prompt 3 — DRASTIC v2 Consolidado (con correcciones de Iteración 1)

```
Actúa como un senior frontend developer especializado en JavaScript vanilla y timers de alta precisión.

CONTEXTO:
- Ejercicio del máster AI4Devs: crear un cronómetro (stopwatch) y cuenta atrás (countdown).
- Archivos base: index.html (seed con solo <h1> y <script>), script.js (vacío).
- Diseño de referencia: imagen adjunta (display LCD rectangular alargado con MM:SS:CC + ms, botón Start verde, botón Clear rojo, bordes redondeados gruesos).
- Soy ingeniero estructural aprendiendo JS; necesito comentarios didácticos.
- Carpeta de entrega: stopwatch-RMA.

DIRECCIÓN:
Genera 2 archivos completos y funcionales:

1. **index.html** — Página completa con CSS embebido:
   - Contenedor 560px de ancho, centrado vertical y horizontal.
   - Selector de modo: Stopwatch / Countdown (dos botones tipo tab, activo = fondo oscuro).
   - Display tipo LCD RECTANGULAR ALARGADO (proporción ~3:1 ancho:alto):
     · Fondo #dde0f0, borde 3px #555, border-radius 14px.
     · MM:SS:CC en font-size 72px, font-family Arial Black.
     · Milisegundos "000" en font-size 22px, alineados a la derecha, DENTRO del recuadro.
     · overflow: hidden y white-space: nowrap para que nada se desborde.
   - Botón Start verde (#00e000) y botón Clear rojo (#ff0000), 160px min-width, borde 3px.
   - En modo Countdown: inputs para minutos y segundos arriba del display.

2. **script.js** — Lógica completa:
   - Usar `Date.now()` para calcular tiempo real (NO contar intervalos con setInterval).
   - `setInterval` a 10ms solo para refrescar pantalla.
   - Funciones: startTimer, stopTimer, clearTimer, setMode, formatTime, padZero.
   - Control de estado: isRunning, elapsedTime, startTime, countdownTotal.
   - Start → al pausar cambia a "Resume". Clear reinicia todo.
   - Countdown: al llegar a 0, se detiene y parpadea texto en rojo.
   - Prevención de overlapping (verificar isRunning antes de iniciar).

AUDIENCIA: Ingeniero estructural con Python, sin experiencia en JS/HTML/CSS.

ESTRUCTURA DEL CÓDIGO:
- Secciones numeradas con comentarios: 1) DOM, 2) Estado, 3) Formato, 4) Timer, 5) Modo, 6) Events, 7) Init.
- Analogías a Python/ingeniería donde aplique.

TONO: Didáctico-técnico. Comentarios en español, código en inglés.

RESULTADO: Código listo para copiar a VS Code, guardar y abrir con doble clic en Chrome. Cero dependencias externas. Todo el texto visible siempre dentro del recuadro LCD.
```

---

## Investigación realizada

Antes de generar el prompt DRASTIC, se investigaron las mejores prácticas para implementar timers en JavaScript:

1. **`setInterval` solo NO es confiable** para medir tiempo. El event loop de JS puede retrasar la ejecución del callback, causando drift acumulativo.

2. **Patrón recomendado:** Usar `Date.now()` o `performance.now()` como fuente de verdad del tiempo, y `setInterval` únicamente para refrescar el display.

3. **Intervalo de refresco:** 10ms (~100 FPS) es el balance óptimo entre fluidez visual y carga del CPU.

4. **Prevención de overlapping:** Verificar `isRunning` antes de crear un nuevo `setInterval`, para evitar múltiples intervalos simultáneos.

5. **Formato de tiempo:** Usar módulo (`%`) para descomponer milisegundos en MM:SS:CC:ms, y `padStart` para ceros a la izquierda.

**Fuentes consultadas:** DEV Community, Medium (High-Precision Stopwatch in JS), W3Schools (Timing Events).
