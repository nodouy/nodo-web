/**
 * Animación protagonista de la portada: la laptop entra inclinada y se
 * endereza al scrollear; el panel se arma al cargar (las barras crecen,
 * la de mayo se pone roja, la grilla de puntos se completa).
 *
 * Con prefers-reduced-motion activado no corre nada: el contenido ya
 * está en su estado final en el HTML.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);

  // La laptop entra inclinada, como en la referencia, y se endereza.
  const laptop = document.querySelector(".js-hero-laptop");
  if (laptop) {
    gsap.set(laptop, { rotate: -7, y: 26, transformOrigin: "50% 100%" });
    gsap.to(laptop, {
      rotate: 0,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".js-hero",
        start: "top top",
        end: "+=45%",
        scrub: 0.6,
      },
    });
  }

  // El panel se arma al cargar. Solo transform y opacity; el cambio de
  // color de la barra de mayo va por clase con transición CSS.
  const tl = gsap.timeline({ delay: 0.35, defaults: { ease: "power2.out" } });

  const may = document.querySelector(".js-hero-bar-may");
  may?.classList.remove("bar--hot");

  const barras = document.querySelectorAll(".js-hero-bar");
  if (barras.length) {
    tl.from(barras, {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 0.7,
      stagger: 0.09,
    });
  }

  if (may) {
    tl.add(() => may.classList.add("bar--hot"), "-=0.05");
  }

  const puntos = document.querySelectorAll(".js-hero-dot");
  if (puntos.length) {
    tl.from(
      puntos,
      { scale: 0, opacity: 0, duration: 0.3, stagger: { each: 0.025 } },
      "-=0.35",
    );
  }

  // El fondo de puntos del sitio vive en fondo.ts (canvas global):
  // acompaña el scroll por su cuenta y no necesita ScrollTrigger.
}
