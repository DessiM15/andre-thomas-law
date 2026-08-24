import type { AreaKey, GroupId } from "@/lib/media";
import type { TeamId } from "@/lib/team";

/**
 * The shape of one language's copy. Both `en.ts` and `es.ts` are typed
 * against this, so a missing or renamed Spanish string is a build error
 * rather than an English word surfacing on a Spanish page.
 */

export type PracticeArea = {
  /** Stable across languages — the toggle maps one language to the other with it. */
  key: AreaKey;
  /** Localized: `car-accidents` / `accidentes-de-auto`. */
  slug: string;
  name: string;
  group: GroupId;
  short: string;
  lede: string;
  body: string[];
  covers: string[];
};

export type PracticeGroup = {
  id: GroupId;
  label: string;
  n: string;
  blurb: string;
  alt: string;
};

/**
 * One person's language-specific copy. The photograph, name, and slug live in
 * `lib/team.ts`; this is only what changes between English and Spanish, keyed
 * back to that person by `id`.
 */
export type TeamBio = {
  id: TeamId;
  role: string;
  /** The single line under the name — bar admissions, or a certification. */
  credential: string;
  /** The two-line teaser on the list page. Kept short enough to clamp cleanly. */
  preview: string;
  /** Full biography, on the detail page. */
  bio: string[];
  /** Accolades and accomplishments, as label/value pairs. */
  highlights: { label: string; value: string }[];
  /** What this person actually handles, day to day. */
  focus: string[];
  alt: string;
};

export type Panel = { n: string; title: string; body: string; alt: string };
export type Pillar = { n: string; title: string; body: string };
export type Step = { n: string; title: string; body: string };
export type NavKey =
  | "home"
  | "practiceAreas"
  | "about"
  | "team"
  | "reviews"
  | "contact";
export type NavItem = { key: NavKey; label: string };

export type Meta = { title: string; description: string };

export type LegalSection = { h: string; p: string[] };

export type Content = {
  tagline: string;
  subTagline: string;
  hours: string;

  /** The rotating hero word: "Empowering your voice. Ensuring ___" */
  heroWords: string[];

  bio: {
    heading: string;
    paragraphs: string[];
    education: { school: string; detail: string }[];
    career: { year: string; role: string; org: string; detail: string }[];
    notableTrials: { caption: string }[];
  };

  whyFirm: { heading: string; lede: string };
  advocatePanels: Panel[];
  pillars: Pillar[];
  practiceGroups: PracticeGroup[];
  practiceAreas: PracticeArea[];
  featuredAlts: Partial<Record<AreaKey, string>>;

  /** Ordered by `lib/team.ts`, not by this array. */
  team: TeamBio[];

  /** Quotes are reproduced exactly as clients published them and are never
   *  translated; only the surrounding labels and date format change. */
  reviews: { quote: string; author: string; date: string; truncated: boolean }[];

  process: Step[];
  nav: NavItem[];

  ui: {
    skipToContent: string;
    freeConsultation: string;
    callPhone: string;
    sendMessage: string;
    learnMore: string;
    viewAll: string;
    homeAria: string;
    openMenu: string;
    closeMenu: string;
    instagram: string;
    switchLangLabel: string;
    switchLangAria: string;

    banner: { question: string; action: string; dismiss: string };

    /**
     * Intake screening, shared by the web form and the chat so a lead reads
     * the same either way. `key` is stable across languages — the server maps
     * it to an English label and a triage flag, because the firm reads the
     * email in English however the visitor answered.
     */
    qualify: {
      when: string;
      whenPlaceholder: string;
      whenOptions: { key: string; label: string }[];
      doctor: string;
      doctorPlaceholder: string;
      doctorOptions: { key: string; label: string }[];
    };

    preloader: { place: string; est: string };

    hero: {
      place: string;
      licensed: string;
      titleLines: string[];
      ensuring: string;
      lede: string;
      reviewsSuffix: string;
      twoBars: string;
      formerProsecutor: string;
    };

    why: { eyebrow: string; titleLines: string[] };

    featured: {
      eyebrow: string;
      titleLines: string[];
      all: string;
      alsoHandled: string;
      explore: string;
    };

    aboutPreview: {
      eyebrow: string;
      notableTrials: string;
      readFull: string;
      role: string;
      portraitAlt: string;
    };

    reviewsBand: {
      eyebrow: string;
      googleReviews: string;
      readAll: string;
      readFull: string;
      footnote: string;
    };

    cta: {
      eyebrow: string;
      titleA: string;
      titleB: string;
      body: string;
      call: string;
      email: string;
      office: string;
    };

    form: {
      name: string;
      phone: string;
      email: string;
      matter: string;
      matterPlaceholder: string;
      criminalDefense: string;
      somethingElse: string;
      message: string;
      sending: string;
      submit: string;
      footnote: string;
      doneTitle: string;
      doneBody: [string, string];
      checkDetails: string;
      couldNotSend: string;
      errName: string;
      errPhone: string;
      errEmail: string;
      errLong: string;
      errServer: string;
    };

    footer: {
      cta: string;
      navigate: string;
      practiceAreas: string;
      office: string;
      fax: string;
      legal: string;
      rights: string;
      disclaimer: string;
      privacy: string;
      poweredBy: string;
    };

    area: {
      crumb: string;
      covers: string;
      consultTitle: string;
      consultBody: string;
      licensedNote: string;
      others: string;
      alsoUnder: string;
      fallbackEyebrow: string;
      representation: string;
    };

    notFound: {
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
    };

    chat: {
      greeting: string;
      title: string;
      status: string;
      open: string;
      close: string;
      nudge: string;
      nudgeCta: string;
      placeholder: string;
      inputAria: string;
      sendAria: string;
      dialogAria: string;
      confidential: string;
      unreachable: string;
      nudgeDismiss: string;

      /** The callback-capture flow inside the widget. */
      lead: {
        offer: string;
        /**
         * Used when the visitor has described an injury rather than merely
         * asked. Goes straight to the first question — someone who has just
         * said they were hurt has already answered "do you want help?".
         */
        hotOpener: string;
        offerYes: string;
        offerNo: string;
        askName: string;
        askPhone: string;
        askWhen: string;
        askDoctor: string;
        askEmail: string;
        skip: string;
        badName: string;
        badPhone: string;
        badEmail: string;
        sending: string;
        done: string;
        failed: string;
        declined: string;
      };
    };
  };

  pages: {
    home: Meta;
    about: Meta & {
      eyebrow: string;
      titleLines: string[];
      lede: string;
      skylineAlt: string;
      portraitAlt: string;
      barAdmissions: string;
      education: string;
      pathEyebrow: string;
      pathTitle: string;
      trialsEyebrow: string;
      trialsTitle: string;
      trialsNote: string;
      meansEyebrow: string;
      seePracticeAreas: string;
      bridgeAlt: string;
    };
    practiceAreas: Meta & {
      eyebrow: string;
      titleLines: string[];
      lede: string;
      heroAlt: string;
      alsoHandled: string;
      criminalTitle: string;
      criminalBody: string;
      criminalCta: string;
      listName: string;
    };
    reviews: Meta & {
      eyebrow: string;
      titleLines: string[];
      lede: string;
      whyEyebrow: string;
      whyTitle: string;
      whyBody: string;
      readOnGoogle: string;
    };
    contact: Meta & {
      eyebrow: string;
      titleLines: string[];
      lede: string;
      heroAlt: string;
      requestEyebrow: string;
      officeEyebrow: string;
      phone: string;
      email: string;
      address: string;
      hours: string;
      licensedIn: string;
      mapTitle: string;
      nextEyebrow: string;
      nextTitle: string;
      formNote: string;
    };
    team: Meta & {
      eyebrow: string;
      titleLines: string[];
      lede: string;
      heroAlt: string;
      attorneysEyebrow: string;
      attorneysTitle: string;
      staffEyebrow: string;
      staffTitle: string;
      readBio: string;
      /** Shown only while `TEAM_PLACEHOLDER` is true. */
      draftNotice: string;
      member: {
        crumb: string;
        highlightsEyebrow: string;
        focusEyebrow: string;
        bioEyebrow: string;
        contactEyebrow: string;
        contactTitle: string;
        contactBody: string;
        othersEyebrow: string;
        othersTitle: string;
        seeAll: string;
      };
    };
    privacy: Meta & { eyebrow: string; heading: string; sections: LegalSection[] };
    disclaimer: Meta & {
      eyebrow: string;
      heading: string;
      sections: LegalSection[];
      questions: [string, string, string];
    };
  };

  /** Breadcrumb + schema labels that appear inside structured data. */
  schema: { home: string; practiceAreas: string };
};
