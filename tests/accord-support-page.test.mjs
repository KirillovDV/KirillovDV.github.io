import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = join(root, "accord-manual", "support", "index.html");

test("Accord Manual support page contains every App Store support requirement", () => {
  assert.ok(existsSync(pagePath), "the public Accord support page must exist");

  const page = readFileSync(pagePath, "utf8");
  assert.match(page, /Accord Manual/);
  assert.match(page, /href="mailto:mail@deniskirillov\.com"/);
  assert.match(page, /Денис Кириллов/);
  assert.match(page, /Сообщить об ошибке/);
  assert.match(page, /Задать вопрос/);
  assert.match(page, /\.\.\/\.\.\/PrivacyPolicy\.html/);
  assert.match(page, /\.\.\/\.\.\/Static\/accord-manual-logo\.png/);
});

test("Accord Manual logo is published with the support page", () => {
  assert.ok(existsSync(join(root, "Static", "accord-manual-logo.png")));
});
