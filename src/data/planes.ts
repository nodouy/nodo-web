/**
 * Los tres planes responden tres preguntas que se hace el dueño de un
 * negocio. Precios fijos: 150 / 300 / 500 USD. No modificar.
 *
 * BORRADOR A VALIDAR: los detalles de "incluye" / "no incluye" son una
 * propuesta derivada del enfoque de cada plan. Revisar antes de publicar.
 */

export interface Plan {
  id: string;
  nombre: string;
  metafora: string;
  pregunta: string;
  precio: string;
  modalidad: string;
  resumen: string;
  /** Puntos rojos (de 12) en la grilla chica: cuánto cubre el plan. */
  cobertura: number;
  incluye: string[];
  noIncluye: string[];
  exclusivos?: { titulo: string; detalle: string }[];
  destacado?: boolean;
}

export const planes: Plan[] = [
  {
    id: "standard",
    nombre: "Standard",
    metafora: "La foto",
    pregunta: "¿Qué pasó?",
    precio: "150 USD",
    modalidad: "pago único",
    cobertura: 3,
    resumen:
      "Una imagen clara de tu negocio hasta hoy: qué se vendió, qué se gastó, qué quedó.",
    incluye: [
      "Orden y limpieza de tus planillas y datos",
      "Un reporte claro con los números de tu negocio, entregado en PDF",
      "Reunión de entrega para recorrerlo con vos",
    ],
    noIncluye: [
      "Actualización mensual",
      "Comparación entre períodos",
      "Automatización, rentabilidad por canal y alertas",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    metafora: "La película",
    pregunta: "¿Cómo vengo?",
    precio: "300 USD",
    modalidad: "por mes",
    cobertura: 7,
    resumen:
      "La evolución mes a mes: si venís mejor o peor que antes, y en qué exactamente.",
    incluye: [
      "Todo lo del plan Standard",
      "Actualización mensual del reporte con tus datos nuevos",
      "Comparación entre meses: cómo viene cada número respecto a los períodos anteriores",
    ],
    noIncluye: [
      "Automatización, rentabilidad por canal y alertas",
    ],
  },
  {
    id: "full",
    nombre: "Full",
    metafora: "El copiloto",
    pregunta: "¿Qué me conviene hacer?",
    precio: "500 USD",
    modalidad: "por mes · mínimo 3 meses",
    cobertura: 11,
    resumen:
      "Te acercamos la información ordenada para que tomes tu próxima decisión con respaldo.",
    incluye: ["Todo lo del plan Pro"],
    noIncluye: [],
    exclusivos: [
      {
        titulo: "Automatización",
        detalle:
          "Tus datos se actualizan solos: no tenés que mandar planillas cada mes.",
      },
      {
        titulo: "Rentabilidad por canal de venta",
        detalle:
          "Cuánto te deja de verdad cada canal: el local, la web, los revendedores.",
      },
      {
        titulo: "Alertas automáticas",
        detalle:
          "Un aviso cuando un número clave se sale de lo esperado, sin tener que mirarlo todos los días.",
      },
    ],
    destacado: true,
  },
];

/** Marca única para el grupo de diferenciales en la tarjeta del Full. */
export const etiquetaExclusivos = "Exclusivo del plan Full";

export const formasDePago = [
  "Transferencia bancaria",
  "Mercado Pago",
  "A convenir",
];

export const notaFactura = "Si necesitás factura, avisanos y lo coordinamos.";
