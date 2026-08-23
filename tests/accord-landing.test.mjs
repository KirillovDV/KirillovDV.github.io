import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
await import("../Static/accord-manual.js");

const root = process.cwd();
const landingPath = join(root, "accord-manual", "index.html");

test("Accord Manual landing is published at the requested root URL", () => {
  assert.ok(existsSync(landingPath), "accord-manual/index.html must exist");

  const page = readFileSync(landingPath, "utf8");
  assert.match(page, /data-language-toggle/);
  assert.match(page, /data-device-select/);
  assert.match(page, /href="tg:\/\/resolve\?domain=KirillovDV"/);
  assert.match(page, /data-app-store/);
  assert.match(page, /mailto:mail@deniskirillov\.com/);
  assert.match(page, /PrivacyPolicy\.html/);
  assert.match(page, /<script src="\.\.\/Static\/accord-manual\.js" defer><\/script>/);
  assert.match(page, /class="carousel-stage\s+is-iphone"/);
});

test("landing offers the supplied TestFlight build", () => {
  const page = readFileSync(landingPath, "utf8");
  assert.match(page, /href="https:\/\/testflight\.apple\.com\/join\/Cy9x6aCU"/);
});

test("landing copy does not mention Honda", () => {
  const landingFiles = [
    readFileSync(landingPath, "utf8"),
    readFileSync(join(root, "Static", "accord-manual.js"), "utf8"),
  ].join("\n");

  assert.doesNotMatch(landingFiles, /honda/i);
});

test("carousel changes device gallery and wraps around", () => {
  assert.equal(globalThis.AccordManual.getSlidesForDevice("iphone").length, 6);
  assert.equal(globalThis.AccordManual.getSlidesForDevice("ipad").length, 4);
  assert.equal(globalThis.AccordManual.getNextIndex(5, 6, 1), 0);
  assert.equal(globalThis.AccordManual.getNextIndex(0, 6, -1), 5);
});
