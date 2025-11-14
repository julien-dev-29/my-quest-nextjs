"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import {
  NodeMouseHandler,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import NodeForm from "../_components/node-form";
import {
  Background,
  ColorMode,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import { Spinner } from "@/components/ui/spinner";
import "@xyflow/react/dist/style.css";
import {
  createEdge,
  createNode,
  getEdges,
  getNodes,
  StoryEdge,
  StoryNode,
} from "@/app/utils/local-storage";
const initialNodes: StoryNode[] = [];
const initialEdges: StoryEdge[] = [];
function MyReactFLow({ storyId }: { storyId: string }) {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<StoryNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<StoryEdge>(initialEdges);
  const { resolvedTheme } = useTheme();
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const storedNodes = getNodes(storyId);
      const storedEdges = getEdges(storyId)
      setNodes(storedNodes);
      setEdges(storedEdges)
    } catch (error) {
      console.error(error);
    }
  }, [setNodes,setEdges, storyId]);

  const onConnect = useCallback(
    // @ts-expect-error type
    (params) => {
      console.log(params);
      createEdge(params, storyId);
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    },
    [setEdges, storyId]
  );
  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const storyNode = node as StoryNode;
      setCurrentNode(storyNode);
      console.log("Nœud cliqué :", node);
    },
    []
  );
  function handleAddNode() {
    const newNode: StoryNode = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      storyId: storyId,
      position: { x: 0, y: nodes.length * 100 },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nodesSnapshot) => [...nodesSnapshot, newNode]);
    createNode(newNode, storyId);
  }
  if (!mounted) return <Spinner />;

  return (
    <div className="w-full h-full">
      <ReactFlow<StoryNode, StoryEdge>
        className="flex flex-col"
        colorMode={resolvedTheme as ColorMode}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left" className="flex gap-3">
          <SidebarTrigger className="text-teal-700" size="icon-lg" />
          <Button onClick={() => handleAddNode()}>
            <PlusIcon />
            Add Node
          </Button>
        </Panel>
        <Background />
        <Controls position="bottom-right" />
        <MiniMap position="bottom-left" />
      </ReactFlow>
      <Sheet open={!!currentNode} onOpenChange={() => setCurrentNode(null)}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Edit Node: {currentNode?.id}</SheetTitle>
          </SheetHeader>
          <NodeForm
            node={currentNode!}
            storyId={storyId}
            nodes={nodes}
            setNodes={setNodes}
            closeSheet={() => setCurrentNode(null)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MyReactFLow;
