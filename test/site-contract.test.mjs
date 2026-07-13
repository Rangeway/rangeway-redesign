import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("fresh operating homepage contract", () => {
  const home = read("src/pages/index.astro");
  const data = read("src/data/site-content.ts");
  const css = read("src/styles/global.css");
  const header = read("src/components/SiteHeader.astro");

  assert.match(home, /Travel farther\. Stop better\./);
  assert.match(header, /site-header__capsule/);
  assert.match(header, /site-header__brand/);
  assert.ok(data.indexOf("Bozeman") < data.indexOf("Mojave"));
  assert.ok(data.indexOf("Mojave") < data.indexOf("St. Louis"));

  for (const name of [
    "Waystation",
    "Basecamp",
    "Summit",
    "Zak Winnick",
    "Luke Schuette",
    "Theo Reichgelt",
    "Stephanie McGreevy",
  ]) {
    assert.match(data, new RegExp(name));
  }

  for (const forbidden of [
    "Trailhead",
    "James Regan",
    "Jim Regan",
    "Raul Dominguez",
    "Paul Devon",
    "Host a",
    "quiet-bold",
  ]) {
    assert.doesNotMatch(`${home}\n${data}`, new RegExp(forbidden, "i"));
  }

  for (const token of [
    "#17313E",
    "#142B35",
    "#F2B64C",
    "#993A28",
    "#F7E6C4",
    "#52636B",
    "Raleway",
    "Source Sans 3",
    "IBM Plex Mono",
  ]) {
    assert.match(css.toUpperCase(), new RegExp(token.toUpperCase()));
  }

  assert.doesNotMatch(css, /\.reveal[^}]*opacity\s*:\s*0/s);
});

test("network overview presents the operating system without a fake locator", () => {
  const network = read("src/pages/network.astro");

  for (const required of [
    "Waystation",
    "Basecamp",
    "Summit",
    "Indoor Comfort Guarantee",
    "FormatCompare",
    "RouteBoard",
  ]) {
    assert.match(network, new RegExp(required));
  }

  assert.doesNotMatch(network, /locator|location finder|live availability|available now|near you/i);
});

test("format pages are truthful and compositionally distinct", () => {
  const waystation = read("src/pages/network/waystation.astro");
  const basecamp = read("src/pages/network/basecamp.astro");
  const summit = read("src/pages/network/summit.astro");

  assert.match(waystation, /automated/i);
  assert.match(waystation, /unstaffed/i);
  assert.match(basecamp, /staffed/i);
  assert.match(basecamp, /Trailkeepers/);
  assert.match(summit, /Lookouts/);
  assert.doesNotMatch(summit, /cabins|units|rooms/i);
  assert.match(waystation, /data-composition="waystation-flow"/);
  assert.match(basecamp, /data-composition="basecamp-service"/);
  assert.match(summit, /data-composition="summit-destination"/);
});

test("Waystation title stays viewport-safe and essential hospitality makes no hours claim", () => {
  const waystation = read("src/pages/network/waystation.astro");
  const leadRule = waystation.match(/\.waystation-lead\s*\{(?<rule>[^}]*)\}/s)?.groups?.rule ?? "";
  const titleRule = waystation.match(/\.waystation-lead h1\s*\{(?<rule>[^}]*)\}/s)?.groups?.rule ?? "";

  assert.doesNotMatch(leadRule, /overflow\s*:\s*hidden/i);
  assert.match(waystation, /\.waystation-lead__copy\s*\{[^}]*min-width\s*:\s*0/s);
  assert.match(titleRule, /max-width\s*:\s*100%/);
  assert.match(titleRule, /font-size\s*:\s*clamp\([^,]+,[^,]+,\s*7rem\)/);
  assert.match(waystation, /@media \(max-width: 820px\)[\s\S]*\.waystation-lead h1\s*\{[^}]*font-size\s*:\s*clamp\([^,]+,[^,]+,\s*4rem\)/);
  assert.doesNotMatch(waystation, />\s*24\s*</);
  assert.doesNotMatch(waystation, /24\s*(?:hours?|\/\s*7)|availability/i);
});

test("format comparison links remain exposed to source and built accessibility trees", () => {
  const compare = read("src/components/FormatCompare.astro");

  assert.doesNotMatch(compare, /format-compare__header"\s+aria-hidden="true"/);
  assert.match(compare, /format-compare__header[\s\S]*<a href=\{format\.href\}/);

  execFileSync("npm", ["run", "build", "--silent"], {
    cwd: new URL("../", import.meta.url),
    stdio: "pipe",
  });
  const built = read("dist/network/index.html");
  assert.doesNotMatch(built, /format-compare__header[^>]*aria-hidden="true"/);
  assert.match(built, /format-compare__header[\s\S]*href="\/network\/waystation"/);
});

test("company and utility families preserve distinct purposes", () => {
  const story = read("src/pages/our-story.astro");
  const team = read("src/pages/team.astro");
  const partners = read("src/pages/partners.astro");
  const investors = read("src/pages/investors.astro");
  const commitments = read("src/pages/commitments.astro");
  const thanks = read("src/pages/contact/thanks.astro");
  const notFound = read("src/pages/404.astro");

  assert.match(story, /story-family/);
  assert.match(story, /RouteBoard/);
  assert.match(team, /PeopleField/);
  assert.match(partners, /PartnerField/);
  assert.match(investors, /investor-family/);
  assert.ok(investors.indexOf("The thesis") < investors.indexOf("Operating evidence"));
  assert.ok(investors.indexOf("Operating evidence") < investors.indexOf("Project pipeline"));
  assert.ok(investors.indexOf("Project pipeline") < investors.indexOf("Recognition"));
  assert.ok(investors.indexOf("Recognition") < investors.indexOf("Request the investor briefing"));
  for (const anchor of ["environment", "communities", "inclusion", "people", "accountability"]) {
    assert.match(commitments, new RegExp(`(?:id:\\s*|id=)\"${anchor}\"`));
  }
  assert.match(commitments, /href={`#\$\{chapter\.id\}`}/);
  assert.match(thanks, /utility-family/);
  assert.match(notFound, /utility-family/);

  const all = `${story}\n${team}\n${partners}\n${investors}\n${commitments}\n${thanks}\n${notFound}`;
  assert.doesNotMatch(all, /PageHero|index-row|reveal/);
});

test("company people are visible once and limited to the approved roster", () => {
  const data = read("src/data/site-content.ts");
  const field = read("src/components/PeopleField.astro");
  const team = read("src/pages/team.astro");

  assert.match(field, /TEAM\.map/);
  assert.match(field, /<article/);
  assert.match(field, /<h2>{person\.name}<\/h2>/);
  assert.match(team, /<PeopleField/);
  for (const approved of ["Zak Winnick", "Luke Schuette", "Theo Reichgelt", "Stephanie McGreevy"]) {
    assert.equal((data.match(new RegExp(approved, "g")) ?? []).length, 1);
  }
  assert.doesNotMatch(`${data}\n${field}\n${team}`, /James|Jim Regan|Raul Dominguez|Paul Devon/i);
});

test("partner family leads with visible logos and role context", () => {
  const field = read("src/components/PartnerField.astro");
  const partners = read("src/pages/partners.astro");

  assert.match(partners, /<PartnerField/);
  assert.match(field, /PARTNER_GROUPS\.map/);
  assert.match(field, /partner\.logo/);
  assert.match(field, /partner\.role/);
  assert.match(field, /Site-specific configurations vary by project phase/);
  assert.doesNotMatch(field, /partner-row|index-row|reveal/);
});

test("contact form keeps a native POST fallback and accessible enhancement", () => {
  const contact = read("src/components/ContactForm.astro");
  const page = read("src/pages/contact.astro");

  assert.match(contact, /method="POST"/);
  assert.match(contact, /action="https:\/\/formsubmit\.co\/hello@rangeway\.co"/);
  assert.match(contact, /aria-live="polite"/);
  assert.doesNotMatch(contact, /preventDefault/);
  for (const interest of ["EV Driver", "Potential Partner", "Investor", "Careers", "Media", "Other"]) {
    assert.match(contact, new RegExp(interest));
  }
  for (const email of ["hello", "media", "careers", "investors", "partners"]) {
    assert.match(page, new RegExp(`${email}@rangeway\\.co`));
  }
});

test("legal layout provides anchors and a readable measure", () => {
  const legal = read("src/components/LegalLayout.astro");
  const privacy = read("src/pages/privacy.astro");
  const terms = read("src/pages/terms.astro");

  assert.match(legal, /title: string/);
  assert.match(legal, /effectiveDate: string/);
  assert.match(legal, /aria-label="On this page"/);
  assert.match(legal, /max-width:\s*(6[2-9]|7[0-6])ch/);
  assert.match(privacy, /<LegalLayout/);
  assert.match(terms, /<LegalLayout/);
  assert.match(privacy, /id="information-we-collect"/);
  assert.match(privacy, /CCPA/);
  assert.match(privacy, /GDPR/);
  assert.match(terms, /id="forward-looking-statements"/);
  assert.match(terms, /State of Delaware/);
  assert.match(`${privacy}\n${terms}`, /April 21, 2026/);
});
