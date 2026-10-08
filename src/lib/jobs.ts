import { firm } from "@/lib/firm";

/**
 * Open positions. Adding the next role is an entry here, not a rebuild of
 * any page: the hub lists it, its own page appears, and the sitemap picks it
 * up, all from this array.
 *
 * Everything in a listing comes from the firm's own posting. Nothing is
 * inferred: a job listing with a guessed salary or benefit is a liability
 * for a law firm, so a field the firm has not supplied is left out rather
 * than filled in.
 *
 * Listings are English only, deliberately. Google for Jobs treats each page
 * carrying `JobPosting` markup as a separate posting, so a Spanish twin of
 * the same role would read as a duplicate. The careers hub is bilingual.
 */

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY" | "INTERN";

export type Job = {
  slug: string;
  /** The job title only — no location, firm name, salary, or code. */
  title: string;
  employmentType: EmploymentType;
  /** ISO date the listing went up. */
  datePosted: string;
  /** ISO date the listing comes down. After this the page says "filled". */
  validThrough: string;
  /** The opening paragraph, as the firm wrote it. */
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  benefits?: string[];
  /** Only when the firm has stated a range. Never estimated. */
  salary?: { min: number; max: number; unit: "HOUR" | "YEAR" };
  /** Where the application happens. */
  apply: { type: "url" | "email"; value: string };
  /** The firm's own reference for the posting. */
  identifier: string;
  /** False takes the listing down regardless of dates. */
  isActive: boolean;
};

export const jobs: Job[] = [
  {
    slug: "litigation-paralegal-personal-injury",
    title: "Litigation Paralegal - Personal Injury",
    employmentType: "FULL_TIME",
    datePosted: "2026-10-07",
    validThrough: "2026-12-31",
    summary:
      "We are seeking a highly motivated Litigation Paralegal to join our team. In this role, you will provide support to our trial team and assist in all phases of the litigation process. You will perform legal research, conduct interviews, file documents, and attend trials. The ideal candidate is hardworking and detail-oriented.",
    responsibilities: [
      "Prepare case-specific documents, including memoranda and briefs",
      "Ensure that case-related documents are well organized and available for review",
      "Conduct legal research and investigation",
      "Provide general administrative support",
      "Communicate with clients and witnesses",
      "Attend court sessions and record important information",
      "Maintain and update documentation",
      "Assist with discovery requests",
    ],
    qualifications: [
      "Previous experience as a Personal Injury Litigation Paralegal or similar role is preferred",
      "Certification or Associates Degree as a Paralegal is preferred",
      "Familiarity with legal procedures, terminology, and the court system",
      "Strong verbal and written communication skills",
      "Highly organized with document management experience",
      "Excellent research skills",
      "Comfortable with Microsoft Office and case management software",
      "Ability to multitask and work well under pressure",
    ],
    benefits: ["Health insurance", "Paid time off", "Employee discounts", "Competitive compensation"],
    salary: { min: 30, max: 35, unit: "HOUR" },
    apply: { type: "url", value: "https://app.careerplug.com/jobs/3570053/apps/new" },
    identifier: "ATL-2026-001",
    isActive: true,
  },
];

/** The last moment a listing is live: the end of its `validThrough` day, Houston time. */
export const closesAt = (job: Job) => new Date(`${job.validThrough}T23:59:59-06:00`);

/** Live means switched on and not yet expired. Evaluated when the page is built. */
export const isLive = (job: Job, now = new Date()) => job.isActive && closesAt(job) > now;

export const liveJobs = (now = new Date()) => jobs.filter((j) => isLive(j, now));

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

/** The office, in the shape `JobPosting.jobLocation` wants. */
export const jobLocation = {
  "@type": "Place",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${firm.address.street}, ${firm.address.suite}`,
    addressLocality: firm.address.city,
    addressRegion: firm.address.stateCode,
    postalCode: firm.address.zip,
    addressCountry: "US",
  },
} as const;

/**
 * The full description as HTML, for `JobPosting.description`. Built from the
 * same strings the page renders, so the markup and the visible text cannot
 * drift apart — Google treats a mismatch as a policy violation.
 */
export function jobDescriptionHtml(
  job: Job,
  labels: { responsibilities: string; qualifications: string; benefits: string }
) {
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  const parts = [
    `<p>${job.summary}</p>`,
    `<h2>${labels.responsibilities}</h2>${list(job.responsibilities)}`,
    `<h2>${labels.qualifications}</h2>${list(job.qualifications)}`,
  ];
  if (job.benefits?.length) parts.push(`<h2>${labels.benefits}</h2>${list(job.benefits)}`);
  return parts.join("");
}
