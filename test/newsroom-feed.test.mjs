import assert from "node:assert/strict";
import test from "node:test";

import { parseLatestPressRelease } from "../src/lib/newsroom-feed.ts";

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>Rangeway &amp; Partner&apos;s New Stop</title>
      <pubDate>Thu, 23 Jul 2026 09:15:04 -0700</pubDate>
      <link>https://newsroom.rangeway.co/press/latest-stop/</link>
      <enclosure url="https://newsroom.rangeway.co/assets/images/latest-stop.jpg" type="image/jpeg" />
    </item>
    <item>
      <title>Older announcement</title>
      <pubDate>Wed, 22 Jul 2026 09:15:04 -0700</pubDate>
      <link>https://newsroom.rangeway.co/press/older/</link>
    </item>
  </channel>
</rss>`;

test("the press feed parser returns the first item with decoded text and image", () => {
  assert.deepEqual(parseLatestPressRelease(feed), {
    date: "July 23, 2026",
    type: "Press release",
    title: "Rangeway & Partner's New Stop",
    href: "https://newsroom.rangeway.co/press/latest-stop/",
    image: "https://newsroom.rangeway.co/assets/images/latest-stop.jpg",
  });
});

test("the press feed parser rejects malformed or untrusted entries", () => {
  assert.equal(parseLatestPressRelease("<rss><channel></channel></rss>"), null);
  assert.equal(
    parseLatestPressRelease(feed.replace(
      "https://newsroom.rangeway.co/press/latest-stop/",
      "https://example.com/untrusted/",
    )),
    null,
  );
});
