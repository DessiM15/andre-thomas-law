/**
 * Locale-invariant facts. Names, numbers, and addresses do not translate,
 * so they live here and both languages read from the same copy.
 */

export const SITE_URL = "https://andrethomaslaw.com";

export const firm = {
  name: "Andre Thomas Law, PLLC",
  shortName: "Andre Thomas Law",
  attorney: "Andre Thomas",

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

  hoursSchema: "Mo-Fr 09:00-17:00",

  barAdmissions: ["Texas", "Tennessee"],

  instagram:
    "https://www.instagram.com/andrethomaslaw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",

  reviews: {
    rating: 4.9,
    count: 60,
    /**
     * Google's permanent CID for the firm's Business Profile, verified to
     * resolve to "Andre Thomas Law, PLLC".
     *
     * Every previous version of this link was a copied search-results URL
     * carrying `sca_esv`, `ei`, `gs_ssp` and `sclient` — session parameters
     * that expire, so the "read them all on Google" links were always going
     * to rot. A CID does not change for the life of the listing.
     */
    url: "https://www.google.com/maps?cid=4984099773238058092",
  },
} as const;

export const fullAddress = `${firm.address.street}, ${firm.address.suite}, ${firm.address.city}, ${firm.address.state} ${firm.address.zip}`;
