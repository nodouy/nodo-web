/**
 * Contenido de la página de inicio. Todo el texto vive acá, no en los
 * componentes.
 *
 * BORRADOR A VALIDAR: "Quiénes somos" y "Dudas" están pendientes de
 * texto final según el documento del proyecto. Lo que hay acá es un
 * borrador que respeta las reglas de comunicación.
 */
import { site } from "./site";

export const portada = {
  etiqueta: "Análisis de datos para pymes y emprendimientos de Uruguay",
  // El título se corta en dos para poder acentuar la palabra final
  // con el color de acento del modo activo.
  titulo: "Mirá lo que",
  tituloAcento: "importa.",
  // La bajada también se corta en dos: el cierre va destacado con
  // peso medium y color de acento (nunca negrita).
  bajada:
    "Ordenamos y analizamos la información que tu negocio ya genera —planillas, facturación, plataformas de venta— para que la veas de forma clara en un solo lugar.",
  bajadaAcento: "Las decisiones de tu negocio las tomás vos.",
  // Botón principal único de todo el sitio: lleva al formulario de
  // inicio. Alternativas consideradas: "Empezá ahora" (elegida),
  // "Empezá hoy", "Dar el primer paso".
  ctaPrincipal: "Empezá ahora",
  ctaWhatsapp: "Escribinos por WhatsApp",
  // Opción secundaria, de menor peso, para quien prefiere conversar
  // antes: lleva al calendario de Contacto.
  ctaHablar: "Prefiero hablar primero con alguien de NODO",
};

// Enfoque de oportunidad, no de reproche: quien lee ya tiene un negocio
// funcionando y sabe de lo suyo. Se le muestra lo que puede ganar.
export const teSuena = {
  titulo: "Lo que ganás con tus datos ordenados",
  bajada: "Tres mejoras posibles en casi cualquier negocio.",
  situaciones: [
    {
      titulo: "Toda tu información en un solo lugar",
      texto:
        "Ventas, gastos y facturación reunidos en una misma vista. El resumen que hoy lleva horas, listo en minutos.",
    },
    {
      titulo: "Claridad sobre tu margen",
      texto:
        "Saber qué productos rinden más, para poner el foco donde más te conviene.",
    },
    {
      titulo: "Tu experiencia, con números al lado",
      texto:
        "Conocés tu negocio mejor que nadie. Los datos ordenados suman una mirada más para decidir con seguridad.",
    },
  ],
};

export const queHacemos = {
  titulo: "¿Qué hacemos?",
  bajada:
    "Un recorrido en tres preguntas. Cada plan responde una más profunda que la anterior.",
  enlace: "Ver los planes en detalle",
  pasos: [
    {
      pregunta: "¿Qué pasó?",
      metafora: "La foto",
      texto:
        "Una imagen clara de tu negocio hasta hoy: qué se vendió, qué se gastó, qué quedó.",
    },
    {
      pregunta: "¿Cómo vengo?",
      metafora: "La película",
      texto:
        "La evolución mes a mes: si venís mejor o peor que antes, y en qué exactamente.",
    },
    {
      pregunta: "¿Qué me conviene hacer?",
      metafora: "El copiloto",
      texto:
        "Te acercamos la información ordenada para que tomes tu próxima decisión con respaldo.",
    },
  ],
};

export const comoFunciona = {
  titulo: "¿Cómo funciona?",
  bajada: "Un proceso con método, del primer mensaje a la entrega.",
  pasos: [
    {
      titulo: "Primer contacto",
      texto:
        "Nos escribís por WhatsApp o agendás una reunión. Sin compromiso: no hace falta que prepares documentos ni que tengas nada ordenado, alcanza con lo que ya sabés de tu negocio.",
    },
    {
      titulo: "Formulario de inicio",
      texto:
        "Lo completás desde el sitio cuando quieras, sin esperar respuesta nuestra. No te compromete a nada: nos sirve para conocer tu negocio antes de la reunión.",
      enlace: { texto: "Completar el formulario de inicio", href: "/formulario" },
    },
    {
      titulo: "Reunión informativa",
      texto:
        "Conversamos sobre lo que necesitás y vemos qué plan tiene sentido para tu caso. Si ninguno lo tiene, también te lo decimos.",
    },
    {
      titulo: "Acuerdo de confidencialidad",
      texto:
        "Antes de ver un solo dato tuyo firmamos un acuerdo mutuo que nos compromete a los dos.",
    },
    {
      titulo: "Entrega",
      texto:
        "Recibís tu reporte y lo recorremos con vos. La primera entrega del plan Standard lleva de 5 a 7 días hábiles, según el volumen de datos; en Pro y Full ese es el plazo de la entrega inicial, y después el reporte se actualiza todos los meses.",
    },
  ],
};

export const seguridadCorta = {
  titulo: "Tus datos, cuidados",
  bajada:
    "Sabemos que compartir los números del negocio no es un paso menor. Por eso lo tratamos con reglas claras.",
  enlace: "Leé cómo cuidamos tus datos",
  puntos: [
    {
      titulo: "Acuerdo de confidencialidad mutuo",
      texto: "Se firma antes de compartir cualquier dato. Nos compromete a los dos.",
    },
    {
      titulo: "Vos decidís, siempre",
      texto:
        "Analizamos y presentamos información. Las decisiones sobre tu negocio son tuyas.",
    },
    {
      titulo: "Accesos ordenados",
      texto:
        "Tus datos viven en herramientas conocidas, con accesos definidos y respaldos.",
    },
  ],
};

export const quienesSomos = {
  titulo: "¿Quiénes somos?",
  parrafos: [
    "NODO existe por una razón concreta: ordenar datos lleva un tiempo que el que está al frente de un negocio no tiene. Los números están —en planillas, en el sistema de facturación, en la plataforma de venta—, pero mirarlos ordenados es un trabajo en sí mismo, y siempre queda para después.",
    "Nuestro trabajo es ese: ordenar la información que ya está, analizarla y presentártela clara. No prometemos resultados ni tomamos decisiones por vos: te mostramos qué dicen tus números, porque el negocio lo conocés vos.",
  ],
};

export const dudas = {
  titulo: "Dudas",
  bajada: "Las preguntas que nos hacen antes de arrancar.",
  preguntas: [
    {
      pregunta: "¿Necesito tener un sistema o algo especial?",
      respuesta:
        "No. Con las planillas que ya usás alcanza para empezar. Parte de nuestro trabajo es ordenarlas.",
    },
    {
      pregunta: "¿Y si mis datos están en otro formato?",
      respuesta:
        "Trabajamos con Excel, Google Sheets, CSV, archivos de texto, XML, JSON, Access, carpetas de archivos y bibliotecas de SharePoint, entre otros. Si lo tuyo no está en esa lista, contanos igual: casi siempre hay una forma de leerlo. Y si hace falta conectarse en vivo a un sistema que ya usás, lo vemos caso por caso.",
    },
    {
      pregunta: "¿Sirve para un negocio chico?",
      respuesta:
        "Sí. No hace falta un volumen mínimo de ventas ni un sistema especial. Si hay registros, hay algo para ordenar y entender.",
    },
    {
      pregunta: "¿Qué pasa si mis planillas son un lío?",
      respuesta:
        "Es lo más común, y está bien. Ordenar y limpiar tus datos es parte del servicio, no un extra.",
    },
    {
      pregunta: "¿Mis datos están seguros?",
      // respuestaHtml: se redacta acá mismo y solo puede llevar enlaces
      // internos del sitio.
      respuestaHtml:
        'Antes de ver un solo dato firmamos un acuerdo de confidencialidad mutuo, y trabajamos con accesos definidos y respaldos. Tenés una página entera dedicada a esto: <a href="/seguridad">Seguridad y confidencialidad</a>.',
    },
    {
      pregunta: "¿Cuánto demora la entrega?",
      respuesta:
        "La primera entrega del plan Standard lleva de 5 a 7 días hábiles, según el volumen de datos. En Pro y Full ese plazo corresponde a la entrega inicial: después el reporte se actualiza todos los meses.",
    },
    {
      pregunta: "¿Tengo que saber de tecnología para usar el reporte?",
      respuesta:
        "No. Es un reporte que podés filtrar y explorar por tu cuenta, y en la entrega lo recorremos con vos hasta que quede claro.",
    },
    {
      pregunta: "¿Necesito comprar Power BI o alguna licencia?",
      // ADVERTENCIA: la versión con acceso en línea incluido se activa
      // junto con el recuadro de Servicios, vía site.flags.accesoEnLinea,
      // y solo cuando el circuito esté probado de punta a punta.
      respuesta: site.flags.accesoEnLinea
        ? "No necesitás comprar nada. En el Standard te entregamos el reporte en PDF, y si querés explorarlo por tu cuenta te ayudamos a instalar Power BI Desktop, que es gratuito. En Pro y Full el acceso en línea viene incluido y la licencia la cubrimos nosotros: entrás desde el navegador, en cualquier dispositivo. Si querés sumar accesos para otras personas de tu equipo, cada uno cuesta 14 USD por mes, y te lo aclaramos antes de que decidas."
        : "Para abrir tu reporte no necesitás comprar nada: te ayudamos a instalar Power BI Desktop, que es gratuito, y siempre te entregamos también una versión en PDF que se abre en cualquier dispositivo. Si querés que el reporte esté en línea para varias personas de tu equipo, ahí puede hacer falta alguna licencia: te lo aclaramos en la reunión, antes de que decidas, para que no te sorprenda ningún costo después.",
    },
    {
      pregunta: "¿Puedo cambiar de plan más adelante?",
      respuesta:
        "Sí. Se puede empezar por el Standard para tener la foto de tu negocio y pasar después a un plan mensual, o cambiar de plan cuando tu operación cambie. Lo conversamos y ajustamos.",
    },
    {
      pregunta: "¿Me tengo que comprometer por mucho tiempo?",
      respuesta:
        "El Standard es un pago único, sin permanencia. El Pro es mensual y lo podés dar de baja cuando quieras. El Full tiene un mínimo de tres meses, porque la automatización y las alertas necesitan ese tiempo para tener sentido.",
    },
    {
      pregunta: "¿Cómo se paga?",
      respuesta:
        "Por transferencia bancaria, Mercado Pago o a convenir. Si necesitás factura, avisanos y lo coordinamos.",
    },
    {
      pregunta: "¿La primera reunión tiene costo?",
      respuesta:
        "No. Es una reunión informativa, corta y sin compromiso, para conocer tu negocio y contarte cómo trabajamos.",
    },
  ],
};

export const agenda = {
  titulo: "Agendá una reunión",
  bajada:
    "Una charla corta y sin compromiso para conocer tu negocio y contarte cómo trabajamos.",
  // En Inicio no va el calendario embebido (pesa y se comporta mal en
  // celular): van dos botones, uno a Contacto y el de WhatsApp.
  botonAgenda: "Elegí día y horario",
  botonWhatsapp: "Escribinos por WhatsApp",
  // En celular el recuadro embebido de Contacto se reemplaza por este
  // botón que abre la página de reservas en una pestaña nueva.
  botonCelular: "Abrir la agenda para elegir horario",
};

export const muestra = {
  titulo: "Mirá un reporte de verdad",
  bajada:
    "Un reporte de muestra, con datos ficticios, para que explores cómo se ve tu negocio ordenado.",
  // PENDIENTE: enlace o embebido del reporte demo de Power BI.
  enlace: "",
};
