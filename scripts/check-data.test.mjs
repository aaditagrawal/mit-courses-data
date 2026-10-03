import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

test("parse errors prevent a successful data report for branches and degrees", () => {
  for (const invalidDirectory of ["branch-json", "degree-json"]) {
    const directory = mkdtempSync(join(tmpdir(), "course-data-check-"));
    for (const name of ["branch-json", "degree-json"]) mkdirSync(join(directory, name));
    writeFileSync(join(directory, invalidDirectory, "invalid.json"), "{");
    try {
      const result = spawnSync(
        process.execPath,
        [fileURLToPath(new URL("./check-data.ts", import.meta.url))],
        { cwd: directory, encoding: "utf8" },
      );
      assert.ok(result.stdout.includes("Data Inconsistencies/Errors"));
      assert.ok(!result.stdout.includes("No broken links or missing data found"));
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }
});
