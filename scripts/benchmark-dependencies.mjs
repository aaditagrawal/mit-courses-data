// Run with Bun. Baseline sources always come from git, never a dirty checkout.
// Optional: MIT_BENCH_BASELINE_MODULES points to an existing exact-version install.
// Browser checks require separately supplied Playwright and Chrome.
// Set MIT_BENCH_PLAYWRIGHT to its module path and MIT_BENCH_CHROME to the executable.
// MIT_BENCH_VALIDATE_ONLY=1 skips timings. MIT_BENCH_SAMPLES defaults to 31.
// MIT_BENCH_OUTPUT chooses the JSON report path, default /tmp/mit-dependency-benchmark.json.
// MIT_BENCH_VISUAL_OUTPUT saves and compares baseline/candidate PNGs during validation.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from "node:fs/promises";
import { tmpdir, cpus, platform, arch } from "node:os";
import { join, resolve } from "node:path";

const base = process.env.MIT_BENCH_BASE || "a66ec6202a6099286bca386de09bc5a883b945f9";
const samples = Number(process.env.MIT_BENCH_SAMPLES || 31);
const validationOnly = process.env.MIT_BENCH_VALIDATE_ONLY === "1";
assert.ok(Number.isInteger(samples) && samples >= 5);
const root = process.cwd();
const temp = await mkdtemp(join(tmpdir(), "mit-dependency-benchmark-"));
const started = performance.now();
await symlink(join(root, "node_modules"), join(temp, "node_modules"));
const committed = (path) => execFileSync("git", ["show", `${base}:${path}`], { encoding: "utf8" });
const baseline = join(temp, "baseline");
await mkdir(join(baseline, "src/components/ui"), { recursive: true });
await mkdir(join(baseline, "src/lib"), { recursive: true });
for (const path of [
  "src/components/ui/button.tsx",
  "src/components/ui/badge.tsx",
  "src/lib/utils.ts",
]) {
  await writeFile(
    join(baseline, path),
    committed(path).replaceAll('"@/lib/utils"', JSON.stringify(join(baseline, "src/lib/utils.ts"))),
  );
}
if (process.env.MIT_BENCH_BASELINE_MODULES) {
  await symlink(resolve(process.env.MIT_BENCH_BASELINE_MODULES), join(baseline, "node_modules"));
} else {
  await writeFile(join(baseline, "package.json"), committed("package.json"));
  await writeFile(join(baseline, "bun.lock"), committed("bun.lock"));
  await mkdir(join(baseline, "patches"));
  await writeFile(
    join(baseline, "patches/braces@3.0.3.patch"),
    committed("patches/braces@3.0.3.patch"),
  );
  execFileSync(process.execPath, ["install", "--frozen-lockfile"], {
    cwd: baseline,
    stdio: "inherit",
  });
}
const versions = {};
for (const name of [
  "react",
  "react-dom",
  "class-variance-authority",
  "clsx",
  "@radix-ui/react-slot",
  "@radix-ui/react-collapsible",
  "tailwind-merge",
  "lucide-react",
]) {
  const pkg = JSON.parse(
    await readFile(join(baseline, "node_modules", name, "package.json"), "utf8"),
  );
  // These baseline ranges resolve to these versions in the committed Bun lock.
  const locked = committed("bun.lock");
  assert.ok(locked.includes(`"${name}@${pkg.version}"`), `baseline version mismatch: ${name}`);
  versions[name] = pkg.version;
}
for (const name of ["react", "react-dom", "tailwind-merge", "lucide-react"]) {
  assert.equal(JSON.parse(await readFile(join(root, "node_modules", name, "package.json"))).version, versions[name], `${name} runtime parity`);
}
const degree = committed("src/app/degree/[slug]/page.tsx");
const classFor = (tag) => degree.match(new RegExp(`<Collapsible\\.${tag} className="([^"]+)"`))[1];
const classes = {
  root: classFor("Root"),
  trigger: classFor("Trigger"),
  content: classFor("Content"),
};
const fixtures = `
import React from ${JSON.stringify(join(root, "node_modules/react/index.js"))};
import { flushSync } from ${JSON.stringify(join(root, "node_modules/react-dom/index.js"))};
import { createRoot, hydrateRoot } from ${JSON.stringify(join(root, "node_modules/react-dom/client.js"))};
import { renderToStaticMarkup, renderToString } from ${JSON.stringify(join(root, "node_modules/react-dom/server.browser.js"))};
import * as oldButton from ${JSON.stringify(join(baseline, "src/components/ui/button.tsx"))};
import * as oldBadge from ${JSON.stringify(join(baseline, "src/components/ui/badge.tsx"))};
import * as oldUtils from ${JSON.stringify(join(baseline, "src/lib/utils.ts"))};
import * as newButton from ${JSON.stringify(join(root, "src/components/ui/button.tsx"))};
import * as newBadge from ${JSON.stringify(join(root, "src/components/ui/badge.tsx"))};
import * as newUtils from ${JSON.stringify(join(root, "src/lib/utils.ts"))};
import * as Collapsible from ${JSON.stringify(join(baseline, "node_modules/@radix-ui/react-collapsible/dist/index.mjs"))};
import { Disclosure } from ${JSON.stringify(join(root, "src/components/ui/disclosure.tsx"))};
import { ChevronDown } from ${JSON.stringify(join(root, "node_modules/lucide-react/dist/esm/lucide-react.mjs"))};
const variants = ["default","destructive","outline","secondary","ghost","link"];
const sizes = ["default","sm","lg","icon","icon-sm","icon-lg"];
const badgeStyles = ["default","secondary","destructive","outline"];
const classes = ${JSON.stringify(classes)};
const panel = <div className="p-2 bg-background">{Array.from({length:10}, (_,i)=><div key={i} className="flex items-center justify-between p-2"><a href={"/course/CSE"+i}>Course {i}</a><span>4C</span></div>)}</div>;
const trigger = <div className="flex flex-col gap-1"><span className="font-semibold text-sm text-foreground">Electives</span><span className="text-xs text-muted-foreground">10 course options available</span></div>;
function OldDisclosure(){return <Collapsible.Root className={classes.root}><Collapsible.Trigger className={classes.trigger}>{trigger}<div className="p-1 rounded-md text-muted-foreground group-hover:text-foreground transition-colors"><ChevronDown className="w-4 h-4 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"/></div></Collapsible.Trigger><Collapsible.Content className={classes.content}>{panel}</Collapsible.Content></Collapsible.Root>}
function tree(candidate,kind,count,revision=0){
 const b = candidate ? newButton : oldButton;
 const d = candidate ? newBadge : oldBadge;
 return <main>{Array.from({length:count},(_,i)=> {
  if(kind==="badge") return <d.Badge key={i} variant={badgeStyles[(i+revision)%4]} className="max-w-24">CSE {i+revision}</d.Badge>;
  if(kind==="link" || kind==="link-custom") {
   const custom=kind==="link-custom";
   const variant=custom?(i%2?"outline":"default"):"ghost";
   const size=custom?"default":"sm";
   const className=custom?"flex items-center gap-2":undefined;
   const anchor=<a href="/api/v1" target="_blank" rel="noopener noreferrer" className={className}>Open /api/v1</a>;
   return candidate ? <a key={i} href="/api/v1" target="_blank" rel="noopener noreferrer" data-slot="button" data-variant={variant} data-size={size} className={[newUtils.cn(b.buttonVariants({variant,size})),className].filter(Boolean).join(" ")}>Open /api/v1</a> : <b.Button key={i} asChild variant={variant} size={size}>{anchor}</b.Button>;
  }
  if(kind==="disclosure") return candidate ? <Disclosure key={i} trigger={trigger}>{panel}</Disclosure> : <OldDisclosure key={i}/>;
  return <b.Button key={i} variant={variants[(i+revision)%6]} size={sizes[Math.floor(i/6)%6]} disabled={(i+revision)%7===0} aria-label={"Course "+(i+revision)}>Course {i+revision}</b.Button>;
 })}</main>;
}
export function render(candidate,kind,count){return renderToStaticMarkup(tree(candidate,kind,count))}
export function verify(){
 for(const kind of ["button","badge"]) for(const count of [1,36,256]) if(render(false,kind,count)!==render(true,kind,count)) throw Error("SSR mismatch "+kind);
 for(const variant of [...variants,null,undefined]) for(const size of [...sizes,null,undefined]) {
  const a=oldButton.buttonVariants({variant,size});const b=newButton.buttonVariants({variant,size}); if(a!==b) throw Error("button class mismatch");
 }
 for(const variant of [...badgeStyles,null,undefined]) if(oldBadge.badgeVariants({variant})!==newBadge.badgeVariants({variant}))throw Error("badge class mismatch");
 for(let i=0;i<1000;i++){const input=[i%2?"p-4":"p-2",false,null,undefined,"hover:bg-primary",i%3?"p-8":"p-6"];if(oldUtils.cn(...input)!==newUtils.cn(...input))throw Error("class mismatch")}
}
export function helpers(candidate,kind,count){let sink=0;const utils=candidate?newUtils:oldUtils;const b=candidate?newButton:oldButton;const d=candidate?newBadge:oldBadge;for(let i=0;i<count;i++){
 const v=kind==="classes" ? utils.cn("p-4",false,null,undefined,i%2?"p-2":"p-8","hover:bg-primary") : kind==="button-variants" ? b.buttonVariants({variant:variants[i%6],size:sizes[i%6]}) : d.badgeVariants({variant:badgeStyles[i%4]});sink+=v.length;
}return sink}
let mounted;
export function mount(candidate,count,kind="disclosure"){if(mounted)flushSync(()=>mounted.unmount());document.body.innerHTML='<div id="app"></div>';mounted=createRoot(document.getElementById("app"));flushSync(()=>mounted.render(tree(candidate,kind,count)));return document.body.offsetHeight}
export function mountTimed(candidate,kind,count){if(mounted){flushSync(()=>mounted.unmount());mounted=null}document.body.innerHTML='<div id="app"></div>';const start=performance.now();mounted=createRoot(document.getElementById("app"));flushSync(()=>mounted.render(tree(candidate,kind,count)));const height=document.body.offsetHeight;return {ms:performance.now()-start,height}}
export function updateTimed(candidate,kind,count){const start=performance.now();flushSync(()=>mounted.render(tree(candidate,kind,count,1)));const height=document.body.offsetHeight;return {ms:performance.now()-start,height}}
export function unmountTimed(){const start=performance.now();flushSync(()=>mounted.unmount());mounted=null;const height=document.body.offsetHeight;return {ms:performance.now()-start,height}}
export function closeTimed(){return new Promise((resolve,reject)=>{const start=performance.now();let cpu;let timeout;const observer=new MutationObserver(()=>{if(document.querySelectorAll("main a").length===0){observer.disconnect();clearTimeout(timeout);resolve({ms:cpu,completionMs:performance.now()-start})}});observer.observe(document.getElementById("app"),{childList:true,subtree:true});timeout=setTimeout(()=>{observer.disconnect();reject(Error("Closing panels did not unmount"))},2000);cpu=toggle().ms})}
export function hydrate(candidate){if(mounted)flushSync(()=>mounted.unmount());document.body.innerHTML='<div id="app">'+renderToString(tree(candidate,"disclosure",1))+'</div>';mounted=hydrateRoot(document.getElementById("app"),tree(candidate,"disclosure",1),{onRecoverableError(error){throw error}})}
export function batchToggle(){flushSync(()=>{const button=document.querySelector("button");button.click();button.click();button.click()});return document.querySelector("button").getAttribute("aria-expanded")}
export function toggle(){const buttons=[...document.querySelectorAll("button[aria-expanded]")];const start=performance.now();flushSync(()=>buttons.forEach(b=>b.click()));const height=document.body.offsetHeight;return {ms:performance.now()-start,height}}
if(typeof window!=="undefined")window.fixture={render,verify,helpers,mount,hydrate,batchToggle,toggle,mountTimed,updateTimed,unmountTimed,closeTimed};
`;
await writeFile(join(temp, "fixture.tsx"), fixtures);
const shared = {
  entrypoints: [join(temp, "fixture.tsx")],
  minify: !process.env.MIT_BENCH_DEBUG,
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [
    {
      name: "one-react-instance",
      setup(build) {
        build.onResolve({ filter: /^react(\/jsx-runtime)?$/ }, ({ path }) => ({
          path: join(
            root,
            "node_modules",
            path === "react" ? "react/index.js" : "react/jsx-runtime.js",
          ),
        }));
        build.onResolve({ filter: /^react-dom$/ }, () => ({
          path: join(root, "node_modules/react-dom/index.js"),
        }));
        build.onResolve({ filter: /^@\/lib\/utils$/ }, () => ({
          path: join(root, "src/lib/utils.ts"),
        }));
      },
    },
  ],
};
async function bundle(target) {
  const result = await Bun.build({ ...shared, target, format: target === "browser" ? "iife" : "esm" });
  assert.ok(result.success, JSON.stringify(result.logs));
  const path = join(temp, `${target}.mjs`);
  await writeFile(path, await result.outputs[0].text());
  return path;
}
console.error("Preparing production SSR bundle");
const ssr = await import(await bundle("bun"));
ssr.verify();
ssr.render(false, "disclosure", 1);
ssr.render(true, "disclosure", 1);
const normalizeAnchors = (html) =>
  html.replace(
    /<a ([^>]+)>/g,
    (_, attrs) =>
      "<a " +
      attrs
        .match(/[\w-]+="[^"]*"/g)
        .toSorted()
        .join(" ") +
      ">",
  );
for (const kind of ["link", "link-custom"])
  for (const count of [1, 24, 256])
    assert.equal(
      normalizeAnchors(ssr.render(false, kind, count)),
      normalizeAnchors(ssr.render(true, kind, count)),
      `${kind} SSR parity`,
    );
const preparationMs = performance.now() - started;
const rows = [];
function stats(values) {
  const sorted = values.toSorted((a, b) => a - b);
  return {
    median: sorted[Math.floor(sorted.length / 2)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
    min: sorted[0],
    max: sorted.at(-1),
  };
}
function record(name, baselineTimes, candidateTimes, work) {
  console.error(name);
  rows.push({
    name,
    unit: "ms",
    samples,
    work,
    baseline: stats(baselineTimes),
    candidate: stats(candidateTimes),
    ratio: stats(candidateTimes).median / stats(baselineTimes).median,
    baseline_samples: baselineTimes,
    candidate_samples: candidateTimes,
  });
}
function measure(name, operation, work) {
  for (let i = 0; i < 8; i++) {
    operation(false);
    operation(true);
  }
  const times = [[], []];
  for (let i = 0; i < samples; i++)
    for (const candidate of i % 2 ? [true, false] : [false, true]) {
      const start = performance.now();
      operation(candidate);
      times[Number(candidate)].push(performance.now() - start);
    }
  record(name, ...times, work);
}
console.error("Measuring helper and SSR workloads");
if (!validationOnly) for (const kind of ["classes", "button-variants", "badge-variants"])
  measure(
    kind,
    (c) => ssr.helpers(c, kind, 100000),
    "100000 calls; mixed variants/conditional/conflicting classes",
  );
if (!validationOnly) for (const kind of ["button", "badge", "link", "link-custom", "disclosure"])
  for (const count of [1, 24, 256])
    measure(
      `ssr-${kind}-${count}`,
      (c) => {
        for (let i = 0; i < Math.max(4, Math.floor(768 / count)); i++) ssr.render(c, kind, count);
      },
      `${count} components/render, ${Math.max(4, Math.floor(768 / count))} renders/sample`,
    );
console.error("Preparing browser and CSS");
const playwrightPath = process.env.MIT_BENCH_PLAYWRIGHT || "playwright";
const { chromium } = await import(playwrightPath);
const browser = await chromium.launch({
  executablePath: process.env.MIT_BENCH_CHROME || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
try {
  const browserVersion = browser.version();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  const { default: postcss } = await import(join(root, "node_modules/postcss/lib/postcss.mjs"));
  const { default: tailwind } = await import(
    join(root, "node_modules/@tailwindcss/postcss/dist/index.mjs")
  );
  const css = await postcss([tailwind()]).process(
    await readFile(join(root, "src/app/globals.css"), "utf8"),
    { from: join(root, "src/app/globals.css") },
  );
  await page.setContent("<!doctype html><html><head></head><body></body></html>");
  await page.addStyleTag({ content: css.css });
  const browserScript = await readFile(await bundle("browser"), "utf8");
  await page.addScriptTag({ content: browserScript });
  console.error("Checking browser compatibility");
  await page.evaluate("window.fixture.verify()");
  const visualChecks = [];
  const visualOutput = process.env.MIT_BENCH_VISUAL_OUTPUT;
  if (visualOutput) {
    await mkdir(visualOutput, { recursive: true });
    for (const width of [375, 1280])
      for (const theme of ["light", "dark"])
        for (const [kind, count, expanded] of [
          ["button", 36, false],
          ["badge", 4, false],
          ["link", 3, false],
          ["link-custom", 2, false],
          ["disclosure", 1, false],
          ["disclosure", 1, true],
        ]) {
          const name = `${width}-${theme}-${kind}-${expanded ? "open" : "closed"}`;
          const screenshots = [];
          // Independent fresh pages keep paint history and focus identical.
          // A second baseline capture also checks the renderer's repeatability.
          for (const version of ["baseline", "control", "candidate"]) {
            const visualPage = await browser.newPage({ viewport: { width, height: 900 } });
            visualPage.on("pageerror", error => errors.push(String(error)));
            try {
              await visualPage.setContent("<!doctype html><html><head></head><body></body></html>");
              await visualPage.addStyleTag({ content: css.css });
              await visualPage.addScriptTag({ content: browserScript });
              await visualPage.evaluate(`document.documentElement.className=${JSON.stringify(theme)}`);
              await visualPage.evaluate(`window.fixture.mount(${version === "candidate"},${count},${JSON.stringify(kind)})`);
              await visualPage.mouse.move(width - 1, 899);
              if (expanded) await visualPage.locator("button").click();
              await visualPage.evaluate(async () => {
                await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
                await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
              });
              screenshots.push(await visualPage.screenshot({
                path: join(visualOutput, `${name}-${version}.png`),
                fullPage: true,
                animations: "disabled",
              }));
            } finally {
              await visualPage.close();
            }
          }
          assert.ok(screenshots[0].equals(screenshots[1]), `${name} baseline repeatability`);
          assert.ok(screenshots[0].equals(screenshots[2]), `${name} pixel parity`);
          visualChecks.push({ name, identical: true, baselineRepeatable: true });
        }
  }
  const dimensions = [];
  for (const width of [375, 1280])
    for (const theme of ["light", "dark"]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(`document.documentElement.className=${JSON.stringify(theme)}`);
      const pair = [];
      for (const candidate of [false, true]) {
        await page.evaluate(`window.fixture.mount(${candidate},1)`);
        const closed = await page.locator("main").boundingBox();
        await page.locator("button").click();
        await page.waitForTimeout(240);
        const open = await page.locator("main").boundingBox();
        pair.push({ closed, open });
      }
      assert.deepEqual(pair[0], pair[1], `${width}/${theme} panel dimensions`);
      dimensions.push({ width, theme, ...pair[1] });
    }
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const candidate of [false, true]) {
    await page.evaluate(`window.fixture.hydrate(${candidate})`);
    await page.waitForTimeout(30);
    await page.locator("button").press("Enter");
    await page.waitForTimeout(240);
    assert.equal(await page.locator("button").getAttribute("aria-expanded"), "true");
    await page.evaluate(`window.fixture.mount(${candidate},1)`);
    const triggerButton = page.locator("button");
    await triggerButton.focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      "document.querySelector('button').getAttribute('aria-expanded') === 'true'",
    );
    const id = await triggerButton.getAttribute("aria-controls");
    assert.ok(id);
    assert.equal(await page.locator(`[id=${JSON.stringify(id)}] a`).count(), 10);
    await page.waitForTimeout(240);
    assert.equal(await page.locator("main a").first().isVisible(), true);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator("main a").first().evaluate(node => node === document.activeElement), true);
    await page.keyboard.press("Shift+Tab");
    assert.equal(await triggerButton.evaluate(node => node === document.activeElement), true);
    await page.keyboard.press("Space");
    await page.waitForTimeout(240);
    assert.equal(await triggerButton.getAttribute("aria-expanded"), "false");
    assert.equal(await page.locator("main a").count(), 0);
    // Reopening before a close completes must cancel the pending removal.
    await triggerButton.click();
    await triggerButton.click();
    await triggerButton.click();
    await page.waitForTimeout(240);
    assert.equal(await triggerButton.getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("main a").count(), 10);
    await page.evaluate(`window.fixture.mount(${candidate},1)`);
    await page.locator("button").focus();
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate("document.activeElement.tagName === 'A'"), false);
    await page.evaluate(`window.fixture.mount(${candidate},1)`);
    assert.equal(await page.evaluate("window.fixture.batchToggle()"), "true");
    await page.waitForTimeout(240);
    assert.equal(await page.locator("main a").count(), 10);
    // Repeated mount during close also exercises timer/effect cleanup.
    await page.evaluate(
      "window.fixture.toggle();window.fixture.toggle();window.fixture.mount(true,1)",
    );
    await page.waitForTimeout(240);
  }
  console.error("Measuring browser mount/update/unmount workloads");
  if (!validationOnly) for (const kind of ["button","badge"]) for (const count of [1,24,256]) {
    const phases = { mount: [[],[]], update: [[],[]], unmount: [[],[]] };
    for (let sample=-5;sample<samples;sample++) for (const candidate of sample%2?[true,false]:[false,true]) {
      const mount=await page.evaluate(`window.fixture.mountTimed(${candidate},${JSON.stringify(kind)},${count})`);
      const update=await page.evaluate(`window.fixture.updateTimed(${candidate},${JSON.stringify(kind)},${count})`);
      const unmount=await page.evaluate("window.fixture.unmountTimed()");
      if(sample>=0) for (const [phase,result] of Object.entries({mount,update,unmount})) phases[phase][Number(candidate)].push(result.ms);
    }
    for(const [phase,times] of Object.entries(phases)) record(`browser-${kind}-${phase}-${count}`,...times,`${count} components; React commit and forced layout, prop/text/style changes on update`);
  }
  console.error("Measuring browser click/layout workloads");
  if (!validationOnly) for (const count of [1, 24, 128]) {
    const times = [[], []];
    const frames = [[], []];
    const closeTimes = [[], []], closeLatency = [[], []], unmountTimes = [[], []];
    for (let sample = -5; sample < samples; sample++)
      for (const candidate of sample % 2 ? [true, false] : [false, true]) {
        await page.evaluate(`window.fixture.mount(${candidate},${count})`);
        const result = await page.evaluate("window.fixture.toggle()");
        const frame = await page.evaluate(
          "new Promise(resolve=>{const start=performance.now();requestAnimationFrame(()=>requestAnimationFrame(()=>resolve(performance.now()-start)))})",
        );
        const close=await page.evaluate("window.fixture.closeTimed()");
        await page.evaluate("window.fixture.toggle()");
        const unmount=await page.evaluate("window.fixture.unmountTimed()");
        if (sample >= 0) {
          times[Number(candidate)].push(result.ms);
          frames[Number(candidate)].push(frame);
          closeTimes[Number(candidate)].push(close.ms);
          closeLatency[Number(candidate)].push(close.completionMs);
          unmountTimes[Number(candidate)].push(unmount.ms);
        }
      }
    record(
      `browser-open-layout-${count}`,
      ...times,
      `${count} pools, 10 links each; click/React commit/forced layout`,
    );
    record(`browser-close-cpu-${count}`,...closeTimes,`${count} pools; close event/React commit/forced layout, animation wait excluded`);
    record(`browser-close-latency-${count}`,...closeLatency,`${count} pools; elapsed through 200ms animation and removal of all links, includes scheduling`);
    record(`browser-unmount-expanded-${count}`,...unmountTimes,`${count} expanded pools; React cleanup/DOM removal/forced layout`);
    record(
      `browser-frame-${count}`,
      ...frames,
      `${count} pools; two animation frames after open; display scheduling separate from CPU`,
    );
  }
  assert.deepEqual(errors, []);
  const report = {
    base,
    validationOnly,
    head: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    date: new Date().toISOString(),
    runtime: Bun.version,
    browser: browserVersion,
    machine: {
      platform: platform(),
      arch: arch(),
      cpu: cpus()[0]?.model,
      logical_cpus: cpus().length,
    },
    versions,
    preparationMs,
    method:
      "production bundle; 8 SSR/helper warmups, 5 browser warmups; alternating paired order; same process/runtime/browser/data; install/build/network excluded; frame scheduling separated",
    compatibility:
      "all variant classes and 1/36/256 button/badge SSR match; API/custom link SSR match; hydration and mobile/desktop/light/dark dimensions match; 1000 conditional/conflict classes; Enter/Space, aria linkage, lazy panels, close/reopen race and unmount cleanup pass",
    dimensions,
    visualChecks,
    rows,
  };
  const output = process.env.MIT_BENCH_OUTPUT || join(tmpdir(), "mit-dependency-benchmark.json");
  await writeFile(output, JSON.stringify(report, null, 2) + "\n");
  console.log(
    JSON.stringify(
      {
        output,
        compatibility: report.compatibility,
        rows: rows.map(({ name, baseline: before, candidate, ratio }) => ({
          name,
          baseline: before,
          candidate,
          ratio,
        })),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
  await rm(temp, { recursive: true, force: true });
}

// React server.browser can retain its scheduler MessagePort in Bun. All browser
// and fixture cleanup above is awaited before this standalone CLI exits.
process.exit(0);
