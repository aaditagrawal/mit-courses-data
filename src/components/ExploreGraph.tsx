'use client';

import { NetworkGraph } from '@/components/NetworkGraph';
import { useCommandMenu } from '@/lib/command-menu-context';

interface DegreeInfo {
    slug: string;
    title: string;
    courses: string[];
}

/**
 * Renders the graph from the course summaries the root layout already sent.
 *
 * Passing the course list down from `/explore` as a prop would serialise a
 * second, byte-identical copy into the same document.
 */
export function ExploreGraph({ degrees }: { degrees: DegreeInfo[] }) {
    const { courses } = useCommandMenu();

    return <NetworkGraph courses={courses} degrees={degrees} />;
}
