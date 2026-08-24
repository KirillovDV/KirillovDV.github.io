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

test("landing language switch is shown without a redundant label", () => {
  const page = readFileSync(landingPath, "utf8");
  const script = readFileSync(join(root, "Static", "accord-manual.js"), "utf8");

  assert.match(page, /data-language-toggle/);
  assert.doesNotMatch(page, /data-i18n="language"/);
  assert.doesNotMatch(script, /language:\s*"/);
});

test("landing footer credits link to the developer website", () => {
  const page = readFileSync(landingPath, "utf8");

  assert.match(page, /<a href="https:\/\/deniskirillov\.com\/">© <span id="year"><\/span> Denis Kirillov<\/a>/);
});

test("landing omits the obsolete screenshots button and includes Safari control fallbacks", () => {
  const page = readFileSync(landingPath, "utf8");
  const styles = readFileSync(join(root, "Static", "accord-manual-landing.css"), "utf8");
  const script = readFileSync(join(root, "Static", "accord-manual.js"), "utf8");

  assert.doesNotMatch(page, /href="#screenshots"/);
  assert.doesNotMatch(script, /screenshotsButton/);
  assert.match(styles, /width:\s*min\(1120px,\s*calc\(100% - 32px\)\)/);
  assert.doesNotMatch(styles, /min\(100% - 32px,/);
  assert.match(styles, /-webkit-appearance:\s*none/);
  assert.match(styles, /-webkit-backdrop-filter:\s*blur\(8px\)/);
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

test("carousel changes slides only for deliberate horizontal swipes", () => {
  assert.equal(globalThis.AccordManual.getSwipeDirection(300, 200, 18, 20), 1);
  assert.equal(globalThis.AccordManual.getSwipeDirection(100, 210, 22, 25), -1);
  assert.equal(globalThis.AccordManual.getSwipeDirection(200, 170, 18, 20), 0);
  assert.equal(globalThis.AccordManual.getSwipeDirection(240, 150, 20, 150), 0);
});

test("carousel uses a sliding track and pointer gestures", () => {
  const page = readFileSync(landingPath, "utf8");
  const styles = readFileSync(join(root, "Static", "accord-manual-landing.css"), "utf8");
  const script = readFileSync(join(root, "Static", "accord-manual.js"), "utf8");

  assert.match(page, /data-carousel-track/);
  assert.match(styles, /touch-action:\s*pan-y/);
  assert.match(styles, /\.carousel-track/);
  assert.match(styles, /transition:\s*transform/);
  assert.match(styles, /transition:\s*max-width/);
  assert.match(script, /PointerEvent/);
  assert.match(script, /pointerdown/);
  assert.match(script, /setPointerCapture/);
});
