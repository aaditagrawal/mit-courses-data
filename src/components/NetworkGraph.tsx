"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Graph from "graphology";
import { Sigma } from "sigma";
import { getCourseLink } from "@/lib/utils";
import { buildGraphStructure, DegreeGraphInfo, stableUnit } from "@/lib/graph-structure";
import layoutJson from "@/lib/generated/graph-layout.json";

interface CourseNode {
  code: string;
  title: string;
  department: string;
}

interface NetworkGraphProps {
  courses: CourseNode[];
  degrees?: DegreeGraphInfo[];
}

// Shared so that omitting the optional `degrees` prop does not hand the effect
// a fresh array identity on every render, which would tear down and rebuild
// the whole renderer each time the parent re-renders.
const NO_DEGREES: DegreeGraphInfo[] = [];

// Positions precomputed by scripts/generate-graph-layout.ts. Shipping the
// layout instead of simulating it client-side is what makes the graph appear
// instantly: no physics ever runs in the browser.
const LAYOUT: Record<string, number[]> = layoutJson;

interface TooltipState {
  x: number;
  y: number;
  lines: string[];
}

function departmentHues(departments: string[]): Map<string, number> {
  const hues = new Map<string, number>();
  departments.forEach((dept, index) => {
    hues.set(dept, Math.round((index * 360) / departments.length));
  });
  return hues;
}

// Sigma's WebGL colour parser only understands hex and rgb()/rgba() strings,
// so the HSL palette is converted before it reaches the graph attributes.
function hslToRgb(h: number, s: number, l: number, alpha?: number): string {
  const sat = s / 100;
  const light = l / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = light - sat * Math.min(light, 1 - light) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255);
  };
  const r = f(0);
  const g = f(8);
  const b = f(4);
  return alpha === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * WebGL-rendered course graph (sigma.js) over a build-time ForceAtlas2 layout.
 * The browser only draws: no stabilization phase, no per-frame physics.
 */
export function NetworkGraph({ courses, degrees = NO_DEGREES }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sigmaRef = useRef<Sigma | null>(null);
  // Read inside the reducers on every refresh; kept in a ref so hover updates
  // never re-run the setup effect or re-render React.
  const hoverRef = useRef<{ node: string | null; neighbors: Set<string>; forceLabels: boolean }>({
    node: null,
    neighbors: new Set(),
    forceLabels: false,
  });
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const handleNodeClick = useCallback(
    (code: string) => {
      router.push(getCourseLink(code));
    },
    [router],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || courses.length === 0) return;

    const structure = buildGraphStructure(courses, degrees);
    const deptHue = departmentHues(structure.departments);
    const degreeHue = new Map<string, number>();
    structure.degreeSlugs.forEach((slug, index) => {
      degreeHue.set(slug, Math.round((index * 360) / structure.degreeSlugs.length));
    });

    const graph = new Graph({ type: "undirected", multi: true });

    for (const node of structure.nodes) {
      // Fallback ring for nodes added since the layout was last generated,
      // so data drift degrades gracefully instead of crashing.
      const position = LAYOUT[node.id] ?? [
        Math.cos(2 * Math.PI * stableUnit(node.id)) * 1500,
        Math.sin(2 * Math.PI * stableUnit(node.id)) * 1500,
      ];

      let color: string;
      if (node.kind === "degree-hub") {
        color = hslToRgb(degreeHue.get(node.degreeSlug ?? "") ?? 0, 60, 45);
      } else {
        color = hslToRgb(deptHue.get(node.department ?? "") ?? 0, 70, 55);
      }

      graph.addNode(node.id, {
        x: position[0],
        y: position[1],
        size: node.size,
        label: node.label,
        color,
        kind: node.kind,
        courseCode: node.courseCode,
        tooltip: node.tooltip,
      });
    }

    for (const edge of structure.edges) {
      const hue =
        edge.degreeSlug !== undefined
          ? (degreeHue.get(edge.degreeSlug) ?? 0)
          : (deptHue.get(edge.department ?? "") ?? 0);
      const saturation = edge.degreeSlug !== undefined ? 60 : 70;
      graph.addEdge(edge.source, edge.target, {
        color: hslToRgb(hue, saturation, 50, 0.18),
        activeColor: hslToRgb(hue, saturation, 55, 0.65),
        size: 1,
      });
    }

    const labelColor = resolvedTheme === "light" ? "#171717" : "#e5e5e5";

    const sigma = new Sigma(graph, container, {
      primitives: {
        nodes: { label: { font: { family: '"Commit Mono", monospace', weight: "500" } } },
      },
      styles: {
        nodes: { labelFont: '"Commit Mono", monospace', labelSize: 11, labelColor },
      },
      settings: {
        // Preserve v3's pixel sizing and label visibility thresholds.
        itemSizesReference: "screen",
        labelRenderedSizeThreshold: 8,
        minCameraRatio: 0.03,
        maxCameraRatio: 3,
        stagePadding: 40,
        allowInvalidContainer: true,
      },
      nodeReducer: (node, data) => {
        const hover = hoverRef.current;
        if (!hover.node) return data;
        if (node === hover.node) {
          return { ...data, highlighted: true };
        }
        if (hover.neighbors.has(node)) {
          return hover.forceLabels ? { ...data, labelVisibility: "visible" } : data;
        }
        return { ...data, color: "rgba(128,128,128,0.4)", label: "" };
      },
      edgeReducer: (edge, data, attributes) => {
        const hover = hoverRef.current;
        if (!hover.node) return data;
        if (graph.hasExtremity(edge, hover.node)) {
          return {
            ...data,
            color: typeof attributes.activeColor === "string" ? attributes.activeColor : data.color,
          };
        }
        return { ...data, visibility: "hidden" };
      },
    });
    sigmaRef.current = sigma;

    sigma.on("clickNode", ({ node }) => {
      const code: string | undefined = graph.getNodeAttribute(node, "courseCode");
      if (code) handleNodeClick(code);
    });

    sigma.on("enterNode", ({ node }) => {
      container.style.cursor = "pointer";
      const neighbors = new Set(graph.neighbors(node));
      // Forced neighbour labels are readable for a course's handful of links
      // but overlap into noise around a hub with dozens.
      hoverRef.current = { node, neighbors, forceLabels: neighbors.size <= 12 };

      const attrs = graph.getNodeAttributes(node);
      const viewport = sigma.graphToViewport({ x: attrs.x as number, y: attrs.y as number });
      setTooltip({
        x: viewport.x,
        y: viewport.y,
        lines: [attrs.label as string, ...(attrs.tooltip as string[])],
      });

      sigma.refresh({ skipIndexation: true });
    });

    sigma.on("leaveNode", () => {
      container.style.cursor = "grab";
      hoverRef.current = { node: null, neighbors: new Set(), forceLabels: false };
      setTooltip(null);
      sigma.refresh({ skipIndexation: true });
    });

    sigma.on("downStage", () => {
      container.style.cursor = "grabbing";
    });
    sigma.on("upStage", () => {
      container.style.cursor = "grab";
    });

    // The tooltip is anchored in viewport space; hide it as soon as the
    // camera moves rather than trying to track the node every frame.
    const camera = sigma.getCamera();
    const hideTooltip = () => setTooltip((current) => (current ? null : current));
    camera.on("updated", hideTooltip);

    return () => {
      camera.off("updated", hideTooltip);
      sigma.kill();
      sigmaRef.current = null;
    };
  }, [courses, degrees, handleNodeClick, resolvedTheme]);

  return (
    <div className="relative w-full h-full">
      {/* Graph container */}
      <div ref={containerRef} className="w-full h-full min-h-150 cursor-grab" />

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="absolute z-10 left-(--tooltip-x) top-(--tooltip-y) -translate-x-1/2 -translate-y-full -mt-3 pointer-events-none px-3 py-2 bg-background/90 backdrop-blur-sm border border-border/50 rounded-md text-xs font-mono shadow-lg max-w-xs"
          style={
            {
              "--tooltip-x": `${tooltip.x}px`,
              "--tooltip-y": `${tooltip.y}px`,
            } as React.CSSProperties
          }
        >
          <div className="font-semibold text-foreground">{tooltip.lines[0]}</div>
          {tooltip.lines.slice(1).map((line) => (
            <div key={line} className="text-muted-foreground">
              {line}
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-mono text-muted-foreground max-w-xs">
        <div className="mb-2 font-semibold text-foreground">Controls</div>
        <div>• Scroll to zoom</div>
        <div>• Drag to pan</div>
        <div>• Click node to view course</div>
        <div>• Hover to highlight connections</div>
        <div className="mt-2 pt-2 border-t border-border/50">
          <div className="font-semibold text-foreground mb-1">Node Types</div>
          <div>• Small dots = Courses</div>
          <div>• Large dots = Department hubs</div>
          <div>• Mid dots (CSE, ECE…) = Degree programs</div>
        </div>
      </div>
    </div>
  );
}
