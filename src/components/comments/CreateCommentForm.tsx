"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  content: z.string().min(2),
});

function CreateCommentForm({
  postId,
  parentId,
  onCancel,
}: {
  postId: string | null;
  parentId: string | null;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createComment(data, postId, parentId);
    } catch (error) {
      toast.error(error as string);
    }
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <CardContent className="flex flex-col mt-5">
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder={parentId ? "Reply..." : "Add a comment..."}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="self-end mt-3 space-x-0.5">
          <Button type="submit">
            Add
            <CirclePlusIcon />{" "}
          </Button>
          <Button variant="destructive" type="button" onClick={onCancel}>
            Close
          </Button>
        </div>
      </CardContent>
    </form>
  );
}

export default CreateCommentForm;
