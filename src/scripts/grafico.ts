/**
 * Lectura de gráfico en el hero: una línea de tendencia de fondo que
 * sube de izquierda a derecha y ondula lentamente. El cursor la va
 * "leyendo": guías punteadas vertical y horizontal, un punto rojo
 * sobre la curva, el tramo recorrido pintado en el rojo de la marca
 * con un relleno muy tenue debajo, y el resto en gris suave sobre una
 * grilla horizontal apenas visible.
 *
 * - El punto sigue al mouse con suavizado, nunca pegado al cursor.
 * - Sin mouse (celular): el punto avanza solo y acompaña el scroll.
 * - Funciona en modo claro y oscuro (el gris sale del color de texto).
 * - prefers-reduced-motion: se dibuja la línea estática una sola vez,
 *   sin seguimiento ni guías.
 * - Canvas con requestAnimationFrame a ~30 cuadros por segundo; se
 *   pausa si la pestaña no está visible o si el hero salió de pantalla.
 */

const canvas = document.querySelector<HTMLCanvasElement>(".js-grafico");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const ROJO = "201,44,46"; // #C92C2E

if (canvas) {
  const ctx = canvas.getContext("2d");
  const seccion = canvas.closest("section");
  if (ctx && seccion) {
    let W = 0;
    let H = 0;
    let tinta = "31,33,36";

    const A = (o: number) => `rgba(${ROJO},${o})`;
    const D = (o: number) => `rgba(${tinta},${o})`;

    function leerTema() {
      tinta =
        document.documentElement.dataset.theme === "dark"
          ? "245,243,240"
          : "31,33,36";
    }

    function medir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = seccion!.clientWidth;
      H = seccion!.clientHeight;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // posición del cursor (x objetivo y x suavizada)
    const m = { x: -1, sx: 0, conCursor: false };
    let t = 0; // segundos

    // La curva: arranca abajo a la izquierda y sube hacia la derecha.
    // La pendiente es relativa al tamaño del hero para que no se escape
    // por arriba ni cruce el título ni el botón. En pantallas angostas
    // (hero apilado, sin zona libre) sube menos y ondula menos: queda
    // en el tercio inferior, detrás de la laptop.
    const angosto = () => W < 768;
    const f = (x: number) =>
      H * (angosto() ? 0.88 : 0.84) -
      x * ((H * (angosto() ? 0.18 : 0.42)) / Math.max(W, 1)) -
      (angosto() ? 28 : 46) * Math.sin(x / 120 + t * 0.25) -
      (angosto() ? 13 : 22) * Math.sin(x / 47 + 1.3 - t * 0.4);

    function dibujar() {
      ctx!.clearRect(0, 0, W, H);

      // grilla horizontal apenas visible
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = D(0.07);
      for (let i = 1; i < 6; i++) {
        ctx!.beginPath();
        ctx!.moveTo(0, (i * H) / 6);
        ctx!.lineTo(W, (i * H) / 6);
        ctx!.stroke();
      }

      // línea completa en gris suave
      ctx!.strokeStyle = D(0.22);
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(0, f(0));
      for (let x = 6; x <= W; x += 6) ctx!.lineTo(x, f(x));
      ctx!.stroke();

      if (reduce) return; // línea estática: sin lectura ni guías

      // objetivo: el mouse, o un avance automático que acompaña el scroll
      const objetivo =
        conMouse && m.conCursor
          ? m.x
          : (((t * W) / 16 + window.scrollY * 0.6) % (W + 120)) - 60;
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
      ctx!.fillStyle = A(0.05);
      ctx!.fill();

      // el tramo recorrido, en el rojo de la marca
      ctx!.strokeStyle = A(0.75);
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(0, f(0));
      for (let x = 6; x <= mx; x += 6) ctx!.lineTo(x, f(x));
      ctx!.lineTo(mx, my);
      ctx!.stroke();

      // guías punteadas que siguen la lectura
      ctx!.setLineDash([4, 4]);
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = D(0.16);
      ctx!.beginPath();
      ctx!.moveTo(mx, 0);
      ctx!.lineTo(mx, H);
      ctx!.moveTo(0, my);
      ctx!.lineTo(W, my);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // el punto rojo que marca la lectura
      ctx!.beginPath();
      ctx!.fillStyle = A(0.22);
      ctx!.arc(mx, my, 10, 0, 6.2832);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.fillStyle = A(0.95);
      ctx!.arc(mx, my, 4.5, 0, 6.2832);
      ctx!.fill();
    }

    // Bucle a ~30 cuadros por segundo
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

    leerTema();
    medir();
    if (reduce) {
      dibujar();
    } else {
      arrancar();
    }

    window.addEventListener("resize", () => {
      medir();
      if (reduce) dibujar();
    });

    // pausa con la pestaña oculta o con el hero fuera de pantalla
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) frenar();
      else arrancar();
    });
    new IntersectionObserver((entradas) => {
      enPantalla = entradas[0]?.isIntersecting ?? true;
      if (enPantalla) arrancar();
      else frenar();
    }).observe(seccion);

    if (conMouse && !reduce) {
      window.addEventListener(
        "pointermove",
        (e) => {
          m.x = e.clientX;
          m.conCursor = true;
        },
        { passive: true },
      );
    }

    // el gris de la línea sigue el modo claro/oscuro
    new MutationObserver(() => {
      leerTema();
      if (reduce) dibujar();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
}
