/**
 * Halo que acompaña al mouse: una luz suave en el color de acento
 * (rojo en modo claro, coral en oscuro) que persigue al cursor por
 * detrás del contenido con un retardo elástico. Cuando el mouse se
 * detiene, el halo respira despacio (animación CSS, ver global.css).
 *
 * - Solo existe en dispositivos con puntero fino: en celular no hay
 *   mouse y no se dibuja nada.
 * - Con prefers-reduced-motion no arranca.
 * - El bucle de seguimiento corre únicamente mientras el halo todavía
 *   no alcanzó al cursor; quieto no consume nada, y con la pestaña
 *   oculta se frena todo (incluida la respiración).
 * - Opacidad bajísima y detrás del contenido: el texto manda.
 */

const halo = document.querySelector<HTMLElement>(".js-halo");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (halo && conMouse && !reduce) {
  const mitad = halo.offsetWidth / 2;
  const punto = { x: 0, y: 0, sx: 0, sy: 0 };
  let rafId = 0;
  let visto = false;

  function ubicar() {
    halo!.style.transform = `translate3d(${(punto.sx - mitad).toFixed(1)}px, ${(punto.sy - mitad).toFixed(1)}px, 0)`;
  }

  function cuadro() {
    const dx = punto.x - punto.sx;
    const dy = punto.y - punto.sy;
    punto.sx += dx * 0.1;
    punto.sy += dy * 0.1;
    ubicar();
    // ya alcanzó al cursor: no hay nada más que animar por acá
    if (Math.abs(dx) + Math.abs(dy) < 0.3) {
      rafId = 0;
      return;
    }
    rafId = requestAnimationFrame(cuadro);
  }

  function arrancar() {
    if (!rafId && !document.hidden) rafId = requestAnimationFrame(cuadro);
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      punto.x = e.clientX;
      punto.y = e.clientY;
      if (!visto) {
        // primera aparición: nace donde está el cursor, sin viajar
        visto = true;
        punto.sx = e.clientX;
        punto.sy = e.clientY;
        ubicar();
        halo!.classList.add("activo");
      }
      arrancar();
    },
    { passive: true },
  );

  document.documentElement.addEventListener("pointerleave", () => {
    halo!.classList.remove("activo");
  });
  document.documentElement.addEventListener("pointerenter", () => {
    if (visto) halo!.classList.add("activo");
  });

  // Con la pestaña oculta se frena el seguimiento y la respiración
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = 0;
      halo!.classList.add("quieto");
    } else {
      halo!.classList.remove("quieto");
      arrancar();
    }
  });
}
