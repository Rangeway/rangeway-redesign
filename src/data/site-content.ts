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
  { label: "Partners", href: "/partners", external: false },
  { label: "Investors", href: "/investors", external: false },
  { label: "Newsroom", href: "https://newsroom.rangeway.co", external: true },
  { label: "Contact", href: "/contact", external: false },
] as const;

export const EXTERNAL_LINKS = {
  bozeman: "https://rangewaybozeman.com",
  mojave: "https://rangewaymojave.com",
  stLouis: "https://newsroom.rangeway.co/press/luke-schuette-louteq/",
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
    place: "Bozeman",
    region: "Montana",
    corridor: "I-90 · Exit 299",
    activity:
      "A premium charging plaza in development near Bozeman Yellowstone International Airport, planned to grow into a Basecamp.",
    href: EXTERNAL_LINKS.bozeman,
    linkLabel: "Bozeman project",
  },
  {
    place: "Mojave / Antelope Valley",
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
] as const;

export const TEAM = [
  {
    name: "Zak Winnick",
    role: "Founder and CEO",
    image: "/images/team/zak-winnick.webp",
    linkedin: "https://www.linkedin.com/in/zakwinnick",
  },
  {
    name: "Luke Schuette",
    role: "Director of Design and Construction",
    image: "/images/team/luke-schuette.webp",
    linkedin: "https://www.linkedin.com/in/luke-d-sch%C3%BCette/",
  },
  {
    name: "Theo Reichgelt",
    role: "Brand and Growth",
    image: "/images/team/theo-reichgelt.webp",
    linkedin: "https://www.linkedin.com/in/theoreichgelt/",
  },
  {
    name: "Stephanie McGreevy",
    role: "Policy and Public Capital",
    image: "/images/team/stephanie-mcgreevy.webp",
    linkedin: "https://www.linkedin.com/in/smcgreevy/",
  },
] as const;

export const PARTNER_GROUPS = [
  {
    title: "Structures",
    promise: "Low-carbon structures and place-making systems.",
    partners: [
      { name: "LoüTeq", role: "Structural and building partner", logo: "/images/partners/louteq.png" },
    ],
  },
  {
    title: "Energy",
    promise: "Charging, storage, solar, and project-specific power architecture.",
    partners: [
      { name: "Carbon DC", role: "Energy infrastructure", logo: "/images/partners/carbondc.png" },
      { name: "Ekoenergetyka", role: "Ultra-fast charging hardware", logo: "/images/partners/ekoenergetyka.png" },
      { name: "Electric Era", role: "Charging hardware and storage", logo: "/images/partners/electric-era-trans.png" },
      { name: "HyWatts", role: "Modular power systems", logo: "/images/partners/hywatts.webp" },
    ],
  },
  {
    title: "Driver systems",
    promise: "Support, session handling, operations, and maintenance tools.",
    partners: [
      { name: "ChargeMate", role: "Driver support", logo: "/images/partners/chargemate.jpg" },
      { name: "Juice", role: "Session technology", logo: "/images/partners/juice.png" },
      { name: "Monta", role: "Charge point management", logo: "/images/partners/monta.png" },
      { name: "WattsUp", role: "Predictive maintenance", logo: "/images/partners/wattsup.png" },
    ],
  },
  {
    title: "Amenities",
    promise: "Comfort, food, and the physical experience around the charge.",
    partners: [
      { name: "Pebble", role: "Mobile driver lounges", logo: "/images/partners/pebble-trans.png" },
      { name: "Rivian", role: "Early-site amenity vehicles", logo: "/images/partners/rivian.png" },
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
