/**
 * Community events: the firm's own giveaways, drives, and sponsorships.
 *
 * Adding the next one is an entry in this array, not a new page. The hub
 * lists it, its own page appears, the sitemap and the footer pick it up, and
 * both languages come from the same object. That is the whole point of the
 * shape: a turkey drive every November should never be a new build.
 *
 * Per-event copy lives here rather than in `content/`, for the same reason
 * `jobs.ts` carries its own: `Content` describes the site's chrome, and one
 * event's paragraphs are not chrome. The labels around them are, and those
 * stay in `content/` so every event reuses them.
 *
 * An event stays up after it happens. For a law firm, a page proving the
 * firm fed a hundred families is a credibility signal that keeps earning
 * long after the turkeys are gone, so nothing here expires. Once the event
 * is over, fill in `recap` and `photos` and the page grows a closing section
 * on its own.
 */

import type { Lang } from "@/lib/i18n";

/** One line of the "when and where" rail. */
export type EventFact = { label: string; value: string[] };

export type EventPhoto = {
  /** Under `public/community/`. */
  src: string;
  width: number;
  height: number;
  alt: Record<Lang, string>;
  /** A wide photograph takes two columns in the mosaic. */
  wide?: boolean;
};

/** Everything that changes between English and Spanish for one event. */
export type EventCopy = {
  /** Metadata title. Carries the keyword, not a slogan. */
  title: string;
  description: string;
  eyebrow: string;
  /** The `h1`, as art-directed lines. Must contain the keyword. */
  titleLines: string[];
  lede: string;
  /** Short label for the hub listing and the breadcrumb. */
  name: string;
  /** Two lines on the hub card. */
  summary: string;
  /**
   * The one sentence the homepage strip carries. Written to stand alone,
   * because that is the only place it appears and it has to make sense to
   * somebody who came to the site about a car wreck.
   */
  notice: string;
  whenWhereEyebrow: string;
  whenWhereTitle: string;
  facts: EventFact[];
  /** Under the address, pointing at the map link. */
  directions: string;
  flyerAlt: string;
  howEyebrow: string;
  howTitle: string;
  steps: { title: string; body: string }[];
  whyEyebrow: string;
  whyTitle: string;
  whyBody: string[];
  askEyebrow: string;
  askTitle: string;
  askBody: string;
  askCta: string;
  /** Written after the event, alongside `photos`. */
  recap?: { eyebrow: string; title: string; body: string[] };
};

export type CommunityEvent = {
  /** Stable across languages, so the toggle maps one side to the other. */
  key: string;
  /** Localized path segment. */
  slug: Record<Lang, string>;
  /** Local date, ISO. */
  date: string;
  /** Local 24h start and end, used for the `Event` schema's offsets. */
  start: string;
  /**
   * When the firm stops handing turkeys out. The copy says "until they are
   * gone" because a hundred turkeys may well go sooner, but `Event` markup
   * wants a real `endDate`, so one is stated here.
   */
  end: string;
  /** IANA offset for the event's own date, which is after the DST change. */
  utcOffset: string;
  /** The day the page went live, for the offer's `validFrom`. */
  announced: string;
  flyer?: { src: string; width: number; height: number };
  /** Open Graph image. Falls back to the flyer. */
  ogImage?: string;
  photos?: EventPhoto[];
  copy: Record<Lang, EventCopy>;
};

export const events: CommunityEvent[] = [
  {
    key: "turkey-drive-2026",
    slug: { en: "turkey-drive-2026", es: "entrega-de-pavos-2026" },
    date: "2026-11-21",
    start: "10:00",
    end: "13:00",
    utcOffset: "-06:00",
    announced: "2026-10-21",
    flyer: {
      /**
       * The firm's own artwork, converted from the supplied PNG to WebP:
       * 2.3 MB to 241 KB at identical dimensions. Worth doing because this
       * file is also the Open Graph image, and a share card is fetched by
       * the scraper at full size rather than through the image optimizer.
       *
       * The frame takes its aspect ratio from these two numbers, so a
       * replacement of any shape is mounted rather than cropped or
       * stretched. Correct them if the artwork changes.
       */
      src: "/community/turkey-drive-2026-flyer.webp",
      width: 1122,
      height: 1402,
    },
    copy: {
      en: {
        title: "Free Turkey Giveaway Houston — Nov 21 | Andre Thomas Law",
        description:
          "Andre Thomas Law is giving away 100 free turkeys with all the fixings on Saturday, November 21, 2026 at 13201 Northwest Freeway, Suite 485 in Houston. Free, first come first served, no sign up.",
        eyebrow: "Community",
        titleLines: ["Free Turkey Giveaway", "in Houston"],
        lede:
          "We are giving away 100 turkeys with all the fixings on Saturday, November 21. Come to the parking lot at our office on Northwest Freeway. It is free, and there is nothing to fill out.",
        name: "Turkey Drive 2026",
        summary:
          "One hundred turkeys with all the fixings, free, in our office parking lot on Northwest Freeway.",
        notice: "We are giving away 100 free turkeys on Saturday, November 21.",
        whenWhereEyebrow: "When and where",
        whenWhereTitle: "Saturday morning, in our parking lot.",
        facts: [
          { label: "Day", value: ["Saturday, November 21, 2026"] },
          {
            label: "Time",
            value: ["Starting at 10:00 in the morning", "We stay until the turkeys are gone"],
          },
          {
            label: "Place",
            value: [
              "Our office parking lot",
              "13201 Northwest Freeway, Suite 485",
              "Houston, TX 77040",
            ],
          },
          { label: "Cost", value: ["Free. No sign up and no paperwork."] },
        ],
        directions: "Open the map",
        flyerAlt:
          "Thanksgiving Turkey Drive flyer. The Andre Thomas Law team outside the firm's Houston office, above a table of Thanksgiving food.",
        howEyebrow: "How it works",
        howTitle: "Three things to know.",
        steps: [
          {
            title: "Just show up",
            body:
              "There is no sign up, no form, and no proof of anything. You do not need to be a client of the firm. Come as you are.",
          },
          {
            title: "First come, first served",
            body:
              "We have 100 turkeys and each one comes with the fixings. Once they are handed out we are done for the day, so earlier is better.",
          },
          {
            title: "Pull into our lot",
            body:
              "We will be set up outside the building at 13201 Northwest Freeway. Look for our table near the Suite 485 entrance and someone will walk you through it.",
          },
        ],
        whyEyebrow: "Why we do this",
        whyTitle: "This is our neighborhood too.",
        whyBody: [
          "Thanksgiving gets expensive fast, and plenty of families around Northwest Houston are already stretched thin by the time November shows up. A turkey should not be the thing that decides whether a family sits down together.",
          "Our office is on this freeway and our clients live on these streets. Handing a neighbor a turkey is a small thing to do. We would rather do the small thing than talk about it.",
        ],
        askEyebrow: "Questions",
        askTitle: "Call the office and ask.",
        askBody:
          "If you want to know whether there are still turkeys left on the day, or you are not sure you are in the right place, call us. Someone will pick up.",
        askCta: "Call 713-212-3003",
      },
      es: {
        title: "Entrega Gratis de Pavos en Houston — 21 de Nov | Andre Thomas Law",
        description:
          "Andre Thomas Law entrega 100 pavos gratis con todos los acompañamientos el sábado 21 de noviembre de 2026 en 13201 Northwest Freeway, Suite 485, Houston. Gratis, por orden de llegada, sin registro.",
        eyebrow: "Comunidad",
        titleLines: ["Entrega Gratis de Pavos", "en Houston"],
        lede:
          "Vamos a entregar 100 pavos con todos los acompañamientos el sábado 21 de noviembre. Venga al estacionamiento de nuestra oficina en Northwest Freeway. Es gratis y no hay nada que llenar.",
        name: "Entrega de Pavos 2026",
        summary:
          "Cien pavos con todos los acompañamientos, gratis, en el estacionamiento de nuestra oficina en Northwest Freeway.",
        notice: "Entregamos 100 pavos gratis el sábado 21 de noviembre.",
        whenWhereEyebrow: "Cuándo y dónde",
        whenWhereTitle: "El sábado por la mañana, en nuestro estacionamiento.",
        facts: [
          { label: "Día", value: ["Sábado 21 de noviembre de 2026"] },
          {
            label: "Hora",
            value: ["Comenzamos a las 10:00 de la mañana", "Seguimos hasta que se acaben los pavos"],
          },
          {
            label: "Lugar",
            value: [
              "El estacionamiento de nuestra oficina",
              "13201 Northwest Freeway, Suite 485",
              "Houston, TX 77040",
            ],
          },
          { label: "Costo", value: ["Gratis. Sin registro y sin papeleo."] },
        ],
        directions: "Abrir el mapa",
        flyerAlt:
          "Volante de la entrega de pavos de Acción de Gracias. El equipo de Andre Thomas Law afuera de la oficina de la firma en Houston, sobre una mesa de comida de Acción de Gracias.",
        howEyebrow: "Cómo funciona",
        howTitle: "Tres cosas que debe saber.",
        steps: [
          {
            title: "Solo venga",
            body:
              "No hay registro, no hay formulario y no hay que comprobar nada. No tiene que ser cliente de la firma. Venga como está.",
          },
          {
            title: "Por orden de llegada",
            body:
              "Tenemos 100 pavos y cada uno viene con los acompañamientos. Cuando se entregan todos, terminamos por ese día, así que es mejor llegar temprano.",
          },
          {
            title: "Entre a nuestro estacionamiento",
            body:
              "Vamos a estar afuera del edificio en 13201 Northwest Freeway. Busque nuestra mesa cerca de la entrada de la Suite 485 y alguien le ayuda.",
          },
        ],
        whyEyebrow: "Por qué lo hacemos",
        whyTitle: "Este barrio también es el nuestro.",
        whyBody: [
          "El Día de Acción de Gracias se vuelve caro muy rápido, y muchas familias del noroeste de Houston ya vienen apretadas cuando llega noviembre. Un pavo no debería ser lo que decide si una familia se sienta junta a la mesa.",
          "Nuestra oficina está en esta autopista y nuestros clientes viven en estas calles. Darle un pavo a un vecino es algo pequeño. Preferimos hacer lo pequeño que hablar de ello.",
        ],
        askEyebrow: "Preguntas",
        askTitle: "Llame a la oficina y pregunte.",
        askBody:
          "Si quiere saber si todavía quedan pavos ese día, o no está seguro de estar en el lugar correcto, llámenos. Alguien le contesta.",
        askCta: "Llame al 713-212-3003",
      },
    },
  },
];

/** The event with this localized slug, if the language has one. */
export const getEvent = (slug: string, lang: Lang): CommunityEvent | undefined =>
  events.find((e) => e.slug[lang] === slug);

export const getEventByKey = (key: string): CommunityEvent | undefined =>
  events.find((e) => e.key === key);

/** Local start and end as offset-bearing ISO strings, for `Event` markup. */
export const eventStart = (e: CommunityEvent) => `${e.date}T${e.start}:00${e.utcOffset}`;
export const eventEnd = (e: CommunityEvent) => `${e.date}T${e.end}:00${e.utcOffset}`;

/** Midnight at the end of the event day, so the page knows it is past. */
export const eventOver = (e: CommunityEvent, now = new Date()) =>
  now > new Date(`${e.date}T23:59:59${e.utcOffset}`);

/** Newest first, which is the order the hub should read in. */
export const eventsByDate = () =>
  [...events].sort((a, b) => b.date.localeCompare(a.date));
