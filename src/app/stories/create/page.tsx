"use client";

import { createStory } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const storyFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
});

function StoryPage() {
  const router = useRouter();
  const session = useSession();
  const form = useForm({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  async function onSubmit(data: z.infer<typeof storyFormSchema>) {
    try {
      if (!session.data) throw new Error("No user in session");
      await createStory(data, session.data?.user.id);
      router.push("/stories");
    } catch (error) {
      console.log(error);
      toast.error("Failed create Story");
    }
  }
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold">StoryPage</h1>
      <Card className="w-full mt-5">
        <CardHeader>
          <CardTitle>Create Story</CardTitle>
          <CardDescription>
            Let your imagination hits the destiny
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      aria-invalid={fieldState.invalid}
                      placeholder="ex: Forge of the ancients..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="description"
                      aria-invalid={fieldState.invalid}
                      placeholder="ex: In a world where magic is real..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}

export default StoryPage;
