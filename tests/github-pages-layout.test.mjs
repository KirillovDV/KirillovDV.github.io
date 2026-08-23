import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

test("GitHub Pages entry points are published from the repository root", () => {
  assert.ok(existsSync(join(root, "index.html")), "index.html must be at the repository root");
  assert.ok(existsSync(join(root, "support", "index.html")), "support/index.html must be published");
  assert.ok(existsSync(join(root, "CNAME")), "custom domain must be configured at the repository root");
  assert.ok(existsSync(join(root, ".nojekyll")), "Jekyll processing must be disabled for static assets");
  assert.equal(readFileSync(join(root, "CNAME"), "utf8").trim(), "deniskirillov.com");
});

test("the support page resolves static assets from the repository root", () => {
  const supportPage = readFileSync(join(root, "support", "index.html"), "utf8");

  assert.match(supportPage, /href="\.\.\/Static\/support\.css"/);
  assert.match(supportPage, /src="\.\.\/Static\/support-form\.mjs"/);
});
