import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = join(root, "PrivacyPolicy.html");

test("Accord Manual privacy policy is styled and bilingual", () => {
  const page = readFileSync(pagePath, "utf8");
  const script = readFileSync(join(root, "Static", "accord-manual-privacy.js"), "utf8");
  const styles = readFileSync(join(root, "Static", "accord-manual-privacy.css"), "utf8");

  assert.match(page, /Static\/accord-manual-privacy\.css/);
  assert.match(page, /Static\/accord-manual-privacy\.js/);
  assert.match(page, /data-language-toggle/);
  assert.doesNotMatch(page, /data-i18n="language"/);
  assert.doesNotMatch(script, /language:\s*"/);
  assert.match(page, /data-i18n="disclaimerTitle"/);
  assert.match(page, /Honda/);
  assert.match(page, /<a href="https:\/\/deniskirillov\.com\/">© <span id="year"><\/span> Denis Kirillov<\/a>/);
  assert.match(script, /Accord Manual is an independent, unofficial application/);
  assert.ok(existsSync(join(root, "Static", "accord-manual-privacy.css")));
  assert.ok(existsSync(join(root, "Static", "accord-manual-privacy.js")));
  assert.match(styles, /overflow-wrap:\s*anywhere/);
  assert.match(styles, /hyphens:\s*auto/);
  assert.match(styles, /h1\s*\{\s*font-size:\s*clamp\(34px,\s*10vw,\s*40px\)/);
});
