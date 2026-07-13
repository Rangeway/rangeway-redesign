import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

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
    "Trailhead", "James Regan", "Jim Regan", "Raul Dominguez", "Paul Devon",
    "serving drivers today", "live availability", "available now", "location finder",
  ]) assert.doesNotMatch(all, new RegExp(prohibited, "i"));
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
    "story-editorial-opening", "team-people-opening", "partners-capability-opening", "investor-thesis-opening",
    "commitments-index-opening", "contact-support-opening", "legal-shell", "utility-state", "off-map",
  ];

  for (const { path, html } of htmlFiles) {
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "";
    assert.ok(main, `${path} has a main element`);
    assert.doesNotMatch(main, /<(?:section|article|header|div|nav|aside)\b[^>]*(?:\shidden(?:\s|=|>)|\sinert(?:\s|=|>))/i, `${path} has no hidden or inert content container`);
    assert.doesNotMatch(main, /style="[^"]*(?:opacity\s*:\s*0|visibility\s*:\s*hidden|display\s*:\s*none)/i, `${path} has no inline-hidden main content`);
  }
  for (const rootClass of visibleRoots) {
    const hiddenRule = new RegExp(`\\.${rootClass}(?![-_])[^{}]*\\{[^}]*(?:opacity\\s*:\\s*0(?:[;}]|\\s)|visibility\\s*:\\s*hidden|display\\s*:\\s*none)`, "i");
    assert.doesNotMatch(css, hiddenRule, `${rootClass} has no CSS hiding rule`);
  }
});

test("built reviewed openings remain purpose-specific and reject split-story/investor heroes", () => {
  const openings = {
    "our-story/index.html": "story-editorial-opening",
    "team/index.html": "team-people-opening",
    "partners/index.html": "partners-capability-opening",
    "investors/index.html": "investor-thesis-opening",
    "commitments/index.html": "commitments-index-opening",
    "contact/index.html": "contact-support-opening",
  };
  assert.equal(new Set(Object.values(openings)).size, 6);
  for (const [path, opening] of Object.entries(openings)) {
    assert.match(byPath[path], new RegExp(`<main[^>]*>[\\s\\S]*?<section class="${opening}"`), `${path} opening`);
  }
  assert.doesNotMatch(byPath["our-story/index.html"], /story-opening|basecamp-interior/);
  assert.doesNotMatch(byPath["investors/index.html"], /class="investor-opening"/);
});

test("contact remains a native POST and legal anchors survive static rendering", () => {
  const contact = byPath["contact/index.html"];
  assert.match(contact, /<form[^>]*action="https:\/\/formsubmit\.co\/hello@rangeway\.co"[^>]*method="POST"/);
  assert.doesNotMatch(contact, /preventDefault/);
  for (const id of ["information-we-collect", "california-rights", "gdpr-rights"]) assert.match(byPath["privacy/index.html"], new RegExp(`id="${id}"`));
  for (const id of ["forward-looking-statements", "governing-law", "contact"]) assert.match(byPath["terms/index.html"], new RegExp(`id="${id}"`));
});
