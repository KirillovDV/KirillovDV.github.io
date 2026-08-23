import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = join(root, "PrivacyPolicy.html");

test("Accord Manual privacy policy is styled and bilingual", () => {
  const page = readFileSync(pagePath, "utf8");
  const script = readFileSync(join(root, "Static", "accord-manual-privacy.js"), "utf8");

  assert.match(page, /Static\/accord-manual-privacy\.css/);
  assert.match(page, /Static\/accord-manual-privacy\.js/);
  assert.match(page, /data-language-toggle/);
  assert.match(page, /data-i18n="disclaimerTitle"/);
  assert.match(page, /Honda/);
  assert.match(script, /Accord Manual is an independent, unofficial application/);
  assert.ok(existsSync(join(root, "Static", "accord-manual-privacy.css")));
  assert.ok(existsSync(join(root, "Static", "accord-manual-privacy.js")));
});
