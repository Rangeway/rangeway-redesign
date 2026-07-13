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

test("primary routes expose distinct main families and visible route-defining content", () => {
  const routes = {
    "index.html": ["home-page", "Travel farther. Stop better."],
    "network/index.html": ["network-page", "Indoor Comfort Guarantee"],
    "network/waystation/index.html": ["waystation-page", "Automated + unstaffed"],
    "network/basecamp/index.html": ["basecamp-page", "Trailkeepers"],
    "network/summit/index.html": ["summit-page", "Lookouts"],
    "our-story/index.html": ["story-family", "Drivers are guests."],
    "team/index.html": ["team-family", "Stephanie McGreevy"],
    "partners/index.html": ["partner-family", "Site-specific configurations vary by project phase"],
    "investors/index.html": ["investor-family", "Request the investor briefing."],
    "commitments/index.html": ["commitments-family", "Future reporting should make the standard measurable."],
    "contact/index.html": ["contact-family", "partners@rangeway.co"],
    "privacy/index.html": ["legal-family", "California Consumer Privacy Act"],
    "terms/index.html": ["legal-family", "Forward-Looking Statements"],
  };

  for (const [path, [family, content]] of Object.entries(routes)) {
    const html = byPath[path];
    assert.match(html, new RegExp(`<main[^>]*class="[^"]*${family}[^"]*"`), `${path} family class`);
    assert.match(html, new RegExp(`data-page-family="${family}"`), `${path} explicit page family`);
    assert.match(html, new RegExp(content.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${path} defining content`);
  }
});

test("contact remains a native POST and legal anchors survive static rendering", () => {
  const contact = byPath["contact/index.html"];
  assert.match(contact, /<form[^>]*action="https:\/\/formsubmit\.co\/hello@rangeway\.co"[^>]*method="POST"/);
  assert.doesNotMatch(contact, /preventDefault/);
  for (const id of ["information-we-collect", "california-rights", "gdpr-rights"]) assert.match(byPath["privacy/index.html"], new RegExp(`id="${id}"`));
  for (const id of ["forward-looking-statements", "governing-law", "contact"]) assert.match(byPath["terms/index.html"], new RegExp(`id="${id}"`));
});
