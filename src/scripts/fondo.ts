/**
 * Fondo de puntos animado de todo el sitio: la grilla de la marca,
 * dibujada en un canvas fijo detrás del contenido.
 *
 * - Ondas suaves que recorren la grilla y la hacen respirar.
 * - La grilla acompaña el scroll (parallax leve), también en celular.
 * - En dispositivos con mouse, los puntos cercanos al cursor se
 *   iluminan en el rojo de la marca y crecen, como un halo.
 * - Poco contraste siempre: el texto va encima y manda.
 *
 * Rendimiento: ~30 cuadros por segundo alcanzan y ahorran batería; el
 * bucle se frena cuando la pestaña no está visible; densidad menor en
 * pantallas chicas; devicePixelRatio acotado.
 *
 * prefers-reduced-motion: se dibuja una sola vez, estático, sin ondas
 * ni halo, y no corre ningún bucle.
 */

const canvas = document.querySelector<HTMLCanvasElement>(".js-fondo");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const ROJO = [201, 44, 46] as const; // #C92C2E
const RADIO_HALO = 160;

if (canvas) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    let ancho = 0;
    let alto = 0;
    let sep = 36;
    let columnas = 0;
    let filas = 0;
    let base: readonly [number, number, number] = [31, 33, 36];
    let alfaBase = 0.15;

    const puntero = { x: -9e3, y: -9e3, sx: -9e3, sy: -9e3 };

    function leerTema() {
      const oscuro = document.documentElement.dataset.theme === "dark";
      base = oscuro ? [245, 243, 240] : [31, 33, 36];
      alfaBase = oscuro ? 0.17 : 0.15;
    }

    function medir() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas!.width = Math.round(ancho * dpr);
      canvas!.height = Math.round(alto * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // menos puntos en pantallas chicas: menos trabajo por cuadro
      sep = ancho < 768 ? 46 : 36;
      columnas = Math.ceil(ancho / sep) + 2;
      filas = Math.ceil(alto / sep) + 2;
    }

    function dibujar(t: number) {
      ctx!.clearRect(0, 0, ancho, alto);

      // la grilla acompaña el scroll a un tercio de su velocidad
      const corrimiento = window.scrollY * 0.33;

      // el halo persigue al cursor con suavizado
      puntero.sx += (puntero.x - puntero.sx) * 0.14;
      puntero.sy += (puntero.y - puntero.sy) * 0.14;

      for (let f = 0; f < filas; f++) {
        const y = f * sep - (corrimiento % sep);
        for (let c = 0; c < columnas; c++) {
          const x = c * sep - sep / 2;

          // onda diagonal lenta que recorre la grilla
          const onda = reduce
            ? 0
            : Math.sin((x + y + corrimiento) * 0.011 - t * 0.0011);
          let radio = 1.7 + 0.8 * onda;
          let alfa = alfaBase * (0.55 + 0.45 * onda);
          let r = base[0];
          let g = base[1];
          let b = base[2];

          if (conMouse && !reduce) {
            const d = Math.hypot(x - puntero.sx, y - puntero.sy);
            if (d < RADIO_HALO) {
              const fuerza = (1 - d / RADIO_HALO) ** 2;
              radio += 2.6 * fuerza;
              alfa += (0.6 - alfa) * fuerza;
              r += (ROJO[0] - r) * fuerza;
              g += (ROJO[1] - g) * fuerza;
              b += (ROJO[2] - b) * fuerza;
            }
          }

          ctx!.beginPath();
          ctx!.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alfa.toFixed(3)})`;
          ctx!.arc(x, y, Math.max(radio, 0.4), 0, 6.2832);
          ctx!.fill();
        }
      }
    }

    // Bucle a ~30 cuadros por segundo
    let rafId = 0;
    let previo = 0;
    function cuadro(t: number) {
      rafId = requestAnimationFrame(cuadro);
      if (t - previo < 33) return;
      previo = t;
      dibujar(t);
    }
    function arrancar() {
      if (!rafId && !reduce) rafId = requestAnimationFrame(cuadro);
    }
    function frenar() {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    leerTema();
    medir();
    if (reduce) {
      dibujar(0);
    } else {
      arrancar();
    }

    window.addEventListener("resize", () => {
      medir();
      if (reduce) dibujar(0);
    });

    // Pausa total con la pestaña oculta: nada de gastar batería de fondo
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) frenar();
      else arrancar();
    });

    if (conMouse && !reduce) {
      window.addEventListener(
        "pointermove",
        (e) => {
          puntero.x = e.clientX;
          puntero.y = e.clientY;
        },
        { passive: true },
      );
      document.documentElement.addEventListener("pointerleave", () => {
        puntero.x = -9e3;
        puntero.y = -9e3;
      });
    }

    // El fondo sigue el modo claro/oscuro del sitio
    new MutationObserver(() => {
      leerTema();
      if (reduce) dibujar(0);
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Gancho mínimo para verificar el dibujo en desarrollo
    (window as unknown as Record<string, unknown>).__fondo = { dibujar, medir };
  }
}
