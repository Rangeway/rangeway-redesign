export const SITE = {
  name: "Rangeway",
  legalName: "Rangeway Energy, Inc.",
  tagline: "Travel farther. Stop better.",
  email: "hello@rangeway.co",
  phone: "+16504206300",
  phoneDisplay: "(650) 420-6300",
  address: "2661 Market Street, STE 85787, San Francisco, CA 94114",
} as const;

export const NAV_LINKS = [
  { label: "Network", href: "/network", external: false },
  { label: "Projects", href: "/#projects", external: false },
  { label: "Company", href: "/our-story", external: false },
  { label: "Team", href: "/team", external: false },
  { label: "Partners", href: "/partners", external: false },
  { label: "Investors", href: "/investors", external: false },
  { label: "Newsroom", href: "https://newsroom.rangeway.co", external: true },
  { label: "Contact", href: "/contact", external: false },
] as const;

export const EXTERNAL_LINKS = {
  mojave: "https://mojave.rangeway.co",
  stLouis: "https://newsroom.rangeway.co/press/luke-schuette-louteq/",
  hawaii: "https://hawaii.rangeway.co",
  fieldNotes: "https://fieldnotes.rangeway.co",
  newsroom: "https://newsroom.rangeway.co",
  investorHub: "https://investors.rangeway.co",
  careers: "https://www.linkedin.com/company/rangewayenergy/jobs/",
  linkedin: "https://www.linkedin.com/company/rangewayenergy",
  instagram: "https://instagram.com/RangewayEV",
  x: "https://x.com/RangewayEV",
} as const;

export const FORMATS = [
  {
    name: "Waystation",
    context: "Regional routes",
    operatingModel: "Automated and unstaffed",
    summary:
      "A reliable indoor reset designed around ultra-fast charging, climate-controlled comfort, restrooms, seating, Wi-Fi, and local provisions.",
    href: "/network/waystation",
    image: "/images/waystation-joshua-tree.webp",
    imageSmall: "/images/waystation-joshua-tree-640.webp",
  },
  {
    name: "Basecamp",
    context: "High-traffic corridors",
    operatingModel: "Staffed flagship",
    summary:
      "A fuller hospitality stop designed around a staffed driver’s lounge, cafe service, and space for families and longer travel days.",
    href: "/network/basecamp",
    image: "/images/basecamp-rosamond.webp",
    imageSmall: "/images/basecamp-rosamond-640.webp",
  },
  {
    name: "Summit",
    context: "Overnight destinations",
    operatingModel: "Destination experience",
    summary:
      "A slower stop built around site-specific Lookouts, a central clubhouse, and off-grid solar and battery systems.",
    href: "/network/summit",
    image: "/images/summit-clubhouse-mountains.webp",
    imageSmall: "/images/summit-clubhouse-mountains-640.webp",
  },
] as const;

export const PROJECTS = [
  {
    place: "Mojave",
    region: "California",
    corridor: "CA-14",
    activity:
      "An off-grid solar and battery charging concept for a high-desert route, with future Basecamp expansion in the public plan.",
    href: EXTERNAL_LINKS.mojave,
    linkLabel: "Mojave project",
  },
  {
    place: "St. Louis",
    region: "Missouri",
    corridor: "Regional development",
    activity:
      "A joint venture with LoüTeq to develop premium charging locations across the St. Louis region.",
    href: EXTERNAL_LINKS.stLouis,
    linkLabel: "St. Louis announcement",
  },
  {
    place: "Hawaii",
    region: "Hawaiʻi Island",
    corridor: "Island development",
    activity:
      "Inspired by the Hawaiian practice of welcoming and caring for guests, the project will pair ultra-fast charging with a comfortable driver’s lounge and a strong sense of place for the island road.",
    href: EXTERNAL_LINKS.hawaii,
    linkLabel: "Hawaii project",
  },
] as const;

export const TEAM = [
  {
    name: "Zak Winnick",
    role: "Founder and CEO",
    bio: "Zak has spent his career operating luxury resorts, wellness retreats, and flagship urban hotels. He is also a longtime EV driver and community organizer, with firsthand insight into what charging feels like on a long trip.",
    image: "/images/team/zak-winnick.webp",
    imageSmall: "/images/team/zak-winnick-640.webp",
    imageWidth: 800,
    imageHeight: 800,
    linkedin: "https://www.linkedin.com/in/zakwinnick",
  },
  {
    name: "Luke Schuette",
    role: "Director of Design and Construction",
    bio: "Luke leads design and construction for the Rangeway network. A structural systems innovator, he chairs ASTM's task group on Structural Engineered Bamboo and holds patents in solar charging structures.",
    image: "/images/team/luke-schuette.webp",
    imageWidth: 400,
    imageHeight: 400,
    linkedin: "https://www.linkedin.com/in/luke-d-sch%C3%BCette/",
  },
  {
    name: "James Regan",
    role: "Finance and Strategy",
    bio: "James has built his career in corporate development and business analytics, and serves as Managing Partner at CapitalWorks. He specializes in infrastructure project financing and capital strategy for the buildout of the Rangeway network.",
    image: "/images/team/james-regan.webp",
    imageWidth: 276,
    imageHeight: 276,
    linkedin: "https://www.linkedin.com/in/james-regan-913915a/",
  },
  {
    name: "Stephanie McGreevy",
    role: "Policy and Public Capital",
    bio: "Stephanie's career has focused on zero-emission vehicle infrastructure. She founded Open Energy Alliance and specializes in LCFS optimization and public funding strategies, including NEVI and state programs.",
    image: "/images/team/stephanie-mcgreevy.webp",
    imageWidth: 352,
    imageHeight: 352,
    linkedin: "https://www.linkedin.com/in/smcgreevy/",
  },
  {
    name: "Theo Reichgelt",
    role: "Brand and Growth",
    bio: "Theo founded Nexxt Industry, an eMobility marketing agency, and specializes in charging-network brand development and market positioning. He also hosts The eMobility Marketing Podcast.",
    image: "/images/team/theo-reichgelt.webp",
    imageSmall: "/images/team/theo-reichgelt-640.webp",
    imageWidth: 800,
    imageHeight: 800,
    linkedin: "https://www.linkedin.com/in/theoreichgelt/",
  },
] as const;

export const PARTNER_GROUPS = [
  {
    title: "Structures",
    promise: "Low-carbon structures and place-making systems.",
    partners: [
      { name: "LoüTeq", role: "Structural and building partner", logo: "/images/partners/louteq.png", logoWidth: 601, logoHeight: 192, href: "https://louteq.com" },
    ],
  },
  {
    title: "Energy",
    promise: "Charging, storage, solar, and project-specific power architecture.",
    partners: [
      { name: "Carbon DC", role: "Energy infrastructure", logo: "/images/partners/carbondc.png", logoWidth: 180, logoHeight: 180, href: "https://carbondc.io" },
      { name: "Ekoenergetyka", role: "Ultra-fast charging hardware", logo: "/images/partners/ekoenergetyka.png", logoWidth: 180, logoHeight: 180, href: "https://ekoenergetyka.com/america/" },
      { name: "Electric Era", role: "Charging hardware and storage", logo: "/images/partners/electric-era-trans.png", logoWidth: 4326, logoHeight: 2976, href: "https://electricera.tech" },
      { name: "HyWatts", role: "Modular power systems", logo: "/images/partners/hywatts.webp", logoWidth: 2048, logoHeight: 1703, href: "https://hywatts.com" },
    ],
  },
  {
    title: "Driver systems",
    promise: "Support, session handling, operations, and maintenance tools.",
    partners: [
      { name: "ChargeMate", role: "Driver support", logo: "/images/partners/chargemate.jpg", logoWidth: 200, logoHeight: 200, href: "https://chargemate.ai" },
      { name: "Juice", role: "Session technology", logo: "/images/partners/juice.png", logoWidth: 48, logoHeight: 48, href: "https://js.eco" },
      { name: "Monta", role: "Charge point management", logo: "/images/partners/monta.png", logoWidth: 256, logoHeight: 256, href: "https://monta.com" },
      { name: "WattsUp", role: "Predictive maintenance", logo: "/images/partners/wattsup.png", logoWidth: 32, logoHeight: 32, href: "https://wattsupev.io/" },
    ],
  },
  {
    title: "Amenities",
    promise: "Comfort, food, and the physical experience around the charge.",
    partners: [
      { name: "Pebble", role: "Mobile driver lounges", logo: "/images/partners/pebble-trans.png", partnerPageLogo: "/images/partners/pebble.png", logoWidth: 1024, logoHeight: 681, href: "https://pebblelife.com" },
      { name: "Rivian", role: "Early-site amenity vehicles", logo: "/images/partners/rivian.png", logoWidth: 1375, logoHeight: 1334, href: "https://rivian.com" },
    ],
  },
] as const;

export const ACTIVITY = [
  {
    date: "June 5, 2026",
    type: "Company announcement",
    title: "Rangeway and LoüTeq form a joint venture for St. Louis regional development.",
    href: EXTERNAL_LINKS.stLouis,
  },
] as const;
