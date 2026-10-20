"use client";

import dynamic from "next/dynamic";
import { useCommandMenu } from "@/lib/command-menu-context";

interface DegreeInfo {
  slug: string;
  title: string;
  courses: string[];
}

const NetworkGraph = dynamic(
  () => import("@/components/NetworkGraph").then((m) => m.NetworkGraph),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-full min-h-150 flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-mono">Loading graph...</div>
      </div>
    ),
  },
);

/**
 * Renders the graph from the course summaries the root layout already sent.
 *
 * Passing the course list down from `/explore` as a prop would serialise a
 * second, byte-identical copy into the same document.
 *
 * NetworkGraph (sigma.js/WebGL) is loaded client-side only so the
 * visualization bundle stays off the initial explore-page JS.
 */
export function ExploreGraph({ degrees }: { degrees: DegreeInfo[] }) {
  const { courses } = useCommandMenu();

  return <NetworkGraph courses={courses} degrees={degrees} />;
}
