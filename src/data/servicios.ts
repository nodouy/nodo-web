/**
 * Contenido de la página de servicios y planes.
 *
 * Único dato con fuente verificada disponible: el estudio del BID sobre
 * uso de sistemas de análisis de datos en pymes uruguayas. No agregar
 * otras cifras sin fuente.
 */

export const intro = {
  etiqueta: "Servicios y planes",
  titulo: "Tus datos ya cuentan la historia. Falta ordenarla.",
  parrafos: [
    "Casi todos los negocios generan datos todos los días: ventas, gastos, facturación, movimientos de la plataforma de venta. Pero según un estudio del BID, menos del 10% de las pymes uruguayas usa sistemas especializados de análisis de datos. El resto decide con planillas sueltas, o directamente de memoria.",
    "Nuestro trabajo es cerrar esa distancia sin que tengas que contratar un departamento propio: tomamos los datos que ya tenés, los ordenamos, los analizamos y te los presentamos en reportes claros que podés filtrar y explorar por tu cuenta.",
  ],
};

// Encabezado nuevo de la página (frase corta + ilustración). El texto
// original de la intro queda disponible bajo "Ver más" hasta que el
// cliente apruebe el recorte definitivo.
export const encabezado = {
  frase: "Tus datos ya cuentan la historia.",
  destacada: "Nosotros la ordenamos para que decidas.",
};

export const recorrido = {
  titulo: "Tres planes, tres preguntas",
  bajada:
    "Cada plan responde una pregunta más profunda que la anterior. Empezá por la que te quita el sueño.",
};

export const detallePlanes = {
  incluyeTitulo: "Qué incluye",
  noIncluyeTitulo: "Qué no incluye",
  exclusivosTitulo: "Solo en Full",
  exclusivosBajada:
    "Los tres diferenciales que justifican el salto: no están en ningún otro plan.",
};

export const queRecibis = {
  titulo: "Qué recibís",
  // El formato concreto de entrega, por plan. En Standard la entrega
  // base es el PDF: el archivo de Power BI se suma solo si el cliente
  // tiene Power BI Desktop o quiere que lo ayudemos a instalarlo.
  // Pro y Full sí incluyen el archivo de Power BI.
  porPlan: {
    standard: [
      "Tus planillas ordenadas y limpias",
      "El reporte en PDF, para mirarlo desde cualquier dispositivo",
      "Todo en una carpeta de Dropbox compartida con vos",
      "Reunión de entrega para recorrer el reporte juntos",
    ],
    pro: [
      "Tus planillas ordenadas y limpias",
      "El reporte en archivo de Power BI",
      "Una versión en PDF, para mirarla desde cualquier dispositivo",
      "Todo en una carpeta de Dropbox compartida con vos",
      "Actualización mensual del reporte, avisada por los canales que acordemos, y reuniones de seguimiento para revisarlo con vos",
    ],
    full: [
      "Tus planillas ordenadas y limpias",
      "El reporte en archivo de Power BI",
      "Una versión en PDF, para mirarla desde cualquier dispositivo",
      "Todo en una carpeta de Dropbox compartida con vos",
      "Lo mismo que Pro, más la actualización automática de los datos, sin que tengas que mandar planillas cada mes",
    ],
  } as Record<string, string[]>,
  notaStandard:
    "Si tenés Power BI Desktop instalado, o querés que te ayudemos a instalarlo, te entregamos también el archivo del reporte para que puedas filtrar y explorar por tu cuenta.",
};

export const sinPowerBi = {
  titulo: "¿Y si no tengo Power BI?",
  // Texto exacto aprobado por el cliente: distingue entre abrir un
  // archivo localmente y consultarlo en línea. No simplificar ni
  // resumir: cualquier resumen que mezcle esas dos cosas lo vuelve
  // inexacto.
  parrafos: [
    "No hace falta que compres nada. Con tu autorización te ayudamos a instalar Power BI Desktop, que es gratuito, para que puedas abrir el reporte en tu computadora.",
    "Power BI Desktop funciona en Windows. Si trabajás en Mac o querés mirar el reporte desde el celular, para eso está la versión en PDF, que se abre en cualquier dispositivo sin instalar nada.",
    "Y si más adelante querés que el reporte esté disponible en línea para varias personas de tu equipo, lo conversamos: ahí sí puede hacer falta alguna licencia, y te lo aclaramos antes de que decidas.",
  ],
};

/**
 * ADVERTENCIA: versión del recuadro con el acceso en línea incluido en
 * Pro y Full. Se muestra solo cuando site.flags.accesoEnLinea está
 * activa, y esa bandera NO se activa hasta que el responsable del sitio
 * confirme el circuito completo (dominio, cuenta de trabajo de
 * Microsoft, licencias Pro).
 *
 * Texto exacto aprobado por el cliente: cada frase distingue entre
 * abrir un archivo localmente y consultarlo en línea. No reescribir.
 * Nunca describir el acceso en línea como "cuenta gratuita de Power
 * BI": la licencia existe y la paga NODO.
 */
export const sinPowerBiOnline = {
  titulo: "¿Y si no tengo Power BI?",
  parrafos: [
    "No hace falta que compres nada.",
    "En el plan Standard te entregamos el reporte en PDF, que se abre en cualquier dispositivo sin instalar nada. Y si querés explorarlo por tu cuenta, te ayudamos a instalar Power BI Desktop, que es gratuito, para abrir el archivo en tu computadora. Power BI Desktop funciona en Windows.",
    "En los planes Pro y Full, el acceso en línea está incluido: nos ocupamos nosotros de la licencia, sin costo para vos. Entrás con tu usuario desde el navegador y mirás tu reporte actualizado, desde Windows, Mac, tablet o celular.",
    "Si querés que más de una persona de tu equipo tenga su propio acceso, cada acceso adicional tiene un costo de 14 USD por mes. Te lo decimos de entrada, antes de que decidas, para que no aparezca ninguna sorpresa después.",
  ],
};

export const plazoYPagos = {
  titulo: "Plazo y formas de pago",
  plazoTitulo: "Plazo de entrega",
  plazoTexto: "5 a 7 días hábiles, según el volumen de datos.",
  pagosTitulo: "Formas de pago",
};

export const arranque = {
  titulo: "¿Qué necesitamos para arrancar?",
  parrafos: [
    "El primer paso es el formulario de inicio: un cuestionario corto para conocer tu negocio antes de la reunión. Qué vendés, dónde viven tus datos hoy —planillas, sistema de facturación, plataforma de venta—, y qué querés entender primero. Está acá en el sitio y lo podés completar ahora mismo, sin costo y sin que te comprometa a nada.",
    "No hace falta que tus datos estén prolijos ni completos: ordenarlos es parte del trabajo. Y no te pedimos acceso a nada hasta que firmemos el acuerdo de confidencialidad.",
  ],
  boton: "Completar el formulario de inicio",
  botonHref: "/formulario",
};

export const formatos = {
  titulo: "¿Con qué formatos trabajamos?",
  intro:
    "Trabajamos con los archivos que ya usás, sin que tengas que cambiar de sistema ni migrar nada:",
  lista: [
    "Planillas de Excel y Google Sheets",
    "Archivos de texto, CSV, XML y JSON",
    "Bases de Access",
    "Carpetas completas de archivos",
    "Bibliotecas de SharePoint",
    // El matiz del PDF no se modifica: una tabla bien estructurada se
    // puede extraer; un PDF escaneado o de formato libre, muchas veces
    // no. Ponerlo al mismo nivel que Excel sería prometer de más.
    "Tablas dentro de PDF, según cómo esté armado el archivo",
  ],
  notaOtros:
    "Si tus datos están en otro formato, contanos igual: casi siempre hay forma de leerlos.",
  // Esta línea no se modifica: recibir un archivo exportado y
  // conectarse en vivo al sistema del cliente son trabajos distintos,
  // con costos distintos.
  notaConexiones:
    "Cuando hace falta conectarse en vivo a un sistema que ya usás, lo vemos caso por caso y lo cotizamos aparte.",
};

export const cierre = {
  titulo: "¿Empezamos por la foto?",
  bajada:
    "Agendá una reunión informativa, corta y sin compromiso, o escribinos por WhatsApp.",
};
