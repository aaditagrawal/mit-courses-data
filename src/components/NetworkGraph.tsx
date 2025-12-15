'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Network, Options } from 'vis-network';
import { DataSet } from 'vis-data';

interface CourseNode {
    code: string;
    title: string;
    department: string;
}

interface NetworkGraphProps {
    courses: CourseNode[];
}

// Generate distinct colors for departments using HSL
function generateDepartmentColors(departments: string[]): Map<string, string> {
    const colorMap = new Map<string, string>();
    const uniqueDepts = [...new Set(departments)];

    uniqueDepts.forEach((dept, index) => {
        const hue = (index * 360) / uniqueDepts.length;
        // Vibrant colors with good saturation
        colorMap.set(dept, `hsl(${hue}, 70%, 55%)`);
    });

    return colorMap;
}

export function NetworkGraph({ courses }: NetworkGraphProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const networkRef = useRef<Network | null>(null);
    const router = useRouter();

    const handleNodeClick = useCallback((code: string) => {
        // Navigate to course page
        router.push(`/course/${encodeURIComponent(code)}`);
    }, [router]);

    useEffect(() => {
        if (!containerRef.current || courses.length === 0) return;

        // Generate department colors
        const departments = courses.map(c => c.department || 'Unknown');
        const colorMap = generateDepartmentColors(departments);

        // Create nodes
        const nodes = new DataSet(
            courses.map((course, index) => ({
                id: index,
                label: course.code,
                title: `${course.title}\n${course.department || 'Unknown'}`,
                color: {
                    background: colorMap.get(course.department || 'Unknown') || '#666',
                    border: 'transparent',
                    highlight: {
                        background: colorMap.get(course.department || 'Unknown') || '#666',
                        border: '#fff',
                    },
                    hover: {
                        background: colorMap.get(course.department || 'Unknown') || '#666',
                        border: '#fff',
                    },
                },
                font: {
                    color: '#fff',
                    size: 12,
                    face: 'Commit Mono, monospace',
                    strokeWidth: 2,
                    strokeColor: 'rgba(0,0,0,0.5)',
                },
                shape: 'dot',
                size: 15 + Math.random() * 10, // Slight variation for visual interest
                borderWidth: 0,
                borderWidthSelected: 2,
                shadow: {
                    enabled: true,
                    color: 'rgba(0,0,0,0.3)',
                    size: 10,
                    x: 0,
                    y: 3,
                },
                // Store code for click handling
                courseCode: course.code,
            }))
        );

        // Create prefix hub nodes and connect courses to them
        // Extract prefix from course code (e.g., "ECE" from "ECE 1234")
        const prefixGroups = new Map<string, { indices: number[]; department: string }>();

        courses.forEach((course, index) => {
            const prefix = course.code.split(/\s+/)[0]; // Get first part before space
            if (!prefixGroups.has(prefix)) {
                prefixGroups.set(prefix, { indices: [], department: course.department || 'Unknown' });
            }
            prefixGroups.get(prefix)!.indices.push(index);
        });

        // Add hub nodes for each prefix
        let hubNodeId = courses.length; // Start hub IDs after course nodes
        const hubNodes: Array<{
            id: number;
            label: string;
            title: string;
            color: { background: string; border: string; highlight: { background: string; border: string }; hover: { background: string; border: string } };
            font: { color: string; size: number; face: string; bold: { color: string; size: number } };
            shape: string;
            size: number;
            borderWidth: number;
            shadow: { enabled: boolean; color: string; size: number; x: number; y: number };
        }> = [];

        const edges = new DataSet<{ id: string; from: number; to: number; color: { color: string; opacity: number } }>();

        prefixGroups.forEach((group, prefix) => {
            const color = colorMap.get(group.department) || '#666';
            hubNodes.push({
                id: hubNodeId,
                label: prefix,
                title: `${prefix} courses (${group.indices.length})`,
                color: {
                    background: color,
                    border: 'rgba(255,255,255,0.3)',
                    highlight: {
                        background: color,
                        border: '#fff',
                    },
                    hover: {
                        background: color,
                        border: '#fff',
                    },
                },
                font: {
                    color: '#fff',
                    size: 14,
                    face: 'Commit Mono, monospace',
                    bold: { color: '#fff', size: 14 },
                },
                shape: 'dot',
                size: 25 + Math.min(group.indices.length, 20), // Larger based on course count
                borderWidth: 2,
                shadow: {
                    enabled: true,
                    color: 'rgba(0,0,0,0.4)',
                    size: 15,
                    x: 0,
                    y: 5,
                },
            });

            // Create edges from each course to its hub
            group.indices.forEach(nodeIndex => {
                edges.add({
                    id: `${nodeIndex}-hub-${hubNodeId}`,
                    from: nodeIndex,
                    to: hubNodeId,
                    color: { color, opacity: 0.25 },
                });
            });

            hubNodeId++;
        });

        // Add hub nodes to the dataset
        hubNodes.forEach(hub => nodes.add(hub as any));

        const options: Options = {
            nodes: {
                shape: 'dot',
                scaling: {
                    min: 10,
                    max: 30,
                },
            },
            edges: {
                width: 1,
                smooth: {
                    enabled: true,
                    type: 'continuous',
                    roundness: 0.5,
                },
                color: {
                    inherit: false,
                    opacity: 0.15,
                },
            },
            physics: {
                enabled: true,
                solver: 'forceAtlas2Based',
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
        network.on('click', (params) => {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const nodeData = nodes.get(nodeId) as { courseCode?: string } | null;
                if (nodeData?.courseCode) {
                    handleNodeClick(nodeData.courseCode);
                }
            }
        });

        // Change cursor on hover
        network.on('hoverNode', () => {
            if (containerRef.current) {
                containerRef.current.style.cursor = 'pointer';
            }
        });

        network.on('blurNode', () => {
            if (containerRef.current) {
                containerRef.current.style.cursor = 'grab';
            }
        });

        network.on('dragStart', () => {
            if (containerRef.current) {
                containerRef.current.style.cursor = 'grabbing';
            }
        });

        network.on('dragEnd', () => {
            if (containerRef.current) {
                containerRef.current.style.cursor = 'grab';
            }
        });

        // Cleanup
        return () => {
            network.destroy();
            networkRef.current = null;
        };
    }, [courses, handleNodeClick]);

    return (
        <div className="relative w-full h-full">
            {/* Graph container */}
            <div
                ref={containerRef}
                className="w-full h-full cursor-grab"
                style={{ minHeight: '600px' }}
            />

            {/* Loading indicator shown initially */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-500" id="graph-loading">
                <div className="text-muted-foreground text-sm font-mono">
                    Initializing graph...
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 p-3 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-mono text-muted-foreground max-w-xs">
                <div className="mb-2 font-semibold text-foreground">Controls</div>
                <div>• Scroll to zoom</div>
                <div>• Drag to pan</div>
                <div>• Click node to view course</div>
                <div>• Hover for details</div>
            </div>
        </div>
    );
}
