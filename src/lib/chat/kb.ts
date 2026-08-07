import { firm, fullAddress, practiceAreas } from "@/lib/site";

export type Entry = {
  id: string;
  tags: string[];
  answer: string;
  /** Suggested follow-ups offered as chips after this answer. */
  next?: string[];
  link?: { label: string; href: string };
};

/**
 * The assistant's entire world. It answers from here and nowhere else —
 * every fact below already appears publicly on the site.
 */
export const knowledgeBase: Entry[] = [
  {
    id: "greeting",
    tags: ["hi", "hello", "hey", "good morning", "good afternoon", "greetings", "yo"],
    answer: `Hello — thanks for visiting ${firm.name}. I can answer questions about the firm, our practice areas, and how to reach Andre. What brings you here today?`,
    next: ["What areas do you handle?", "How much does a consultation cost?", "Where is the office?"],
  },
  {
    id: "hours",
    tags: ["hours", "open", "close", "closed", "what time", "weekend", "saturday", "sunday", "when are you open"],
    answer: `The office is open ${firm.hours}. If you reach out after hours, leave a message or use the contact form and someone will follow up.`,
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
    link: { label: "Go to the contact form", href: "/contact" },
    next: ["How much does a consultation cost?", "What are your hours?"],
  },
  {
    id: "consultation-cost",
    tags: ["free", "cost", "fee", "fees", "price", "charge", "how much", "expensive", "afford", "payment", "retainer", "consultation", "upfront"],
    answer: `The initial consultation is free. It costs nothing and commits you to nothing — the point is simply to find out where you stand. Any questions about fees for representation are something Andre will go over with you directly during that conversation.`,
    link: { label: "Request a free consultation", href: "/contact" },
    next: ["What happens after I reach out?", "What areas do you handle?"],
  },
  {
    id: "practice-overview",
    tags: ["practice areas", "what do you do", "what kind of cases", "types of cases", "services", "handle", "specialize", "areas of law"],
    answer: `The firm's practice is centered on personal injury — representing people hurt by someone else's negligence. That covers vehicle collisions, workplace and industrial injuries, maritime and offshore, premises liability, product defects, insurance disputes, and catastrophic injury and wrongful death, among others. Andre also defends clients facing felony and misdemeanor charges.`,
    link: { label: "See all practice areas", href: "/practice-areas" },
    next: ["Tell me about car accidents", "Do you handle criminal cases?", "How much does a consultation cost?"],
  },
  {
    id: "criminal",
    tags: ["criminal", "defense", "felony", "misdemeanor", "arrested", "charge", "charged", "charges", "dwi", "dui", "court date", "prosecuted"],
    answer: `Yes — alongside the personal injury practice, Andre defends clients facing felony and misdemeanor charges. He spent years as a prosecutor at the Shelby County, TN District Attorney's Office before moving into private practice, so he has worked criminal cases from both sides. For anything involving pending charges, please call ${firm.phone} directly rather than describing details here.`,
    link: { label: "Contact the firm", href: "/contact" },
  },
  {
    id: "about-andre",
    tags: ["who is andre", "about", "attorney", "lawyer", "background", "experience", "bio", "andre thomas", "qualified", "credentials", "prosecutor", "trials", "jury"],
    answer: `Andre Thomas is licensed in both Texas and Tennessee. He studied at the University of Memphis and earned his law degree at Texas Southern University's Thurgood Marshall School of Law. He served as a prosecutor at the Shelby County, TN District Attorney's Office, then spent years with the Tennessee Department of Safety and Homeland Security handling asset forfeiture matters. He now represents plaintiffs in personal injury cases and defends clients facing criminal charges, with a career that includes high-profile jury trials.`,
    link: { label: "Read the full bio", href: "/about" },
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
    link: { label: "Read client reviews", href: "/reviews" },
  },
  {
    id: "process",
    tags: ["what happens", "next steps", "process", "how does it work", "after i call", "expect", "timeline", "steps", "first step"],
    answer: `It starts with a free consultation — you explain what happened and Andre tells you honestly whether there's a case worth pursuing. From there, the work is preserving evidence before it disappears, building out the full picture of your injuries and losses, presenting the claim to the responsible parties and their insurers, and trying the case if they won't be reasonable.`,
    link: { label: "See how it works", href: "/#process" },
    next: ["How much does a consultation cost?", "What should I bring?"],
  },
  {
    id: "prepare",
    tags: ["bring", "prepare", "documents", "paperwork", "need for consultation", "what do i need"],
    answer: `Anything you already have is helpful — accident or police reports, photos, medical records and bills, insurance correspondence, and contact details for any witnesses. If you don't have any of it yet, that's fine. Come as you are; the firm can help track things down.`,
    link: { label: "Request a consultation", href: "/contact" },
  },
  {
    id: "insurance-adjuster",
    tags: ["adjuster", "insurance company called", "recorded statement", "settlement offer", "insurer", "claim denied", "lowball"],
    answer: `Insurance companies have a vested interest in minimizing payouts, and it's common for an adjuster to make contact early. I can't tell you what to do about a specific offer or statement — that's exactly the kind of question to put to Andre directly, and the consultation is free.`,
    link: { label: "Talk to Andre", href: "/contact" },
  },
  {
    id: "languages-social",
    tags: ["instagram", "social", "follow", "facebook", "social media"],
    answer: `The firm is on Instagram — that's the best place to follow along.`,
    link: { label: "Visit Instagram", href: firm.instagram },
  },
  {
    id: "areas-served",
    tags: ["serve", "area", "near me", "county", "harris", "do you cover", "cities", "statewide", "travel"],
    answer: `The office is in Houston and Andre is licensed across both Texas and Tennessee. If you're not sure whether your matter is one the firm can take on, the quickest way to find out is to call ${firm.phone}.`,
    link: { label: "Contact the firm", href: "/contact" },
  },
];

/**
 * How people actually describe what happened to them. Nobody types
 * "premises liability" — they type "I slipped at a store". Without this
 * layer, every plain-language description falls through to the fallback.
 */
const SYNONYMS: Record<string, string[]> = {
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
};

/** One entry per practice area, generated so the two can never drift apart. */
export const practiceEntries: Entry[] = practiceAreas.map((area) => ({
  id: `pa-${area.slug}`,
  tags: [
    area.name.toLowerCase(),
    ...area.name.toLowerCase().split(/[\s&]+/).filter((w) => w.length > 3),
    ...(SYNONYMS[area.slug] ?? []),
  ],
  answer: `${area.lede} ${area.body[0]}`,
  link: { label: `More on ${area.name}`, href: `/practice-areas/${area.slug}` },
  next: ["How much does a consultation cost?", "What happens after I reach out?"],
}));

export const allEntries = [...knowledgeBase, ...practiceEntries];

/* ─────────────────────────────────────────────────────────────
   Guardrails
   ───────────────────────────────────────────────────────────── */

export const DISCLAIMER =
  "I'm an automated assistant — not an attorney — and I can't give legal advice. Nothing here creates an attorney–client relationship.";

/** Questions only a lawyer may answer. Matched before retrieval runs. */
export const ADVICE_PATTERNS: RegExp[] = [
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
];

export const ADVICE_RESPONSE = `That's a question that genuinely depends on the specific facts of your situation, and answering it would be giving legal advice — which I'm not able to do. It's exactly the right question for Andre, though, and the consultation is free. Call ${firm.phone} or send a message through the contact form and you'll get a real answer from an attorney.`;

/** If someone appears to be in danger, that outranks everything else. */
export const EMERGENCY_PATTERNS: RegExp[] = [
  /\b(emergency|right now i'?m|happening now|just happened.*bleeding|can'?t breathe|unconscious|suicid|kill myself|dying)\b/i,
];

export const EMERGENCY_RESPONSE =
  "If this is an emergency or anyone is in danger, please call 911 right away. This chat isn't monitored in real time and can't help with an emergency.";

/** Refuse to become a repository for case details. */
export const SENSITIVE_PATTERNS: RegExp[] = [
  /\b\d{3}[- ]?\d{2}[- ]?\d{4}\b/, // SSN-shaped
  /\b(social security|ssn|date of birth|dob|credit card|bank account|policy number)\b/i,
];

export const SENSITIVE_RESPONSE = `Please don't share personal or confidential details here — this chat isn't a secure or private channel, and no attorney–client relationship exists yet. Call ${firm.phone} or use the contact form to speak with the firm directly.`;

export const FALLBACK = `I'm not certain I have that one. I can help with practice areas, the firm's background, office hours and location, or how to get a free consultation — and for anything beyond that, calling ${firm.phone} will get you a real answer faster than I can.`;

export const OPENERS = [
  "What areas do you handle?",
  "How much does a consultation cost?",
  "Who is Andre Thomas?",
  "Where is the office?",
];
