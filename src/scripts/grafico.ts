/**
 * Lectura de gráfico, fondo fijo de todo el sitio: una línea de
 * tendencia que sube de izquierda a derecha y ondula lentamente, y que
 * el cursor va "leyendo" — guías punteadas, punto sobre la curva, el
 * tramo recorrido en el color de acento con un relleno tenue debajo, y
 * el resto en gris suave sobre una grilla apenas visible.
 *
 * - Canvas a pantalla completa (fixed, detrás del contenido), montado
 *   en Base.astro: está en todas las páginas. La fase de la onda se
 *   guarda al salir de cada página, así la curva no se reinicia al
 *   navegar.
 * - El scroll la mantiene viva: cambia la fase de la onda, así no se ve
 *   siempre el mismo tramo.
 * - El punto sigue al mouse con suavizado; sin mouse (celular) avanza
 *   solo y acompaña el scroll.
 * - Colores desde las variables CSS del tema (--fg, --accent, --bg):
 *   al cambiar de modo el canvas se actualiza al instante. El aro del
 *   punto usa el color de fondo del tema, como recorte.
 * - Los bloques con la clase .atenua-grafico (texto largo sin tarjeta)
 *   bajan la opacidad de todo el dibujo mientras están a la vista.
 * - prefers-reduced-motion: línea estática, sin lectura.
 * - ~30 cuadros por segundo; pausa total con la pestaña oculta.
 */

const canvas = document.querySelector<HTMLCanvasElement>(".js-grafico");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canvas) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    let W = 0;
    let H = 0;

    // Colores del tema, leídos de las variables CSS como "r,g,b"
    let fg = "31,33,36";
    let acc = "201,44,46";
    let bg = "250,248,245";
    const C = (rgb: string, o: number) => `rgba(${rgb},${o})`;

    function hexARgb(hex: string, previo: string): string {
      const h = hex.trim().replace("#", "");
      if (h.length === 3) {
        return h
          .split("")
          .map((c) => parseInt(c + c, 16))
          .join(",");
      }
      if (h.length === 6) {
        return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",");
      }
      return previo;
    }

    function leerColores() {
      const estilos = getComputedStyle(document.documentElement);
      fg = hexARgb(estilos.getPropertyValue("--fg"), fg);
      acc = hexARgb(estilos.getPropertyValue("--accent"), acc);
      bg = hexARgb(estilos.getPropertyValue("--bg"), bg);
    }

    function medir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Bloques de texto largo que atenúan el dibujo mientras se ven
    const bloques = [...document.querySelectorAll(".atenua-grafico")];
    let dim = 1;

    const m = { x: -1, sx: 0, conCursor: false };
    // La fase continúa entre páginas: el tiempo arranca donde quedó
    let t = 0;
    const t0 = (() => {
      try {
        return parseFloat(sessionStorage.getItem("nodo-grafico-t") ?? "0") || 0;
      } catch {
        return 0;
      }
    })();

    // La curva: sube de izquierda a derecha por la franja inferior del
    // viewport. El scroll le cambia la fase para que siga viva. En
    // pantallas angostas sube y ondula menos.
    const angosto = () => W < 768;
    const f = (x: number) => {
      const fase = window.scrollY * 0.003;
      return (
        H * (angosto() ? 0.86 : 0.82) -
        x * ((H * (angosto() ? 0.16 : 0.36)) / Math.max(W, 1)) -
        (angosto() ? 28 : 46) * Math.sin(x / 120 + t * 0.25 + fase) -
        (angosto() ? 13 : 22) * Math.sin(x / 47 + 1.3 - t * 0.4 + fase * 1.7)
      );
    };

    function dibujar() {
      ctx!.clearRect(0, 0, W, H);

      // atenuación suave si hay un bloque de texto largo a la vista
      let objetivoDim = 1;
      for (const b of bloques) {
        const r = b.getBoundingClientRect();
        if (r.height > 0 && r.bottom > H * 0.35 && r.top < H) {
          objetivoDim = 0.4;
          break;
        }
      }
      dim += (objetivoDim - dim) * 0.08;

      // grilla horizontal apenas visible
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = C(fg, 0.07 * dim);
      for (let i = 1; i < 6; i++) {
        ctx!.beginPath();
        ctx!.moveTo(0, (i * H) / 6);
        ctx!.lineTo(W, (i * H) / 6);
        ctx!.stroke();
      }

      // línea completa en gris suave (clara en modo oscuro)
      ctx!.strokeStyle = C(fg, 0.22 * dim);
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
      ctx!.fillStyle = C(acc, 0.05 * dim);
      ctx!.fill();

      // el tramo recorrido, en el color de acento del tema
      ctx!.strokeStyle = C(acc, 0.75 * dim);
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(0, f(0));
      for (let x = 6; x <= mx; x += 6) ctx!.lineTo(x, f(x));
      ctx!.lineTo(mx, my);
      ctx!.stroke();

      // guías punteadas que siguen la lectura
      ctx!.setLineDash([4, 4]);
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = C(fg, 0.16 * dim);
      ctx!.beginPath();
      ctx!.moveTo(mx, 0);
      ctx!.lineTo(mx, H);
      ctx!.moveTo(0, my);
      ctx!.lineTo(W, my);
      ctx!.stroke();
      ctx!.setLineDash([]);

      // el punto: aro del color de fondo (recorte) y centro en acento
      const visDim = Math.max(dim, 0.55);
      ctx!.beginPath();
      ctx!.fillStyle = C(bg, 1);
      ctx!.arc(mx, my, 9, 0, 6.2832);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.fillStyle = C(acc, 0.95 * visDim);
      ctx!.arc(mx, my, 4.5, 0, 6.2832);
      ctx!.fill();
    }

    // Bucle a ~30 cuadros por segundo
    let rafId = 0;
    let previo = 0;
    function cuadro(ms: number) {
      rafId = requestAnimationFrame(cuadro);
      if (ms - previo < 33) return;
      previo = ms;
      t = t0 + ms / 1000;
      dibujar();
    }
    function arrancar() {
      if (!rafId && !reduce && !document.hidden)
        rafId = requestAnimationFrame(cuadro);
    }
    function frenar() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    leerColores();
    medir();
    if (reduce) {
      dibujar();
    } else {
      arrancar();
    }

    // gancho mínimo de verificación en desarrollo
    (window as unknown as Record<string, unknown>).__grafico = {
      estado: () => ({
        rafId,
        W,
        H,
        fg,
        acc,
        bg,
        dim,
        reduce,
        hidden: document.hidden,
      }),
      dibujar,
    };

    window.addEventListener("resize", () => {
      medir();
      if (reduce) dibujar();
    });

    // pausa total con la pestaña oculta
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) frenar();
      else arrancar();
    });

    // la fase sigue en la próxima página
    window.addEventListener("pagehide", () => {
      try {
        sessionStorage.setItem("nodo-grafico-t", String(t));
      } catch {
        /* sin almacenamiento, la curva arranca de cero */
      }
    });

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

    // el canvas sigue el modo claro/oscuro al instante
    new MutationObserver(() => {
      leerColores();
      if (reduce) dibujar();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
}
