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
  /**
   * CSS `object-position`, for a photograph whose subject is not in the
   * middle of the frame. The mosaic crops to its own cells, so a portrait
   * shot needs to say where the people are.
   */
  position?: string;
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
  recap?: {
    eyebrow: string;
    title: string;
    body: string[];
    /**
     * The homepage strip's sentence once the event is over, and the label on
     * its link. The strip carries these through the end of the event's year.
     */
    notice: string;
    cta: string;
  };
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
  /**
   * Open Graph image. Falls back to the flyer. Its alt text is the first
   * photograph's, since that is what it is cropped from.
   */
  ogImage?: { src: string; width: number; height: number };
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
    /**
     * A 1200 by 630 crop of the team photograph. A JPEG rather than WebP
     * because this one is only ever fetched by share-card scrapers, and not
     * all of them read WebP.
     */
    ogImage: {
      src: "/community/andre-thomas-law-turkey-drive-2026-og.jpg",
      width: 1200,
      height: 630,
    },
    /**
     * Mosaic order matters: wide, narrow, narrow, wide fills two even rows
     * of three columns, with each narrow cell stretched to its row.
     */
    photos: [
      {
        src: "/community/andre-thomas-law-turkey-drive-2026-team.webp",
        width: 1200,
        height: 1600,
        wide: true,
        position: "50% 55%",
        alt: {
          en: "The Andre Thomas Law team in maroon firm shirts under the firm's blue tent at the 2026 Thanksgiving turkey drive in Northwest Houston.",
          es: "El equipo de Andre Thomas Law con camisetas guinda de la firma bajo la carpa azul de la firma en la entrega de pavos de Acción de Gracias 2026 en el noroeste de Houston.",
        },
      },
      {
        src: "/community/andre-thomas-law-turkey-drive-2026-packing-bags.webp",
        width: 1200,
        height: 1600,
        position: "50% 58%",
        alt: {
          en: "Two Andre Thomas Law team members packing Thanksgiving grocery bags with boxes of mashed potatoes at the firm's free turkey giveaway in Houston.",
          es: "Dos integrantes del equipo de Andre Thomas Law llenando bolsas de comida de Acción de Gracias con cajas de puré de papa en la entrega gratis de pavos de la firma en Houston.",
        },
      },
      {
        src: "/community/andre-thomas-law-turkey-drive-2026-volunteers.webp",
        width: 1600,
        height: 1200,
        alt: {
          en: "Volunteers filling rows of Andre Thomas Law tote bags with Thanksgiving fixings in a Northwest Houston parking lot during the firm's annual turkey drive.",
          es: "Voluntarios llenando filas de bolsas de Andre Thomas Law con acompañamientos de Acción de Gracias en un estacionamiento del noroeste de Houston durante la entrega anual de pavos de la firma.",
        },
      },
      {
        src: "/community/andre-thomas-law-turkey-drive-2026-guilty-of-giving-back.webp",
        width: 1600,
        height: 891,
        wide: true,
        alt: {
          en: "Back of a maroon Andre Thomas Law volunteer shirt that reads Guilty of Giving Back, Proudly Serving Our Community, at the Houston turkey drive.",
          es: "Espalda de una camiseta guinda de voluntaria de Andre Thomas Law que dice Guilty of Giving Back, Proudly Serving Our Community, en la entrega de pavos en Houston.",
        },
      },
    ],
    copy: {
      en: {
        title: "Thanksgiving Turkey Drive in Houston, 2026 | Andre Thomas Law",
        description:
          "Andre Thomas Law gave away 100 free turkeys with all the fixings to Northwest Houston families on November 21, 2026. See photos from the firm's annual Thanksgiving turkey drive.",
        eyebrow: "Community",
        titleLines: ["Thanksgiving Turkey Drive", "in Houston"],
        lede:
          "On Saturday, November 21, 2026, we gave away 100 turkeys with all the fixings in the parking lot of our office on Northwest Freeway. Every one of them went home with a Houston family.",
        name: "Turkey Drive 2026",
        summary:
          "One hundred turkeys with all the fixings went home with Houston families from our office parking lot on Northwest Freeway.",
        notice: "We are giving away 100 free turkeys on Saturday, November 21.",
        whenWhereEyebrow: "When and where",
        whenWhereTitle: "A Saturday morning, in our parking lot.",
        facts: [
          { label: "Day", value: ["Saturday, November 21, 2026"] },
          {
            label: "Time",
            value: ["Started at 10:00 in the morning", "We stayed until the last turkey was gone"],
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
        howEyebrow: "How it worked",
        howTitle: "Three things about the day.",
        steps: [
          {
            title: "Nobody signed up",
            body:
              "There was no sign up, no form, and no proof of anything. Nobody had to be a client of the firm. People came as they were.",
          },
          {
            title: "First come, first served",
            body:
              "We had 100 turkeys and each one came with a bag of fixings. We handed them out in the order people arrived until they were gone.",
          },
          {
            title: "Right in our lot",
            body:
              "We set up under the firm's tent in the parking lot outside our building at 13201 Northwest Freeway.",
          },
        ],
        whyEyebrow: "Why we do this",
        whyTitle: "This is our neighborhood too.",
        whyBody: [
          "Thanksgiving gets expensive fast, and plenty of families around Northwest Houston are already stretched thin by the time November shows up. A turkey should not be the thing that decides whether a family sits down together.",
          "Our office is on this freeway and our clients live on these streets. Handing a neighbor a turkey is a small thing to do. We would rather do the small thing than talk about it.",
        ],
        askEyebrow: "Next year",
        askTitle: "We do this every November.",
        askBody:
          "The turkey drive is an annual event. If you want to know when the next one is, or you would like to help, call the office. Someone will pick up.",
        askCta: "Call 713-212-3003",
        /**
         * The firm's own words from its Google Business Profile post, with
         * the date, the count, and the place added so the page says what
         * happened to somebody who was not there.
         */
        recap: {
          eyebrow: "How it went",
          title: "Guilty of giving back.",
          body: [
            "We had an absolutely amazing turnout at our annual Turkey Drive. On Saturday, November 21, 2026, all 100 turkeys, each with a bag of fixings, went home with families from across Northwest Houston.",
            "At Andre Thomas Law we believe in serving our community, not just inside the courtroom. Thank you to everyone who came out and helped make this event a success.",
            "Happy Thanksgiving from all of us at Andre Thomas Law, PLLC, your Houston, Texas personal injury attorney.",
          ],
          notice: "Guilty of giving back: all 100 turkeys went home with Houston families.",
          cta: "See the photos",
        },
      },
      es: {
        title: "Entrega de Pavos de Acción de Gracias en Houston, 2026 | Andre Thomas Law",
        description:
          "Andre Thomas Law entregó 100 pavos gratis con todos los acompañamientos a familias del noroeste de Houston el 21 de noviembre de 2026. Vea las fotos de la entrega anual de pavos de la firma.",
        eyebrow: "Comunidad",
        titleLines: ["Entrega de Pavos", "en Houston"],
        lede:
          "El sábado 21 de noviembre de 2026 entregamos 100 pavos con todos los acompañamientos en el estacionamiento de nuestra oficina en Northwest Freeway. Todos se fueron a casa con una familia de Houston.",
        name: "Entrega de Pavos 2026",
        summary:
          "Cien pavos con todos los acompañamientos se fueron a casa con familias de Houston desde el estacionamiento de nuestra oficina en Northwest Freeway.",
        notice: "Entregamos 100 pavos gratis el sábado 21 de noviembre.",
        whenWhereEyebrow: "Cuándo y dónde",
        whenWhereTitle: "Un sábado por la mañana, en nuestro estacionamiento.",
        facts: [
          { label: "Día", value: ["Sábado 21 de noviembre de 2026"] },
          {
            label: "Hora",
            value: ["Comenzamos a las 10:00 de la mañana", "Nos quedamos hasta que se entregó el último pavo"],
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
        howEyebrow: "Cómo funcionó",
        howTitle: "Tres cosas sobre ese día.",
        steps: [
          {
            title: "Nadie se registró",
            body:
              "No hubo registro, ni formulario, ni que comprobar nada. Nadie tenía que ser cliente de la firma. La gente vino como estaba.",
          },
          {
            title: "Por orden de llegada",
            body:
              "Teníamos 100 pavos y cada uno venía con una bolsa de acompañamientos. Los entregamos en el orden en que llegó la gente, hasta que se acabaron.",
          },
          {
            title: "En nuestro estacionamiento",
            body:
              "Nos instalamos bajo la carpa de la firma, en el estacionamiento afuera de nuestro edificio en 13201 Northwest Freeway.",
          },
        ],
        whyEyebrow: "Por qué lo hacemos",
        whyTitle: "Este barrio también es el nuestro.",
        whyBody: [
          "El Día de Acción de Gracias se vuelve caro muy rápido, y muchas familias del noroeste de Houston ya vienen apretadas cuando llega noviembre. Un pavo no debería ser lo que decide si una familia se sienta junta a la mesa.",
          "Nuestra oficina está en esta autopista y nuestros clientes viven en estas calles. Darle un pavo a un vecino es algo pequeño. Preferimos hacer lo pequeño que hablar de ello.",
        ],
        askEyebrow: "El próximo año",
        askTitle: "Lo hacemos cada noviembre.",
        askBody:
          "La entrega de pavos es un evento anual. Si quiere saber cuándo es la próxima, o le gustaría ayudar, llame a la oficina. Alguien le contesta.",
        askCta: "Llame al 713-212-3003",
        recap: {
          eyebrow: "Cómo salió",
          title: "Culpables de devolverle a la comunidad.",
          body: [
            "Tuvimos una participación absolutamente increíble en nuestra entrega anual de pavos. El sábado 21 de noviembre de 2026, los 100 pavos, cada uno con una bolsa de acompañamientos, se fueron a casa con familias de todo el noroeste de Houston.",
            "En Andre Thomas Law creemos en servir a nuestra comunidad, no solo dentro de la sala del tribunal. Gracias a todos los que vinieron y ayudaron a que este evento fuera un éxito.",
            "Feliz Día de Acción de Gracias de parte de todos en Andre Thomas Law, PLLC, su abogado de lesiones personales en Houston, Texas.",
          ],
          notice:
            "Culpables de devolverle a la comunidad: los 100 pavos se fueron a casa con familias de Houston.",
          cta: "Ver las fotos",
        },
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

/**
 * Whether the homepage should still be pointing at this event's recap: it
 * is over, it has one, and the year it happened in has not ended.
 */
export const recapCurrent = (e: CommunityEvent, now = new Date()) =>
  eventOver(e, now) &&
  Boolean(e.copy.en.recap) &&
  now < new Date(`${Number(e.date.slice(0, 4)) + 1}-01-01T00:00:00${e.utcOffset}`);

/** Newest first, which is the order the hub should read in. */
export const eventsByDate = () =>
  [...events].sort((a, b) => b.date.localeCompare(a.date));
