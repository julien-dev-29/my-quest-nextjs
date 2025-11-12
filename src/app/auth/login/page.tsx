"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LoginForm } from "./_components/login-form";
import Image from "next/image";

export default function LoginPage() {
  
  const router = useRouter();
  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data !== null) router.push("/posts");
    });
  }, [router]);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/death.jpg"
          width={500}
          height={500}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
