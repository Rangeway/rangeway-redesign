export const PRESS_FEED_URL = "https://newsroom.rangeway.co/feed-press.xml";

type PressRelease = {
  date: string;
  type: string;
  title: string;
  href: string;
  image?: string;
  imageLabel?: string;
};

const NEWSROOM_HOST = "newsroom.rangeway.co";
const KNOWN_CONCEPT_IMAGES = new Set([
  "https://newsroom.rangeway.co/assets/images/rangeway-louteq-stlouis-social.jpg",
]);
const XML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

const decodeXml = (value: string) => value
  .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
  .replace(/&(amp|lt|gt|quot|apos);/g, (_, entity: string) => XML_ENTITIES[entity] ?? entity)
  .trim();

const tagValue = (item: string, tag: string) => {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const trustedNewsroomUrl = (value: string) => {
  try {
    const url = new URL(decodeXml(value));
    return url.protocol === "https:" && url.hostname === NEWSROOM_HOST ? url.toString() : null;
  } catch {
    return null;
  }
};

export const parseLatestPressRelease = (xml: string): PressRelease | null => {
  const item = xml.match(/<item>([\s\S]*?)<\/item>/i)?.[1];
  if (!item) return null;

  const title = tagValue(item, "title");
  const href = trustedNewsroomUrl(tagValue(item, "link"));
  const publishedAt = new Date(tagValue(item, "pubDate"));
  const enclosureUrl = item.match(/<enclosure\b[^>]*\burl=(["'])(.*?)\1/i)?.[2] ?? "";
  const image = enclosureUrl ? trustedNewsroomUrl(enclosureUrl) : null;

  if (!title || !href || Number.isNaN(publishedAt.valueOf())) return null;

  const release: PressRelease = {
    date: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "America/Los_Angeles",
    }).format(publishedAt),
    type: "Press release",
    title,
    href,
  };

  if (image) {
    release.image = image;
    if (KNOWN_CONCEPT_IMAGES.has(image)) release.imageLabel = "Concept rendering";
  }

  return release;
};

export const loadLatestPressRelease = async (fallback: PressRelease): Promise<PressRelease> => {
  try {
    const response = await fetch(PRESS_FEED_URL, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Newsroom feed returned ${response.status}`);

    return parseLatestPressRelease(await response.text()) ?? fallback;
  } catch (error) {
    console.warn("Using the static Newsroom fallback:", error);
    return fallback;
  }
};
