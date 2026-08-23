import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getNextIndex, getSlidesForDevice } from "../Static/accord-manual.mjs";

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
});

test("carousel changes device gallery and wraps around", () => {
  assert.equal(getSlidesForDevice("iphone").length, 6);
  assert.equal(getSlidesForDevice("ipad").length, 4);
  assert.equal(getNextIndex(5, 6, 1), 0);
  assert.equal(getNextIndex(0, 6, -1), 5);
});
