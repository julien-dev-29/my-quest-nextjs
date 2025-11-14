"use client"

import { Edge, Node } from "@xyflow/react"

export type StoryNode = Node & {
    title: string
    content: string
    storyId: string
}

export type StoryEdge = Edge & {
    storyId: string
}

export function getNodes(storyId: string): StoryNode[] {
    const nodes: StoryNode[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("quest-node-")) {
            const raw = localStorage.getItem(key);
            if (!raw) continue;

            try {
                const data = JSON.parse(raw) as StoryNode;
                if (data.storyId === storyId)
                    nodes.push(data);
            } catch (err) {
                console.error("Erreur parsing node", key, err);
            }
        }
    }
    return nodes;
}

export function getEdges(storyId: string) {
    const edges: StoryEdge[] = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("quest-edge-")) {
            const raw = localStorage.getItem(key);
            if (!raw) continue;

            try {
                const data = JSON.parse(raw) as StoryEdge;
                if (data.storyId === storyId)
                    edges.push(data);
            } catch (err) {
                console.error("Erreur parsing node", key, err);
            }
        }
    }
    return edges
}

export function createEdge(edge: Edge, storyId: string) {
    const id = crypto.randomUUID()
    localStorage.setItem(`quest-edge-${id}`, JSON.stringify({ ...edge, storyId: storyId, id: id }))
}

export function updateEdge(edge: Edge) {
    localStorage.setItem(`quest-edge-${edge.id}`, JSON.stringify(edge))
}

export function createNode(node: StoryNode, storyId: string) {
    localStorage.setItem(`quest-node-${node.id}`, JSON.stringify({ ...node, storyId: storyId }))
}

export function updateNode(node: StoryNode) {
    localStorage.setItem(`quest-node-${node.id}`, JSON.stringify(node))
}