import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const cvPath = join(root, "cv", "index.html");

test("CV is published as a bilingual page at /cv/", () => {
  assert.ok(existsSync(cvPath), "cv/index.html must be published");

  const page = readFileSync(cvPath, "utf8");
  assert.match(page, /<title>Denis Kirillov — Senior Fullstack QA Engineer<\/title>/);
  assert.match(page, /data-language-toggle/);
  assert.match(page, /data-language="ru"/);
  assert.match(page, /data-language="en"/);
  assert.match(page, /data-i18n="summary"/);
  assert.match(page, /data-i18n="experienceTitle"/);
  assert.match(page, /href="mailto:den0mer@yandex\.ru"/);
  assert.match(page, /href="https:\/\/t\.me\/KirillovDV"/);
  assert.match(page, /href="\.\.\/Static\/cv\.css"/);
  assert.match(page, /src="\.\.\/Static\/cv\.js" defer><\/script>/);
});

test("CV page offers the original document for download", () => {
  const documentPath = join(root, "Static", "Denis-Kirillov-Senior-Fullstack-QA-Engineer.docx");
  const page = readFileSync(cvPath, "utf8");

  assert.ok(existsSync(documentPath), "the downloadable CV document must be published in Static");
  assert.match(page, /href="\.\.\/Static\/Denis-Kirillov-Senior-Fullstack-QA-Engineer\.docx" download data-i18n="downloadCV"/);
});

test("CV language controller contains complete Russian and English content", () => {
  const scriptPath = join(root, "Static", "cv.js");
  assert.ok(existsSync(scriptPath), "Static/cv.js must be published");

  const script = readFileSync(scriptPath, "utf8");
  assert.match(script, /const copy =/);
  assert.match(script, /ru:/);
  assert.match(script, /en:/);
  assert.match(script, /Leading QA Engineer/);
  assert.match(script, /data-i18n/);
  assert.match(script, /downloadCV/);
});

test("CV reflects the Senior Fullstack QA Engineer profile", () => {
  const page = readFileSync(cvPath, "utf8");
  const script = readFileSync(join(root, "Static", "cv.js"), "utf8");

  assert.match(page, /Senior Fullstack QA Engineer/);
  assert.match(page, /Продуктовый буткемп/);
  assert.match(script, /Kafka, Redis/);
  assert.match(script, /Senior Fullstack QA Engineer/);
});

test("CV uses the same Nunito accent font as the home page", () => {
  const page = readFileSync(cvPath, "utf8");
  const styles = readFileSync(join(root, "Static", "cv.css"), "utf8");

  assert.match(page, /family=Nunito/);
  assert.match(styles, /font-family:\s*"Nunito", Arial, sans-serif/);
  assert.doesNotMatch(page, /Playfair\+Display/);
  assert.doesNotMatch(styles, /Playfair Display/);
});
