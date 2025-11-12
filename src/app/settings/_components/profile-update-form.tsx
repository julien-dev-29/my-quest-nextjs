"use client";

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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
const profileFormSchema = z.object({
  name: z
    .string()
    .min(5, "Username must be at least 5 characters.")
    .max(32, "Username must be at most 32 characters."),
  image: z.url(),
  email: z.email(),
});
function ProfileUpdateForm({
  user,
}: {
  user: { name: string; email: string; image?: string | null | undefined };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? "",
      email: user.email ?? "",
    },
  });
  async function onSubmit(data: z.infer<typeof profileFormSchema>) {
    const promises = [
      authClient.updateUser({
        name: data.name,
        image: data.image,
      }),
    ];
    if (data.email !== user.email) {
      promises.push(
        authClient.changeEmail({
          newEmail: data.email,
          callbackURL: "/profile",
        })
      );
    }
    const res = await Promise.all(promises);
    const userUpdateResult = res[0];
    const emailResult = res[1] ?? { error: false };
    if (userUpdateResult.error) {
      toast.error(userUpdateResult.error.message || "Failed to update profile");
    } else if (emailResult.error) {
      toast.error(emailResult.error.message || "Failed to update email");
    } else {
      toast.success("Profile update successfully");
    }
    router.refresh();
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Username</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Image URL</FieldLabel>
                  <Input
                    {...field}
                    id="image"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your image"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
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
          <Button type="submit" form="form-rhf-demo">
            Update Profile
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default ProfileUpdateForm;
