/**
 * Lectura de gráfico: la línea de tendencia que el cursor va "leyendo",
 * como fondo del bloque principal del Inicio (no de todo el sitio).
 *
 * - El canvas vive dentro del bloque (.js-grafico, absolute inset-0);
 *   el texto del bloque va encima con posición propia.
 * - El punto sigue al mouse con suavizado; sin mouse (celular) avanza
 *   solo. El scroll le cambia la fase a la onda.
 * - Colores desde las variables CSS del tema, con actualización
 *   instantánea al cambiar data-theme.
 * - prefers-reduced-motion: línea estática, sin lectura.
 * - ~30 cuadros por segundo; pausa con la pestaña oculta o el bloque
 *   fuera de pantalla.
 * - Compatible con View Transitions: se monta en astro:page-load y se
 *   desarma en astro:before-swap.
 */

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let limpiar: (() => void) | null = null;

function montar() {
  limpiar?.();
  limpiar = null;

  const canvas = document.querySelector<HTMLCanvasElement>(".js-grafico");
  const ctx = canvas?.getContext("2d");
  const bloque = canvas?.parentElement;
  if (!canvas || !ctx || !bloque) return;

  let W = 0;
  let H = 0;
  let izquierda = 0;

  let fg = "31,33,36";
  let acc = "201,44,46";
  let bg = "255,255,255";
  const C = (rgb: string, o: number) => `rgba(${rgb},${o})`;

  function hexARgb(hex: string, previo: string): string {
    const h = hex.trim().replace("#", "");
    if (h.length === 3)
      return h
        .split("")
        .map((c) => parseInt(c + c, 16))
        .join(",");
    if (h.length === 6)
      return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
    return previo;
  }

  function leerColores() {
    const estilos = getComputedStyle(document.documentElement);
    fg = hexARgb(estilos.getPropertyValue("--fg"), fg);
    acc = hexARgb(estilos.getPropertyValue("--accent"), acc);
    bg = hexARgb(estilos.getPropertyValue("--bg-raised"), bg);
  }

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const r = bloque!.getBoundingClientRect();
    W = Math.round(r.width);
    H = Math.round(r.height);
    izquierda = r.left;
    canvas!.width = Math.round(W * dpr);
    canvas!.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const m = { x: -1, sx: 0, conCursor: false };
  let t = 0;

  // La curva recorre la franja inferior del bloque, subiendo a la
  // derecha; las amplitudes escalan con el alto del bloque.
  const f = (x: number) => {
    const fase = window.scrollY * 0.003;
    const a1 = Math.min(H * 0.1, 34);
    const a2 = Math.min(H * 0.05, 16);
    return (
      H * 0.82 -
      x * ((H * 0.3) / Math.max(W, 1)) -
      a1 * Math.sin(x / 110 + t * 0.25 + fase) -
      a2 * Math.sin(x / 47 + 1.3 - t * 0.4 + fase * 1.7)
    );
  };

  function dibujar() {
    ctx!.clearRect(0, 0, W, H);

    // grilla horizontal apenas visible
    ctx!.lineWidth = 1;
    ctx!.strokeStyle = C(fg, 0.06);
    for (let i = 1; i < 6; i++) {
      ctx!.beginPath();
      ctx!.moveTo(0, (i * H) / 6);
      ctx!.lineTo(W, (i * H) / 6);
      ctx!.stroke();
    }

    // línea completa en gris suave
    ctx!.strokeStyle = C(fg, 0.2);
    ctx!.lineWidth = 1.5;
    ctx!.beginPath();
    ctx!.moveTo(0, f(0));
    for (let x = 6; x <= W; x += 6) ctx!.lineTo(x, f(x));
    ctx!.stroke();

    if (reduce) return;

    const objetivo =
      conMouse && m.conCursor
        ? m.x
        : (((t * W) / 14 + window.scrollY * 0.4) % (W + 120)) - 60;
    m.sx += (objetivo - m.sx) * 0.08;
    const mx = Math.max(0, Math.min(W, m.sx));
    const my = f(mx);

    // relleno tenue bajo el tramo recorrido
    ctx!.beginPath();
    ctx!.moveTo(0, H);
    for (let x = 0; x <= mx; x += 6) ctx!.lineTo(x, f(x));
    ctx!.lineTo(mx, my);
    ctx!.lineTo(mx, H);
    ctx!.closePath();
    ctx!.fillStyle = C(acc, 0.05);
    ctx!.fill();

    // el tramo recorrido, en el acento del tema
    ctx!.strokeStyle = C(acc, 0.65);
    ctx!.lineWidth = 2;
    ctx!.beginPath();
    ctx!.moveTo(0, f(0));
    for (let x = 6; x <= mx; x += 6) ctx!.lineTo(x, f(x));
    ctx!.lineTo(mx, my);
    ctx!.stroke();

    // guías punteadas
    ctx!.setLineDash([4, 4]);
    ctx!.lineWidth = 1;
    ctx!.strokeStyle = C(fg, 0.14);
    ctx!.beginPath();
    ctx!.moveTo(mx, 0);
    ctx!.lineTo(mx, H);
    ctx!.moveTo(0, my);
    ctx!.lineTo(W, my);
    ctx!.stroke();
    ctx!.setLineDash([]);

    // el punto: aro del color del bloque (recorte) y centro en acento
    ctx!.beginPath();
    ctx!.fillStyle = C(bg, 1);
    ctx!.arc(mx, my, 9, 0, 6.2832);
    ctx!.fill();
    ctx!.beginPath();
    ctx!.fillStyle = C(acc, 0.95);
    ctx!.arc(mx, my, 4.5, 0, 6.2832);
    ctx!.fill();
  }

  let rafId = 0;
  let previo = 0;
  let enPantalla = true;
  function cuadro(ms: number) {
    rafId = requestAnimationFrame(cuadro);
    if (ms - previo < 33) return;
    previo = ms;
    t = ms / 1000;
    dibujar();
  }
  function arrancar() {
    if (!rafId && !reduce && enPantalla && !document.hidden)
      rafId = requestAnimationFrame(cuadro);
  }
  function frenar() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  const ac = new AbortController();
  const op = { signal: ac.signal } as AddEventListenerOptions;

  leerColores();
  medir();
  if (reduce) dibujar();
  else arrancar();

  window.addEventListener(
    "resize",
    () => {
      medir();
      if (reduce) dibujar();
    },
    op,
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) frenar();
      else arrancar();
    },
    op,
  );

  if (conMouse && !reduce) {
    window.addEventListener(
      "pointermove",
      (e) => {
        m.x = e.clientX - izquierda;
        m.conCursor = true;
      },
      { passive: true, signal: ac.signal },
    );
  }

  const io = new IntersectionObserver((entradas) => {
    enPantalla = entradas[0]?.isIntersecting ?? true;
    if (enPantalla) arrancar();
    else frenar();
  });
  io.observe(bloque);

  const mo = new MutationObserver(() => {
    leerColores();
    if (reduce) dibujar();
  });
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  limpiar = () => {
    ac.abort();
    io.disconnect();
    mo.disconnect();
    frenar();
  };
}

document.addEventListener("astro:page-load", montar);
document.addEventListener("astro:before-swap", () => {
  limpiar?.();
  limpiar = null;
});
