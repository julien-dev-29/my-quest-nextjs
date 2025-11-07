"use client"

import { ReactNode } from "react";
import { Alert } from "@/components/ui/alert";

function ErrorPage({ children }: { children: ReactNode }) {
  return (
    <div>
      <Alert>{children}</Alert>
    </div>
  );
}

export default ErrorPage;
