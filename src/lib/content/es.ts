import { firm, fullAddress } from "@/lib/firm";
import type { Content } from "./types";

/**
 * Spanish copy.
 *
 * Written to carry the voice of the English rather than to track it word for
 * word — the firm should sound like the same firm in either language. Formal
 * "usted" throughout, which is what a law office is expected to use.
 *
 * ⚠️ PENDING FIRM REVIEW. Legal terminology has been chosen for Texas
 * practice (dram shop, non-subscriber employers, the Jones Act, FELA), but
 * nothing here should go live until the firm has signed off on the wording.
 *
 * Client reviews are NOT translated — they are reproduced exactly as the
 * clients published them on Google. Translating a real person's words and
 * presenting them as a quotation would misrepresent them.
 */
/** Compartidos por la página Nosotros y la entrada de Andre en el equipo. */
const andreParrafos = [
      "Con licencia para ejercer en Tennessee y en Texas, Andre Thomas es un abogado experimentado y de presencia formidable. Su trayectoria está marcada por juicios de alto perfil que reflejan su capacidad excepcional y su dedicación a la justicia.",
      "Su pasión por el derecho se formó en la Universidad de Memphis. Perfeccionó después su criterio jurídico en la Facultad de Derecho Thurgood Marshall de Texas Southern University.",
      "Andre se desempeñó como fiscal en la Oficina del Fiscal de Distrito del Condado de Shelby, Tennessee, donde manejó delitos graves y menores. Dedicó luego varios años al Departamento de Seguridad y Seguridad Nacional del Estado de Tennessee, defendiendo al estado en complejos casos de decomiso de bienes.",
      "Hoy, en la práctica privada, Andre se ha consolidado como un defensor de la justicia. Representa a demandantes en casos de lesiones personales y defiende a clientes acusados de delitos graves y menores. Su compromiso inquebrantable se refleja en su labor, incluidos los juicios ante jurado.",
];

export const es: Content = {
  tagline: "Damos Fuerza a Su Voz, Garantizamos Justicia",
  subTagline: "Un Defensor Compasivo de la Justicia",
  hours: "Lunes – Viernes · 9:00 am – 5:00 pm",

  heroWords: ["justicia", "recuperación", "dignidad", "respuestas"],

  bio: {
    heading: "Conozca a Andre Thomas: comprometido con la justicia",
    paragraphs: andreParrafos,
    education: [
      { school: "Texas Southern University", detail: "Facultad de Derecho Thurgood Marshall" },
      { school: "Universidad de Memphis", detail: "Estudios de licenciatura" },
    ],
    career: [
      {
        year: "Antes",
        role: "Fiscal Auxiliar de Distrito",
        org: "Oficina del Fiscal de Distrito del Condado de Shelby, TN",
        detail: "Procesó delitos graves y menores.",
      },
      {
        year: "Después",
        role: "Abogado",
        org: "Depto. de Seguridad y Seguridad Nacional de TN",
        detail: "Defendió al estado en casos complejos de decomiso de bienes.",
      },
      {
        year: "Hoy",
        role: "Abogado Fundador",
        org: "Andre Thomas Law, PLLC",
        detail:
          "Representa a demandantes en casos de lesiones personales y defiende a clientes acusados de delitos graves y menores.",
      },
    ],
    notableTrials: [
      { caption: "Estado de Tennessee vs. Billy Ray Turner" },
      { caption: "Estado de Tennessee vs. Tedarrius Bean" },
    ],
  },

  whyFirm: {
    heading: "Por qué Andre Thomas Law, PLLC",
    lede: "Elegir a Andre Thomas Law, PLLC significa contar con un defensor que combina un profundo conocimiento de la ley con verdadera compasión por su situación. Con Andre Thomas usted gana un aliado dedicado a la justicia y al resultado que usted merece, respaldado por una vocación que lo ha impulsado desde la infancia.",
  },

  advocatePanels: [
    {
      n: "01",
      title: "Valores y forma de trabajar",
      body: "La práctica de Andre Thomas gira en torno a valores centrados en el cliente: trabajo diligente, determinación y empatía. Trata a cada cliente como él querría ser tratado, con apoyo constante y con la mira puesta en obtener resultados favorables. Reconocido por su profesionalismo y su entrega, Andre acompaña a sus clientes en los días más difíciles.",
      alt: "Una biblioteca jurídica con tomos encuadernados y una figura de la Dama de la Justicia",
    },
    {
      n: "02",
      title: "Experiencia y conocimiento",
      body: "La especialización de Andre Thomas en lesiones personales refleja su dominio de un campo complejo. Su trabajo se hace evidente en casos como Estado de TN vs. Billy Ray Turner y Estado de TN vs. Tedarrius Bean. Casos así le han dado la reputación de aportar la dedicación y el criterio jurídico necesarios para conseguir justicia para sus clientes.",
      alt: "La fachada con columnas y las escalinatas de un juzgado del condado",
    },
    {
      n: "03",
      title: "El cliente, en el centro",
      body: "Para Andre, poner las necesidades y las preocupaciones del cliente por delante no es negociable. Identifica desde temprano lo que cada persona necesita y atiende cada punto con precisión. Su compromiso con entender la situación y diseñar una estrategia legal a la medida es total.",
      alt: "Un abogado en consulta con sus clientes frente a un escritorio",
    },
  ],

  pillars: [
    {
      n: "01",
      title: "Fue fiscal antes de ser defensor",
      body: "Los años dentro de la Oficina del Fiscal de Distrito del Condado de Shelby significan que Andre ha construido casos desde el otro lado de la mesa. Sabe cómo se arman — y por dónde se caen.",
    },
    {
      n: "02",
      title: "Con licencia en dos estados",
      body: "Admitido en Texas y en Tennessee. Dos colegios de abogados, dos sistemas judiciales, un solo abogado que no tiene que entregarle su caso a otro cuando el asunto cruza la línea estatal.",
    },
    {
      n: "03",
      title: "Ha litigado ante jurados",
      body: "Juicios de alto perfil, argumentados hasta el veredicto. Las aseguradoras valoran un caso de otra manera cuando el abogado del otro lado está realmente dispuesto a llevarlo a juicio.",
    },
    {
      n: "04",
      title: "Usted habla con el abogado",
      body: "Diligencia, determinación y empatía — una práctica construida alrededor de las necesidades del cliente, no alrededor de un centro de llamadas.",
    },
  ],

  practiceGroups: [
    {
      id: "foundation",
      label: "La Base",
      n: "01",
      blurb: "Donde empieza todo reclamo: alguien más fue descuidado y usted es quien carga con las consecuencias.",
      alt: "Un auto destrozado a la orilla de la carretera entre la niebla de la mañana",
    },
    {
      id: "road",
      label: "En la Carretera",
      n: "02",
      blurb: "Choques con autos, camiones, motocicletas y conductores en estado de ebriedad.",
      alt: "Las llantas de un tráiler levantando agua en una autopista mojada",
    },
    {
      id: "work",
      label: "En el Trabajo",
      n: "03",
      blurb: "Construcción, industria, marítimo y ferroviario — los lugares donde Texas se construye y se mueve.",
      alt: "Un trabajador de la construcción sobre varillas de acero, muy por encima de la obra",
    },
    {
      id: "property",
      label: "En la Propiedad",
      n: "04",
      blurb: "Peligros que alguien más tenía la responsabilidad de encontrar y corregir.",
      alt: "Un letrero de precaución de piso mojado en el pasillo de un supermercado",
    },
    {
      id: "aftermath",
      label: "Cuando Es Más Grave",
      n: "05",
      blurb: "Lesiones catastróficas, muerte por negligencia y las aseguradoras que preferirían no pagar.",
      alt: "Un camión cisterna en una autopista oscura de noche",
    },
  ],

  practiceAreas: [
    {
      key: "personal-injury",
      slug: "lesiones-personales",
      name: "Lesiones Personales",
      group: "foundation",
      short:
        "Nadie debería cargar con las facturas médicas y el peso emocional de un accidente que no provocó.",
      lede: "Nadie debería cargar con gastos médicos ni con angustia emocional por un accidente que no provocó.",
      body: [
        "Un caso de lesiones personales empieza en el momento en que el descuido de otra persona le cambia la vida. Las facturas llegan puntuales. El dolor no respeta horario de oficina. Y en algún lugar de la ciudad, un ajustador ya abrió un expediente sobre usted y empezó a construir una razón para pagar menos.",
        "Andre Thomas representa a personas lesionadas por la negligencia de otros y busca la compensación que legítimamente les corresponde de las partes responsables. Eso incluye la atención médica ya recibida y la que todavía falta, los salarios perdidos, los bienes destruidos y el costo humano que no cabe con limpieza en una factura.",
        "La consulta no cuesta nada. Saber en qué posición está vale la pena sin importar lo que usted decida hacer después.",
      ],
      covers: [
        "Gastos médicos — pasados, actuales y futuros",
        "Salarios perdidos y reducción de la capacidad de ganar",
        "Daños a la propiedad",
        "Dolor, sufrimiento y angustia emocional",
        "Negociación con las aseguradoras — y litigio cuando no quieren ser razonables",
      ],
    },
    {
      key: "car-accidents",
      slug: "accidentes-de-auto",
      name: "Accidentes de Auto",
      group: "road",
      short:
        "Un choque reacomoda todo de golpe — facturas, sueldo, transporte, rutina.",
      lede: "Cuando un choque le trastorna la vida, la carga económica no debería caer sobre usted.",
      body: [
        "Un accidente de auto no se queda en el cruce donde ocurrió. Lo sigue hasta la sala de emergencias, hasta el presupuesto del taller, hasta los cheques de pago que deja de recibir y hasta las llamadas de un ajustador que suena amable y está tomando notas.",
        "Andre Thomas ayuda a personas cuya vida quedó interrumpida por un choque vehicular — atendiendo las facturas médicas, los daños al vehículo, los salarios perdidos y las demás cargas económicas que llegan sin aviso — y las guía por el proceso legal necesario para obtener la compensación que les corresponde.",
        "Lo más útil que puede hacer desde temprano es hablar con un abogado antes de dar una declaración grabada. Lo segundo más útil es guardar cada documento que reciba.",
      ],
      covers: [
        "Choques por alcance, en intersecciones y en autopista",
        "Atropello y fuga, y reclamos por conductores sin seguro o con seguro insuficiente",
        "Choques con vehículos de transporte compartido y comerciales",
        "Daños al vehículo y pérdida de valor",
        "Tratar con la aseguradora del otro conductor por usted",
      ],
    },
    {
      key: "truck-accidents",
      slug: "accidentes-de-camion",
      name: "Accidentes de Camión",
      group: "road",
      short:
        "Las empresas de transporte llegan al lugar con su equipo legal. Usted no debería enfrentar eso solo.",
      lede: "Las empresas de transporte se resisten a aceptar responsabilidad. Andre Thomas enfrenta a sus equipos legales para conseguir justicia para las personas a las que lesionaron.",
      body: [
        "Un camión comercial cargado puede pesar veinte veces lo que pesa su auto. La física no es una pelea justa, y lo que viene después tampoco: las empresas de transporte y sus aseguradoras suelen tener investigadores trabajando antes de que se despeje la carretera, y no están reuniendo pruebas a favor de usted.",
        "Estos casos involucran partes que un accidente de auto nunca toca — el conductor, la empresa transportista, la compañía que cargó el remolque, el taller responsable del mantenimiento. Los reglamentos federales, las bitácoras del conductor y los datos del vehículo pueden ser decisivos, y parte de esa información no sobrevive mucho tiempo sin una solicitud formal de preservación.",
        "Andre Thomas enfrenta directamente a los equipos legales de las empresas de transporte para conseguir justicia para las personas a las que lesionaron, por más que se resistan a aceptar responsabilidad.",
      ],
      covers: [
        "Choques con camiones de 18 ruedas y tráileres",
        "Fatiga del conductor y violaciones a las horas de servicio",
        "Carga mal asegurada y desplazamiento de mercancía",
        "Fallas de mantenimiento y de equipo",
        "Reclamos contra las empresas transportistas, no solo contra el conductor",
      ],
    },
    {
      key: "motorcycle-accidents",
      slug: "accidentes-de-motocicleta",
      name: "Accidentes de Motocicleta",
      group: "road",
      short: "Los motociclistas enfrentan lesiones — y prejuicios — que otros conductores no enfrentan.",
      lede: "Experiencia probada en juicios, en casos exactamente como el suyo.",
      body: [
        "Los casos de motocicleta traen una segunda lesión incorporada: el prejuicio. Con demasiada frecuencia, las aseguradoras y los jurados llegan convencidos de que el motociclista iba a exceso de velocidad, zigzagueando o buscándoselo — antes de que se establezca un solo hecho.",
        "Las lesiones físicas también son de otra categoría. Sin carrocería y sin zona de deformación, un choque que a un automovilista lo deja sacudido a un motociclista lo deja en cirugía. Esa distancia entre lo que pasó y lo que la gente supone que pasó hay que cerrarla con pruebas.",
        "Andre Thomas aporta experiencia probada en juicios a casos exactamente como el suyo, y atiende los retos particulares que enfrentan los motociclistas tanto en la carretera como en el proceso de reclamo que viene después.",
      ],
      covers: [
        "Choques por vuelta a la izquierda y cambio de carril",
        "Reclamos por peligros y mal estado del camino",
        "Lesiones catastróficas y ortopédicas",
        "Contrarrestar el prejuicio contra el motociclista en la negociación y en el juicio",
        "Manejo correcto de la evidencia del casco y el equipo",
      ],
    },
    {
      key: "drunk-driving-injuries",
      slug: "conductores-ebrios",
      name: "Lesiones por Conductores Ebrios",
      group: "road",
      short: "La responsabilidad puede no terminar con el conductor que iba pasado de copas.",
      lede: "Responsabilidad compleja, incluidos los establecimientos que siguieron sirviendo a un cliente evidentemente intoxicado.",
      body: [
        "Que lo choque un conductor ebrio produce un enojo muy particular, porque el daño no fue simplemente descuidado — fue elegido, una y otra vez, por alguien que tuvo todas las oportunidades de detenerse.",
        "Estos casos tienen una capa que los choques comunes no tienen. Bajo la ley de dram shop de Texas, un bar o establecimiento que siguió sirviéndole a un cliente evidentemente intoxicado puede compartir la responsabilidad por lo que ese cliente hizo después. Eso importa enormemente cuando la póliza del propio conductor ni se acerca a cubrir el daño causado.",
        "Andre Thomas maneja las preguntas complejas de responsabilidad que plantean estos casos — incluidos los reclamos contra los establecimientos que sirvieron de más — como exfiscal que entiende cómo encaja el proceso penal paralelo junto a su reclamo civil.",
      ],
      covers: [
        "Reclamos contra el conductor intoxicado",
        "Reclamos de dram shop contra establecimientos que sirvieron de más",
        "Coordinación con el proceso penal paralelo",
        "Cobertura por conductores sin seguro o con seguro insuficiente",
        "Muerte por negligencia derivada de manejar en estado de ebriedad",
      ],
    },
    {
      key: "construction-accidents",
      slug: "accidentes-de-construccion",
      name: "Accidentes de Construcción",
      group: "work",
      short: "Una de las formas más peligrosas de ganarse la vida en Texas.",
      lede: "La construcción es de las profesiones más peligrosas. Cuando lo lesiona, el papeleo no debería ser su problema.",
      body: [
        "La construcción es de las profesiones más peligrosas del país, y Texas construye más que casi cualquier otro lugar. Caídas, golpes por objetos, derrumbes de zanjas, fallas de grúas y equipo, electrocución — los riesgos son conocidos, están documentados y son prevenibles, que es precisamente por lo que casi siempre hay alguien responsable cuando no se previenen.",
        "Estos casos se complican por la manera en que se contrata al personal de una obra moderna. Contratistas generales, subcontratistas, agencias de personal, arrendadores de equipo y dueños de la propiedad comparten el mismo sitio, y la responsabilidad no siempre recae en la empresa cuyo nombre aparece en su cheque.",
        "Andre Thomas acompaña a los trabajadores lesionados a través del sistema de compensación laboral y presenta acciones por lesiones personales contra las partes responsables — incluidos terceros que un reclamo de compensación laboral por sí solo nunca alcanzará.",
      ],
      covers: [
        "Caídas de altura, fallas de andamios y escaleras",
        "Golpes por objetos y atrapamientos",
        "Derrumbes de zanjas y excavaciones",
        "Fallas de grúas, elevadores y maquinaria pesada",
        "Reclamos contra terceros junto con la compensación laboral",
      ],
    },
    {
      key: "workplace-injuries",
      slug: "lesiones-laborales",
      name: "Lesiones Laborales",
      group: "work",
      short: "Lesionado porque un patrón se ahorró un paso — y ahora enterrado en papeleo.",
      lede: "Cuando la negligencia del patrón lo lesiona, el proceso de reclamo no debería lesionarlo por segunda vez.",
      body: [
        "Texas es un caso raro: aquí los patrones no están obligados a tener seguro de compensación laboral. Ese solo hecho cambia por completo el panorama de una lesión de trabajo, y la mayoría de los trabajadores lesionados no se entera hasta que ya está en medio de una.",
        "Que su patrón sea suscriptor o no suscriptor determina qué puede reclamar, a quién y en qué plazo. Si eso se entiende mal desde el principio, las opciones se van cerrando en silencio.",
        "Andre Thomas apoya a los empleados lesionados por negligencia del patrón — manejando el papeleo, calculando el alcance completo de los daños y negociando el acuerdo — para que recuperarse de la lesión no se convierta en un segundo trabajo de tiempo completo.",
      ],
      covers: [
        "Reclamos contra patrones suscriptores y no suscriptores",
        "Lesiones por esfuerzo repetitivo y enfermedades laborales",
        "Lesiones con maquinaria y equipo",
        "Cálculo de daños y negociación del acuerdo",
        "Represalias tras reportar una lesión",
      ],
    },
    {
      key: "plant-refinery-accidents",
      slug: "accidentes-en-plantas-y-refinerias",
      name: "Accidentes en Plantas y Refinerías",
      group: "work",
      short: "En la Costa del Golfo, una norma de seguridad ignorada se mide en vidas.",
      lede: "Lesiones industriales donde se descuidaron las normas de seguridad.",
      body: [
        "El corredor petroquímico que sale de Houston es uno de los complejos industriales más grandes del planeta, y adentro el margen de error es mínimo. Las explosiones, los incendios repentinos, la exposición química y las liberaciones de presión no producen lesiones menores — producen unidades de quemados, daño respiratorio y funerales.",
        "Las normas de seguridad en estas instalaciones existen porque las consecuencias de ignorarlas se conocen de antemano. Cuando una empresa las descuida de todos modos, eso no es un accidente en ningún sentido significativo de la palabra.",
        "Andre Thomas maneja lesiones industriales en las que se descuidaron las normas de seguridad, incluidos reclamos que involucran a contratistas y terceros que operan dentro de las instalaciones.",
      ],
      covers: [
        "Explosiones, incendios repentinos y quemaduras",
        "Exposición a químicos tóxicos y lesiones por inhalación",
        "Reclamos de contratistas y terceros dentro de las plantas",
        "Violaciones a normas de seguridad y a OSHA",
        "Lesiones catastróficas y muerte por negligencia",
      ],
    },
    {
      key: "maritime-offshore-injuries",
      slug: "lesiones-maritimas-y-costa-afuera",
      name: "Lesiones Marítimas y Costa Afuera",
      group: "work",
      short: "Lesionado en el agua, donde el derecho común de lesiones no aplica.",
      lede: "Derecho marítimo para marineros, trabajadores costa afuera y pasajeros de cruceros.",
      body: [
        "Las lesiones marítimas se rigen por un cuerpo de leyes propio, desarrollado durante siglos y en gran medida desconocido para los abogados que no ejercen en él. La Ley Jones, la doctrina de manutención y curación y la de innavegabilidad crean derechos que ningún reclamo por lesiones en tierra contiene — y plazos que pueden ser más cortos de lo que usted espera.",
        "Ya sea que usted sea marinero bajo la Ley Jones, trabajador portuario o de plataforma cubierto por la Ley de Compensación para Trabajadores Portuarios y Marítimos (LHWCA), o pasajero lesionado a bordo de una embarcación, el marco legal que le aplica determina casi todo sobre su reclamo.",
        "Andre Thomas navega el derecho marítimo en representación de marineros, trabajadores costa afuera y pasajeros de cruceros lesionados en accidentes en el agua.",
      ],
      covers: [
        "Reclamos bajo la Ley Jones para marineros",
        "Manutención y curación",
        "Reclamos por innavegabilidad",
        "Reclamos de trabajadores portuarios y de muelle",
        "Lesiones de pasajeros y en cruceros",
      ],
    },
    {
      key: "railroad-accidents",
      slug: "accidentes-ferroviarios",
      name: "Accidentes Ferroviarios",
      group: "work",
      short: "De los incidentes vehiculares más devastadores que existen.",
      lede: "Determinar la responsabilidad y buscar la recuperación completa después de un incidente ferroviario.",
      body: [
        "Los accidentes ferroviarios están entre los incidentes vehiculares más devastadores que ocurren. Un tren no puede esquivar ni frenar rápido, lo que significa que las consecuencias de una señal de cruce averiada, una visibilidad obstruida o un error humano las absorbe por completo quien esté en el camino.",
        "La responsabilidad en estos casos rara vez es obvia. Las empresas ferroviarias, los contratistas de mantenimiento de cruces, los fabricantes de equipo y las autoridades municipales pueden tener cada uno una parte, y la regulación ferroviaria federal moldea el reclamo de formas que el derecho vehicular común no contempla.",
        "Andre Thomas trabaja para determinar dónde recae realmente la responsabilidad y buscar la recuperación más completa disponible para los lesionados — incluidos los empleados ferroviarios con reclamos bajo FELA.",
      ],
      covers: [
        "Choques en cruces a nivel y fallas de señalización",
        "Incidentes con peatones y personas en la vía",
        "Reclamos bajo FELA para empleados ferroviarios",
        "Fallas de equipo y de mantenimiento",
        "Lesiones catastróficas y muerte por negligencia",
      ],
    },
    {
      key: "premises-liability",
      slug: "responsabilidad-del-propietario",
      name: "Responsabilidad del Propietario",
      group: "property",
      short: "Se lesionó en un lugar que el dueño tenía la obligación de mantener seguro.",
      lede: "Lesiones sufridas en la propiedad de otro porque no se mantuvo como debía.",
      body: [
        "Los dueños de una propiedad tienen un deber de cuidado razonable hacia las personas que invitan a entrar. Un supermercado, un complejo de apartamentos, un estacionamiento, un hotel — de cada uno se espera que encuentre los peligros, los corrija y advierta a la gente mientras tanto.",
        "La defensa en estos casos es casi siempre la misma: que no sabían del peligro, o que era tan evidente que usted debió haberlo evitado. Ambos argumentos se pueden vencer, pero se vencen con pruebas — reportes de incidente, bitácoras de mantenimiento, video de vigilancia — y buena parte de eso se borra de forma rutinaria en cuestión de semanas.",
        "Andre Thomas busca compensación por lesiones sufridas en la propiedad de un tercero debido a un mantenimiento negligente, y actúa rápido para preservar el expediente antes de que desaparezca.",
      ],
      covers: [
        "Lesiones por resbalones, tropiezos y caídas",
        "Seguridad insuficiente y agresiones dentro del inmueble",
        "Caída de mercancía y fallas estructurales",
        "Mala iluminación y peligros sin señalizar",
        "Preservación de videos de vigilancia y registros de mantenimiento",
      ],
    },
    {
      key: "product-defects",
      slug: "productos-defectuosos",
      name: "Productos Defectuosos",
      group: "property",
      short: "El producto era irrazonablemente peligroso y aun así llegó a sus manos.",
      lede: "Enfrentar a los fabricantes que ponen en circulación productos irrazonablemente peligrosos o defectuosos.",
      body: [
        "Usted tiene derecho a suponer que lo que compra no va a lesionarlo cuando se usa como debe usarse. Cuando un producto está mal diseñado, mal fabricado o se vende sin las advertencias que necesitaba, esa suposición se convierte en una lesión grave.",
        "Los casos de productos pueden alcanzar toda la cadena — fabricante, distribuidor, vendedor — y con frecuencia exigen conservar el producto mismo. Si algo que compró lo lesionó, no lo tire, no lo repare y no lo devuelva antes de hablar con un abogado. Ese producto es la prueba.",
        "Andre Thomas enfrenta a los fabricantes que ponen productos irrazonablemente peligrosos o defectuosos en manos de los consumidores.",
      ],
      covers: [
        "Defectos de diseño y de fabricación",
        "Falta de advertencias e instrucciones insuficientes",
        "Defectos automotrices y de llantas",
        "Maquinaria y herramientas defectuosas",
        "Conservación del producto como prueba",
      ],
    },
    {
      key: "dog-bites",
      slug: "mordeduras-de-perro",
      name: "Mordeduras de Perro",
      group: "property",
      short: "Las consecuencias van mucho más allá de la herida.",
      lede: "Consecuencias físicas, emocionales y económicas de largo alcance — en Texas y en Tennessee.",
      body: [
        "El ataque de un perro es traumático de una manera que el expediente médico no alcanza a registrar. Las lesiones físicas pueden ser graves — sobre todo en los niños, mordidos en la cara y el cuello con mucha más frecuencia que los adultos — y lo que sigue puede incluir cirugía reconstructiva, cicatrices permanentes y un miedo que no se desvanece al mismo ritmo que la herida.",
        "Texas y Tennessee tratan la responsabilidad del dueño de manera distinta, y las reglas sobre lo que el dueño sabía del historial de su animal pueden decidir un caso. Tener licencia en ambos estados significa que estos casos no tienen que referirse a otro despacho cuando cruzan una línea en el mapa.",
        "Andre Thomas guía a las víctimas de mordeduras por las complejidades legales de ambas jurisdicciones, atendiendo consecuencias físicas, emocionales y económicas que son genuinamente de largo alcance.",
      ],
      covers: [
        "Responsabilidad del dueño en Texas y en Tennessee",
        "Lesiones a menores de edad",
        "Cicatrices, desfiguración y cirugía reconstructiva",
        "Trauma emocional y daño psicológico",
        "Reclamos al seguro del propietario o del inquilino",
      ],
    },
    {
      key: "drowning-accidents",
      slug: "ahogamientos",
      name: "Ahogamientos",
      group: "property",
      short: "El dueño de la alberca tenía un deber. No lo cumplió.",
      lede: "Lesiones relacionadas con albercas donde los dueños fallaron en sus obligaciones de seguridad.",
      body: [
        "El ahogamiento es la principal causa de muerte accidental en niños pequeños en este país, y casi siempre es prevenible. Los dueños de albercas — casas particulares, complejos de apartamentos, hoteles y municipios por igual — tienen obligaciones reales: barreras que funcionen, portones con cierre automático, cubiertas de drenaje en buen estado, supervisión suficiente y advertencias claras.",
        "Los ahogamientos no mortales merecen la misma seriedad. La falta de oxígeno puede causar daño cerebral permanente que requiere cuidados de por vida, y el valor de un reclamo así tiene que contemplar décadas, no meses.",
        "Andre Thomas busca compensación cuando condiciones negligentes o advertencias insuficientes provocaron un ahogamiento, en representación de los lesionados y de las familias que perdieron a alguien.",
      ],
      covers: [
        "Cercas, portones y barreras insuficientes",
        "Supervisión ausente o inadecuada",
        "Drenajes y equipo de alberca defectuosos",
        "Reclamos en albercas de apartamentos, hoteles y públicas",
        "Daño cerebral por ahogamiento no mortal; muerte por negligencia",
      ],
    },
    {
      key: "insurance-claims",
      slug: "reclamos-de-seguro",
      name: "Reclamos de Seguro",
      group: "aftermath",
      short: "Los intereses de su aseguradora y los suyos no son los mismos. Nunca lo fueron.",
      lede: "Las compañías de seguros tienen un interés directo en minimizar lo que les pagan a los reclamantes.",
      body: [
        "Las compañías de seguros tienen un interés directo en minimizar lo que les pagan a los reclamantes. Esto no es cinismo — es el modelo de negocio, y es perfectamente legal hasta el punto en que deja de serlo.",
        "Las tácticas son constantes y reconocibles: la oferta baja y rápida antes de que se conozca el alcance real de la lesión, la declaración grabada usada para fabricar contradicciones, la demora que agota su paciencia, la negación que da por hecho que usted no va a insistir. La ley de Texas impone obligaciones reales a las aseguradoras en cuanto a manejo oportuno y buena fe, y esas obligaciones tienen dientes cuando se hacen valer.",
        "Andre Thomas contrarresta esas tácticas y obliga a las aseguradoras a responder por la cobertura que realmente se compró — incluidos los reclamos contra su propia aseguradora cuando es ella la que se niega a pagar.",
      ],
      covers: [
        "Reclamos negados y mal pagados",
        "Mala fe y demoras en el manejo del reclamo",
        "Reclamos por conductores sin seguro o con seguro insuficiente",
        "Disputas por daños a la propiedad y daños por tormenta",
        "Manejo de ajustadores y declaraciones grabadas por usted",
      ],
    },
    {
      key: "serious-injury-wrongful-death",
      slug: "lesiones-graves-y-muerte-por-negligencia",
      name: "Lesiones Graves y Muerte por Negligencia",
      group: "aftermath",
      short: "Para las lesiones catastróficas, y para las familias que quedan.",
      lede: "Apoyo para los lesionados de gravedad y para las familias que presentan reclamos por muerte por negligencia.",
      body: [
        "Hay casos que no se tratan de volver a la normalidad, porque no hay regreso. Lesión de médula espinal, daño cerebral traumático, amputación, quemaduras graves — eso reorganiza una vida de forma permanente, y un reclamo que solo cuenta las facturas de hoy le falla a la persona que debía proteger. Tiene que contemplar toda una vida de cuidados, de ingresos perdidos, de un futuro que no se parece en nada al que estaba planeado.",
        "Los casos de muerte por negligencia piden algo todavía más difícil: traducir a una persona irremplazable en un reclamo legal, en el peor momento que una familia va a vivir. La ley de Texas reconoce reclamos para el cónyuge, los hijos y los padres sobrevivientes, y por separado una acción de supervivencia en representación de la sucesión. Ambos tienen plazos que corren mientras la familia todavía está de luto.",
        "Andre Thomas representa a los lesionados de gravedad y a las familias sobrevivientes que presentan reclamos por muerte por negligencia — con la seriedad que estos casos exigen y la paciencia que las personas en ellos merecen.",
      ],
      covers: [
        "Daño cerebral traumático y lesión de médula espinal",
        "Amputación, quemaduras graves y discapacidad permanente",
        "Planificación de cuidados de por vida y daños futuros",
        "Reclamos por muerte por negligencia para cónyuges, hijos y padres",
        "Acciones de supervivencia en representación de la sucesión",
      ],
    },
  ],

  featuredAlts: {
    "car-accidents": "Un auto destrozado acordonado en una calle de noche",
    "truck-accidents": "Llantas de tráiler levantando agua en una autopista mojada",
    "workplace-injuries": "Un trabajador de la construcción sobre varillas de acero, encima de la obra",
    "premises-liability": "Un letrero de precaución de piso mojado en el pasillo de un supermercado",
    "maritime-offshore-injuries": "Una plataforma petrolera costa afuera en mar agitado",
    "serious-injury-wrongful-death": "Un pasillo de hospital vacío",
  },

  /**
   * ⚠ CONTENIDO DE MARCADOR DE POSICIÓN — vea el aviso al inicio de
   * `lib/team.ts`. Solo la entrada de Andre Thomas es factual. Maria
   * Hernandez-Castillo es una persona real con biografía provisional; las
   * cinco personas restantes no existen.
   */
  team: [
    {
      id: "andre-thomas",
      role: "Abogado Fundador",
      credential: "Con licencia en Texas y Tennessee",
      preview:
        "Exfiscal del Condado de Shelby que hoy representa a los lesionados. Dos licencias estatales, juicios de alto perfil llevados hasta el veredicto, y una práctica construida sobre ser el abogado con quien usted realmente habla.",
      bio: andreParrafos,
      highlights: [
        { label: "Licencias", value: "Texas y Tennessee" },
        {
          label: "Derecho",
          value: "Facultad de Derecho Thurgood Marshall, Texas Southern University",
        },
        { label: "Licenciatura", value: "Universidad de Memphis" },
        {
          label: "Antes",
          value:
            "Fiscal Auxiliar de Distrito, Condado de Shelby, TN — y abogado del Departamento de Seguridad y Seguridad Nacional de Tennessee",
        },
        {
          label: "Juicios destacados",
          value:
            "State of Tennessee v. Billy Ray Turner · State of Tennessee v. Tedarrius Bean",
        },
      ],
      focus: [
        "Lesiones personales y lesiones catastróficas",
        "Muerte por negligencia",
        "Defensa penal por delitos graves y menores",
        "Juicios ante jurado en Texas y Tennessee",
      ],
      alt: "Andre Thomas, abogado fundador, en las escalinatas del tribunal",
    },
    {
      id: "rachel-kim",
      role: "Abogada Asociada",
      credential: "Con licencia en Texas · Accidentes de camiones y vehículos comerciales",
      preview:
        "Pasó cuatro años defendiendo a empresas de transporte antes de cambiar de lado. Conoce las bitácoras, los datos del ECM y los plazos que una empresa de camiones espera en silencio que usted deje pasar.",
      bio: [
        "Rachel Kim representa a personas lesionadas por vehículos comerciales: tráileres, flotas de reparto y las empresas que los ponen en las carreteras de Texas. Llegó a la firma desde el lado de la defensa, donde pasó cuatro años manejando reclamos de pérdida catastrófica para transportistas y sus aseguradoras.",
        "Esa trayectoria cambia la forma en que se construye un caso. Envía la carta de preservación de pruebas en días, no en semanas, porque sabe con exactitud qué tan rápido desaparecen los datos del módulo de control electrónico, las grabaciones de cámara y las bitácoras del conductor. Lee el expediente de seguridad de un transportista igual que lo leen sus propios gerentes de riesgo.",
        "Rachel obtuvo su J.D. en el University of Houston Law Center, donde fue editora del Houston Law Review y compitió en el equipo nacional de litigación. Está admitida en Texas y ante el Tribunal de Distrito de los EE. UU. para el Distrito Sur de Texas.",
      ],
      highlights: [
        {
          label: "Licencias",
          value: "Texas · Tribunal de Distrito de EE. UU., Distrito Sur de Texas",
        },
        { label: "Derecho", value: "University of Houston Law Center, J.D." },
        {
          label: "Distinciones",
          value: "Houston Law Review, editora · Equipo Nacional de Litigación",
        },
        {
          label: "Antes",
          value: "Asociada, defensa de transporte comercial",
        },
        { label: "Reconocimiento", value: "Texas Rising Stars, Super Lawyers" },
      ],
      focus: [
        "Choques con tráileres y camiones de 18 ruedas",
        "Accidentes con flotas comerciales y de reparto",
        "Violaciones federales de seguridad de transportistas",
        "Reclamos por conductores sin seguro o con seguro insuficiente",
      ],
      alt: "Rachel Kim, abogada asociada",
    },
    {
      id: "michael-sorensen",
      role: "Abogado Asociado",
      credential: "Con licencia en Texas · Responsabilidad de locales y disputas con aseguradoras",
      preview:
        "Nueve años ajustando reclamos antes de litigar el primero. Michael lee una póliza como la lee la aseguradora, y luego argumenta las partes que esperaban que nadie encontrara.",
      bio: [
        "Michael Sorensen maneja casos de responsabilidad de locales y las peleas con aseguradoras que siguen a una lesión grave: las negativas, las ofertas bajas y las demoras que llegan disfrazadas de trámite.",
        "Antes de estudiar derecho pasó nueve años como ajustador de reclamos para dos aseguradoras nacionales, evaluando los mismos expedientes que hoy litiga. Sabe en cuánto se fija una reserva, cuánto está realmente autorizado a pagar un ajustador, y qué tiene que llegar a su escritorio para que esa cifra se mueva.",
        "Obtuvo su J.D. en South Texas College of Law Houston, graduándose en el quince por ciento superior de su generación, y desde entonces ha llevado casos hasta el veredicto en los condados de Harris, Fort Bend y Montgomery.",
      ],
      highlights: [
        { label: "Licencias", value: "Texas" },
        {
          label: "Derecho",
          value: "South Texas College of Law Houston, J.D., 15% superior",
        },
        {
          label: "Antes",
          value:
            "Ajustador sénior de reclamos, aseguradoras nacionales de daños y responsabilidad — nueve años",
        },
        {
          label: "Experiencia en juicio",
          value: "Veredictos de jurado en los condados de Harris, Fort Bend y Montgomery",
        },
        {
          label: "Miembro",
          value: "Texas Trial Lawyers Association · Houston Bar Association",
        },
      ],
      focus: [
        "Resbalones, tropiezos y caídas",
        "Seguridad negligente y mantenimiento inadecuado",
        "Mala fe de la aseguradora y reclamos demorados",
        "Disputas de cobertura y de límites de póliza",
      ],
      alt: "Michael Sorensen, abogado asociado",
    },
    {
      id: "nadia-haddad",
      role: "Abogada Consultora (Of Counsel)",
      credential: "Con licencia en Texas y Luisiana · Lesiones marítimas y costa afuera",
      preview:
        "Doce años de trabajo bajo la Jones Act y en plataformas costa afuera en el Golfo. Toma los casos que dependen de cuál ley aplica, y resuelve esa pregunta al inicio, no en la víspera del juicio.",
      bio: [
        "Nadia Haddad colabora con la firma en asuntos marítimos y costa afuera: reclamos de marinos bajo la Jones Act, casos bajo la Ley de Compensación para Trabajadores Portuarios y Marítimos (LHWCA), y lesiones en plataformas, equipos autoelevables y buques de suministro en todo el Golfo de México.",
        "Los casos marítimos se ganan y se pierden en las preguntas de umbral: si un trabajador lesionado califica como marino, a qué embarcación estaba asignado, si rige el derecho marítimo general o una ley estatal. Nadia lleva doce años en esas preguntas, y las plantea desde el principio, cuando la respuesta todavía puede darle forma al caso.",
        "Obtuvo su J.D. en Tulane University Law School con un certificado en Derecho Marítimo, y está admitida tanto en Texas como en Luisiana. Ejerce en inglés y en árabe.",
      ],
      highlights: [
        { label: "Licencias", value: "Texas · Luisiana" },
        {
          label: "Derecho",
          value: "Tulane University Law School, J.D., Certificado en Derecho Marítimo",
        },
        {
          label: "Experiencia",
          value: "Doce años en litigios bajo la Jones Act y por lesiones costa afuera",
        },
        { label: "Idiomas", value: "Inglés y árabe" },
        {
          label: "Miembro",
          value: "Maritime Law Association of the United States",
        },
      ],
      focus: [
        "Reclamos de marinos bajo la Jones Act",
        "Ley de Compensación para Trabajadores Portuarios y Marítimos (LHWCA)",
        "Accidentes en plataformas y equipos de perforación costa afuera",
        "Innavegabilidad, y manutención y curación",
      ],
      alt: "Nadia Haddad, abogada consultora",
    },
    {
      id: "maria-hernandez-castillo",
      role: "Asistente Legal Sénior",
      credential: "Bilingüe — inglés y español",
      preview:
        "La asistente legal sénior de la firma y, para la mayoría de los clientes, la persona con quien más hablan. Mantiene el expediente completo y el caso avanzando mientras se construye.",
      bio: [
        "Maria Hernandez-Castillo es la asistente legal sénior de Andre Thomas Law, PLLC. Maneja los expedientes desde la admisión hasta la resolución: reúne expedientes médicos y facturación, da seguimiento al tratamiento, arma los paquetes de reclamación y mantiene el registro documental lo bastante completo como para que nada tenga que reconstruirse después, contra reloj.",
        "Para la mayoría de los clientes, Maria es la persona al otro lado del teléfono. Trabaja en inglés y en español.",
      ],
      highlights: [
        { label: "Cargo", value: "Asistente Legal Sénior" },
        { label: "Idiomas", value: "Inglés y español" },
      ],
      focus: [
        "Recopilación de expedientes médicos y facturación",
        "Comunicación con el cliente y estado del caso",
        "Preparación del paquete de reclamación",
        "Apoyo en litigio y descubrimiento de pruebas",
      ],
      alt: "Maria Hernandez-Castillo, asistente legal sénior",
    },
    {
      id: "amara-whitfield",
      role: "Coordinadora de Casos",
      credential: "Asistente Legal Certificada (NALA) · Bilingüe — inglés y español",
      preview:
        "La persona que le devuelve la llamada. Amara maneja la coordinación del tratamiento y la negociación de gravámenes para que los clientes no se queden adivinando en qué va su caso.",
      bio: [
        "Amara Whitfield maneja el lado del cliente en cada expediente. Coordina el tratamiento médico, da seguimiento a las citas y a las interrupciones en la atención, negocia los gravámenes de hospitales y aseguradoras de salud, y se asegura de que los clientes sepan qué está pasando con su caso sin tener que preguntar dos veces.",
        "Las interrupciones en el tratamiento son de lo primero que busca un ajustador de la defensa, y la negociación de gravámenes suele ser la diferencia entre la cifra del acuerdo y lo que el cliente realmente recibe. Amara trabaja ambas cosas, desde la primera semana del caso hasta la última.",
        "Tiene la credencial de Asistente Legal Certificada (CP) de NALA y ha pasado ocho años en la práctica de lesiones personales, los últimos cuatro dedicados por completo a la gestión de casos y la resolución de gravámenes. Trabaja en inglés y en español.",
      ],
      highlights: [
        { label: "Credencial", value: "Asistente Legal Certificada (CP), NALA" },
        { label: "Experiencia", value: "Ocho años en la práctica de lesiones personales" },
        {
          label: "Enfoque",
          value: "Resolución de gravámenes y coordinación de tratamiento médico",
        },
        { label: "Idiomas", value: "Inglés y español" },
      ],
      focus: [
        "Coordinación del tratamiento médico",
        "Negociación de gravámenes hospitalarios y de seguros de salud",
        "Actualizaciones al cliente y estado del caso",
        "Apoyo en el desembolso del acuerdo",
      ],
      alt: "Amara Whitfield, coordinadora de casos",
    },
    {
      id: "tyler-nguyen",
      role: "Coordinador de Admisión",
      credential: "Trilingüe — inglés, vietnamita y español",
      preview:
        "La primera persona con quien usted habla. Tyler toma la llamada, deja los hechos por escrito mientras están frescos y se asegura de que los plazos importantes queden en el calendario desde el primer día.",
      bio: [
        "Tyler Nguyen maneja la admisión: la primera conversación después de un choque o una lesión, que normalmente ocurre mientras el cliente todavía está entendiendo qué acaba de pasarle.",
        "Toma la declaración mientras los detalles están frescos, identifica los plazos que empiezan a correr de inmediato y pone el expediente frente a un abogado el mismo día. Los requisitos de notificación contra una entidad gubernamental en Texas son los que más sorprenden a la gente; algunos son de apenas seis meses, y no perdonan un comienzo tardío.",
        "Tyler trabaja en inglés, vietnamita y español, y por eso quien no se siente cómodo en inglés no tiene que esperar a que le devuelvan la llamada.",
      ],
      highlights: [
        { label: "Cargo", value: "Coordinador de Admisión" },
        { label: "Idiomas", value: "Inglés, vietnamita y español" },
        { label: "Disponibilidad", value: "Revisión de un abogado el mismo día en cada admisión" },
      ],
      focus: [
        "Admisión de nuevos clientes y declaraciones",
        "Revisión de plazos y períodos de notificación",
        "Preservación de pruebas en la primera semana",
        "Referencias y clasificación de casos",
      ],
      alt: "Tyler Nguyen, coordinador de admisión",
    },
  ],

  // Reproduced exactly as published on Google, in the language the client wrote.
  reviews: [
    {
      quote: "Was in an accident and the lawyer was fair",
      author: "FalconSenpai89",
      date: "14 de julio de 2026",
      truncated: false,
    },
    {
      quote: "Great Lawfirm got my business handled quickly as possible an…",
      author: "Daylon Henry",
      date: "6 de julio de 2026",
      truncated: true,
    },
    {
      quote: "Great experience! Everything was very quick and efficient did…",
      author: "Vampy Miau",
      date: "25 de junio de 2026",
      truncated: true,
    },
  ],

  process: [
    {
      n: "01",
      title: "La consulta",
      body: "Usted nos cuenta qué pasó. Andre le dice con honestidad si tiene un caso que valga la pena. No cuesta nada y no lo compromete a nada.",
    },
    {
      n: "02",
      title: "La investigación",
      body: "Se preserva la evidencia antes de que desaparezca — reportes, videos, expedientes, testigos. La aseguradora empieza a trabajar en el momento en que ocurre el incidente; usted también debería.",
    },
    {
      n: "03",
      title: "La reclamación",
      body: "Una vez que está claro el panorama completo de sus lesiones y sus pérdidas, el reclamo se presenta a las partes responsables y a sus aseguradoras, y comienza la negociación.",
    },
    {
      n: "04",
      title: "Juicio, si eso es lo que hace falta",
      body: "La mayoría de los casos se resuelven sin llegar a un tribunal. Pero un caso vale lo que la otra parte cree que usted está dispuesto a litigar — y esa convicción hay que ganársela.",
    },
  ],

  nav: [
    { key: "home", label: "Inicio" },
    { key: "practiceAreas", label: "Áreas de Práctica" },
    { key: "about", label: "El Abogado" },
    { key: "reviews", label: "Reseñas" },
    { key: "contact", label: "Contacto" },
  ],

  ui: {
    skipToContent: "Ir al contenido",
    freeConsultation: "Consulta Gratis",
    callPhone: "Llame al",
    sendMessage: "Enviar un mensaje",
    learnMore: "Ver más",
    viewAll: "Ver todas",
    homeAria: "inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    instagram: "Instagram",
    switchLangLabel: "English",
    switchLangAria: "View this site in English",

    banner: {
      question: "Would you rather read this site in English?",
      action: "View in English",
      dismiss: "Cerrar",
    },

    preloader: { place: "Houston, Texas", est: "Texas y Tennessee" },

    hero: {
      place: "Houston, Texas",
      licensed: "Con licencia en Texas y Tennessee",
      titleLines: ["Damos fuerza", "a su voz,"],
      ensuring: "garantizamos",
      lede: "Un exfiscal que hoy representa a los lesionados. Si la negligencia de otra persona le cambió la vida, usted merece un abogado que ha argumentado ante un jurado — y una respuesta honesta sobre en qué posición está.",
      reviewsSuffix: "reseñas en Google",
      twoBars: "Dos colegios de abogados",
      formerProsecutor: "Exfiscal del Condado de Shelby",
    },

    why: {
      eyebrow: "Un defensor compasivo de la justicia",
      titleLines: ["Por qué Andre Thomas", "Law, PLLC."],
    },

    featured: {
      eyebrow: "Lo que manejamos",
      titleLines: ["Dieciséis maneras en que", "una vida se interrumpe."],
      all: "Las dieciséis",
      alsoHandled: "También manejamos",
      explore: "Explorar áreas de práctica",
    },

    aboutPreview: {
      eyebrow: "El abogado",
      notableTrials: "Juicios destacados",
      readFull: "Leer la trayectoria completa",
      role: "Abogado Fundador",
      portraitAlt: "en las escalinatas del juzgado",
    },

    reviewsBand: {
      eyebrow: "En sus propias palabras",
      googleReviews: "reseñas en Google",
      readAll: "Léalas todas en Google",
      readFull: "Leer la reseña completa",
      footnote:
        "Las reseñas se muestran tal como fueron publicadas en Google. Los resultados anteriores no garantizan un resultado similar.",
    },

    cta: {
      eyebrow: "Hable con Andre",
      titleA: "La consulta es gratis.",
      titleB: "Saber en qué posición está, también.",
      body: "Cuéntenos qué pasó. Va a recibir una respuesta directa sobre si tiene un caso que valga la pena — sin obligación, sin presión y sin costo.",
      call: "Llame",
      email: "Correo",
      office: "Oficina",
    },

    form: {
      name: "Nombre *",
      phone: "Teléfono *",
      email: "Correo electrónico *",
      matter: "¿Qué pasó?",
      matterPlaceholder: "Seleccione un área de práctica (opcional)",
      criminalDefense: "Defensa Criminal",
      somethingElse: "Otro asunto",
      message: "Cuéntenos brevemente qué pasó (opcional)",
      sending: "Enviando…",
      submit: "Enviar Mensaje",
      footnote:
        "Consulta gratis. Enviar este formulario no crea una relación abogado–cliente.",
      doneTitle: "Mensaje recibido.",
      doneBody: [
        "Alguien del despacho se comunicará con usted en breve. Si es urgente, llamar al",
        "siempre es más rápido.",
      ],
      checkDetails: "Por favor revise sus datos.",
      couldNotSend: "No se pudo enviar. Por favor llame al",
      errName: "Por favor escriba su nombre.",
      errPhone: "Por favor escriba un número de teléfono válido.",
      errEmail: "Por favor escriba un correo electrónico válido.",
      errLong: "Ese mensaje es demasiado largo.",
      errServer: "Algo salió mal. Por favor llámenos.",
    },

    footer: {
      cta: "Comience su consulta gratis",
      navigate: "Navegar",
      practiceAreas: "Áreas de Práctica",
      office: "Oficina",
      fax: "Fax",
      legal:
        "La información de este sitio web se ofrece únicamente con fines informativos generales y no constituye asesoría legal. Ver este sitio, comunicarse con el despacho o enviar información a través de este sitio web no crea una relación abogado–cliente. No envíe información confidencial hasta que se haya establecido por escrito una relación abogado–cliente. Los resultados anteriores no garantizan un resultado similar.",
      rights: "Todos los derechos reservados.",
      disclaimer: "Aviso Legal",
      privacy: "Privacidad",
      poweredBy: "Sitio por",
    },

    area: {
      crumb: "Todas las áreas de práctica",
      covers: "Qué incluye",
      consultTitle: "Sepa en qué posición está.",
      consultBody: "No cuesta nada y no lo compromete a nada.",
      licensedNote: "Con licencia en Texas y Tennessee.",
      others: "Otras áreas de práctica",
      alsoUnder: "También en",
      fallbackEyebrow: "Área de práctica",
      representation: "Representación",
    },

    notFound: {
      eyebrow: "Error 404",
      title: "Esta página no está aquí.",
      body: "Puede que el enlace se haya movido o que nunca haya existido. Las áreas de práctica son un buen lugar para retomar el hilo — o simplemente llame.",
      cta: "Áreas de práctica",
    },

    chat: {
      greeting:
        "Hola — soy el asistente de Andre Thomas Law. Puedo contarle sobre el despacho, nuestras áreas de práctica, la oficina y cómo obtener una consulta gratis.",
      title: "Asistente del Despacho",
      status: "Automatizado · responde al instante",
      open: "Abrir el asistente de chat",
      close: "Cerrar el chat",
      nudge: "¿Tiene preguntas sobre su situación?",
      nudgeCta: "Pregunte aquí →",
      placeholder: "Pregunte sobre el despacho…",
      inputAria: "Escriba su pregunta",
      sendAria: "Enviar",
      dialogAria: "Asistente del despacho",
      confidential: "No comparta datos confidenciales.",
      unreachable: "No pude conectarme al servidor en este momento. Siempre puede llamar al",
      nudgeDismiss: "Cerrar",
    },
  },

  pages: {
    home: {
      title: `${firm.name} — Abogado de Lesiones Personales en Houston`,
      description:
        "Abogado de lesiones personales en Houston, Andre Thomas. Con licencia en Texas y Tennessee, exfiscal, con experiencia en juicios. Consulta gratis — 713-212-3003.",
    },

    about: {
      title: "El Abogado Andre Thomas — Houston, con Licencia en TX y TN",
      description:
        "Andre Thomas tiene licencia en Texas y Tennessee. Exfiscal del Condado de Shelby, egresado de la Facultad de Derecho Thurgood Marshall y abogado litigante que representa a los lesionados.",
      eyebrow: "El abogado",
      titleLines: ["Conozca a Andre Thomas:", "comprometido con la justicia."],
      lede: "Con licencia en dos estados. Una carrera que empezó construyendo casos como fiscal y que hoy se dedica a desarmarlos en favor de las personas contra quienes fueron construidos.",
      skylineAlt: "El horizonte del centro de Houston al atardecer",
      portraitAlt: "abogado en",
      barAdmissions: "Colegios de abogados",
      education: "Formación",
      pathEyebrow: "El camino hasta aquí",
      pathTitle: "Los dos lados del tribunal.",
      trialsEyebrow: "Juicios destacados",
      trialsTitle: "Casos de alto perfil, argumentados en audiencia pública.",
      trialsNote:
        "Los casos mencionados corresponden a juicios en los que participó Andre Thomas. Los resultados anteriores no garantizan ni predicen un resultado similar en ningún caso futuro.",
      meansEyebrow: "Qué significa eso para usted",
      seePracticeAreas: "Ver las áreas de práctica",
      bridgeAlt: "El puente Hernando de Soto sobre el río Misisipi en Memphis",
    },

    practiceAreas: {
      title: "Áreas de Práctica — Abogado de Lesiones Personales en Houston",
      description:
        "Accidentes de auto y de camión, lesiones laborales e industriales, marítimas y costa afuera, responsabilidad del propietario, productos defectuosos, disputas de seguros, muerte por negligencia y más. Consulta gratis.",
      eyebrow: "Áreas de práctica",
      titleLines: ["Dieciséis maneras", "en que una vida se interrumpe."],
      lede: "Todas empiezan igual — alguien más fue descuidado y usted es quien carga con las consecuencias. Encuentre la suya abajo, o llame y cuéntenos qué pasó.",
      heroAlt: "Un auto destrozado a la orilla de la carretera entre la niebla de la mañana",
      alsoHandled: "También manejamos",
      criminalTitle: "Defensa criminal — delitos graves y menores.",
      criminalBody:
        "Junto con la práctica de lesiones personales, Andre defiende a clientes acusados de delitos graves y menores. Habiendo ejercido como fiscal en la Oficina del Fiscal de Distrito del Condado de Shelby, ha trabajado estos casos desde ambos lados.",
      criminalCta: "Hablemos de su caso",
      listName: "Áreas de Práctica",
    },

    reviews: {
      title: "Reseñas de Clientes — 4.9 Estrellas en 60 Reseñas de Google",
      description: `Lea lo que dicen los clientes de ${firm.name}. Calificación de ${firm.reviews.rating} estrellas en ${firm.reviews.count} reseñas de Google.`,
      eyebrow: "Reseñas de clientes",
      titleLines: ["Cómo se siente", "estar bien representado."],
      lede: "Se publican exactamente como las escribieron los clientes.",
      whyEyebrow: "Por qué los clientes se quedan",
      whyTitle: "Diligencia, determinación y empatía.",
      whyBody:
        "La práctica del despacho está construida sobre valores centrados en el cliente — priorizando las necesidades y preocupaciones de cada persona en lugar de pasarla por un proceso.",
      readOnGoogle: "Leer todas las reseñas en Google",
    },

    contact: {
      title: "Contacto — Consulta Gratis con Andre Thomas Law",
      description: `Llame al ${firm.phone} o envíe un mensaje. Consulta gratis.`,
      eyebrow: "Contacto",
      titleLines: ["Cuéntenos", "qué pasó."],
      lede: "La consulta es gratis, y saber en qué posición está también. Llene el formulario o llame directamente — de cualquier forma, hablará con el despacho.",
      heroAlt: "Una mujer sentada sola, con gesto de preocupación",
      requestEyebrow: "Solicite una consulta",
      officeEyebrow: "La oficina",
      phone: "Teléfono",
      email: "Correo",
      address: "Dirección",
      hours: "Horario",
      licensedIn: "Con licencia en",
      mapTitle: "Mapa hacia",
      nextEyebrow: "Después de comunicarse",
      nextTitle: "Nadie debería tener que adivinar qué sigue.",
      formNote:
        "Enviar este formulario no crea una relación abogado–cliente, y la información que envíe no está protegida por el secreto profesional hasta que dicha relación se establezca por escrito. Por favor no envíe información confidencial ni urgente a través de este formulario.",
    },

    team: {
      title: "Nuestro Equipo",
      description: `Los abogados y el personal de ${firm.name} — lesiones personales y defensa penal en Houston, Texas. Consulta gratuita, ${firm.phone}.`,
      eyebrow: "Las Personas",
      titleLines: ["Quiénes llevan", "su caso"],
      lede: "Un caso no lo lleva un logotipo. Lo lleva el abogado que lo litiga, la asistente legal que arma el expediente y la persona que contesta cuando usted llama. Aquí están.",
      heroAlt: "Abogados y personal de la firma de pie juntos en la oficina",
      attorneysEyebrow: "Abogados",
      attorneysTitle: "Quiénes argumentan su caso",
      staffEyebrow: "Asistentes Legales y Personal",
      staffTitle: "Quiénes lo construyen",
      readBio: "Biografía completa",
      draftNotice:
        "Página en borrador — no para publicación. Solo la biografía de Andre Thomas está verificada. Todos los demás perfiles son contenido de marcador de posición para revisar el diseño y deben reemplazarse por personas reales antes de publicar esta página.",
      member: {
        crumb: "Nuestro Equipo",
        highlightsEyebrow: "Credenciales",
        focusEyebrow: "Qué maneja",
        bioEyebrow: "Trayectoria",
        contactEyebrow: "Siguiente paso",
        contactTitle: "Tráiganos el caso.",
        contactBody: `La consulta es gratuita, y hablará con alguien de la firma y no con un centro de llamadas. Llame al ${firm.phone} o envíe un mensaje y le respondemos el mismo día.`,
        othersEyebrow: "También en la firma",
        othersTitle: "El resto del equipo",
        seeAll: "Ver todo el equipo",
      },
    },

    privacy: {
      title: "Aviso de Privacidad",
      description: `Aviso de privacidad de ${firm.name}.`,
      eyebrow: "Legal",
      heading: "Aviso de Privacidad",
      sections: [
        {
          h: "Qué recopilamos",
          p: [
            "Cuando usted envía el formulario de contacto, recopilamos el nombre, el número de teléfono y el correo electrónico que proporciona, junto con el área de práctica que seleccione y el mensaje que decida incluir. No recopilamos nada más a través de ese formulario.",
            "El asistente de chat procesa los mensajes que usted escribe para poder responderlos. Por favor no ingrese información personal, confidencial ni delicada sobre su caso en el chat.",
          ],
        },
        {
          h: "Cómo la usamos",
          p: [
            "La información que usted envía se usa únicamente para responder a su consulta y, cuando corresponda, para evaluar y atender su asunto legal. No vendemos su información ni la compartimos con terceros con fines de mercadotecnia.",
          ],
        },
        {
          h: "Confidencialidad",
          p: [
            "La información enviada a través de este sitio web no está protegida por el secreto profesional abogado–cliente hasta que se haya establecido por escrito una relación abogado–cliente. Por favor no envíe información confidencial antes de ese momento.",
          ],
        },
        {
          h: "Cookies y analítica",
          p: [
            "Este sitio puede usar cookies y tecnologías similares para analizar el tráfico y mejorar la experiencia de navegación. Usted puede desactivar las cookies desde la configuración de su navegador; si lo hace, algunas partes del sitio podrían no funcionar como se espera.",
          ],
        },
        {
          h: "Servicios de terceros",
          p: [
            "Algunas páginas de este sitio pueden incluir contenido de terceros, como el marco de Google Maps en la página de contacto. Esos proveedores operan bajo sus propias políticas de privacidad, que nosotros no controlamos.",
          ],
        },
        {
          h: "Sus opciones",
          p: [
            `Usted puede solicitar que corrijamos o eliminemos la información que ha enviado. Escriba a ${firm.email} o llame al ${firm.phone}. También puede enviar correspondencia a ${fullAddress}.`,
          ],
        },
        {
          h: "Versión que rige",
          p: [
            "Esta traducción se ofrece para su comodidad. En caso de cualquier discrepancia, rige la versión en inglés de este aviso.",
          ],
        },
      ],
    },

    disclaimer: {
      title: "Aviso Legal",
      description: `Aviso legal de ${firm.name}.`,
      eyebrow: "Legal",
      heading: "Aviso Legal",
      sections: [
        {
          h: "No es asesoría legal",
          p: [
            "El contenido de este sitio web se ofrece únicamente con fines informativos generales y no constituye asesoría legal. Cada asunto legal depende de sus propios hechos particulares, y nada de lo que lea aquí debe tomarse como sustituto de la asesoría de un abogado con licencia sobre su situación específica.",
          ],
        },
        {
          h: "No se crea una relación abogado–cliente",
          p: [
            "Ver este sitio web, enviar el formulario de contacto, usar el asistente de chat o enviarle un correo al despacho no crea una relación abogado–cliente. Dicha relación se establece únicamente cuando el despacho y el cliente firman un acuerdo por escrito.",
            "Como no existe relación hasta ese momento, la información transmitida a través de este sitio web no está protegida por el secreto profesional abogado–cliente. Por favor no envíe información confidencial ni delicada hasta que se haya establecido por escrito una relación abogado–cliente.",
          ],
        },
        {
          h: "El asistente de chat",
          p: [
            "Este sitio web incluye un asistente automatizado. No es un abogado, no da asesoría legal y no puede evaluar su caso. Responde únicamente con información ya publicada en este sitio web. Cualquier pregunta sobre sus circunstancias particulares debe dirigirse al despacho.",
          ],
        },
        {
          h: "Resultados anteriores",
          p: [
            "Cualquier referencia a asuntos, juicios o resultados anteriores se ofrece únicamente con fines informativos. Los resultados anteriores no garantizan ni predicen un resultado similar en ningún asunto futuro.",
          ],
        },
        {
          h: "Jurisdicción",
          p: [
            `${firm.attorney} tiene licencia para ejercer la abogacía en los estados de Texas y Tennessee. Nada en este sitio web pretende constituir una oferta de representación en una jurisdicción donde el despacho no tiene licencia para ejercer.`,
          ],
        },
        {
          h: "Plazos legales",
          p: [
            "Los reclamos legales están sujetos a plazos de presentación estrictos que varían según el tipo de reclamo y la jurisdicción. Una demora puede impedir de forma permanente un reclamo que de otro modo sería válido. Si cree que puede tener un reclamo, consulte a un abogado cuanto antes.",
          ],
        },
        {
          h: "Versión que rige",
          p: [
            "Esta traducción se ofrece para su comodidad. En caso de cualquier discrepancia, rige la versión en inglés de este aviso legal.",
          ],
        },
      ],
      questions: ["¿Preguntas sobre este aviso legal? Llame al", "o escriba a", "."],
    },
  },

  schema: { home: "Inicio", practiceAreas: "Áreas de Práctica" },
};
