/**
 * Single source of truth for every fact on this site.
 * Content is drawn from andrethomaslaw.com — no outcomes, figures, or
 * credentials are asserted here that the firm does not already publish.
 */

export const SITE_URL = "https://andrethomaslaw.com";

export const firm = {
  name: "Andre Thomas Law, PLLC",
  shortName: "Andre Thomas Law",
  attorney: "Andre Thomas",
  tagline: "Empowering Your Voice, Ensuring Justice",
  subTagline: "A Compassionate Advocate for Justice",

  phone: "713-212-3003",
  phoneHref: "tel:+17132123003",
  fax: "346-663-4050",
  email: "AT@andrethomaslaw.com",
  emailHref: "mailto:AT@andrethomaslaw.com",

  address: {
    street: "13201 Northwest Freeway",
    suite: "Suite 485",
    city: "Houston",
    state: "Texas",
    stateCode: "TX",
    zip: "77040",
    country: "United States",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=13201+Northwest+Freeway+Suite+485+Houston+TX+77040",

  hours: "Monday – Friday · 9:00 am – 5:00 pm",
  hoursSchema: "Mo-Fr 09:00-17:00",

  barAdmissions: ["Texas", "Tennessee"],

  instagram:
    "https://www.instagram.com/andrethomaslaw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",

  reviews: {
    rating: 4.9,
    count: 60,
    url: "https://www.google.com/search?q=andre+thomas+law&sca_esv=a6e07816c90ab268&ei=mXJ1apriCZukqtsPtI3w-AY&gs_ssp=eJzj4tVP1zc0rDSuqjAqyK4wYLRSNaiwMDMxSEozsUhKM0lLNUo1tzKoMDE1SjI0MTUzTk4ztUw2S_YSSMxLKUpVKMnIz00sVshJLAcA-L8Vvg&oq=andre+&sclient=gws-wiz-serp",
  },
} as const;

export const fullAddress = `${firm.address.street}, ${firm.address.suite}, ${firm.address.city}, ${firm.address.state} ${firm.address.zip}`;

/* ─────────────────────────────────────────────────────────────
   The rotating hero word. "Empowering your voice. Ensuring ___"
   ───────────────────────────────────────────────────────────── */
export const heroWords = ["justice", "recovery", "dignity", "answers"] as const;

/* ─────────────────────────────────────────────────────────────
   Attorney bio — verbatim substance from the firm's About page
   ───────────────────────────────────────────────────────────── */
export const bio = {
  heading: "Meet Andre Thomas: Committed to Justice",
  paragraphs: [
    "With licensure in both Tennessee and Texas, Andre Thomas is a seasoned attorney with a formidable presence. Andre's legal journey is marked by high-profile trials that underscore his exceptional skills and dedication to justice.",
    "His passion for law was cultivated at the University of Memphis. He further honed his legal acumen at Texas Southern University's Thurgood Marshall School of Law.",
    "Andre's career has seen him serve as a prosecutor at the Shelby County, TN District Attorney's Office, where he adeptly handled felonies and misdemeanors. He then devoted many years to the State of Tennessee Department of Safety and Homeland Security, defending the state in intricate asset forfeiture matters.",
    "Now in private practice, Andre has emerged as a champion for justice. He represents plaintiffs in personal injury cases and defends clients facing felony and misdemeanor charges. His unwavering commitment shines through in his successful advocacy, including jury trials.",
  ],
  education: [
    { school: "Texas Southern University", detail: "Thurgood Marshall School of Law" },
    { school: "University of Memphis", detail: "Undergraduate studies" },
  ],
  career: [
    {
      year: "Then",
      role: "Assistant District Attorney",
      org: "Shelby County, TN District Attorney's Office",
      detail: "Handled felony and misdemeanor prosecutions.",
    },
    {
      year: "Next",
      role: "Attorney",
      org: "TN Department of Safety & Homeland Security",
      detail: "Defended the state in complex asset forfeiture matters.",
    },
    {
      year: "Now",
      role: "Founding Attorney",
      org: "Andre Thomas Law, PLLC",
      detail:
        "Represents plaintiffs in personal injury cases and defends clients facing felony and misdemeanor charges.",
    },
  ],
  notableTrials: [
    { caption: "State of Tennessee v. Billy Ray Turner" },
    { caption: "State of Tennessee v. Tedarrius Bean" },
  ],
} as const;

/* ─────────────────────────────────────────────────────────────
   Why Andre Thomas Law, PLLC — the firm's own words, verbatim
   ───────────────────────────────────────────────────────────── */
export const whyFirm = {
  heading: "Why Andre Thomas Law, PLLC",
  lede: "Choosing Andre Thomas Law, PLLC means partnering with a legal advocate who combines a profound understanding of the law with compassion for your situation. With Andre Thomas, you gain a dedicated ally for justice and success, backed by a passion that has been his driving force since childhood.",
} as const;

/* The three pillars from the firm's own site, verbatim, as image panels. */
export const advocatePanels = [
  {
    n: "01",
    title: "Core Values and Approach",
    body: "Andre Thomas's legal practice revolves around client-centric values, including diligent work, determination, and empathy. He treats clients as he would wish to be treated, delivering steadfast support and securing favorable outcomes. Renowned for professionalism and dedication, Andre stands by his clients, offering unwavering commitment on their toughest days.",
    image: "/stock/panel-values.webp",
    alt: "A law library with bound volumes and a figure of Lady Justice",
  },
  {
    n: "02",
    title: "Experience and Expertise",
    body: "Andre Thomas's specialization in Personal Injury law signifies his deep expertise in this intricate domain. His impactful contributions are evident in cases like State of TN v Billy Ray Turner and State of TN v Tedarrius Bean. Cases such as these have earned him the reputation of exuding unwavering dedication and legal acumen necessary to deliver justice to his clients.",
    image: "/stock/panel-experience.webp",
    alt: "The columned facade and steps of a county courthouse",
  },
  {
    n: "03",
    title: "Client-Centered Approach",
    body: "For Andre, prioritizing his clients' needs and concerns is non-negotiable. He believes in identifying their requirements early and addressing each one with precision. His commitment to understanding their situation and crafting tailored legal strategies is unwavering.",
    image: "/stock/panel-client.webp",
    alt: "An attorney in consultation with clients across a desk",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Supporting proof points — grounded in his actual résumé
   ───────────────────────────────────────────────────────────── */
export const pillars = [
  {
    n: "01",
    title: "He prosecuted before he protected",
    body: "Years inside the Shelby County District Attorney's Office mean Andre has built cases from the other side of the table. He knows how they're assembled — and where they come apart.",
  },
  {
    n: "02",
    title: "Licensed in two states",
    body: "Admitted in both Texas and Tennessee. Two bars, two court systems, one attorney who does not have to hand your file to someone else when the case crosses a state line.",
  },
  {
    n: "03",
    title: "Tried in front of juries",
    body: "High-profile trials, argued to verdict. Insurers price a case differently when the attorney across from them is genuinely willing to try it.",
  },
  {
    n: "04",
    title: "You talk to the attorney",
    body: "Diligence, determination, and empathy — a practice built around the client's needs and concerns, not around a call center.",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Practice areas — all sixteen the firm lists
   ───────────────────────────────────────────────────────────── */
export type PracticeArea = {
  slug: string;
  name: string;
  group: (typeof practiceGroups)[number]["id"];
  short: string;
  lede: string;
  body: string[];
  covers: string[];
};

export const practiceGroups = [
  {
    id: "foundation",
    label: "The Foundation",
    n: "01",
    blurb: "Where every claim starts: someone else was careless, and you are the one carrying it.",
    image: "/stock/pa-hero-crash.webp",
    alt: "A wrecked car at the roadside in morning fog",
  },
  {
    id: "road",
    label: "On the Road",
    n: "02",
    blurb: "Collisions with cars, trucks, motorcycles, and impaired drivers.",
    image: "/stock/grp-road.webp",
    alt: "The wheels of a tractor-trailer throwing spray on a wet highway",
  },
  {
    id: "work",
    label: "On the Job",
    n: "03",
    blurb: "Construction, industrial, maritime, and rail — the places Texas gets built and moved.",
    image: "/stock/grp-work.webp",
    alt: "A construction worker on rebar high above a building site",
  },
  {
    id: "property",
    label: "On the Property",
    n: "04",
    blurb: "Hazards someone else was responsible for finding and fixing.",
    image: "/stock/grp-property.webp",
    alt: "A caution wet floor sign in a supermarket aisle",
  },
  {
    id: "aftermath",
    label: "When It's Worst",
    n: "05",
    blurb: "Catastrophic injury, wrongful death, and the insurers who would rather not pay.",
    image: "/stock/grp-aftermath.webp",
    alt: "A tanker truck on a dark highway at night",
  },
] as const;

export const practiceAreas: PracticeArea[] = [
  {
    slug: "personal-injury",
    name: "Personal Injury",
    group: "foundation",
    short:
      "No one should carry the medical bills and the emotional weight of an accident they did not cause.",
    lede: "No one should be burdened with medical expenses and emotional distress stemming from an accident they did not cause.",
    body: [
      "A personal injury case begins the moment someone else's carelessness changes the shape of your life. The bills arrive on schedule. The pain does not keep office hours. And somewhere across town, an adjuster has already opened a file on you and started building a reason to pay less.",
      "Andre Thomas represents people injured by the negligence of others, pursuing the compensation they are rightfully owed from the parties responsible. That means the medical care already received and the care still to come, the wages lost, the property destroyed, and the human cost that does not fit neatly on an invoice.",
      "The consultation costs nothing. Knowing where you stand is worth having regardless of what you decide to do next.",
    ],
    covers: [
      "Medical expenses — past, ongoing, and anticipated",
      "Lost wages and diminished earning capacity",
      "Property damage",
      "Pain, suffering, and emotional distress",
      "Negotiation with insurers — and litigation when they will not be reasonable",
    ],
  },
  {
    slug: "car-accidents",
    name: "Car Accidents",
    group: "road",
    short:
      "A collision rearranges everything at once — bills, wages, transportation, routine.",
    lede: "When a collision disrupts your life, the financial burden should not fall on you.",
    body: [
      "A car accident does not stay inside the intersection where it happened. It follows you into the emergency room, into the repair estimate, into the paychecks you miss, and into the phone calls from an adjuster who sounds friendly and is taking notes.",
      "Andre Thomas helps people whose lives were interrupted by a vehicle collision — addressing medical bills, property damage, lost wages, and the other financial burdens that arrive without warning — and guides them through the legal process required to secure the compensation they are entitled to.",
      "The most useful thing you can do early is talk to an attorney before you give a recorded statement. The second most useful thing is to keep every document you receive.",
    ],
    covers: [
      "Rear-end, intersection, and highway collisions",
      "Hit-and-run and uninsured or underinsured motorist claims",
      "Rideshare and commercial vehicle collisions",
      "Property damage and diminished value",
      "Dealing with the other driver's insurer on your behalf",
    ],
  },
  {
    slug: "truck-accidents",
    name: "Truck Accidents",
    group: "road",
    short:
      "Trucking companies bring a legal team to the scene. You should not face that alone.",
    lede: "Trucking companies resist liability. Andre Thomas confronts their legal teams to secure justice for the people they injured.",
    body: [
      "A fully loaded commercial truck can weigh twenty times what your car does. The physics are not a fair fight, and neither is what follows: trucking companies and their insurers often have investigators moving before the road is even clear, and they are not gathering evidence on your behalf.",
      "These cases involve parties a car accident never touches — the driver, the motor carrier, the company that loaded the trailer, the outfit responsible for maintenance. Federal regulations, driver logs, and vehicle data can all matter, and some of it does not survive long without a preservation demand.",
      "Andre Thomas confronts trucking companies' legal teams directly to secure justice for the people they injured, despite their resistance to accepting liability.",
    ],
    covers: [
      "18-wheeler and tractor-trailer collisions",
      "Driver fatigue and hours-of-service violations",
      "Improper loading and cargo shift",
      "Maintenance and equipment failures",
      "Claims against motor carriers, not just drivers",
    ],
  },
  {
    slug: "motorcycle-accidents",
    name: "Motorcycle Accidents",
    group: "road",
    short:
      "Riders face injuries and assumptions that other drivers never do.",
    lede: "Trial-tested experience in cases precisely like yours.",
    body: [
      "Motorcycle cases carry a second injury built into them: the assumption. Insurers and juries too often arrive believing the rider must have been speeding, weaving, or asking for it — before a single fact is established.",
      "The physical injuries are also categorically different. With no cage and no crumple zone, a collision that would leave a driver shaken leaves a rider in surgery. That gap between what happened and what people assume happened has to be closed with evidence.",
      "Andre Thomas brings trial-tested experience to cases precisely like yours, addressing the unique challenges riders face both on the road and in the claims process that follows.",
    ],
    covers: [
      "Left-turn and lane-change collisions",
      "Road hazard and unsafe roadway claims",
      "Catastrophic and orthopedic injuries",
      "Countering rider-bias in negotiation and at trial",
      "Helmet and gear evidence handled correctly",
    ],
  },
  {
    slug: "drunk-driving-injuries",
    name: "Drunk Driving Injuries",
    group: "road",
    short:
      "Liability may not stop with the driver who was over the limit.",
    lede: "Complex liability, including establishments that continued serving an obviously intoxicated patron.",
    body: [
      "Being hit by an impaired driver produces a specific kind of anger, because the harm was not simply careless — it was chosen, repeatedly, by someone who had every chance to stop.",
      "These cases carry a layer that ordinary collisions do not. Under Texas dram shop law, a bar or establishment that continued serving a patron who was obviously intoxicated may share responsibility for what that patron did afterward. That matters enormously when the driver's own coverage cannot begin to address the harm done.",
      "Andre Thomas handles the complex liability questions these cases raise — including claims against the establishments that over-served — as a former prosecutor who understands how the parallel criminal case fits alongside your civil claim.",
    ],
    covers: [
      "Claims against the impaired driver",
      "Dram shop claims against over-serving establishments",
      "Coordinating with the parallel criminal proceeding",
      "Uninsured and underinsured motorist coverage",
      "Wrongful death arising from impaired driving",
    ],
  },
  {
    slug: "construction-accidents",
    name: "Construction Accidents",
    group: "work",
    short:
      "One of the most dangerous ways to earn a living in Texas.",
    lede: "Construction is among the most perilous professions. When it injures you, the paperwork should not be your problem.",
    body: [
      "Construction is among the most perilous professions in the country, and Texas builds more than almost anywhere. Falls, struck-by incidents, trench collapses, crane and equipment failures, electrocution — the hazards are known, documented, and preventable, which is precisely why someone is usually accountable when they are not prevented.",
      "These cases are complicated by how modern jobsites are staffed. General contractors, subcontractors, staffing agencies, equipment lessors, and property owners all share a site, and responsibility does not always sit with the company whose name is on your paycheck.",
      "Andre Thomas assists injured workers through the workers' compensation system and pursues personal injury actions against the parties responsible — including third parties a comp claim alone will never reach.",
    ],
    covers: [
      "Falls from height, scaffolding, and ladder failures",
      "Struck-by and caught-between incidents",
      "Trench and excavation collapses",
      "Crane, lift, and heavy equipment failures",
      "Third-party claims alongside workers' compensation",
    ],
  },
  {
    slug: "workplace-injuries",
    name: "Workplace Injuries",
    group: "work",
    short:
      "Injured because an employer cut a corner — and now buried in paperwork.",
    lede: "When employer negligence injures you, the claims process should not injure you a second time.",
    body: [
      "Texas is unusual: employers here are not required to carry workers' compensation. That single fact changes the entire landscape of a workplace injury, and most injured workers do not learn it until they are already in the middle of one.",
      "Whether your employer is a subscriber or a non-subscriber determines what you can claim, from whom, and on what timeline. Get that wrong at the start and options close quietly.",
      "Andre Thomas supports employees injured by employer negligence — managing the paperwork, calculating the full scope of damages, and negotiating the settlement, so that recovering from the injury does not become a second full-time job.",
    ],
    covers: [
      "Subscriber and non-subscriber employer claims",
      "Repetitive stress and occupational injuries",
      "Machinery and equipment injuries",
      "Damage calculation and settlement negotiation",
      "Retaliation concerns after reporting an injury",
    ],
  },
  {
    slug: "plant-refinery-accidents",
    name: "Plant & Refinery Accidents",
    group: "work",
    short:
      "Along the Gulf Coast, a neglected safety regulation is measured in lives.",
    lede: "Industrial injuries where safety regulations were neglected.",
    body: [
      "The petrochemical corridor running out of Houston is one of the largest industrial complexes on earth, and the margin for error inside it is thin. Explosions, flash fires, chemical exposure, and pressure releases do not produce minor injuries — they produce burn units, respiratory damage, and funerals.",
      "Safety regulations in these facilities exist because the consequences of ignoring them are known in advance. When a company neglects them anyway, that is not an accident in any meaningful sense of the word.",
      "Andre Thomas handles industrial workplace injuries where safety regulations were neglected, including claims involving contractors and third parties operating inside plant facilities.",
    ],
    covers: [
      "Explosions, flash fires, and burn injuries",
      "Toxic chemical exposure and inhalation injuries",
      "Contractor and third-party claims inside plants",
      "Safety regulation and OSHA violations",
      "Catastrophic injury and wrongful death",
    ],
  },
  {
    slug: "maritime-offshore-injuries",
    name: "Maritime & Offshore Injuries",
    group: "work",
    short:
      "Injured on the water, and ordinary injury law does not apply.",
    lede: "Admiralty law covering seamen, offshore workers, and cruise ship passengers.",
    body: [
      "Maritime injuries are governed by their own body of law, developed over centuries and largely unfamiliar to attorneys who do not practice in it. The Jones Act, maintenance and cure, and unseaworthiness doctrines create rights that no land-based injury claim contains — and deadlines that can be shorter than you expect.",
      "Whether you are a seaman under the Jones Act, a dockworker or platform hand covered by the Longshore and Harbor Workers' Compensation Act, or a passenger injured aboard a vessel, the framework that applies to you determines nearly everything about your claim.",
      "Andre Thomas navigates admiralty law on behalf of seamen, offshore workers, and cruise ship passengers injured in accidents on the water.",
    ],
    covers: [
      "Jones Act claims for seamen",
      "Maintenance and cure",
      "Unseaworthiness claims",
      "Longshore and harbor worker claims",
      "Cruise ship and passenger injuries",
    ],
  },
  {
    slug: "railroad-accidents",
    name: "Railroad Accidents",
    group: "work",
    short:
      "Among the most devastating vehicle-related incidents there are.",
    lede: "Determining liability and pursuing full recovery after a railroad incident.",
    body: [
      "Railroad accidents are among the most devastating vehicle-related incidents that occur. A train cannot swerve and cannot stop quickly, which means the consequences of a malfunctioning crossing signal, obstructed sightline, or human error are absorbed entirely by whoever is in the way.",
      "Liability in these cases is rarely obvious. Railroad companies, crossing maintenance contractors, equipment manufacturers, and municipal authorities may each hold a piece of it, and federal railroad regulation shapes the claim in ways that ordinary vehicle law does not.",
      "Andre Thomas works to determine where responsibility actually lies and to pursue the fullest recovery available for those injured — including railroad employees with claims under FELA.",
    ],
    covers: [
      "Grade crossing collisions and signal failures",
      "Pedestrian and trespasser incidents",
      "FELA claims for railroad employees",
      "Equipment and maintenance failures",
      "Catastrophic injury and wrongful death",
    ],
  },
  {
    slug: "premises-liability",
    name: "Premises Liability",
    group: "property",
    short:
      "You were hurt somewhere the owner was supposed to keep safe.",
    lede: "Injuries suffered on another's property because it was not maintained as it should have been.",
    body: [
      "Property owners owe the people they invite onto their property a duty of reasonable care. A grocery store, an apartment complex, a parking garage, a hotel — each is expected to find hazards, fix them, and warn people in the meantime.",
      "The defense in these cases is almost always the same: they did not know about the hazard, or it was obvious enough that you should have avoided it. Both arguments are beatable, but they are beaten with evidence — incident reports, maintenance logs, surveillance footage — much of which is routinely overwritten within weeks.",
      "Andre Thomas pursues compensation for injuries suffered on another party's property due to negligent maintenance, and moves quickly to preserve the record before it disappears.",
    ],
    covers: [
      "Slip, trip, and fall injuries",
      "Inadequate security and assault on premises",
      "Falling merchandise and structural failures",
      "Poor lighting and unmarked hazards",
      "Preservation of surveillance and maintenance records",
    ],
  },
  {
    slug: "product-defects",
    name: "Product Defects",
    group: "property",
    short:
      "The product was unreasonably dangerous, and it reached you anyway.",
    lede: "Challenging manufacturers who release unreasonably dangerous or defective products.",
    body: [
      "You are entitled to assume that what you buy will not injure you when used the way it was meant to be used. When a product is defectively designed, manufactured badly, or sold without the warnings it needed, that assumption becomes a serious injury.",
      "Product cases can reach the entire chain — manufacturer, distributor, retailer — and they frequently require preserving the product itself. If you have been injured by something you bought, do not discard it, repair it, or return it before speaking with an attorney. It is the evidence.",
      "Andre Thomas challenges manufacturers who release unreasonably dangerous or defective products into the hands of consumers.",
    ],
    covers: [
      "Design and manufacturing defects",
      "Failure to warn and inadequate instructions",
      "Automotive and tire defects",
      "Defective machinery and tools",
      "Preserving the product as evidence",
    ],
  },
  {
    slug: "dog-bites",
    name: "Dog Bites",
    group: "property",
    short:
      "The consequences reach far past the wound itself.",
    lede: "Physical, emotional, and financial consequences that are far-reaching — in both Texas and Tennessee.",
    body: [
      "A dog attack is traumatic in a way the medical record does not capture. The physical injuries can be severe — particularly for children, who are bitten on the face and neck far more often than adults — and what follows can include reconstructive surgery, permanent scarring, and a fear that does not fade on the same schedule as the wound.",
      "Texas and Tennessee handle owner liability differently, and the rules governing what an owner knew about their animal's history can decide a case. Being licensed in both states means these cases do not have to be referred out when they cross a line on a map.",
      "Andre Thomas guides bite victims through the legal complexities in both jurisdictions, addressing the physical, emotional, and financial consequences that are genuinely far-reaching.",
    ],
    covers: [
      "Owner liability in Texas and Tennessee",
      "Injuries to children",
      "Scarring, disfigurement, and reconstructive care",
      "Emotional trauma and psychological injury",
      "Homeowner and renter insurance claims",
    ],
  },
  {
    slug: "drowning-accidents",
    name: "Drowning Accidents",
    group: "property",
    short:
      "A pool owner had a duty. It was not met.",
    lede: "Pool-related injuries where owners failed in their safety obligations.",
    body: [
      "Drowning is the leading cause of accidental death for young children in this country, and it is nearly always preventable. Pool owners — private homeowners, apartment complexes, hotels, and municipalities alike — carry real obligations: functioning barriers, self-latching gates, working drain covers, adequate supervision, and clear warnings.",
      "Non-fatal drownings deserve equal seriousness. Oxygen deprivation can cause permanent brain injury requiring a lifetime of care, and the value of such a claim has to account for decades, not months.",
      "Andre Thomas pursues compensation where negligent conditions or inadequate warnings led to a drowning, on behalf of the injured and of families who lost someone.",
    ],
    covers: [
      "Inadequate fencing, gates, and barriers",
      "Absent or insufficient supervision",
      "Defective drains and pool equipment",
      "Apartment, hotel, and public pool claims",
      "Brain injury from non-fatal drowning; wrongful death",
    ],
  },
  {
    slug: "insurance-claims",
    name: "Insurance Claims",
    group: "aftermath",
    short:
      "Your insurer's interests and yours are not the same. They never were.",
    lede: "Insurance companies have a vested interest in minimizing payouts to claimants.",
    body: [
      "Insurance companies have a vested interest in minimizing payouts to claimants. This is not cynicism — it is the business model, and it is entirely legal right up to the point where it isn't.",
      "The tactics are consistent and recognizable: the fast lowball offer before the full extent of an injury is known, the recorded statement used to manufacture inconsistency, the delay that outlasts your patience, the denial that assumes you will not push back. Texas law imposes real obligations on insurers regarding prompt handling and good faith, and those obligations have teeth when they are enforced.",
      "Andre Thomas counters those tactics and holds insurers to the coverage that was actually purchased — including claims against your own insurer when it is the one refusing to pay.",
    ],
    covers: [
      "Denied and underpaid claims",
      "Bad faith and delayed handling",
      "Uninsured and underinsured motorist claims",
      "Property and storm damage disputes",
      "Handling adjusters and recorded statements for you",
    ],
  },
  {
    slug: "serious-injury-wrongful-death",
    name: "Serious Injury & Wrongful Death",
    group: "aftermath",
    short:
      "For catastrophic injury, and for the families left behind.",
    lede: "Support for the catastrophically injured, and for surviving families pursuing wrongful death claims.",
    body: [
      "Some cases are not about getting back to normal, because there is no getting back. Spinal cord injury, traumatic brain injury, amputation, severe burns — these reorganize a life permanently, and a claim that only counts today's bills fails the person it was meant to protect. It has to account for a lifetime of care, of lost earnings, of a future that looks nothing like the one that was planned.",
      "Wrongful death cases ask something even harder: to translate an irreplaceable person into a legal claim, at the worst moment a family will ever have. Texas law recognizes claims for surviving spouses, children, and parents, and separately a survival action on behalf of the estate. Both have deadlines that run while a family is still grieving.",
      "Andre Thomas represents the catastrophically injured and surviving families pursuing wrongful death claims — with the seriousness these cases require and the patience the people in them deserve.",
    ],
    covers: [
      "Traumatic brain and spinal cord injury",
      "Amputation, severe burns, and permanent disability",
      "Lifetime care planning and future damages",
      "Wrongful death claims for spouses, children, and parents",
      "Survival actions on behalf of the estate",
    ],
  },
];

export const getPracticeArea = (slug: string) =>
  practiceAreas.find((a) => a.slug === slug);

/* ─────────────────────────────────────────────────────────────
   Reviews. Excerpts as displayed publicly on Google — shown
   truncated, exactly as they appear, with a link to the full text.
   ───────────────────────────────────────────────────────────── */
export const reviews = [
  {
    quote: "Was in an accident and the lawyer was fair",
    author: "FalconSenpai89",
    date: "July 14, 2026",
    truncated: false,
  },
  {
    quote: "Great Lawfirm got my business handled quickly as possible an…",
    author: "Daylon Henry",
    date: "July 6, 2026",
    truncated: true,
  },
  {
    quote: "Great experience! Everything was very quick and efficient did…",
    author: "Vampy Miau",
    date: "June 25, 2026",
    truncated: true,
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   What actually happens after you call
   ───────────────────────────────────────────────────────────── */
export const process = [
  {
    n: "01",
    title: "The consultation",
    body: "You tell us what happened. Andre tells you honestly whether you have a case worth pursuing. It costs nothing and it commits you to nothing.",
  },
  {
    n: "02",
    title: "The investigation",
    body: "Evidence gets preserved before it disappears — reports, footage, records, witnesses. The insurer starts working the moment the incident happens; so should you.",
  },
  {
    n: "03",
    title: "The demand",
    body: "Once the full picture of your injuries and losses is clear, the claim gets presented to the parties responsible and their insurers, and negotiation begins.",
  },
  {
    n: "04",
    title: "Trial, if that is what it takes",
    body: "Most cases resolve without a courtroom. But a case is only worth what the other side believes you are willing to try — and that belief has to be earned.",
  },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;
