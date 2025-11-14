"use client";

import { StoryNode, updateNode } from "@/app/utils/local-storage";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Node } from "@xyflow/react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
const formSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(2),
});
function NodeForm({
  node,
  storyId,
  nodes,
  setNodes,
  closeSheet,
}: {
  node: StoryNode;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<StoryNode[]>>;
  storyId: string;
  closeSheet: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: node?.title ?? "",
      content: node?.content ?? "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const updatedNode = {
        ...node,
        data: {
          ...data,
          label: data.title,
        },
        title: data.title,
        content: data.content,
        storyId: storyId,
      };
      updateNode(updatedNode);
      setNodes((prev: StoryNode[]) => {
        return prev.map((n) => (n.id === node.id ? updatedNode : n));
      });
      closeSheet();
      console.log(data);
      toast.info(data.title);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Title</FieldLabel>
              <Input {...field} id="title" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                {...field}
                id="content"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SheetFooter className="flex">
        <Button type="submit">Save changes</Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
}

export default NodeForm;
