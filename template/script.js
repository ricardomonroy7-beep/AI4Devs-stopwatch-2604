// ============================================================
// script.js — Stopwatch & Countdown Timer
// ============================================================
// CONCEPTO CLAVE: En vez de contar intervalos (que acumulan error),
// usamos Date.now() para medir el tiempo REAL transcurrido.
// setInterval solo sirve para refrescar la pantalla cada ~10ms.
// Es como en ingeniería: mides con el instrumento (Date.now),
// no confías en la frecuencia del muestreo (setInterval).
// ============================================================

// ===== 1. REFERENCIAS AL DOM =====
// Obtenemos los elementos HTML que vamos a manipular.
// Es como definir las variables de entrada en un script de ETABS.

const timeMain = document.getElementById("timeMain");   // Display MM:SS:CC
const timeMs   = document.getElementById("timeMs");     // Display milisegundos
const btnStart = document.getElementById("btnStart");   // Botón verde
const btnStop  = document.getElementById("btnStop");    // Botón amarillo (Stop)
const btnClear = document.getElementById("btnClear");   // Botón rojo
const modeStopwatch = document.getElementById("modeStopwatch"); // Tab Stopwatch
const modeCountdown = document.getElementById("modeCountdown"); // Tab Countdown
const countdownInputs = document.getElementById("countdownInputs"); // Inputs
const inputMin = document.getElementById("inputMin");   // Input minutos
const inputSec = document.getElementById("inputSec");   // Input segundos

// ===== 2. ESTADO DE LA APLICACIÓN =====
// Variables que controlan el estado del timer.
// "mode" determina si contamos hacia arriba o hacia abajo.

let mode = "stopwatch";    // "stopwatch" o "countdown"
let timerInterval = null;  // ID del setInterval (para poder detenerlo)
let isRunning = false;     // ¿Está corriendo el timer?
let startTime = 0;         // Timestamp cuando se inició (Date.now())
let elapsedTime = 0;       // Tiempo acumulado en milisegundos
let countdownTotal = 0;    // Tiempo total del countdown (en ms)

// ===== 3. FUNCIONES DE FORMATO =====
// Convierte milisegundos a formato legible MM:SS:CC + ms

/**
 * padZero: Agrega ceros a la izquierda.
 * Ejemplo: padZero(5, 2) → "05", padZero(5, 3) → "005"
 * Es como formatear celdas en Excel para que se vea uniforme.
 */
function padZero(num, places) {
  return String(num).padStart(places, "0");
}

/**
 * formatTime: Toma milisegundos totales y actualiza el display.
 * Descompone en minutos, segundos, centésimas y milisegundos.
 */
function formatTime(totalMs) {
  // Aseguramos que no sea negativo (para countdown)
  if (totalMs < 0) totalMs = 0;

  // Extraer cada componente usando divisiones y módulo
  // (igual que extraer horas de un timestamp en cualquier lenguaje)
  const minutes      = Math.floor(totalMs / 60000);          // 1 min = 60,000 ms
  const seconds      = Math.floor((totalMs % 60000) / 1000); // Resto entre 1000
  const centiseconds = Math.floor((totalMs % 1000) / 10);    // Centésimas
  const milliseconds = totalMs % 1000;                        // Milisegundos completos

  // Actualizar el DOM
  timeMain.textContent = `${padZero(minutes, 2)}:${padZero(seconds, 2)}:${padZero(centiseconds, 2)}`;
  timeMs.textContent   = padZero(milliseconds, 3);
}

// ===== 4. FUNCIONES DEL TIMER =====

/**
 * updateDisplay: Se ejecuta cada ~10ms.
 * Calcula el tiempo real transcurrido usando Date.now().
 * En modo stopwatch: suma. En modo countdown: resta.
 */
function updateDisplay() {
  // Tiempo transcurrido desde que se presionó Start
  const now = Date.now();
  const delta = now - startTime;

  if (mode === "stopwatch") {
    // STOPWATCH: el tiempo total es lo acumulado + lo que lleva corriendo
    const totalMs = elapsedTime + delta;
    formatTime(totalMs);

  } else {
    // COUNTDOWN: restamos el tiempo transcurrido del total
    const remaining = countdownTotal - elapsedTime - delta;

    if (remaining <= 0) {
      // ¡Llegó a cero! Detenemos el timer
      formatTime(0);
      stopTimer();
      // Alerta visual: parpadeo del display
      timeMain.style.color = "#ff0000";
      setTimeout(() => { timeMain.style.color = "#111"; }, 300);
      setTimeout(() => { timeMain.style.color = "#ff0000"; }, 600);
      setTimeout(() => { timeMain.style.color = "#111"; }, 900);
      return;
    }
    formatTime(remaining);
  }
}

/**
 * startTimer: Inicia el conteo.
 * Guarda el timestamp actual y lanza setInterval.
 */
function startTimer() {
  if (isRunning) return; // Evitar doble inicio (overlapping)

  // En modo countdown, leer los inputs la primera vez
  if (mode === "countdown" && elapsedTime === 0) {
    const mins = parseInt(inputMin.value) || 0;
    const secs = parseInt(inputSec.value) || 0;
    countdownTotal = (mins * 60 + secs) * 1000; // Convertir a milisegundos

    if (countdownTotal <= 0) {
      alert("Please enter a time greater than 0.");
      return;
    }
  }

  isRunning = true;
  startTime = Date.now(); // Marca de tiempo de referencia

  // setInterval cada 10ms para refrescar la pantalla (≈100 FPS)
  timerInterval = setInterval(updateDisplay, 10);

  // Actualizar botones: mostrar Stop, ocultar Start
  btnStart.style.display = "none";
  btnStop.style.display  = "inline-block";

  // Deshabilitar inputs en countdown mientras corre
  inputMin.disabled = true;
  inputSec.disabled = true;
}

/**
 * stopTimer: Pausa el conteo.
 * Guarda el tiempo acumulado para poder reanudar.
 */
function stopTimer() {
  if (!isRunning) return;

  clearInterval(timerInterval); // Detener el refresco
  isRunning = false;

  // Guardar el tiempo que llevamos acumulado
  const delta = Date.now() - startTime;
  elapsedTime += delta;

  // Actualizar botones: mostrar Start (ahora dice "Resume"), ocultar Stop
  btnStart.textContent    = "Resume";
  btnStart.style.display  = "inline-block";
  btnStop.style.display   = "none";
}

/**
 * clearTimer: Reinicia todo a cero.
 * Como un reset completo del instrumento.
 */
function clearTimer() {
  clearInterval(timerInterval); // Detener si estaba corriendo
  isRunning = false;
  elapsedTime = 0;
  countdownTotal = 0;

  // Resetear display
  formatTime(0);
  timeMain.style.color = "#111";

  // Resetear botones
  btnStart.textContent    = "Start";
  btnStart.style.display  = "inline-block";
  btnStop.style.display   = "none";

  // Habilitar inputs de countdown
  inputMin.disabled = false;
  inputSec.disabled = false;
}

// ===== 5. CAMBIO DE MODO =====

/**
 * setMode: Cambia entre Stopwatch y Countdown.
 * Limpia el timer y ajusta la interfaz.
 */
function setMode(newMode) {
  clearTimer(); // Siempre limpiar al cambiar de modo
  mode = newMode;

  // Actualizar tabs visuales
  if (mode === "stopwatch") {
    modeStopwatch.classList.add("active");
    modeCountdown.classList.remove("active");
    countdownInputs.classList.remove("visible");
  } else {
    modeCountdown.classList.add("active");
    modeStopwatch.classList.remove("active");
    countdownInputs.classList.add("visible");
  }
}

// ===== 6. EVENT LISTENERS =====
// Conectamos los botones a sus funciones.
// addEventListener es como asignar un callback en Python:
//   button.on_click = mi_funcion

btnStart.addEventListener("click", startTimer);
btnStop.addEventListener("click", stopTimer);
btnClear.addEventListener("click", clearTimer);
modeStopwatch.addEventListener("click", () => setMode("stopwatch"));
modeCountdown.addEventListener("click", () => setMode("countdown"));

// ===== 7. INICIALIZACIÓN =====
// Al cargar la página, mostrar 00:00:00 | 000
formatTime(0);
