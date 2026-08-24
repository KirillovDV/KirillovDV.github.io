import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const cvPath = join(root, "cv", "index.html");

test("CV is published as a bilingual page at /cv/", () => {
  assert.ok(existsSync(cvPath), "cv/index.html must be published");

  const page = readFileSync(cvPath, "utf8");
  assert.match(page, /<title>Denis Kirillov — QA Lead<\/title>/);
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
  const documentPath = join(root, "Static", "Denis-Kirillov-QA-Lead.docx");
  const page = readFileSync(cvPath, "utf8");

  assert.ok(existsSync(documentPath), "the downloadable CV document must be published in Static");
  assert.match(page, /href="\.\.\/Static\/Denis-Kirillov-QA-Lead\.docx" download data-i18n="downloadCV"/);
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
