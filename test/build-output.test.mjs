import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import { imageSize } from "image-size";

const root = new URL("../dist/", import.meta.url);
const htmlFiles = readdirSync(root, { recursive: true })
  .filter((path) => path.endsWith(".html"))
  .map((path) => ({ path: String(path), html: readFileSync(new URL(String(path), root), "utf8") }));

const byPath = Object.fromEntries(htmlFiles.map((file) => [file.path, file.html]));

test("static build contains all fifteen intentionally authored routes", () => {
  assert.equal(htmlFiles.length, 15);
  for (const path of [
    "index.html", "network/index.html", "network/waystation/index.html", "network/basecamp/index.html",
    "network/summit/index.html", "our-story/index.html", "team/index.html", "partners/index.html",
    "investors/index.html", "commitments/index.html", "contact/index.html", "contact/thanks/index.html",
    "privacy/index.html", "terms/index.html", "404.html",
  ]) assert.ok(byPath[path], `missing ${path}`);
});

test("every built page is non-indexing and free of prohibited people, formats, and operating claims", () => {
  const all = htmlFiles.map(({ html }) => html).join("\n");
  for (const { path, html } of htmlFiles) {
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/, `${path} must remain noindex`);
    assert.doesNotMatch(html, /\.reveal[^}]*opacity\s*:\s*0/s, `${path} cannot gate content behind reveal CSS`);
  }
  for (const prohibited of [
    "Trailhead", "Raul Dominguez", "Paul Devon",
    "serving drivers today", "live availability", "available now", "location finder",
  ]) assert.doesNotMatch(all, new RegExp(prohibited, "i"));
});

test("built Team page uses the approved roster order and unified grayscale portrait grid", () => {
  const team = byPath["team/index.html"];

  const visibleOrder = ["Zak Winnick", "Luke Schuette", "James Regan", "Stephanie McGreevy", "Theo Reichgelt"]
    .map((name) => team.indexOf(`>${name}</h2>`));
  assert.ok(visibleOrder.every((index) => index >= 0));
  assert.deepEqual(visibleOrder, [...visibleOrder].sort((a, b) => a - b));
  assert.match(team, /Finance and Strategy/);
  assert.match(team, /\/images\/team\/james-regan\.webp/);
  assert.match(team, /filter:grayscale\((?:1)?\)/);
  assert.match(team, /grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/);
});

test("built Partners page uses the dark Pebble logo", () => {
  const partners = byPath["partners/index.html"];
  const home = byPath["index.html"];

  assert.match(partners, /\/images\/partners\/pebble\.png/);
  assert.doesNotMatch(partners, /\/images\/partners\/pebble-trans\.png/);
  assert.match(home, /\/images\/partners\/pebble-trans\.png/);
});

test("built project surfaces publish Mojave, St. Louis, and Hawaii in the approved order", () => {
  const all = htmlFiles.map(({ html }) => html).join("\n");
  assert.doesNotMatch(all, /Bozeman|rangewaybozeman|rangewaymojave\.com|Yellowstone|I-90/i);

  for (const path of ["index.html", "network/index.html", "our-story/index.html", "investors/index.html"]) {
    const html = byPath[path];
    const mojave = html.indexOf("Mojave");
    const stLouis = html.indexOf("St. Louis");
    const hawaii = html.indexOf("Hawaii");
    assert.ok(mojave > -1 && mojave < stLouis && stLouis < hawaii, `${path} project order`);
    assert.match(html, /href="https:\/\/mojave\.rangeway\.co"/, `${path} Mojave link`);
    assert.match(html, /href="https:\/\/hawaii\.rangeway\.co"/, `${path} Hawaii link`);
  }
});

test("primary routes expose distinct main families and multiple visible route-defining sections", () => {
  const routes = {
    "index.html": ["home-page", ["Travel farther.", "Indoor comfort", "Public project announcements"]],
    "network/index.html": ["network-page", ["Indoor Comfort Guarantee", "Choose the pace", "What Rangeway has said"]],
    "network/waystation/index.html": ["waystation-page", ["Automated + unstaffed", "Four moves.", "Indoor comfort"]],
    "network/basecamp/index.html": ["basecamp-page", ["Trailkeepers", "A fuller Rangeway stop", "A service day"]],
    "network/summit/index.html": ["summit-page", ["Lookouts", "Destination pace", "Off-grid"]],
    "our-story/index.html": ["story-family", ["Drivers are guests.", "Four decisions behind every stop.", "Three public regions. One operating standard"]],
    "team/index.html": ["team-family", ["The people doing the work.", "Stephanie McGreevy", "Build the stop you wish existed."]],
    "partners/index.html": ["partner-family", ["The experience is built together.", "Energy", "Site-specific configurations vary by project phase"]],
    "investors/index.html": ["investor-family", ["Experience changes the category.", "Three public development regions.", "Request the investor briefing."]],
    "commitments/index.html": ["commitments-family", ["Environment", "The Trailkeeper standard", "Future reporting should make the standard measurable."]],
    "contact/index.html": ["contact-family", ["Send it to the right desk.", "partners@rangeway.co", "Tell us what brings you here."]],
    "privacy/index.html": ["legal-family", ["Information We Collect", "California Consumer Privacy Act", "General Data Protection Regulation"]],
    "terms/index.html": ["legal-family", ["Forward-Looking Statements", "Limitation of Liability", "State of Delaware"]],
  };

  for (const [path, [family, tokens]] of Object.entries(routes)) {
    const html = byPath[path];
    assert.match(html, new RegExp(`<main[^>]*class="[^"]*${family}[^"]*"`), `${path} family class`);
    assert.match(html, new RegExp(`data-page-family="${family}"`), `${path} explicit page family`);
    for (const token of tokens) {
      assert.match(html, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${path} defining content: ${token}`);
    }
  }
});

test("built main content has no static hiding hooks", () => {
  const css = readdirSync(new URL("_astro/", root), { recursive: true })
    .filter((path) => path.endsWith(".css"))
    .map((path) => readFileSync(new URL(`_astro/${String(path)}`, root), "utf8"))
    .join("\n");
  const visibleRoots = [
    "home-hero", "network-intro", "waystation-lead", "basecamp-service", "summit-horizon",
    "story-photo-masthead", "team-people-opening", "partners-capability-opening", "investor-proof-opening",
    "commitments-index-opening", "contact-support-opening", "legal-shell", "utility-state", "off-map",
  ];
  const substantiveByRoute = {
    "index.html": ["stop-product", "formats", "partner-proof", "current-activity"],
    "network/index.html": ["network-promises", "comfort-guarantee", "network-formats", "network-technical", "project-briefs"],
    "network/waystation/index.html": ["route-flow", "waystation-essentials"],
    "network/basecamp/index.html": ["trailkeeper-intro", "service-day", "basecamp-interior"],
    "network/summit/index.html": ["summit-thesis", "destination-ledger", "summit-energy"],
    "our-story/index.html": ["story-origin", "story-beliefs", "story-current"],
    "team/index.html": ["people-field"],
    "partners/index.html": ["partner-field"],
    "investors/index.html": ["investor-evidence", "investor-pipeline", "investor-recognition"],
    "commitments/index.html": ["commitments-chapter"],
    "contact/index.html": ["contact-form"],
    "privacy/index.html": ["legal-prose"],
    "terms/index.html": ["legal-prose"],
  };

  for (const { path, html } of htmlFiles) {
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "";
    assert.ok(main, `${path} has a main element`);
    assert.doesNotMatch(main, /<(?:section|article|header|div|nav|aside)\b[^>]*(?:\shidden(?:\s|=|>)|\sinert(?:\s|=|>))/i, `${path} has no hidden or inert content container`);
    assert.doesNotMatch(main, /style="[^"]*(?:opacity\s*:\s*0|visibility\s*:\s*hidden|display\s*:\s*none)/i, `${path} has no inline-hidden main content`);
  }
  const visibilityCss = css.replace(/\.contact-form__honey[^,{]*\{[^}]*\}/g, "");
  for (const [path, classes] of Object.entries(substantiveByRoute)) {
    for (const className of classes) {
      assert.match(byPath[path], new RegExp(`class="[^"]*${className}`), `${path} renders ${className}`);
      assert.doesNotMatch(byPath[path], new RegExp(`<[^>]*class="[^"]*${className}[^"]*"[^>]*(?:\\shidden(?:\\s|=|>)|\\sinert(?:\\s|=|>)|style="[^"]*(?:opacity\\s*:\\s*0|visibility\\s*:\\s*hidden|display\\s*:\\s*none))`, "i"), `${path} keeps ${className} semantically visible`);
    }
  }
  const hidingDeclaration = "(?:opacity\\s*:\\s*0(?:[;}]|\\s)|visibility\\s*:\\s*hidden|display\\s*:\\s*none)";
  for (const rootClass of visibleRoots) {
    const hiddenRootRule = new RegExp(`\\.${rootClass}(?![-_])[^{}]*\\{[^}]*${hidingDeclaration}`, "i");
    assert.doesNotMatch(visibilityCss, hiddenRootRule, `${rootClass} root has no CSS hiding rule`);
  }
  for (const className of new Set(Object.values(substantiveByRoute).flat())) {
    const hiddenContentRule = new RegExp(`\\.${className}(?:[-_][^,{]*)?[^{}]*\\{[^}]*${hidingDeclaration}`, "i");
    assert.doesNotMatch(visibilityCss, hiddenContentRule, `${className} and its substantive descendants have no CSS hiding rule`);
  }
});

test("built reviewed openings remain purpose-specific and reject split-story/investor heroes", () => {
  const openings = {
    "our-story/index.html": "story-photo-masthead",
    "team/index.html": "team-people-opening",
    "partners/index.html": "partners-capability-opening",
    "investors/index.html": "investor-proof-opening",
    "commitments/index.html": "commitments-index-opening",
    "contact/index.html": "contact-support-opening",
  };
  assert.equal(new Set(Object.values(openings)).size, 6);
  for (const [path, opening] of Object.entries(openings)) {
    assert.match(byPath[path], new RegExp(`<main[^>]*>[\\s\\S]*?<section class="${opening}"`), `${path} opening`);
  }
  const storyOpening = byPath["our-story/index.html"].match(/<section class="story-photo-masthead"[\s\S]*?<\/section>/)?.[0] ?? "";
  const investorOpening = byPath["investors/index.html"].match(/<section class="investor-proof-opening"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(storyOpening, /<picture[\s\S]*story-photo-masthead__copy/);
  assert.doesNotMatch(storyOpening, /<header/);
  assert.match(investorOpening, /investor-proof-opening__thesis[\s\S]*<dl class="investor-evidence-rail"/);
  assert.doesNotMatch(investorOpening, /<picture|<figure/);
});

test("contact remains a native POST and legal anchors survive static rendering", () => {
  const contact = byPath["contact/index.html"];
  assert.match(contact, /<form[^>]*action="https:\/\/formsubmit\.co\/hello@rangeway\.co"[^>]*method="POST"/);
  assert.match(contact, /name="_next" value="https:\/\/redesign\.rangeway\.co\/contact\/thanks\/"/);
  const contactFormScript = contact.match(/<form class="contact-form"[\s\S]*?<\/form><script[^>]*>(?<script>[\s\S]*?)<\/script>/)?.groups?.script ?? "";
  assert.ok(contactFormScript, "contact form enhancement is present");
  assert.doesNotMatch(contactFormScript, /preventDefault|fetch\(/);
  for (const id of ["information-we-collect", "california-rights", "gdpr-rights"]) assert.match(byPath["privacy/index.html"], new RegExp(`id="${id}"`));
  for (const id of ["forward-looking-statements", "governing-law", "contact"]) assert.match(byPath["terms/index.html"], new RegExp(`id="${id}"`));
});

test("built pages keep no-JavaScript navigation, reduced-motion safety, and stable media geometry", () => {
  const css = readdirSync(new URL("_astro/", root), { recursive: true })
    .filter((path) => path.endsWith(".css"))
    .map((path) => readFileSync(new URL(`_astro/${String(path)}`, root), "utf8"))
    .join("\n");

  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /animation-duration:\s*\.01ms\s*!important/);
  assert.doesNotMatch(css, /@import[^;]*fonts\.googleapis\.com/i);

  for (const { path, html } of htmlFiles) {
    const menu = html.match(/<details class="site-header__mobile-menu"[\s\S]*?<\/details>/)?.[0] ?? "";
    assert.match(menu, /<summary>/, `${path} keeps a native menu disclosure`);
    assert.match(menu, /<nav aria-label="Mobile navigation">/, `${path} keeps static mobile navigation`);
    assert.equal((menu.match(/<a\b/g) ?? []).length, 7, `${path} exposes all seven mobile links without JavaScript`);
    assert.equal((html.match(/fonts\.googleapis\.com\/css2/g) ?? []).length, 1, `${path} loads the shared Google stylesheet once`);

    for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
      assert.match(image, /\bwidth="\d+"/, `${path} image reserves intrinsic width`);
      assert.match(image, /\bheight="\d+"/, `${path} image reserves intrinsic height`);
    }
  }

  const contact = byPath["contact/index.html"];
  assert.match(contact, /<input[^>]*type="email"[^>]*required/);
  assert.match(contact, /<select[^>]*required/);
  assert.match(contact, /<textarea[^>]*required/);
  assert.match(contact, /data-state="idle"[^>]*aria-busy="false"/);
  const contactFormScript = contact.match(/<form class="contact-form"[\s\S]*?<\/form><script[^>]*>(?<script>[\s\S]*?)<\/script>/)?.groups?.script ?? "";
  assert.ok(contactFormScript, "contact form enhancement is present");
  assert.doesNotMatch(contactFormScript, /preventDefault\(\)|fetch\(/);
  assert.match(byPath["contact/thanks/index.html"], /data-submission-result="success"/);
});

test("built render imagery discloses concept status on every affected route", () => {
  const expectedByRoute = {
    "index.html": 6,
    "network/index.html": 1,
    "network/waystation/index.html": 1,
    "network/basecamp/index.html": 2,
    "network/summit/index.html": 2,
    "our-story/index.html": 1,
  };

  for (const [path, expected] of Object.entries(expectedByRoute)) {
    const html = byPath[path];
    assert.equal((html.match(/>Concept rendering<\/p>/g) ?? []).length, expected, `${path} visible concept labels`);
    assert.equal((html.match(/alt="Concept rendering of /g) ?? []).length, expected, `${path} concept-aware alt text`);
  }
});

test("every built local image declares its exact intrinsic file geometry", () => {
  const metadata = new Map();
  const dimensionsFor = (src) => {
    if (metadata.has(src)) return metadata.get(src);
    const { width, height } = imageSize(readFileSync(new URL(src.slice(1), root)));
    const dimensions = { width, height };
    metadata.set(src, dimensions);
    return dimensions;
  };

  for (const { path, html } of htmlFiles) {
    for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
      if (!src?.startsWith("/images/")) continue;
      const declared = {
        width: Number(tag.match(/\bwidth="([\d.]+)"/)?.[1]),
        height: Number(tag.match(/\bheight="([\d.]+)"/)?.[1]),
      };
      assert.deepEqual(declared, dimensionsFor(src), `${path} ${src}`);
    }
  }
});

test("built mobile navigation marks only the real external destination", () => {
  const menu = byPath["index.html"].match(/<details class="site-header__mobile-menu"[\s\S]*?<\/details>/)?.[0] ?? "";
  const links = [...menu.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({ attrs: match[1], body: match[2] }));
  assert.equal(links.length, 7);

  for (const link of links) {
    const external = /target="_blank"/.test(link.attrs);
    if (external) {
      assert.match(link.body, /opens in a new tab/);
      assert.match(link.body, /↗/);
    } else {
      assert.doesNotMatch(link.body, /opens in a new tab|↗/);
    }
  }
  assert.equal(links.filter((link) => /target="_blank"/.test(link.attrs)).length, 1);
});
