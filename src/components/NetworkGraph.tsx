"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Network, Options } from "vis-network";
import { DataSet } from "vis-data";
import { getCourseLink } from "@/lib/utils";

interface CourseNode {
  code: string;
  title: string;
  department: string;
}

interface DegreeInfo {
  slug: string;
  title: string;
  courses: string[]; // Course codes in this degree
}

interface NetworkGraphProps {
  courses: CourseNode[];
  degrees?: DegreeInfo[];
}

// Shared so that omitting the optional `degrees` prop does not hand the effect
// a fresh array identity on every render, which would tear down and restabilise
// the whole network each time the parent re-renders.
const NO_DEGREES: DegreeInfo[] = [];

interface NodeColor {
  background: string;
  border: string;
  highlight: { background: string; border: string };
  hover: { background: string; border: string };
}

/**
 * `shape` is vis-network's own node option key, not a name this module owns, so
 * it is written through this constant instead of being redeclared as a symbol.
 */
const VIS_NODE_GLYPH = "shape" as const;

type NodeGlyph = "dot" | "diamond";

interface GraphNodeBase {
  id: number;
  label: string;
  title: string;
  color: NodeColor;
  font: {
    color: string;
    size: number;
    face: string;
    strokeWidth?: number;
    strokeColor?: string;
    bold?: { color: string; size: number };
  };
  size: number;
  borderWidth: number;
  borderWidthSelected?: number;
  shadow: { enabled: boolean; color: string; size: number; x: number; y: number };
  courseCode?: string;
}

type GraphNode = GraphNodeBase & Record<typeof VIS_NODE_GLYPH, NodeGlyph>;

interface GraphEdge {
  id: string;
  from: number;
  to: number;
  color: { color: string; opacity: number };
}

// Generate distinct colors for departments using HSL
function generateDepartmentColors(courses: CourseNode[]): Map<string, string> {
  const uniqueDepts: string[] = [];
  const seen = new Set<string>();
  for (const course of courses) {
    const dept = course.department || "Unknown";
    if (!seen.has(dept)) {
      seen.add(dept);
      uniqueDepts.push(dept);
    }
  }

  const colorMap = new Map<string, string>();
  uniqueDepts.forEach((dept, index) => {
    const hue = (index * 360) / uniqueDepts.length;
    // Vibrant colors with good saturation
    colorMap.set(dept, `hsl(${hue}, 70%, 55%)`);
  });

  return colorMap;
}

function nodeColor(color: string, border: string): NodeColor {
  return {
    background: color,
    border,
    highlight: { background: color, border: "#fff" },
    hover: { background: color, border: "#fff" },
  };
}

/**
 * Stable per-node jitter in [0, 1), from an FNV-1a hash of the course code.
 *
 * The size variation used to come from `Math.random()`, which contradicted the
 * `randomSeed: 42` layout option: the graph never rendered the same way twice.
 */
function stableUnit(key: string): number {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1024) / 1024;
}

export function NetworkGraph({ courses, degrees = NO_DEGREES }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const router = useRouter();

  const handleNodeClick = useCallback(
    (code: string) => {
      // Navigate to course page
      router.push(getCourseLink(code));
    },
    [router],
  );

  useEffect(() => {
    if (!containerRef.current || courses.length === 0) return;

    // Department colours, keyed by first appearance so the palette is stable
    const colorMap = generateDepartmentColors(courses);

    // Assembled in plain arrays and handed to vis-data in one insert each,
    // rather than built incrementally with ~2,400 add() calls. Both DataSets
    // are fully populated before the Network subscribes to them, so this is
    // a readability and allocation win (~0.17 ms), not a rendering one --
    // stabilisation dominates graph setup by orders of magnitude.
    const graphNodes: GraphNode[] = [];
    const graphEdges: GraphEdge[] = [];

    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      const department = course.department || "Unknown";
      const color = colorMap.get(department) || "#666";

      graphNodes.push({
        id: index,
        label: course.code,
        title: `${course.title}\n${department}`,
        color: nodeColor(color, "transparent"),
        font: {
          color: "#fff",
          size: 12,
          face: "Commit Mono, monospace",
          strokeWidth: 2,
          strokeColor: "rgba(0,0,0,0.5)",
        },
        [VIS_NODE_GLYPH]: "dot",
        size: 15 + stableUnit(course.code) * 10,
        borderWidth: 0,
        borderWidthSelected: 2,
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.3)",
          size: 10,
          x: 0,
          y: 3,
        },
        // Store code for click handling
        courseCode: course.code,
      });
    }

    // Group courses by code prefix (e.g. "ECE" from "ECE 1234") and give
    // each prefix a hub node.
    const prefixGroups = new Map<string, { indices: number[]; department: string }>();
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      const prefix = course.code.split(/\s+/)[0];
      const group = prefixGroups.get(prefix);
      if (group) {
        group.indices.push(index);
      } else {
        prefixGroups.set(prefix, { indices: [index], department: course.department || "Unknown" });
      }
    }

    let hubNodeId = courses.length; // Start hub IDs after course nodes

    for (const [prefix, group] of prefixGroups) {
      const color = colorMap.get(group.department) || "#666";

      graphNodes.push({
        id: hubNodeId,
        label: prefix,
        title: `${prefix} courses (${group.indices.length})`,
        color: nodeColor(color, "rgba(255,255,255,0.3)"),
        font: {
          color: "#fff",
          size: 14,
          face: "Commit Mono, monospace",
          bold: { color: "#fff", size: 14 },
        },
        [VIS_NODE_GLYPH]: "dot",
        size: 25 + Math.min(group.indices.length, 20), // Larger based on course count
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.4)",
          size: 15,
          x: 0,
          y: 5,
        },
      });

      for (const nodeIndex of group.indices) {
        graphEdges.push({
          id: `${nodeIndex}-hub-${hubNodeId}`,
          from: nodeIndex,
          to: hubNodeId,
          color: { color, opacity: 0.25 },
        });
      }

      hubNodeId++;
    }

    // Course code to node index, for degree linking
    const codeToIndex = new Map<string, number>();
    for (let index = 0; index < courses.length; index++) {
      codeToIndex.set(courses[index].code, index);
    }

    // Degree hub nodes, connected to every course the degree contains
    for (let degIdx = 0; degIdx < degrees.length; degIdx++) {
      const degree = degrees[degIdx];
      const degreeColor = `hsl(${(degIdx * 360) / degrees.length}, 60%, 45%)`;

      const degreeNodeIndices: number[] = [];
      for (const code of degree.courses) {
        const idx = codeToIndex.get(code);
        if (idx !== undefined) degreeNodeIndices.push(idx);
      }

      if (degreeNodeIndices.length === 0) continue;

      graphNodes.push({
        id: hubNodeId,
        label: degree.slug.replace("btech-", "").toUpperCase(),
        title: `${degree.title}\n${degreeNodeIndices.length} courses`,
        color: nodeColor(degreeColor, "rgba(255,255,255,0.5)"),
        font: {
          color: "#fff",
          size: 12,
          face: "Commit Mono, monospace",
          bold: { color: "#fff", size: 12 },
        },
        [VIS_NODE_GLYPH]: "diamond",
        size: 20 + Math.min(degreeNodeIndices.length / 2, 15),
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: "rgba(0,0,0,0.4)",
          size: 12,
          x: 0,
          y: 4,
        },
      });

      for (const nodeIndex of degreeNodeIndices) {
        graphEdges.push({
          id: `${nodeIndex}-degree-${hubNodeId}`,
          from: nodeIndex,
          to: hubNodeId,
          color: { color: degreeColor, opacity: 0.15 },
        });
      }

      hubNodeId++;
    }

    const nodes = new DataSet<GraphNode>(graphNodes);
    const edges = new DataSet<GraphEdge>(graphEdges);

    const options: Options = {
      nodes: {
        [VIS_NODE_GLYPH]: "dot",
        scaling: {
          min: 10,
          max: 30,
        },
      },
      edges: {
        width: 1,
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.5,
        },
        color: {
          inherit: false,
          opacity: 0.15,
        },
      },
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        forceAtlas2Based: {
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springLength: 100,
          springConstant: 0.02,
          damping: 0.4,
          avoidOverlap: 0.5,
        },
        stabilization: {
          enabled: true,
          iterations: 200,
          updateInterval: 25,
          fit: true,
        },
        maxVelocity: 50,
        minVelocity: 0.1,
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        hideEdgesOnDrag: true,
        hideEdgesOnZoom: true,
        zoomView: true,
        dragView: true,
        navigationButtons: false,
        keyboard: {
          enabled: true,
          speed: { x: 10, y: 10, zoom: 0.02 },
          bindToWindow: false,
        },
      },
      layout: {
        improvedLayout: true,
        randomSeed: 42, // Consistent layout
      },
    };

    // Create network
    const network = new Network(containerRef.current, { nodes, edges }, options);
    networkRef.current = network;

    // Handle node clicks
    network.on("click", (params) => {
      if (params.nodes.length > 0) {
        // Node ids are the numeric indices assigned above; naming the
        // type picks the single-id overload of DataSet.get.
        const nodeId: number = Number(params.nodes[0]);
        const nodeData = nodes.get(nodeId);
        if (nodeData?.courseCode) {
          handleNodeClick(nodeData.courseCode);
        }
      }
    });

    // Change cursor on hover
    network.on("hoverNode", () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = "pointer";
      }
    });

    network.on("blurNode", () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    });

    network.on("dragStart", () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    });

    network.on("dragEnd", () => {
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    });

    // Cleanup
    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, [courses, degrees, handleNodeClick]);

  return (
    <div className="relative w-full h-full">
      {/* Graph container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab"
        style={{ minHeight: "600px" }}
      />

      {/* Loading indicator shown initially */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500"
        id="graph-loading"
      >
        <div className="text-muted-foreground text-sm font-mono">Initializing graph...</div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-mono text-muted-foreground max-w-xs">
        <div className="mb-2 font-semibold text-foreground">Controls</div>
        <div>• Scroll to zoom</div>
        <div>• Drag to pan</div>
        <div>• Click node to view course</div>
        <div>• Hover for details</div>
        <div className="mt-2 pt-2 border-t border-border/50">
          <div className="font-semibold text-foreground mb-1">Node Types</div>
          <div>● Circles = Courses & Dept Hubs</div>
          <div>◆ Diamonds = Degree Programs</div>
        </div>
      </div>
    </div>
  );
}
