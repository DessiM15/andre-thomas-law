import { firm, fullAddress } from "@/lib/firm";
import type { Content } from "./types";

/**
 * English copy. Drawn from andrethomaslaw.com — no outcomes, figures, or
 * credentials are asserted here that the firm does not already publish.
 */
/** Shared by the About page and Andre's entry on the team page. */
const andreParagraphs = [
      "With licensure in both Tennessee and Texas, Andre Thomas is a seasoned attorney with a formidable presence. Andre's legal journey is marked by high-profile trials that underscore his exceptional skills and dedication to justice.",
      "His passion for law was cultivated at the University of Memphis. He further honed his legal acumen at Texas Southern University's Thurgood Marshall School of Law.",
      "Andre's career has seen him serve as a prosecutor at the Shelby County, TN District Attorney's Office, where he adeptly handled felonies and misdemeanors. He then devoted many years to the State of Tennessee Department of Safety and Homeland Security, defending the state in intricate asset forfeiture matters.",
      "Now in private practice, Andre has emerged as a champion for justice. He represents plaintiffs in personal injury cases and defends clients facing felony and misdemeanor charges. His unwavering commitment shines through in his successful advocacy, including jury trials.",
];

export const en: Content = {
  tagline: "Empowering Your Voice, Ensuring Justice",
  subTagline: "A Compassionate Advocate for Justice",
  hours: "Monday – Friday · 9:00 am – 5:00 pm",

  heroWords: ["justice", "recovery", "dignity", "answers"],

  bio: {
    heading: "Meet Andre Thomas: Committed to Justice",
    paragraphs: andreParagraphs,
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
  },

  whyFirm: {
    heading: "Why Andre Thomas Law, PLLC",
    lede: "Choosing Andre Thomas Law, PLLC means partnering with a legal advocate who combines a profound understanding of the law with compassion for your situation. With Andre Thomas, you gain a dedicated ally for justice and success, backed by a passion that has been his driving force since childhood.",
  },

  advocatePanels: [
    {
      n: "01",
      title: "Core Values and Approach",
      body: "Andre Thomas's legal practice revolves around client-centric values, including diligent work, determination, and empathy. He treats clients as he would wish to be treated, delivering steadfast support and securing favorable outcomes. Renowned for professionalism and dedication, Andre stands by his clients, offering unwavering commitment on their toughest days.",
      alt: "A law library with bound volumes and a figure of Lady Justice",
    },
    {
      n: "02",
      title: "Experience and Expertise",
      body: "Andre Thomas's specialization in Personal Injury law signifies his deep expertise in this intricate domain. His impactful contributions are evident in cases like State of TN v Billy Ray Turner and State of TN v Tedarrius Bean. Cases such as these have earned him the reputation of exuding unwavering dedication and legal acumen necessary to deliver justice to his clients.",
      alt: "The columned facade and steps of a county courthouse",
    },
    {
      n: "03",
      title: "Client-Centered Approach",
      body: "For Andre, prioritizing his clients' needs and concerns is non-negotiable. He believes in identifying their requirements early and addressing each one with precision. His commitment to understanding their situation and crafting tailored legal strategies is unwavering.",
      alt: "An attorney in consultation with clients across a desk",
    },
  ],

  pillars: [
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
  ],

  practiceGroups: [
    {
      id: "foundation",
      label: "The Foundation",
      n: "01",
      blurb: "Where every claim starts: someone else was careless, and you are the one carrying it.",
      alt: "A wrecked car at the roadside in morning fog",
    },
    {
      id: "road",
      label: "On the Road",
      n: "02",
      blurb: "Collisions with cars, trucks, motorcycles, and impaired drivers.",
      alt: "The wheels of a tractor-trailer throwing spray on a wet highway",
    },
    {
      id: "work",
      label: "On the Job",
      n: "03",
      blurb: "Construction, industrial, maritime, and rail — the places Texas gets built and moved.",
      alt: "A construction worker on rebar high above a building site",
    },
    {
      id: "property",
      label: "On the Property",
      n: "04",
      blurb: "Hazards someone else was responsible for finding and fixing.",
      alt: "A caution wet floor sign in a supermarket aisle",
    },
    {
      id: "aftermath",
      label: "When It's Worst",
      n: "05",
      blurb: "Catastrophic injury, wrongful death, and the insurers who would rather not pay.",
      alt: "A tanker truck on a dark highway at night",
    },
  ],

  practiceAreas: [
    {
      key: "personal-injury",
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
      key: "car-accidents",
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
      key: "truck-accidents",
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
      key: "motorcycle-accidents",
      slug: "motorcycle-accidents",
      name: "Motorcycle Accidents",
      group: "road",
      short: "Riders face injuries and assumptions that other drivers never do.",
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
      key: "drunk-driving-injuries",
      slug: "drunk-driving-injuries",
      name: "Drunk Driving Injuries",
      group: "road",
      short: "Liability may not stop with the driver who was over the limit.",
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
      key: "construction-accidents",
      slug: "construction-accidents",
      name: "Construction Accidents",
      group: "work",
      short: "One of the most dangerous ways to earn a living in Texas.",
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
      key: "workplace-injuries",
      slug: "workplace-injuries",
      name: "Workplace Injuries",
      group: "work",
      short: "Injured because an employer cut a corner — and now buried in paperwork.",
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
      key: "plant-refinery-accidents",
      slug: "plant-refinery-accidents",
      name: "Plant & Refinery Accidents",
      group: "work",
      short: "Along the Gulf Coast, a neglected safety regulation is measured in lives.",
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
      key: "maritime-offshore-injuries",
      slug: "maritime-offshore-injuries",
      name: "Maritime & Offshore Injuries",
      group: "work",
      short: "Injured on the water, and ordinary injury law does not apply.",
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
      key: "railroad-accidents",
      slug: "railroad-accidents",
      name: "Railroad Accidents",
      group: "work",
      short: "Among the most devastating vehicle-related incidents there are.",
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
      key: "premises-liability",
      slug: "premises-liability",
      name: "Premises Liability",
      group: "property",
      short: "You were hurt somewhere the owner was supposed to keep safe.",
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
      key: "product-defects",
      slug: "product-defects",
      name: "Product Defects",
      group: "property",
      short: "The product was unreasonably dangerous, and it reached you anyway.",
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
      key: "dog-bites",
      slug: "dog-bites",
      name: "Dog Bites",
      group: "property",
      short: "The consequences reach far past the wound itself.",
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
      key: "drowning-accidents",
      slug: "drowning-accidents",
      name: "Drowning Accidents",
      group: "property",
      short: "A pool owner had a duty. It was not met.",
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
      key: "insurance-claims",
      slug: "insurance-claims",
      name: "Insurance Claims",
      group: "aftermath",
      short: "Your insurer's interests and yours are not the same. They never were.",
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
      key: "serious-injury-wrongful-death",
      slug: "serious-injury-wrongful-death",
      name: "Serious Injury & Wrongful Death",
      group: "aftermath",
      short: "For catastrophic injury, and for the families left behind.",
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
  ],

  featuredAlts: {
    "car-accidents": "A wrecked car taped off on a road at night",
    "truck-accidents": "Tractor-trailer wheels throwing spray on a wet highway",
    "workplace-injuries": "A construction worker on rebar above a building site",
    "premises-liability": "A caution wet floor sign in a supermarket aisle",
    "maritime-offshore-injuries": "An offshore drilling platform in heavy seas",
    "serious-injury-wrongful-death": "An empty hospital corridor",
  },

  /**
   * Every biography below was supplied by the firm and describes a real
   * person. Kept in the running order set by `lib/team.ts`, not by this array.
   */
  team: [
    {
      id: "andre-thomas",
      role: "Founding Attorney",
      credential: "Licensed in Texas and Tennessee",
      preview:
        "A former Shelby County prosecutor who now represents the injured. Two bar admissions, high-profile trials argued to verdict, and a practice built on being the attorney you actually speak to.",
      bio: andreParagraphs,
      highlights: [
        { label: "Bar admissions", value: "Texas and Tennessee" },
        {
          label: "Law",
          value: "Thurgood Marshall School of Law, Texas Southern University",
        },
        { label: "Undergraduate", value: "University of Memphis" },
        {
          label: "Formerly",
          value:
            "Assistant District Attorney, Shelby County, TN — and counsel to the Tennessee Department of Safety & Homeland Security",
        },
        {
          label: "Notable trials",
          value:
            "State of Tennessee v. Billy Ray Turner · State of Tennessee v. Tedarrius Bean",
        },
      ],
      focus: [
        "Personal injury and catastrophic injury claims",
        "Wrongful death",
        "Felony and misdemeanor criminal defense",
        "Jury trials in Texas and Tennessee",
      ],
      headline: "Houston Personal Injury Attorney",
    },
    {
      id: "maria-hernandez-castillo",
      role: "Senior Paralegal & Office Manager",
      credential: "25 years in personal injury practice",
      preview:
        "Twenty-five years of files carried from intake to final resolution. Maria runs the office as well as the caseload, and she is the reason so little ever has to be reconstructed under deadline.",
      bio: [
        "Maria Hernandez-Castillo brings 25 years of experience as a Senior Paralegal, skillfully managing files from initial intake through final resolution. Her extensive knowledge and attention to detail ensure that every case is handled with precision and care throughout its entire lifecycle.",
        "Maria also wears several hats within the firm, serving as Office Manager in addition to her role as Senior Paralegal. She genuinely loves helping others and consistently goes above and beyond to ensure clients receive the compensation they deserve.",
        "Her depth of experience, versatility, and steady, comprehensive approach make her an invaluable asset to the firm — one of the people who make Andre Thomas Law, PLLC the firm it is.",
      ],
      highlights: [
        { label: "Experience", value: "25 years as a paralegal" },
        { label: "Role", value: "Senior Paralegal and Office Manager" },
        {
          label: "Scope",
          value: "Files managed from initial intake through final resolution",
        },
      ],
      focus: [
        "Case file management, intake through resolution",
        "Medical records and billing collection",
        "Demand package preparation",
        "Office management and firm operations",
      ],
      headline: "Senior Paralegal & Office Manager",
    },
    {
      id: "marie-hernandez",
      role: "Case Manager",
      credential: "Bilingual — English and Spanish · 10 years' experience",
      preview:
        "Ten years spent standing between clients, the legal team, and their doctors, so that treatment is a plan rather than a series of appointments nobody is tracking.",
      bio: [
        "Marie Hernandez brings 10 years of experience as a Case Manager, dedicated to guiding clients through every step of their recovery journey. Bilingual in English and Spanish, she plays a pivotal role in bridging the gap between clients, legal teams, and healthcare providers, ensuring every individual receives a seamless, comprehensive treatment plan tailored to their recovery.",
        "With meticulous attention to detail, Marie manages treatment schedules, oversees medical documentation, and provides compassionate, clear guidance to clients as they navigate their health journey. Her dedication to client well-being, paired with her ability to communicate effectively across languages, ensures that each person receives the highest standard of care while focusing on both their physical and emotional recovery.",
        "That care is exactly what makes her an asset to this team, and part of what makes Andre Thomas Law, PLLC the firm it is.",
      ],
      highlights: [
        {
          label: "Experience",
          value: "10 years as a case manager",
        },
        { label: "Languages", value: "English and Spanish" },
        {
          label: "Focus",
          value: "Treatment planning and medical documentation",
        },
      ],
      focus: [
        "Treatment scheduling and provider coordination",
        "Medical documentation and records oversight",
        "Client guidance through the recovery process",
        "Bilingual communication with clients and providers",
      ],
      headline: "Case Manager",
    },
    {
      id: "milagro-rodriguez-mejia",
      role: "Case Manager",
      credential: "Bilingual — English and Spanish · 8+ years in the legal field",
      preview:
        "Eight years in the legal field, most of it in personal injury. Milagro moves a case forward on every front at once — providers, adjusters, records, billing, and the demand.",
      bio: [
        "Milagro Rodriguez Mejia is a bilingual Case Manager with over eight years of experience in the legal field, with a strong background in personal injury. She assists clients throughout the progression of their cases, coordinates with medical providers and insurance adjusters, manages medical records and billing, and supports the demand and settlement process.",
        "Milagro earned her Bachelor of Arts in Spanish with a minor in Criminal Justice from the University of Houston–Downtown. Fluent in English and Spanish, she is committed to providing clear communication, organization, and dedicated support to clients throughout the legal process.",
        "That commitment makes her an asset to this team and part of what makes Andre Thomas Law, PLLC the firm it is.",
      ],
      highlights: [
        {
          label: "Experience",
          value: "Over eight years in the legal field, with a background in personal injury",
        },
        {
          label: "Education",
          value:
            "B.A. in Spanish, minor in Criminal Justice — University of Houston–Downtown",
        },
        { label: "Languages", value: "English and Spanish" },
      ],
      focus: [
        "Case progression and client support",
        "Coordination with medical providers and insurance adjusters",
        "Medical records and billing management",
        "Demand preparation and settlement support",
      ],
      headline: "Case Manager",
    },
    {
      id: "nayla-mendez",
      role: "Medical Coordinator & Case Manager",
      credential: "Bilingual — English and Spanish · 7 years' prior experience",
      preview:
        "She gets new clients into treatment quickly and keeps them there — then collects the bills and records, drafts the demand, and negotiates the offer that follows.",
      bio: [
        "Nayla Mendez has been a valued member of the Andre Thomas Law team for nearly two years, serving as Medical Coordinator and Case Manager. She brings with her 7 years of prior experience in the field, along with a strong commitment to ensuring new clients are scheduled for treatment and remain compliant throughout the process to help strengthen their case.",
        "Nayla is also responsible for collecting medical bills and records, drafting settlement demands, negotiating settlement offers, and assisting with case disbursements. She is fluent in both English and Spanish, allowing her to effectively communicate with and support a diverse range of clients.",
        "She is an asset to this team, and one of the people who make Andre Thomas Law, PLLC the firm it is.",
      ],
      highlights: [
        { label: "At the firm", value: "Nearly two years with Andre Thomas Law" },
        { label: "Experience", value: "Seven years in the field before joining" },
        { label: "Languages", value: "English and Spanish" },
      ],
      focus: [
        "Treatment scheduling and compliance",
        "Medical bills and records collection",
        "Drafting settlement demands",
        "Negotiating offers and assisting with disbursements",
      ],
      headline: "Medical Coordinator & Case Manager",
    },
    {
      id: "marissa-lopez",
      role: "Case Manager, Pre-Investigation Team",
      credential: "7 years as a case manager · Pre-investigation",
      preview:
        "The first week of a claim decides a good deal of what follows. Marissa sets it up — the claim, liability, lien searches, subrogation, and the property damage nobody else is chasing.",
      bio: [
        "Marissa Lopez brings 7 years of experience as a Case Manager, playing a key role in the successful handling of each client's case from start to finish. As a member of the pre-investigation team, she is responsible for setting up claims, following up on liability with insurance companies, running lien searches, and setting up subrogation.",
        "Marissa also assists clients with any property damage claim issues, ensuring every detail is handled efficiently and accurately on their behalf.",
        "Her dedication and thorough approach make her a valuable asset to the team, and part of what makes Andre Thomas Law, PLLC the firm it is.",
      ],
      highlights: [
        { label: "Experience", value: "Seven years as a case manager" },
        { label: "Team", value: "Pre-investigation" },
        {
          label: "Focus",
          value: "Claim setup, liability follow-up, liens, and subrogation",
        },
      ],
      focus: [
        "Claim setup and pre-investigation",
        "Liability follow-up with insurance companies",
        "Lien searches and subrogation",
        "Property damage claim support",
      ],
      headline: "Case Manager, Pre-Investigation Team",
    },
    {
      id: "itzel-tapia",
      role: "Client Intake Coordinator & Receptionist",
      credential: "Bilingual — English and Spanish",
      preview:
        "The first voice you hear. Itzel handles new client intake and the front desk, in English and Spanish, and sets the tone for everything that comes after.",
      bio: [
        "Itzel Tapia serves as the first point of contact for the firm, handling all new client intake as well as front desk responsibilities as Receptionist. Fluent in both English and Spanish, she ensures every client feels welcomed and understood from their very first interaction with the firm.",
        "Itzel's attention to detail and warm, professional demeanor make her an essential part of the client experience from day one.",
        "She is an asset to this team, and one of the people who make Andre Thomas Law, PLLC the firm it is.",
      ],
      highlights: [
        { label: "Role", value: "Client Intake Coordinator and Receptionist" },
        { label: "Languages", value: "English and Spanish" },
        { label: "First contact", value: "All new client intake" },
      ],
      focus: [
        "New client intake",
        "Front desk and reception",
        "Bilingual client communication",
        "Scheduling and first-call triage",
      ],
      headline: "Client Intake Coordinator & Receptionist",
    },
  ],

  reviews: [
    {
      quote:
        "This team is dedicated to getting you the best outcome possible! I have now been represented twice by this firm and have been so incredibly grateful for them both times. It\u2019s terrible to need a lawyer, but incredibly important to have the right one! Thank you for everything!",
      author: "Kim",
      date: "July 2026",
    },
    {
      quote:
        "Maria and her staff were extremely helpful throughout this entire process. Got me into physical therapy immediately which really helped during my road to recovery! They kept me updated and made sure all my needs were taken care of!! Even though the five months felt longer it was extremely worth it in the end! Thank you Maria & staff for handling my case professionally & most importantly making sure I was fairly compensated.",
      author: "TJ R",
      date: "July 2026",
    },
    {
      quote:
        "Thank you for taking one of the worst experiences we\u2019ve had as a family and making it one of the best! We\u2019ve never been in a collision and didn\u2019t know where to go but Andrew T Thomas and team worked everything out for us. Thank you so much!! And God bless you and your team!",
      author: "Jose Angel",
      date: "June 2026",
    },
    {
      quote:
        "They were very efficient. After treatment they moved quickly with the insurance company to retrieve the max settlement. Would highly recommend \uD83D\uDC4C\uD83C\uDFFD",
      author: "BIG B SDS",
      date: "June 2026",
    },
    {
      quote:
        "Absolutely amazing staff, talked me through every portion of the process and took care of me in the best possible way.",
      author: "Andrea Lindsey",
      date: "June 2026",
    },
    {
      quote:
        "This is one of the best law firms in all of Houston. The staff here is awesome. Everyone at this office is very knowledgeable. They handle cases here very thoroughly, and efficiently. I will recommend this law firm to anyone!!",
      author: "Jacoby Hernandez",
      date: "September 2025",
    },
    {
      quote:
        "Calling Andre Thomas Law was by far the best decision I could have made. After my accident, I had no idea what to do. Insurance was handling the damage to my car, but what about my injuries? The days I missed work? They were able to help me right away and I was sent to be seen by a medical profesional the next day. From then on Andre\u2019s team took care of everything and kept me informed throughout the whole process. 10/10 would call again!",
      author: "Aldo Amaya",
      date: "September 2025",
    },
    {
      quote:
        "Marie was incredibly knowledgeable and always kept me informed throughout the process, achieving an excellent outcome for my case. She always explained everything clearly, also was very responsive to my concerns, and made me feel confident throughout a difficult situation. I highly recommend The whole Andre Thomas Law firm they are a dedicated group who fought hard for my best interests and delivered great results. 10/10",
      author: "Gianni Norales",
      date: "September 2025",
    },
    {
      quote:
        "This was my first time dealing with an attorney and Andre was really great and professional. They also keep me updated with my case. Highly recommend Andre Thomas Law to anyone that gets involved into an accident. They were very helpful! Than you Maria Hernandez-Castillo for helping me out and keeping me updated.",
      author: "Reynaldo Martinez",
      date: "September 2025",
    },
    {
      quote:
        "Maria and her team handled my first auto accident with perfection! They were all very transparent and professional, and they help with understanding the entire process. The service was great, they\u2019ll treat you like family!",
      author: "Christian Medina",
      date: "September 2025",
    },
    {
      quote:
        "This was my first Accident and I was referred by a friend about Andre Thomas Law. I spoke to Maria and she explained to me what needed to be done A very professional team and everyone there was very helpful in this process. I received more than was expected!! I am very happy of the outcome!!!",
      author: "Carlos Saldana",
      date: "September 2025",
    },
    {
      quote:
        "Marie and Marissa were very helpful. I was able to get the help I needed medically and also financially. Everything they did helped me get the most out of my situation as possible. They are professional and very understanding.",
      author: "Dinh Pham",
      date: "September 2025",
    },
  ],

  process: [
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
  ],

  nav: [
    { key: "home", label: "Home" },
    { key: "practiceAreas", label: "Practice Areas" },
    { key: "about", label: "About" },
    { key: "team", label: "Team" },
    { key: "reviews", label: "Reviews" },
    { key: "contact", label: "Contact" },
  ],

  ui: {
    skipToContent: "Skip to content",
    freeConsultation: "Free Consultation",
    callPhone: "Call",
    sendMessage: "Send a message",
    learnMore: "Learn more",
    viewAll: "View all",
    homeAria: "home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    instagram: "Instagram",
    logoAlt: `${firm.name} — Houston Personal Injury Attorney`,
    switchLangLabel: "Español",
    switchLangAria: "Ver este sitio en español",

    qualify: {
      where: "Where did it happen?",
      date: "Date of accident *",
      city: "City *",
      state: "State *",
      statePlaceholder: "Select a state",
      doctor: "Have you seen a doctor?",
      doctorPlaceholder: "Select an answer",
      doctorOptions: [
        { key: "yes", label: "Yes, I've seen a doctor" },
        { key: "er", label: "I went to the ER" },
        { key: "no", label: "Not yet" },
      ],
    },

    banner: {
      question: "¿Prefiere leer este sitio en español?",
      action: "Ver en español",
      dismiss: "Dismiss",
    },

    preloader: {
      place: "Houston, Texas",
      est: "Est. Texas & Tennessee",
      strapline: "Houston, TX Personal Injury Attorney",
    },

    hero: {
      place: "Houston, Texas",
      licensed: "Licensed in Texas & Tennessee",
      // Sits under the headline. "Lawyer" leads the h1 and "attorney" leads
      // this line deliberately — they are two separate searches, and a firm
      // that only says one of them only shows up for one of them.
      descriptor: "Houston, TX Personal Injury Attorney",
      portraitAlt: "Houston Personal Injury Attorney",
      quote: "This is one of the best law firms in all of Houston.",
      quoteAuthor: "Jacoby Hernandez · Google review",
      titleLines: [
        "Houston, TX Personal",
        "Injury Lawyer.",
        "Empowering your voice,",
      ],
      ensuring: "ensuring",
      lede: "A former prosecutor who now represents the injured. If someone else's negligence changed your life, you deserve an attorney who has argued to a jury — and an honest answer about where you stand.",
      reviewsSuffix: "Google reviews",
      twoBars: "Two state bars",
      formerProsecutor: "Former Shelby County prosecutor",
    },

    why: {
      eyebrow: "A compassionate advocate for justice",
      titleLines: ["Why Andre Thomas", "Law, PLLC."],
    },

    featured: {
      eyebrow: "What we handle",
      titleLines: ["Sixteen ways a life", "gets interrupted."],
      all: "All sixteen",
      alsoHandled: "Also handled",
      explore: "Explore practice areas",
    },

    aboutPreview: {
      eyebrow: "The attorney",
      notableTrials: "Notable trials",
      readFull: "Read the full background",
      role: "Founding Attorney",
      portraitAlt: "on the courthouse steps",
    },

    reviewsBand: {
      eyebrow: "In their words",
      googleReviews: "Google reviews",
      readAll: "Read them all on Google",
      readFull: "Read full review",
      footnote:
        "Reviews are shown as published on Google. Prior results do not guarantee a similar outcome.",
    },

    cta: {
      eyebrow: "Talk to Andre",
      titleA: "The consultation is free.",
      titleB: "So is finding out where you stand.",
      body: "Tell us what happened. You'll get a straight answer about whether you have a case worth pursuing — no obligation, no pressure, no cost.",
      call: "Call",
      email: "Email",
      office: "Office",
    },

    form: {
      name: "Name *",
      phone: "Phone *",
      email: "Email *",
      matter: "What happened?",
      matterPlaceholder: "Select a practice area (optional)",
      criminalDefense: "Criminal Defense",
      somethingElse: "Something else",
      message: "Tell us briefly what happened (optional)",
      sending: "Sending…",
      submit: "Send Message",
      footnote:
        "Free consultation. Submitting this form does not create an attorney–client relationship.",
      doneTitle: "Message received.",
      doneBody: [
        "Someone from the firm will follow up shortly. If it's urgent, calling",
        "is always faster.",
      ],
      checkDetails: "Please check your details.",
      couldNotSend: "Couldn't send. Please call",
      errName: "Please enter your name.",
      errPhone: "Please enter a valid phone number.",
      errEmail: "Please enter a valid email address.",
      errDate: "Please enter the date of the accident.",
      errDateFuture: "That date is in the future — please check it.",
      errCity: "Please enter the city where it happened.",
      errState: "Please select a state.",
      errLong: "That message is too long.",
      errServer: "Something went wrong. Please call us.",
    },

    footer: {
      cta: "Start your free consultation",
      navigate: "Navigate",
      practiceAreas: "Practice Areas",
      office: "Office",
      fax: "Fax",
      legal:
        "The information on this website is provided for general informational purposes only and is not legal advice. Viewing this site, contacting the firm, or sending information through this website does not create an attorney–client relationship. Do not send confidential information until an attorney–client relationship has been established in writing. Prior results do not guarantee a similar outcome.",
      rights: "All rights reserved.",
      disclaimer: "Disclaimer",
      privacy: "Privacy",
      poweredBy: "Powered by",
    },

    area: {
      crumb: "All practice areas",
      covers: "What this covers",
      consultTitle: "Find out where you stand.",
      consultBody: "It costs nothing and commits you to nothing.",
      licensedNote: "Licensed in Texas and Tennessee.",
      others: "Other practice areas",
      alsoUnder: "Also under",
      fallbackEyebrow: "Practice area",
      representation: "Representation",
    },

    notFound: {
      eyebrow: "Error 404",
      title: "This page isn't here.",
      body: "The link may have moved or never existed. The practice areas are a good place to pick the thread back up — or just call.",
      cta: "Practice areas",
    },

    chat: {
      greeting:
        "Hi — I'm the Andre Thomas Law assistant. I can tell you about the firm, our practice areas, the office, and how to get a free consultation.",
      title: "Firm Assistant",
      status: "Automated · replies instantly",
      open: "Open chat assistant",
      close: "Close chat",
      nudge: "Questions about your situation?",
      nudgeCta: "Ask here →",
      placeholder: "Ask about the firm…",
      inputAria: "Type your question",
      sendAria: "Send",
      dialogAria: "Firm assistant",
      // Reworded once the widget started asking for a name and a number:
      // "don't share details" immediately followed by "what's your number?"
      // reads as a contradiction.
      confidential: "Share contact details, not case details — this chat isn't private.",
      unreachable: "I couldn't reach the server just then. You can always call",
      nudgeDismiss: "Dismiss",

      lead: {
        offer:
          "I can't give legal advice, but I can have someone from the firm call you. Want me to take your details?",
        hotOpener:
          "I'm sorry that happened — that's worth talking to an attorney about. Let me take a few details and have someone call you. What's your name?",
        offerYes: "Yes, call me back",
        offerNo: "No thanks",
        askName: "Good. What's your name?",
        askPhone: "Thanks. What's the best number to reach you on?",
        askDate:
          "Got it. What date did the accident happen? A date like 3/14/2025 is perfect — \"about 6 months ago\" works too.",
        askLocation: "Thanks. What city and state did it happen in?",
        askState: "And which state is that in?",
        askDoctor: "And have you seen a doctor about it?",
        askEmail:
          "And an email address, if you'd like a written follow-up. You can skip this.",
        skip: "Skip",
        badName: "Sorry — could you give me your full name?",
        badPhone:
          "That doesn't look like a complete number. Could you include the area code?",
        badDate:
          "Sorry — I didn't catch that date. Could you put it as month/day/year, like 3/14/2025?",
        badFutureDate: "That date is in the future — could you check it for me?",
        badLocation: "Sorry — which city did it happen in?",
        badState:
          "I didn't recognise that state. Could you give me the state name or its two-letter code, like TX?",
        badEmail: "That email doesn't look right — mind checking it?",
        sending: "Sending that over…",
        done:
          "Got it — someone from the firm will call you. If it's urgent, call 713-212-3003 and you'll reach us directly.",
        failed:
          "Sorry — I couldn't send that. Please call 713-212-3003 so this doesn't get lost.",
        declined:
          "No problem. Ask me anything else, or call 713-212-3003 whenever you're ready.",
      },
    },
  },

  pages: {
    home: {
      title: "Andre Thomas Law, PLLC — Houston Personal Injury Attorney",
      description:
        "Houston personal injury attorney Andre Thomas. Licensed in Texas and Tennessee, former prosecutor, trial-tested. Free consultation — 713-212-3003.",
    },

    about: {
      title: "About Andre Thomas — Houston Attorney, Licensed in TX & TN",
      description:
        "Andre Thomas is licensed in Texas and Tennessee. Former Shelby County prosecutor, Thurgood Marshall School of Law graduate, and trial attorney representing the injured.",
      eyebrow: "The attorney",
      titleLines: ["Meet Andre Thomas,", "Houston Personal", "Injury Attorney"],
      lede: "Licensed in two states. A career that began by prosecuting cases and now spends itself taking them apart on behalf of the people they were built against.",
      skylineAlt: "The downtown Houston skyline at dusk",
      portraitAlt: "attorney at",
      barAdmissions: "Bar admissions",
      education: "Education",
      pathEyebrow: "The path here",
      pathTitle: "Both sides of the courtroom.",
      trialsEyebrow: "Notable trials",
      trialsTitle: "High-profile matters, argued in open court.",
      trialsNote:
        "Matters listed reflect trials in which Andre Thomas participated. Prior results do not guarantee or predict a similar outcome in any future case.",
      meansEyebrow: "What that means for you",
      seePracticeAreas: "See the practice areas",
      bridgeAlt: "The Hernando de Soto Bridge over the Mississippi River at Memphis",
    },

    practiceAreas: {
      title: "Practice Areas — Houston Personal Injury Attorney",
      description:
        "Car and truck accidents, workplace and industrial injuries, maritime and offshore, premises liability, product defects, insurance disputes, wrongful death, and more. Free consultation.",
      eyebrow: "",
      titleLines: ["Practice Areas", "in Houston, TX"],
      lede: "Every one of these begins the same way — someone else was careless, and you are the one carrying it. Find yours below, or call and describe what happened.",
      heroAlt: "A wrecked car at the roadside in morning fog",
      alsoHandled: "Also handled",
      criminalTitle: "Criminal defense — felony and misdemeanor.",
      criminalBody:
        "Alongside the personal injury practice, Andre defends clients facing felony and misdemeanor charges. Having prosecuted at the Shelby County District Attorney's Office, he has worked these cases from both sides of the aisle.",
      criminalCta: "Discuss your case",
      listName: "Practice Areas",
    },

    reviews: {
      title: "Client Reviews — 4.9 Stars Across 60 Google Reviews",
      description:
        "Read what clients say about Andre Thomas Law, PLLC. Rated 4.9 stars across 60 Google reviews.",
      eyebrow: `Client Reviews — ${firm.shortName}, Houston`,
      titleLines: ["What it's like", "to be represented."],
      lede: "These are published exactly as clients wrote them.",
      whyEyebrow: "Why clients stay",
      whyTitle: "Diligence, determination, and empathy.",
      whyBody:
        "The firm's practice is built around client-centric values — prioritizing each client's needs and concerns rather than running them through a process.",
      readOnGoogle: "Read every review on Google",
    },

    contact: {
      title: "Contact — Free Consultation with Andre Thomas Law",
      description: "Call 713-212-3003 or send a message. Free consultation.",
      eyebrow: "Contact",
      titleLines: ["Tell us", "what happened."],
      lede: "The consultation is free, and so is finding out where you stand. Fill in the form or call directly — either way, you'll speak with the firm.",
      heroAlt: "A woman sitting alone, looking worried",
      requestEyebrow: "Request a consultation",
      officeEyebrow: "The office",
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Hours",
      licensedIn: "Licensed in",
      mapTitle: "Map to",
      nextEyebrow: "After you reach out",
      nextTitle: "No one should have to guess what comes next.",
      formNote:
        "Submitting this form does not create an attorney–client relationship, and the information you send is not privileged until such a relationship is established in writing. Please do not send confidential or time-sensitive information through this form.",
    },

    team: {
      title: "Our Staff | Andre Thomas Law, PLLC | Houston Personal Injury",
      description: `The attorneys and staff of ${firm.name} — personal injury and criminal defense in Houston, Texas. Free consultation, ${firm.phone}.`,
      eyebrow: "The People",
      titleLines: [
        "Our Attorneys and Staff",
        `— ${firm.shortName}, Houston`,
      ],
      lede: "A case is not handled by a logo. It is handled by the attorney who tries it, the paralegal who builds the record, and the person who picks up when you call. Here they are.",
      heroAlt: "Attorneys and staff standing together in the firm's office",
      attorneysEyebrow: "Attorneys",
      attorneysTitle: "Who argues your case",
      staffEyebrow: "Paralegals and Staff",
      staffTitle: "Who builds it",
      readBio: "Full biography",
      tribute: {
        eyebrow: "The Team",
        title: "Not one of them is optional.",
        body: [
          "Between them, the people on this page carry more than fifty years of personal injury experience — and, just as importantly, the habit of picking up the phone. They set up the claim, get clients into treatment, chase the records, argue with the adjuster, draft the demand, and stay on the file until the money is in the client's hands.",
          "Every one of them is an asset to this firm, and every one of them is necessary. Andre Thomas Law, PLLC is not one attorney with a support staff; it is this team. They are the reason clients are called back, understood in their own language, and never left guessing where their case stands — and they are what makes this the firm it is.",
        ],
      },
      draftNotice:
        "Draft page — not for publication. Some biographies on this page are still awaiting verification.",
      member: {
        crumb: "Our Team",
        highlightsEyebrow: "Credentials",
        focusEyebrow: "What they handle",
        bioEyebrow: "Background",
        contactEyebrow: "Next step",
        contactTitle: "Bring us the case.",
        contactBody: `The consultation is free, and you will speak with someone at the firm rather than a call centre. Call ${firm.phone} or send a message and we will come back to you the same day.`,
        othersEyebrow: "Also at the firm",
        othersTitle: "The rest of the team",
        seeAll: "See the whole team",
      },
    },

    privacy: {
      title: "Privacy Policy",
      description: `Privacy policy for ${firm.name}.`,
      eyebrow: "Legal",
      heading: "Privacy Policy",
      sections: [
        {
          h: "What we collect",
          p: [
            "When you submit the contact form, we collect the name, phone number, and email address you provide, along with any practice area selection and message you choose to include. We collect nothing else through that form.",
            "The chat assistant processes the messages you type in order to answer them. Please do not enter personal, confidential, or case-sensitive information into the chat.",
          ],
        },
        {
          h: "How we use it",
          p: [
            "Information you submit is used solely to respond to your inquiry and, where applicable, to evaluate and handle your legal matter. We do not sell your information, and we do not share it with third parties for marketing purposes.",
          ],
        },
        {
          h: "Confidentiality",
          p: [
            "Information sent through this website is not protected by the attorney\u2013client privilege unless and until an attorney\u2013client relationship has been established in writing. Please do not send confidential information before that point.",
          ],
        },
        {
          h: "Cookies and analytics",
          p: [
            "This site may use cookies and similar technologies to analyze traffic and improve the browsing experience. You can disable cookies in your browser settings; some parts of the site may not function as intended if you do.",
          ],
        },
        {
          h: "Third-party services",
          p: [
            "Pages on this site may embed third-party content, such as a Google Maps frame on the contact page. Those providers operate under their own privacy policies, which we do not control.",
          ],
        },
        {
          h: "Your choices",
          p: [
            `You may request that we correct or delete the information you have submitted. Contact ${firm.email} or call ${firm.phone}. Mail may be sent to ${fullAddress}.`,
          ],
        },
      ],
    },

    disclaimer: {
      title: "Legal Disclaimer",
      description: `Legal disclaimer for ${firm.name}.`,
      eyebrow: "Legal",
      heading: "Disclaimer",
      sections: [
        {
          h: "No legal advice",
          p: [
            "The content on this website is provided for general informational purposes only and does not constitute legal advice. Every legal matter turns on its own particular facts, and nothing you read here should be relied upon as a substitute for advice from a licensed attorney about your specific situation.",
          ],
        },
        {
          h: "No attorney\u2013client relationship",
          p: [
            "Viewing this website, submitting the contact form, using the chat assistant, or sending an email to the firm does not create an attorney\u2013client relationship. Such a relationship is established only when the firm and the client execute a written agreement.",
            "Because no relationship exists until that point, information transmitted through this website is not protected by the attorney\u2013client privilege. Please do not send confidential or sensitive information until an attorney\u2013client relationship has been established in writing.",
          ],
        },
        {
          h: "The chat assistant",
          p: [
            "This website includes an automated assistant. It is not an attorney, it does not provide legal advice, and it cannot evaluate your case. It answers only from information already published on this website. Any question about your particular circumstances should be directed to the firm.",
          ],
        },
        {
          h: "Prior results",
          p: [
            "Any references to prior matters, trials, or outcomes are provided for informational purposes only. Prior results do not guarantee or predict a similar outcome in any future matter.",
          ],
        },
        {
          h: "Jurisdiction",
          p: [
            `${firm.attorney} is licensed to practice law in the States of Texas and Tennessee. Nothing on this website is intended to constitute an offer to represent anyone in a jurisdiction where the firm is not licensed to practice.`,
          ],
        },
        {
          h: "Time limits",
          p: [
            "Legal claims are subject to strict filing deadlines that vary by claim type and jurisdiction. Delay can permanently bar an otherwise valid claim. If you believe you may have a claim, consult an attorney promptly.",
          ],
        },
      ],
      questions: ["Questions about this disclaimer? Call", "or email", "."],
    },
  },

  schema: { home: "Home", practiceAreas: "Practice Areas" },
};
