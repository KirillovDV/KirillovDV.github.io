import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

test("GitHub Pages entry points are published from the repository root", () => {
  assert.ok(existsSync(join(root, "index.html")), "index.html must be at the repository root");
  assert.ok(existsSync(join(root, "accord-manual", "index.html")), "accord-manual/index.html must be published");
  assert.equal(existsSync(join(root, "support")), false, "the retired support route must not be published");
  assert.ok(existsSync(join(root, "CNAME")), "custom domain must be configured at the repository root");
  assert.ok(existsSync(join(root, ".nojekyll")), "Jekyll processing must be disabled for static assets");
  assert.equal(readFileSync(join(root, "CNAME"), "utf8").trim(), "deniskirillov.com");
});

test("the Accord Manual landing resolves static assets from the repository root", () => {
  const landingPage = readFileSync(join(root, "accord-manual", "index.html"), "utf8");

  assert.match(landingPage, /href="\.\.\/Static\/accord-manual-landing\.css"/);
  assert.match(landingPage, /src="\.\.\/Static\/accord-manual\.js"/);
});

test("the home page links to Accord Manual from the social links", () => {
  const homePage = readFileSync(join(root, "index.html"), "utf8");

  assert.ok(existsSync(join(root, "Static", "accord-manual-glyph-transparent.png")));
  assert.match(homePage, /href="\/accord-manual\/"/);
  assert.match(homePage, /src="\.\/Static\/accord-manual-glyph-transparent\.png"/);
  assert.match(homePage, /alt="Accord Manual"/);
});

test("the Check my CV button opens the web CV page", () => {
  const homePage = readFileSync(join(root, "index.html"), "utf8");

  assert.match(homePage, /<a style="text-decoration:none" href="\/cv\/">\s*<div class="ResumeBlock">/);
  assert.doesNotMatch(homePage, /href="\.\/Static\/CV\.pdf" download/);
});
