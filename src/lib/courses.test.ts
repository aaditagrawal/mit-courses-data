import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllCourseSummaries, getCourseByCode, getDepartmentData } from "./courses";
import { searchCourses } from "./api/search";

test("IIE courses are available through the catalogue and course search", () => {
  const meditation = getCourseByCode("IIE 4333");
  assert.ok(meditation);
  assert.equal(meditation.title, "MEDITATION AND CONSCIOUS LIVING COURSE");
  assert.equal(meditation.branchFile, "iie");
  assert.ok(meditation.sources?.some((source) => source.url.startsWith("https://")));
  assert.ok(getDepartmentData("iie.json")?.courses.some((course) => course.code === "IIE 4333"));
  assert.ok(getAllCourseSummaries().some((course) => course.code === "IIE 4334"));
  assert.equal(searchCourses({ q: "meditation" }).data[0]?.code, "IIE 4333");
  assert.equal(searchCourses({ q: "Tulunadu" }).data[0]?.code, "IIE 4334");
  assert.equal(getCourseByCode("IIE 9999"), undefined);
});

test("historical Yoga credits and syllabus do not leak into the newer course code", () => {
  const historical = getCourseByCode("IIE 4307");
  const recent = getCourseByCode("IIE 4324");
  assert.ok(historical);
  assert.ok(recent);
  assert.deepEqual(historical.credits, { l: 3, t: 0, p: 0, c: 3 });
  assert.ok(historical.syllabus?.some((topic) => topic.includes("Ashtanga Yoga")));
  assert.ok(historical.flags?.includes("historical_syllabus"));
  assert.equal(recent.credits, null);
  assert.deepEqual(recent.syllabus, []);
});
