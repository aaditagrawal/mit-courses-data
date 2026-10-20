/**
 * Precomputes the explore-graph layout with ForceAtlas2 and writes the node
 * positions to src/lib/generated/graph-layout.json.
 *
 * Running the physics here instead of in the browser is the core of the graph's
 * performance: the client renders ~1,500 nodes at their final positions
 * immediately, with no stabilization phase at all.
 *
 * Deterministic by construction — seeded initial positions, no randomness in
 * FA2 — so re-running on unchanged data produces an identical file.
 *
 * Run with: bun run generate:graph-layout
 */

import fs from "fs";
import path from "path";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { getAllCourseSummaries, getCourseMap } from "../src/lib/courses";
import { getAllDegrees, getDegreeData, extractDegreeCourseCodes } from "../src/lib/degrees";
import { buildGraphStructure, stableUnit, DegreeGraphInfo } from "../src/lib/graph-structure";

const OUTPUT_PATH = path.join(process.cwd(), "src", "lib", "generated", "graph-layout.json");

function main() {
  const courses = getAllCourseSummaries();
  const courseMap = getCourseMap();

  const degrees: DegreeGraphInfo[] = getAllDegrees().flatMap((slug) => {
    const data = getDegreeData(slug);
    if (!data) return [];
    return [
      {
        slug,
        title: data.degree_metadata.title,
        courses: extractDegreeCourseCodes(data).filter((code) => courseMap.has(code)),
      },
    ];
  });

  const { nodes, edges } = buildGraphStructure(courses, degrees);
  console.log(`📊 Graph: ${nodes.length} nodes, ${edges.length} edges`);

  const graph = new Graph({ type: "undirected", multi: true });

  // Seeded initial placement: prefix hubs on a wide ring, their courses
  // scattered around them, degree hubs near the centre. FA2 refines from
  // there; a structured start converges faster and keeps clusters apart.
  const hubAngle = new Map<string, number>();
  const hubs = nodes.filter((n) => n.kind === "prefix-hub");
  hubs.forEach((hub, i) => {
    hubAngle.set(hub.id, (2 * Math.PI * i) / hubs.length);
  });

  for (const node of nodes) {
    let x: number;
    let y: number;

    if (node.kind === "prefix-hub") {
      const angle = hubAngle.get(node.id) ?? 0;
      x = Math.cos(angle) * 1000;
      y = Math.sin(angle) * 1000;
    } else if (node.kind === "degree-hub") {
      const angle = 2 * Math.PI * stableUnit(node.id);
      const radius = 100 + stableUnit(`${node.id}::r`) * 200;
      x = Math.cos(angle) * radius;
      y = Math.sin(angle) * radius;
    } else {
      const prefix = node.label.split(/\s+/)[0];
      const angle = hubAngle.get(`hub:${prefix}`) ?? 2 * Math.PI * stableUnit(node.id);
      const jitterAngle = 2 * Math.PI * stableUnit(`${node.id}::a`);
      const jitterRadius = 50 + stableUnit(`${node.id}::r`) * 250;
      x = Math.cos(angle) * 1000 + Math.cos(jitterAngle) * jitterRadius;
      y = Math.sin(angle) * 1000 + Math.sin(jitterAngle) * jitterRadius;
    }

    graph.addNode(node.id, { x, y, size: node.size });
  }

  for (const edge of edges) {
    graph.addEdge(edge.source, edge.target);
  }

  const settings = forceAtlas2.inferSettings(graph);
  console.log("⚙️  FA2 settings:", settings);

  const start = performance.now();
  forceAtlas2.assign(graph, {
    iterations: 600,
    settings: {
      ...settings,
      adjustSizes: true,
      outboundAttractionDistribution: true,
    },
  });
  console.log(`🧲 Layout computed in ${((performance.now() - start) / 1000).toFixed(1)}s`);

  const layout: Record<string, [number, number]> = {};
  graph.forEachNode((id, attrs) => {
    layout[id] = [Math.round(attrs.x * 10) / 10, Math.round(attrs.y * 10) / 10];
  });

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(layout));
  const size = fs.statSync(OUTPUT_PATH).size;
  console.log(`✅ Written ${OUTPUT_PATH} (${(size / 1024).toFixed(1)} KB)`);
}

main();
