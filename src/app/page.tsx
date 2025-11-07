"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();
  if (loading) return <Spinner />;
  return (
    <div className="my-6 px-5 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {session === null ? (
          <>
            <h1 className="text-3xl font-bold">Home</h1>
            <Button asChild>
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome</h1>
            {/** TODO: Add loading state */}
            <div className="space-x-2">
              <Button asChild>
                <Link href="/posts">Posts</Link>
              </Button>
              <Button asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={() => authClient.signOut()}
              >
                Sign Out
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
