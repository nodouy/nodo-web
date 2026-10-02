/**
 * Contenido de la página de preguntas frecuentes (/preguntas).
 *
 * La lista parte de las dudas que vivían en el Inicio y suma los bloques
 * que se mudaron desde Servicios: "¿Y si no tengo Power BI?" (texto
 * exacto aprobado, sensible a site.flags.accesoEnLinea) y "¿Con qué
 * formatos trabajamos?" (reemplaza a la duda corta de formatos, que
 * decía lo mismo con menos detalle). El plazo de entrega y las formas
 * de pago ya tenían su propia duda, así que no se duplican: a la del
 * plazo solo se le suma desde cuándo corre.
 */
import { dudas } from "./inicio";
import { sinPowerBi, sinPowerBiOnline, formatos } from "./servicios";
import { site } from "./site";

type Item = {
  pregunta: string;
  respuesta?: string;
  respuestaHtml?: string;
};

// El recuadro con acceso en línea incluido se activa recién cuando el
// circuito esté probado de punta a punta (ver site.flags.accesoEnLinea).
const bloquePowerBi = site.flags.accesoEnLinea ? sinPowerBiOnline : sinPowerBi;

const itemPowerBi: Item = {
  pregunta: bloquePowerBi.titulo,
  respuestaHtml: bloquePowerBi.parrafos.map((p) => `<p>${p}</p>`).join(""),
};

const itemFormatos: Item = {
  pregunta: formatos.titulo,
  respuestaHtml:
    `<p>${formatos.intro}</p>` +
    `<ul>${formatos.lista.map((f) => `<li>${f}</li>`).join("")}</ul>` +
    `<p>${formatos.notaOtros}</p>` +
    `<p>${formatos.notaConexiones}</p>`,
};

const items: Item[] = dudas.preguntas.map((d) => {
  // La duda corta de formatos se reemplaza por el bloque completo que
  // vivía en Servicios (misma respuesta, con la lista entera).
  if (d.pregunta === "¿Y si mis datos están en otro formato?") {
    return itemFormatos;
  }
  // A la duda del plazo se le suma desde cuándo corre.
  if (d.pregunta === "¿Cuánto demora la entrega?") {
    return {
      pregunta: d.pregunta,
      respuesta:
        d.respuesta +
        " El plazo corre desde que recibimos tus datos y el acuerdo está firmado.",
    };
  }
  return d;
});

// "¿Y si no tengo Power BI?" va pegado a la duda de licencias, que
// habla de lo mismo desde el lado del costo.
const despuesDe = items.findIndex((d) => d.pregunta.includes("licencia"));
items.splice(despuesDe + 1, 0, itemPowerBi);

export const preguntas = {
  titulo: "¿Tenés preguntas?",
  tituloAcento: "Tenemos respuestas.",
  bajada: "Las preguntas que nos hacen antes de arrancar.",
  items,
};
