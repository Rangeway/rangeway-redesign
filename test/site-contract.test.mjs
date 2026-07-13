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

test("homepage feedback keeps proof, disclosures, and partner marks attached to their intended surfaces", () => {
  const home = read("src/pages/index.astro");
  const css = read("src/styles/global.css");

  assert.match(home, /src="\/images\/hero-mountain-waystation\.webp"/);
  assert.match(home, /srcSmall="\/images\/hero-mountain-waystation-640\.webp"/);
  assert.match(home, /alt="Concept rendering of a Rangeway Waystation in Bozeman, Montana,[^"]+"/);
  assert.match(home, /width=\{1672\}[\s\S]*height=\{941\}/);

  const proofRail = home.match(/<section class="proof-rail"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.equal((proofRail.match(/<div>/g) ?? []).length, 2);
  assert.match(proofRail, /<strong>03<\/strong><span>network formats<\/span>/);
  assert.match(proofRail, /<strong>03<\/strong><span>public project regions<\/span>/);
  assert.doesNotMatch(proofRail, /Field Notes|access to the team/i);
  assert.match(css, /\.proof-rail\s*\{[^}]*grid-template-columns:\s*repeat\(2,1fr\)/s);

  assert.match(css, /\.site-header__nav--left\s*\{[^}]*justify-content:\s*center/s);
  assert.match(css, /\.site-header__nav--right\s*\{[^}]*justify-content:\s*center/s);

  const waystation = home.match(/<article class="format format--waystation">[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.match(waystation, /<div class="format__waystation-media">[\s\S]*<ResponsiveImage[\s\S]*<p class="concept-label">Concept rendering<\/p>[\s\S]*<\/div>/);
  assert.match(css, /\.format__waystation-media\s*\{[^}]*position:\s*relative/s);

  const partnerProof = home.match(/<section class="partner-proof"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(partnerProof, /\/images\/partners\/louteq-white\.png/);
  assert.match(partnerProof, /\/images\/partners\/eko-trans\.webp/);
  assert.match(partnerProof, /width=\{partner\.name === "Ekoenergetyka" \? 512 : partner\.logoWidth\}/);
  assert.match(partnerProof, /height=\{partner\.name === "Ekoenergetyka" \? 512 : partner\.logoHeight\}/);
  assert.match(partnerProof, /partner-proof__logo--pebble/);
  assert.match(css, /\.partner-proof__logos\s*\{[^}]*background:\s*transparent/s);
  assert.match(css, /\.partner-proof__logo--pebble\s*\{[^}]*max-height:/s);

  assert.match(partnerProof, /"partner-proof__logo--reverse": partner\.name === "ChargeMate"/);
  const reverseRule = css.match(/\.partner-proof__logo--reverse\s*\{(?<rule>[^}]*)\}/)?.groups?.rule ?? "";
  assert.match(reverseRule, /filter:\s*invert\(1\)/);
  assert.match(reverseRule, /mix-blend-mode:\s*screen/);
  assert.doesNotMatch(reverseRule, /brightness\(0\)/);

  assert.match(css, /\.current-activity__intro\s*\{[^}]*position:\s*sticky/s);
});

test("final homepage polish centers desktop navigation, reduces format cards, and links partner logos", () => {
  const home = read("src/pages/index.astro");
  const css = read("src/styles/global.css");

  assert.match(css, /\.site-header__nav--left\s*\{[^}]*justify-content:\s*center/s);
  assert.match(css, /\.site-header__nav--right\s*\{[^}]*justify-content:\s*center/s);

  const waystationRule = css.match(/\.format--waystation\s*\{(?<rule>[^}]*)\}/)?.groups?.rule ?? "";
  assert.match(waystationRule, /max-width:\s*1320px/);
  assert.match(css, /\.format__waystation-media\s*\{[^}]*aspect-ratio:\s*\.95/s);

  const basecampRule = css.match(/\.format--basecamp\s*\{(?<rule>[^}]*)\}/)?.groups?.rule ?? "";
  assert.match(basecampRule, /max-width:\s*1280px/);
  assert.match(basecampRule, /min-height:\s*740px/);
  assert.match(css, /\.format__basecamp-panel\s*\{[^}]*min-height:\s*740px/s);

  const summitRule = css.match(/\.format--summit\s*\{(?<rule>[^}]*)\}/)?.groups?.rule ?? "";
  assert.match(summitRule, /max-width:\s*1180px/);
  assert.match(css, /\.format__summit-title h3\s*\{[^}]*font-size:\s*clamp\(4rem,7vw,7rem\)/s);
  assert.match(css, /\.format__summit-media\s*\{[^}]*min-height:\s*560px/s);
  assert.match(css, /\.format__summit-copy\s*\{[^}]*padding:\s*34px clamp\(28px,6vw,76px\) 48px 0/s);

  const mobileRules = css.match(/@media \(max-width: 820px\)\s*\{(?<rules>[\s\S]*?)\n\}/)?.groups?.rules ?? "";
  assert.match(mobileRules, /\.format__waystation-media\s*\{[^}]*aspect-ratio:\s*1\s*\/\s*\.94/s);
  assert.match(mobileRules, /\.format--basecamp\s*\{[^}]*min-height:\s*620px/s);
  assert.match(mobileRules, /\.format__basecamp-panel\s*\{[^}]*min-height:\s*620px/s);
  assert.match(mobileRules, /\.format__summit-media\s*\{[^}]*min-height:\s*340px/s);

  const partnerProof = home.match(/<section class="partner-proof"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(partnerProof, /<a\s+href=\{partner\.href\}\s+target="_blank"\s+rel="noopener noreferrer"/);
  assert.match(partnerProof, /aria-label=\{`Visit \$\{partner\.name\} website \(opens in a new tab\)`\}/);
  assert.match(partnerProof, /<a[\s\S]*?<img[\s\S]*?<\/a>/);
  assert.match(css, /\.partner-proof__logos a\s*\{[^}]*transition:/s);
  assert.match(css, /\.partner-proof__logos a:hover,[\s\S]*\.partner-proof__logos a:focus-visible\s*\{[^}]*transform:/s);
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

test("Basecamp mobile heading stays inside the 360px content box", () => {
  const basecamp = read("src/pages/network/basecamp.astro");
  const mobileRule = basecamp.match(/@media \(max-width: 820px\)[\s\S]*?\.basecamp-cover h1\s*\{(?<rule>[^}]*)\}/)?.groups?.rule ?? "";

  assert.match(mobileRule, /max-width\s*:\s*100%/);
  assert.match(mobileRule, /font-size\s*:\s*clamp\(3\.8rem,\s*18vw,\s*5\.4rem\)/);
  assert.doesNotMatch(mobileRule, /25vw|7rem/);
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

test("deferred asset cleanup removes duplicate font CSS and reserves partner logo space", () => {
  const css = read("src/styles/global.css");
  const data = read("src/data/site-content.ts");
  const field = read("src/components/PartnerField.astro");
  const home = read("src/pages/index.astro");
  const charcoalLogo = read("public/images/logo/rangeway-lockup-charcoal.svg");
  const whiteLogo = read("public/images/logo/rangeway-lockup-white.svg");

  assert.doesNotMatch(css, /@import\s+url\(["']?https:\/\/fonts\.googleapis\.com/i);
  assert.equal((data.match(/logoWidth:\s*\d+/g) ?? []).length, 11);
  assert.equal((data.match(/logoHeight:\s*\d+/g) ?? []).length, 11);
  assert.match(field, /width=\{partner\.logoWidth\}/);
  assert.match(field, /height=\{partner\.logoHeight\}/);
  const homePartnerProof = home.match(/<section class="partner-proof"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(homePartnerProof, /width=\{[^}]*partner\.logoWidth\}/);
  assert.match(homePartnerProof, /height=\{[^}]*partner\.logoHeight\}/);
  assert.doesNotMatch(`${charcoalLogo}\n${whiteLogo}`, /[ \t]+$/m);
});

test("the mobile menu enhances native navigation with focus trap and restoration", () => {
  const header = read("src/components/SiteHeader.astro");
  const css = read("src/styles/global.css");

  assert.match(header, /<details class="site-header__mobile-menu"/);
  assert.match(header, /<summary>/);
  assert.match(header, /<nav aria-label="Mobile navigation">/);
  assert.doesNotMatch(header, /<(?:details|nav)[^>]*(?:hidden|inert|aria-hidden="true")/i);
  assert.match(header, /addEventListener\("keydown"/);
  assert.match(header, /event\.key === "Escape"/);
  assert.match(header, /event\.key !== "Tab"/);
  assert.match(header, /first\.focus\(\)/);
  assert.match(header, /last\.focus\(\)/);
  assert.match(header, /summary\.focus\(\)/);
  assert.match(header, /menu\.open = false/);
  assert.match(css, /\.skip-link:focus\s*\{[^}]*transform:\s*none/);
  assert.match(css, /:focus-visible\s*\{[^}]*outline:/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
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

test("reviewed page openings use six purpose-specific structures", () => {
  const pages = {
    story: read("src/pages/our-story.astro"),
    team: read("src/pages/team.astro"),
    partners: read("src/pages/partners.astro"),
    investors: read("src/pages/investors.astro"),
    commitments: read("src/pages/commitments.astro"),
    contact: read("src/pages/contact.astro"),
  };
  const expectedOpenings = {
    story: "story-photo-masthead",
    team: "team-people-opening",
    partners: "partners-capability-opening",
    investors: "investor-proof-opening",
    commitments: "commitments-index-opening",
    contact: "contact-support-opening",
  };

  const actualOpenings = Object.entries(pages).map(([name, source]) => {
    const opening = source.match(/<section class="([^"]+)"/)?.[1];
    assert.equal(opening, expectedOpenings[name], `${name} opening class`);
    return opening;
  });
  assert.equal(new Set(actualOpenings).size, 6);

  const storyOpening = pages.story.match(/<section class="story-photo-masthead"[\s\S]*?<\/section>/)?.[0] ?? "";
  const investorOpening = pages.investors.match(/<section class="investor-proof-opening"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.ok(storyOpening.indexOf("<ResponsiveImage") < storyOpening.indexOf("story-photo-masthead__copy"));
  assert.match(storyOpening, /<blockquote>/);
  assert.doesNotMatch(storyOpening, /<header|grid-template-columns/);
  assert.match(pages.story, /\.story-photo-masthead \{[^}]*position: relative;[^}]*min-height:/s);
  assert.doesNotMatch(pages.story, /basecamp-interior|class="story-opening"/);
  assert.match(pages.team, /<section class="team-people-opening"[\s\S]*<PeopleField\s*\/>/);
  assert.match(pages.team, /\.team-people-opening > header \{ display: flex/);
  assert.match(pages.partners, /<section class="partners-capability-opening"[\s\S]*<PartnerField\s*\/>/);
  assert.match(pages.partners, /\.partners-capability-opening > header \{ max-width:/);
  assert.match(investorOpening, /<div class="investor-proof-opening__thesis">/);
  assert.match(investorOpening, /<dl class="investor-evidence-rail"/);
  assert.equal((investorOpening.match(/<dt>/g) ?? []).length, 3);
  assert.doesNotMatch(investorOpening, /ResponsiveImage|<picture|<figure/);
  assert.match(pages.investors, /\.investor-proof-opening__thesis \{ max-width:/);
  assert.doesNotMatch(pages.investors.match(/\.investor-proof-opening__thesis \{[^}]*\}/)?.[0] ?? "", /display: grid|grid-template-columns/);
  assert.match(pages.commitments, /<section class="commitments-index-opening"[\s\S]*aria-label="On this page"/);
  assert.match(pages.commitments, /commitments-index-opening__brief/);
  assert.match(pages.commitments, /grid-template-columns: minmax\(0,1\.2fr\) minmax\(280px,\.8fr\)/);
  assert.match(pages.contact, /<section class="contact-support-opening"[\s\S]*<ContactForm\s*\/>/);

  const all = Object.values(pages).join("\n");
  assert.doesNotMatch(all, /grid-template-columns:\s*\.3[58]fr\s+1\.0[5-9]fr\s+\.5[05]fr/);
  assert.doesNotMatch(all, /class="(?:story-opening|story-editorial-opening|investor-opening|investor-thesis-opening|team-intro|partners-intro|commitments-opening|contact-opening)"/);
});

test("Trailkeeper commitment stays Basecamp-specific", () => {
  const commitments = read("src/pages/commitments.astro");
  assert.match(commitments, /Basecamp service roles are designed around hospitality training and progression/);
  assert.doesNotMatch(commitments, /Basecamp and Summit service roles/);
});

test("interrupted native contact submissions recover without clearing values", () => {
  const contact = read("src/components/ContactForm.astro");
  assert.match(contact, /const SUBMISSION_TIMEOUT_MS = 12000/);
  assert.match(contact, /const restoreSubmission =/);
  assert.match(contact, /window\.setTimeout\(\(\) =>/);
  assert.match(contact, /We could not confirm delivery\. Your message is still here; check your connection and try again\./);
  assert.match(contact, /button\.disabled = false/);
  assert.doesNotMatch(contact, /form\.reset\(|preventDefault/);
});

test("contact success, failure, and timeout states remain semantic without replacing native POST", () => {
  const contact = read("src/components/ContactForm.astro");
  const thanks = read("src/pages/contact/thanks.astro");

  assert.match(contact, /data-state="idle"/);
  assert.match(contact, /data-status role="status" aria-live="polite"/);
  assert.match(contact, /const setSubmissionState =/);
  assert.match(contact, /form\.dataset\.state = state/);
  assert.match(contact, /form\.setAttribute\("aria-busy", state === "submitting" \? "true" : "false"\)/);
  assert.match(contact, /window\.addEventListener\("offline"/);
  assert.match(contact, /Your connection is offline\. Your message is still here; reconnect and try again\./);
  assert.match(contact, /We could not confirm delivery\. Your message is still here; check your connection and try again\./);
  assert.match(thanks, /data-submission-result="success"/);
  assert.match(thanks, /role="status"/);
  assert.doesNotMatch(contact, /preventDefault|fetch\(/);
});

test("every unbuilt-place image carries visible concept disclosure and accurate alt framing", () => {
  const expectedByPage = new Map([
    ["src/pages/index.astro", 6],
    ["src/pages/network.astro", 1],
    ["src/pages/network/waystation.astro", 1],
    ["src/pages/network/basecamp.astro", 2],
    ["src/pages/network/summit.astro", 2],
    ["src/pages/our-story.astro", 1],
  ]);

  for (const [path, expected] of expectedByPage) {
    const source = read(path);
    assert.equal((source.match(/>Concept rendering<\/p>/g) ?? []).length, expected, `${path} visible labels`);
    assert.equal((source.match(/alt="Concept rendering of /g) ?? []).length, expected, `${path} concept-aware alt text`);
  }

  const css = read("src/styles/global.css");
  assert.match(css, /\.concept-label\s*\{/);
  assert.match(css, /font:\s*600[^;]*var\(--font-mono\)/);
});

test("mobile navigation reserves arrows for external links and announces new tabs", () => {
  const header = read("src/components/SiteHeader.astro");
  const css = read("src/styles/global.css");

  assert.match(header, /link\.external && <span class="sr-only"> \(opens in a new tab\)<\/span>/);
  assert.match(header, /link\.external && <span aria-hidden="true">↗<\/span>/);
  assert.doesNotMatch(header, /<span>\{link\.label\}<\/span><span aria-hidden="true">↗<\/span>/);
  assert.match(css, /\.sr-only\s*\{/);
});
