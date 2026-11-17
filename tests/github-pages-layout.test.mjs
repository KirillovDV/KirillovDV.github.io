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

test("the BST2251 schedule page publishes a downloadable calendar", () => {
  const schedulePagePath = join(root, "schedule", "index.html");
  const calendarPath = join(root, "schedule", "BST2251-schedule.ics");
  const homePage = readFileSync(join(root, "index.html"), "utf8");

  assert.ok(existsSync(schedulePagePath), "schedule/index.html must be published");
  assert.ok(existsSync(calendarPath), "the schedule calendar must be published");
  assert.doesNotMatch(homePage, /href="\/schedule\/"/);

  const schedulePage = readFileSync(schedulePagePath, "utf8");
  assert.match(schedulePage, /href="\.\/BST2251-schedule\.ics"/);
  assert.match(schedulePage, /download="БСТ2251_расписание\.ics"/);
  assert.equal((schedulePage.match(/class="lesson lecture transferred"/g) || []).length, 6);
  assert.equal((schedulePage.match(/Новое время/g) || []).length, 6);
  assert.equal((schedulePage.match(/Перенос с/g) || []).length, 6);

  const lessonTimes = (date) => {
    const section = schedulePage.match(new RegExp(`<section class="day" id="day-${date}">([\\s\\S]*?)</section>`))[1];
    return [...section.matchAll(/<strong>(\d{2}:\d{2})<\/strong>/g)].map((match) => match[1]);
  };
  assert.deepEqual(lessonTimes("2026-10-05"), ["18:40", "20:25"]);
  assert.deepEqual(lessonTimes("2026-10-06"), ["15:10", "16:55", "18:40", "20:25"]);
  assert.deepEqual(lessonTimes("2026-10-07"), ["15:10", "16:55", "18:40", "20:25"]);

  const calendar = readFileSync(calendarPath, "utf8");
  assert.match(calendar, /^BEGIN:VCALENDAR/m);
  assert.match(calendar, /X-WR-CALNAME:БСТ2251/);
  assert.equal((calendar.match(/^BEGIN:VEVENT$/gm) || []).length, 18);
  assert.equal((calendar.match(/\\nПеренос: ранее/g) || []).length, 6);
  assert.doesNotMatch(calendar, /DTSTART;TZID=Europe\/Moscow:2026100[567]T111500/);
  assert.doesNotMatch(calendar, /DTSTART;TZID=Europe\/Moscow:2026100[567]T130000/);
});
