import { content } from "@/lib/content";
import { firm, fullAddress } from "@/lib/firm";
import { areaPath, path, type Lang } from "@/lib/i18n";
import type { AreaKey } from "@/lib/media";

export type Entry = {
  id: string;
  tags: string[];
  answer: string;
  /** Suggested follow-ups offered as chips after this answer. */
  next?: string[];
  link?: { label: string; href: string };
};

export type Bundle = {
  entries: Entry[];
  disclaimer: string;
  openers: string[];
  fallback: string;
  advice: { patterns: RegExp[]; response: string; linkLabel: string };
  emergency: { patterns: RegExp[]; response: string };
  sensitive: { patterns: RegExp[]; response: string };
  /** Words carrying no retrieval signal in this language. */
  stopwords: Set<string>;
};

/* ─────────────────────────────────────────────────────────────
   How people actually describe what happened to them. Nobody types
   "premises liability" — they type "I slipped at a store". Without this
   layer, every plain-language description falls through to the fallback.
   ───────────────────────────────────────────────────────────── */

const SYNONYMS: Record<Lang, Partial<Record<AreaKey, string[]>>> = {
  en: {
    "personal-injury": ["injured", "hurt", "negligence", "injury claim", "compensation", "someone hurt me"],
    "car-accidents": ["car crash", "auto accident", "rear ended", "collision", "wreck", "fender bender", "hit by a car", "t-boned", "uninsured driver", "hit and run", "rideshare", "uber", "lyft"],
    "truck-accidents": ["18 wheeler", "eighteen wheeler", "semi truck", "tractor trailer", "big rig", "commercial truck", "trucker"],
    "motorcycle-accidents": ["motorcycle", "bike crash", "rider", "biker", "motorbike"],
    "drunk-driving-injuries": ["drunk driver", "dram shop", "intoxicated driver", "over served", "hit by a drunk", "impaired driver"],
    "construction-accidents": ["construction site", "scaffolding", "fell from height", "jobsite", "trench collapse", "crane", "ladder"],
    "workplace-injuries": ["hurt at work", "injured on the job", "workers comp", "workers compensation", "non subscriber", "employer", "work injury"],
    "plant-refinery-accidents": ["refinery", "plant explosion", "chemical exposure", "burn injury", "petrochemical", "flash fire", "industrial"],
    "maritime-offshore-injuries": ["offshore", "jones act", "seaman", "oil rig", "rig", "vessel", "ship", "boat", "cruise", "dock", "longshore", "platform"],
    "railroad-accidents": ["train", "railroad crossing", "fela", "rail", "locomotive"],
    "premises-liability": ["slip and fall", "slipped", "tripped", "fell at a store", "unsafe property", "inadequate security", "apartment", "grocery store", "wet floor", "fell"],
    "product-defects": ["defective product", "recall", "faulty", "malfunction", "exploded", "defective tire", "broke and hurt me"],
    "dog-bites": ["dog attack", "bitten", "animal attack", "mauled", "bite", "neighbors dog"],
    "drowning-accidents": ["drowned", "pool", "swimming pool", "near drowning", "drowning"],
    "insurance-claims": ["denied claim", "bad faith", "underpaid", "adjuster", "insurance denied", "claim denied", "lowballed"],
    "serious-injury-wrongful-death": ["wrongful death", "died", "killed", "passed away", "fatal", "death", "brain injury", "spinal cord", "paralyzed", "amputation", "catastrophic", "lost my husband", "lost my wife", "lost a loved one"],
  },
  es: {
    "personal-injury": ["lesionado", "lastimado", "herido", "negligencia", "reclamo por lesiones", "compensacion", "me lastimaron", "indemnizacion"],
    "car-accidents": ["choque", "accidente de auto", "accidente de carro", "me chocaron", "colision", "por detras", "atropello", "carro", "coche", "sin seguro", "se dio a la fuga", "uber", "lyft"],
    "truck-accidents": ["traila", "trailer", "camion", "18 ruedas", "troca grande", "camion comercial", "trailero", "tractocamion"],
    "motorcycle-accidents": ["motocicleta", "moto", "motociclista", "en moto"],
    "drunk-driving-injuries": ["conductor ebrio", "borracho", "dram shop", "manejando tomado", "intoxicado", "cantina", "bar"],
    "construction-accidents": ["construccion", "obra", "andamio", "me cai de altura", "zanja", "grua", "escalera", "albanil"],
    "workplace-injuries": ["me lastime en el trabajo", "accidente de trabajo", "compensacion laboral", "workers comp", "no suscriptor", "patron", "lesion laboral", "chamba"],
    "plant-refinery-accidents": ["refineria", "planta", "explosion", "quemaduras", "quimicos", "petroquimica", "industrial"],
    "maritime-offshore-injuries": ["costa afuera", "ley jones", "marinero", "plataforma", "barco", "embarcacion", "crucero", "muelle", "portuario"],
    "railroad-accidents": ["tren", "ferrocarril", "cruce de tren", "fela", "via del tren", "locomotora"],
    "premises-liability": ["me resbale", "resbalon", "me cai", "caida", "tropece", "piso mojado", "tienda", "apartamentos", "propiedad insegura", "falta de seguridad", "supermercado"],
    "product-defects": ["producto defectuoso", "defecto", "fallo", "exploto", "llanta defectuosa", "retiro del mercado", "se rompio y me lastimo"],
    "dog-bites": ["mordedura", "me mordio", "perro", "ataque de perro", "perro del vecino", "animal"],
    "drowning-accidents": ["ahogamiento", "se ahogo", "alberca", "piscina", "casi se ahoga"],
    "insurance-claims": ["reclamo negado", "mala fe", "aseguradora", "ajustador", "me negaron el reclamo", "seguro no quiere pagar", "oferta baja"],
    "serious-injury-wrongful-death": ["muerte por negligencia", "fallecio", "murio", "lo mataron", "fatal", "muerte", "dano cerebral", "medula espinal", "paralizado", "amputacion", "catastrofica", "perdi a mi esposo", "perdi a mi esposa", "perdi a un ser querido"],
  },
};

/* ─────────────────────────────────────────────────────────────
   Stopwords
   ───────────────────────────────────────────────────────────── */

const STOPWORDS: Record<Lang, Set<string>> = {
  en: new Set([
    "a","an","the","is","are","was","were","be","been","am","do","does","did","i","you","he","she","it","we","they","my","your","his","her","our","their","me","him","them","of","to","in","on","at","for","with","about","from","by","as","and","or","but","if","so","that","this","these","those","there","here","what","when","where","who","how","why","which","can","could","would","should","will","may","might","have","has","had","get","got","just","please","tell","know","need","want","like","help",
  ]),
  // Accent-folded, because the tokenizer folds before it compares.
  es: new Set([
    "el","la","los","las","un","una","unos","unas","lo","al","del","de","a","en","con","por","para","sin","sobre","entre","hasta","desde","y","o","u","pero","si","no","que","cual","cuales","quien","quienes","como","cuando","donde","porque","por que","es","son","era","eran","fue","fueron","ser","estar","esta","estan","estoy","estas","he","ha","han","habia","hay","tengo","tiene","tienen","tenia","me","te","se","nos","les","le","mi","mis","tu","tus","su","sus","nuestro","nuestra","yo","usted","ustedes","el","ella","ellos","ellas","esto","esta","este","estos","estas","eso","esa","ese","esos","esas","aqui","alli","ahi","muy","mas","menos","ya","tambien","solo","puedo","puede","pueden","podria","debo","debe","quiero","quiere","necesito","necesita","saber","decir","dime","digame","por favor","ayuda","ayudar","hacer","hago","hace",
  ]),
};

/* ─────────────────────────────────────────────────────────────
   Guardrails — questions only a lawyer may answer, matched before
   retrieval runs.
   ───────────────────────────────────────────────────────────── */

const ADVICE_PATTERNS: Record<Lang, RegExp[]> = {
  en: [
    /\b(do|will|would|could|can) i (have|win|get|sue|be able)/i,
    /\bdo i have (a|any) (case|claim|lawsuit)/i,
    /\bhow much (is|would|could|can) (my|the|this) (case|claim|settlement|lawsuit)/i,
    /\bwhat('| i)?s my (case|claim) worth/i,
    /\bhow much (money )?(will|would|can|could) i (get|receive|win|recover)/i,
    /\bshould i (sign|accept|settle|sue|take|file|talk|give|say)/i,
    /\bwhat should i do\b/i,
    /\bam i (liable|at fault|entitled|covered|eligible)/i,
    /\bwho('| i)?s at fault/i,
    /\bhow long do i have\b/i,
    /\b(statute of limitations|deadline to file|time limit to (file|sue))/i,
    /\bis (it|this) (legal|illegal|worth)/i,
    /\bwhat are my (legal )?(rights|options|chances)/i,
    /\bdo i need (a|an) (lawyer|attorney)/i,
    /\bcan i still (sue|file|claim)/i,
    /\blegal advice\b/i,
  ],
  es: [
    /\bten(go|dr(e|é)) (un )?caso\b/i,
    /\btengo (derecho|caso|reclamo|demanda)\b/i,
    /\bpuedo (demandar|reclamar|ganar|cobrar)\b/i,
    /\bcu(a|á)nto (vale|me dar(i|í)an|puedo (obtener|ganar|recibir|sacar))\b/i,
    /\bcu(a|á)nto (dinero|me toca)\b/i,
    /\bdebo (firmar|aceptar|demandar|hablar|decir|presentar)\b/i,
    /\bqu(e|é) (debo|deber(i|í)a) hacer\b/i,
    /\bde qui(e|é)n es la culpa\b/i,
    /\btengo la culpa\b/i,
    /\bsoy responsable\b/i,
    /\bcu(a|á)nto tiempo tengo\b/i,
    /\b(plazo|prescripci(o|ó)n|l(i|í)mite de tiempo) (para|de)\b/i,
    /\bnecesito (un )?abogado\b/i,
    /\bcu(a|á)les son mis (derechos|opciones|posibilidades)\b/i,
    /\bes (legal|ilegal)\b/i,
    /\basesor(i|í)a legal\b/i,
    /\bconsejo legal\b/i,
    /\btodav(i|í)a puedo (demandar|reclamar|presentar)\b/i,
  ],
};

const EMERGENCY_PATTERNS: Record<Lang, RegExp[]> = {
  en: [
    /\b(emergency|right now i'?m|happening now|just happened.*bleeding|can'?t breathe|unconscious|suicid|kill myself|dying)\b/i,
  ],
  es: [
    /\b(emergencia|me estoy muriendo|no puedo respirar|inconsciente|suicid|matarme|sangrando mucho|est(a|á) pasando ahora)\b/i,
  ],
};

const SENSITIVE_PATTERNS: Record<Lang, RegExp[]> = {
  en: [
    /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/, // SSN-shaped
    /\b(social security|ssn|date of birth|dob|credit card|bank account|policy number)\b/i,
  ],
  es: [
    /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/,
    /\b(seguro social|ssn|fecha de nacimiento|tarjeta de cr(e|é)dito|cuenta bancaria|n(u|ú)mero de p(o|ó)liza|licencia de conducir)\b/i,
  ],
};

/* ─────────────────────────────────────────────────────────────
   The assistant's entire world. It answers from here and nowhere
   else — every fact below already appears publicly on the site.
   ───────────────────────────────────────────────────────────── */

function coreEntries(lang: Lang): Entry[] {
  const c = content(lang);
  const contactHref = path("contact", lang);
  const aboutHref = path("about", lang);
  const areasHref = path("practiceAreas", lang);
  const reviewsHref = path("reviews", lang);

  if (lang === "es") {
    return [
      {
        id: "greeting",
        tags: ["hola", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos", "hey", "buenas"],
        answer: `Hola — gracias por visitar ${firm.name}. Puedo responder preguntas sobre el despacho, nuestras áreas de práctica y cómo comunicarse con Andre. ¿Qué lo trae por aquí hoy?`,
        next: ["¿Qué áreas manejan?", "¿Cuánto cuesta la consulta?", "¿Dónde está la oficina?"],
      },
      {
        id: "hours",
        tags: ["horario", "horas", "abierto", "cerrado", "a que hora", "fin de semana", "sabado", "domingo", "cuando abren"],
        answer: `La oficina abre ${c.hours}. Si nos escribe fuera de ese horario, deje un mensaje o use el formulario de contacto y alguien le dará seguimiento.`,
        next: ["¿Dónde está la oficina?", "¿Cómo me comunico con el despacho?"],
      },
      {
        id: "location",
        tags: ["donde", "ubicacion", "direccion", "oficina", "como llego", "mapa", "queda", "houston", "visitar"],
        answer: `La oficina está en ${fullAddress}. Queda en el noroeste de Houston, justo al lado de la Northwest Freeway (US-290).`,
        link: { label: "Abrir en Google Maps", href: firm.mapsUrl },
        next: ["¿Cuál es su horario?", "¿Cómo me comunico con el despacho?"],
      },
      {
        id: "contact",
        tags: ["contacto", "telefono", "llamar", "correo", "email", "comunicar", "hablar con", "numero", "fax", "cita", "agendar"],
        answer: `Puede llamar al ${firm.phone}, escribir a ${firm.email} o mandar un mensaje por el formulario de contacto — toma como treinta segundos. El fax es ${firm.fax}.`,
        link: { label: "Ir al formulario de contacto", href: contactHref },
        next: ["¿Cuánto cuesta la consulta?", "¿Cuál es su horario?"],
      },
      {
        id: "consultation-cost",
        tags: ["gratis", "costo", "cuesta", "cobran", "precio", "cuanto", "caro", "pagar", "honorarios", "anticipo", "consulta"],
        answer: `La consulta inicial es gratis. No cuesta nada y no lo compromete a nada — la idea es simplemente que sepa en qué posición está. Cualquier pregunta sobre honorarios por la representación es algo que Andre le explicará directamente durante esa conversación.`,
        link: { label: "Solicitar una consulta gratis", href: contactHref },
        next: ["¿Qué pasa después de comunicarme?", "¿Qué áreas manejan?"],
      },
      {
        id: "practice-overview",
        tags: ["areas de practica", "que hacen", "que tipo de casos", "tipos de casos", "servicios", "manejan", "especializan", "areas"],
        answer: `La práctica del despacho se centra en lesiones personales — representar a personas lastimadas por la negligencia de alguien más. Eso abarca choques vehiculares, lesiones laborales e industriales, casos marítimos y costa afuera, responsabilidad del propietario, productos defectuosos, disputas con aseguradoras, y lesiones catastróficas y muerte por negligencia, entre otros. Andre también defiende a clientes acusados de delitos graves y menores.`,
        link: { label: "Ver todas las áreas de práctica", href: areasHref },
        next: ["Cuénteme sobre accidentes de auto", "¿Manejan casos criminales?", "¿Cuánto cuesta la consulta?"],
      },
      {
        id: "criminal",
        tags: ["criminal", "penal", "defensa", "delito", "felonia", "arrestado", "cargos", "acusado", "dwi", "dui", "corte", "juzgado"],
        answer: `Sí — junto con la práctica de lesiones personales, Andre defiende a clientes acusados de delitos graves y menores. Pasó años como fiscal en la Oficina del Fiscal de Distrito del Condado de Shelby, Tennessee, antes de pasar a la práctica privada, así que ha trabajado casos penales desde ambos lados. Para cualquier asunto con cargos pendientes, por favor llame directamente al ${firm.phone} en lugar de describir detalles aquí.`,
        link: { label: "Comunicarse con el despacho", href: contactHref },
      },
      {
        id: "about-andre",
        tags: ["quien es andre", "sobre", "abogado", "trayectoria", "experiencia", "biografia", "andre thomas", "credenciales", "fiscal", "juicios", "jurado"],
        answer: `Andre Thomas tiene licencia en Texas y en Tennessee. Estudió en la Universidad de Memphis y obtuvo su título de derecho en la Facultad Thurgood Marshall de Texas Southern University. Fue fiscal en la Oficina del Fiscal de Distrito del Condado de Shelby, Tennessee, y luego pasó varios años en el Departamento de Seguridad y Seguridad Nacional de Tennessee manejando casos de decomiso de bienes. Hoy representa a demandantes en casos de lesiones personales y defiende a clientes con cargos penales, con una carrera que incluye juicios de alto perfil ante jurado.`,
        link: { label: "Leer la trayectoria completa", href: aboutHref },
        next: ["¿En qué estados tiene licencia?", "¿Qué áreas manejan?"],
      },
      {
        id: "licensure",
        tags: ["licencia", "estados", "tennessee", "texas", "memphis", "colegio de abogados", "admitido", "jurisdiccion", "fuera del estado"],
        answer: `Andre está admitido para ejercer en Texas y en Tennessee. Eso sirve mucho cuando un caso toca ambos estados — no hay que pasárselo a otro despacho.`,
        next: ["¿Quién es Andre Thomas?", "¿Dónde está la oficina?"],
      },
      {
        id: "reviews",
        tags: ["resenas", "opiniones", "calificacion", "testimonios", "clientes dicen", "google", "estrellas", "reputacion", "recomiendan"],
        answer: `El despacho tiene una calificación de ${firm.reviews.rating} estrellas en ${firm.reviews.count} reseñas de Google. Puede leer lo que han dicho los clientes en la página de reseñas.`,
        link: { label: "Leer las reseñas de clientes", href: reviewsHref },
      },
      {
        id: "process",
        tags: ["que pasa", "siguientes pasos", "proceso", "como funciona", "despues de llamar", "esperar", "tiempo", "pasos", "primer paso"],
        answer: `Empieza con una consulta gratis — usted explica qué pasó y Andre le dice con honestidad si hay un caso que valga la pena. De ahí, el trabajo es preservar la evidencia antes de que desaparezca, armar el panorama completo de sus lesiones y sus pérdidas, presentar el reclamo a las partes responsables y a sus aseguradoras, y llevar el caso a juicio si no quieren ser razonables.`,
        link: { label: "Ver cómo funciona", href: contactHref },
        next: ["¿Cuánto cuesta la consulta?", "¿Qué debo llevar?"],
      },
      {
        id: "prepare",
        tags: ["llevar", "preparar", "documentos", "papeles", "para la consulta", "que necesito"],
        answer: `Todo lo que ya tenga ayuda — reportes del accidente o de la policía, fotos, expedientes y facturas médicas, correspondencia con la aseguradora y datos de contacto de cualquier testigo. Si todavía no tiene nada de eso, no hay problema. Venga como esté; el despacho puede ayudar a conseguirlo.`,
        link: { label: "Solicitar una consulta", href: contactHref },
      },
      {
        id: "insurance-adjuster",
        tags: ["ajustador", "me llamo el seguro", "declaracion grabada", "oferta", "aseguradora", "me negaron", "oferta baja"],
        answer: `Las compañías de seguros tienen un interés directo en pagar lo menos posible, y es común que un ajustador se comunique desde temprano. No puedo decirle qué hacer con una oferta o una declaración en particular — esa es exactamente la clase de pregunta para Andre, y la consulta es gratis.`,
        link: { label: "Hablar con Andre", href: contactHref },
      },
      {
        id: "language",
        tags: ["espanol", "hablan espanol", "ingles", "idioma", "traductor", "interprete"],
        answer: `Sí — este sitio está disponible en español y puede escribirme aquí en español. Para hablar directamente con el despacho sobre su caso, llame al ${firm.phone} y con gusto lo atienden.`,
        link: { label: "Comunicarse con el despacho", href: contactHref },
      },
      {
        id: "social",
        tags: ["instagram", "redes", "redes sociales", "seguir", "facebook"],
        answer: `El despacho está en Instagram — es el mejor lugar para seguirle la pista.`,
        link: { label: "Visitar Instagram", href: firm.instagram },
      },
      {
        id: "areas-served",
        tags: ["atienden", "zona", "cerca de mi", "condado", "harris", "cubren", "ciudades", "todo el estado", "viajan"],
        answer: `La oficina está en Houston y Andre tiene licencia en Texas y en Tennessee. Si no está seguro de si el despacho puede tomar su asunto, la manera más rápida de saberlo es llamar al ${firm.phone}.`,
        link: { label: "Comunicarse con el despacho", href: contactHref },
      },
    ];
  }

  return [
    {
      id: "greeting",
      tags: ["hi", "hello", "hey", "good morning", "good afternoon", "greetings", "yo"],
      answer: `Hello — thanks for visiting ${firm.name}. I can answer questions about the firm, our practice areas, and how to reach Andre. What brings you here today?`,
      next: ["What areas do you handle?", "How much does a consultation cost?", "Where is the office?"],
    },
    {
      id: "hours",
      tags: ["hours", "open", "close", "closed", "what time", "weekend", "saturday", "sunday", "when are you open"],
      answer: `The office is open ${c.hours}. If you reach out after hours, leave a message or use the contact form and someone will follow up.`,
      next: ["Where is the office?", "How do I contact the firm?"],
    },
    {
      id: "location",
      tags: ["where", "location", "address", "office", "directions", "map", "located", "houston", "visit"],
      answer: `The office is at ${fullAddress}. It's in northwest Houston, just off the Northwest Freeway (US-290).`,
      link: { label: "Open in Google Maps", href: firm.mapsUrl },
      next: ["What are your hours?", "How do I contact the firm?"],
    },
    {
      id: "contact",
      tags: ["contact", "phone", "call", "email", "reach", "talk to", "speak", "get in touch", "number", "fax", "schedule", "appointment", "book"],
      answer: `You can call ${firm.phone}, email ${firm.email}, or send a message through the contact form — it takes about thirty seconds. Fax is ${firm.fax}.`,
      link: { label: "Go to the contact form", href: contactHref },
      next: ["How much does a consultation cost?", "What are your hours?"],
    },
    {
      id: "consultation-cost",
      tags: ["free", "cost", "fee", "fees", "price", "charge", "how much", "expensive", "afford", "payment", "retainer", "consultation", "upfront"],
      answer: `The initial consultation is free. It costs nothing and commits you to nothing — the point is simply to find out where you stand. Any questions about fees for representation are something Andre will go over with you directly during that conversation.`,
      link: { label: "Request a free consultation", href: contactHref },
      next: ["What happens after I reach out?", "What areas do you handle?"],
    },
    {
      id: "practice-overview",
      tags: ["practice areas", "what do you do", "what kind of cases", "types of cases", "services", "handle", "specialize", "areas of law"],
      answer: `The firm's practice is centered on personal injury — representing people hurt by someone else's negligence. That covers vehicle collisions, workplace and industrial injuries, maritime and offshore, premises liability, product defects, insurance disputes, and catastrophic injury and wrongful death, among others. Andre also defends clients facing felony and misdemeanor charges.`,
      link: { label: "See all practice areas", href: areasHref },
      next: ["Tell me about car accidents", "Do you handle criminal cases?", "How much does a consultation cost?"],
    },
    {
      id: "criminal",
      tags: ["criminal", "defense", "felony", "misdemeanor", "arrested", "charge", "charged", "charges", "dwi", "dui", "court date", "prosecuted"],
      answer: `Yes — alongside the personal injury practice, Andre defends clients facing felony and misdemeanor charges. He spent years as a prosecutor at the Shelby County, TN District Attorney's Office before moving into private practice, so he has worked criminal cases from both sides. For anything involving pending charges, please call ${firm.phone} directly rather than describing details here.`,
      link: { label: "Contact the firm", href: contactHref },
    },
    {
      id: "about-andre",
      tags: ["who is andre", "about", "attorney", "lawyer", "background", "experience", "bio", "andre thomas", "qualified", "credentials", "prosecutor", "trials", "jury"],
      answer: `Andre Thomas is licensed in both Texas and Tennessee. He studied at the University of Memphis and earned his law degree at Texas Southern University's Thurgood Marshall School of Law. He served as a prosecutor at the Shelby County, TN District Attorney's Office, then spent years with the Tennessee Department of Safety and Homeland Security handling asset forfeiture matters. He now represents plaintiffs in personal injury cases and defends clients facing criminal charges, with a career that includes high-profile jury trials.`,
      link: { label: "Read the full bio", href: aboutHref },
      next: ["What states is he licensed in?", "What areas do you handle?"],
    },
    {
      id: "licensure",
      tags: ["licensed", "license", "states", "tennessee", "texas", "memphis", "bar", "admitted", "jurisdiction", "out of state"],
      answer: `Andre is admitted to practice in both Texas and Tennessee. That's genuinely useful when a case touches both states — it doesn't have to be handed off to another firm.`,
      next: ["Who is Andre Thomas?", "Where is the office?"],
    },
    {
      id: "reviews",
      tags: ["reviews", "rating", "testimonials", "clients say", "google", "stars", "reputation", "recommend"],
      answer: `The firm holds a ${firm.reviews.rating}-star rating across ${firm.reviews.count} Google reviews. You can read what clients have said on the reviews page.`,
      link: { label: "Read client reviews", href: reviewsHref },
    },
    {
      id: "process",
      tags: ["what happens", "next steps", "process", "how does it work", "after i call", "expect", "timeline", "steps", "first step"],
      answer: `It starts with a free consultation — you explain what happened and Andre tells you honestly whether there's a case worth pursuing. From there, the work is preserving evidence before it disappears, building out the full picture of your injuries and losses, presenting the claim to the responsible parties and their insurers, and trying the case if they won't be reasonable.`,
      link: { label: "See how it works", href: contactHref },
      next: ["How much does a consultation cost?", "What should I bring?"],
    },
    {
      id: "prepare",
      tags: ["bring", "prepare", "documents", "paperwork", "need for consultation", "what do i need"],
      answer: `Anything you already have is helpful — accident or police reports, photos, medical records and bills, insurance correspondence, and contact details for any witnesses. If you don't have any of it yet, that's fine. Come as you are; the firm can help track things down.`,
      link: { label: "Request a consultation", href: contactHref },
    },
    {
      id: "insurance-adjuster",
      tags: ["adjuster", "insurance company called", "recorded statement", "settlement offer", "insurer", "claim denied", "lowball"],
      answer: `Insurance companies have a vested interest in minimizing payouts, and it's common for an adjuster to make contact early. I can't tell you what to do about a specific offer or statement — that's exactly the kind of question to put to Andre directly, and the consultation is free.`,
      link: { label: "Talk to Andre", href: contactHref },
    },
    {
      id: "language",
      tags: ["spanish", "espanol", "do you speak spanish", "language", "translator", "interpreter", "bilingual"],
      answer: `Yes — this site is available in Spanish, and you're welcome to write to me in Spanish. To speak with the firm directly about your case, call ${firm.phone}.`,
      link: { label: "Ver este sitio en español", href: path("home", "es") },
    },
    {
      id: "social",
      tags: ["instagram", "social", "follow", "facebook", "social media"],
      answer: `The firm is on Instagram — that's the best place to follow along.`,
      link: { label: "Visit Instagram", href: firm.instagram },
    },
    {
      id: "areas-served",
      tags: ["serve", "area", "near me", "county", "harris", "do you cover", "cities", "statewide", "travel"],
      answer: `The office is in Houston and Andre is licensed across both Texas and Tennessee. If you're not sure whether your matter is one the firm can take on, the quickest way to find out is to call ${firm.phone}.`,
      link: { label: "Contact the firm", href: contactHref },
    },
  ];
}

/** One entry per practice area, generated so the two can never drift apart. */
function practiceEntries(lang: Lang): Entry[] {
  const syn = SYNONYMS[lang];
  const more = lang === "es" ? "Más sobre" : "More on";
  const next =
    lang === "es"
      ? ["¿Cuánto cuesta la consulta?", "¿Qué pasa después de comunicarme?"]
      : ["How much does a consultation cost?", "What happens after I reach out?"];

  return content(lang).practiceAreas.map((area) => ({
    id: `pa-${area.key}`,
    tags: [
      area.name.toLowerCase(),
      ...area.name.toLowerCase().split(/[\s&]+/).filter((w) => w.length > 3),
      ...(syn[area.key] ?? []),
    ],
    answer: `${area.lede} ${area.body[0]}`,
    link: { label: `${more} ${area.name}`, href: areaPath(area.slug, lang) },
    next,
  }));
}

/** Everything the engine needs to answer in one language. */
export function getBundle(lang: Lang): Bundle {
  const contactHref = path("contact", lang);

  if (lang === "es") {
    return {
      entries: [...coreEntries("es"), ...practiceEntries("es")],
      disclaimer:
        "Soy un asistente automatizado — no soy abogado — y no puedo dar asesoría legal. Nada de lo que digo aquí crea una relación abogado–cliente.",
      openers: [
        "¿Qué áreas manejan?",
        "¿Cuánto cuesta la consulta?",
        "¿Quién es Andre Thomas?",
        "¿Dónde está la oficina?",
      ],
      fallback: `No estoy seguro de tener esa respuesta. Puedo ayudarle con las áreas de práctica, la trayectoria del despacho, el horario y la ubicación de la oficina, o cómo obtener una consulta gratis — y para cualquier otra cosa, llamar al ${firm.phone} le dará una respuesta real más rápido que yo.`,
      advice: {
        patterns: ADVICE_PATTERNS.es,
        response: `Esa es una pregunta que depende de los hechos específicos de su situación, y responderla sería dar asesoría legal, cosa que no puedo hacer. Pero es exactamente la pregunta correcta para Andre, y la consulta es gratis. Llame al ${firm.phone} o mande un mensaje por el formulario de contacto y recibirá una respuesta real de un abogado.`,
        linkLabel: "Solicitar una consulta gratis",
      },
      emergency: {
        patterns: EMERGENCY_PATTERNS.es,
        response:
          "Si esto es una emergencia o alguien está en peligro, por favor llame al 911 de inmediato. Este chat no se monitorea en tiempo real y no puede ayudar en una emergencia.",
      },
      sensitive: {
        patterns: SENSITIVE_PATTERNS.es,
        response: `Por favor no comparta datos personales ni confidenciales aquí — este chat no es un canal seguro ni privado, y todavía no existe una relación abogado–cliente. Llame al ${firm.phone} o use el formulario de contacto para hablar directamente con el despacho.`,
      },
      stopwords: STOPWORDS.es,
    };
  }

  return {
    entries: [...coreEntries("en"), ...practiceEntries("en")],
    disclaimer:
      "I'm an automated assistant — not an attorney — and I can't give legal advice. Nothing here creates an attorney–client relationship.",
    openers: [
      "What areas do you handle?",
      "How much does a consultation cost?",
      "Who is Andre Thomas?",
      "Where is the office?",
    ],
    fallback: `I'm not certain I have that one. I can help with practice areas, the firm's background, office hours and location, or how to get a free consultation — and for anything beyond that, calling ${firm.phone} will get you a real answer faster than I can.`,
    advice: {
      patterns: ADVICE_PATTERNS.en,
      response: `That's a question that genuinely depends on the specific facts of your situation, and answering it would be giving legal advice — which I'm not able to do. It's exactly the right question for Andre, though, and the consultation is free. Call ${firm.phone} or send a message through the contact form and you'll get a real answer from an attorney.`,
      linkLabel: "Request a free consultation",
    },
    emergency: {
      patterns: EMERGENCY_PATTERNS.en,
      response:
        "If this is an emergency or anyone is in danger, please call 911 right away. This chat isn't monitored in real time and can't help with an emergency.",
    },
    sensitive: {
      patterns: SENSITIVE_PATTERNS.en,
      response: `Please don't share personal or confidential details here — this chat isn't a secure or private channel, and no attorney–client relationship exists yet. Call ${firm.phone} or use the contact form to speak with the firm directly.`,
    },
    stopwords: STOPWORDS.en,
  };
}

/** The contact link the guardrails hang their CTA on. */
export const contactLink = (lang: Lang) => ({
  label: lang === "es" ? "Comunicarse con el despacho" : "Contact the firm",
  href: path("contact", lang),
});
