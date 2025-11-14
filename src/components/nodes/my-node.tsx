import { Handle, Position } from "@xyflow/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Circle } from "lucide-react";

function MyNode() {
  return (
    <Card className="p-5">
      <h1>Title</h1>
      <Button variant="destructive">Delete</Button>
      <Handle
        type="source"
        position={Position.Top}
      >
        <Circle />
      </Handle>
      <Handle type="target" position={Position.Bottom} />
    </Card>
  );
}

export default MyNode;
