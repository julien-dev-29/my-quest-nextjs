import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "@/lib/server-session";
import {
  ArrowBigLeft,
  Key,
  Loader2Icon,
  Shield,
  User,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProfileUpdateForm from "./_components/profile-update-form";
import { ReactNode, Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent } from "@/components/ui/card";
import SessionManagement from "./_components/session-management";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (session == null) return redirect("/auth/login");
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <Button asChild variant="link">
            <Link className="text-teal-600" href="/">
            <ArrowBigLeft />
            Back to home
          </Link>
          </Button>
          <div>
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="yolo"
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <User />
          )}
          <div>
            <h1 className="text-4xl font-bold">{session.user.name}</h1>
            <p className="text-muted-foreground">{session.user.email}</p>
          </div>{" "}
        </div>{" "}
      </div>
      <Tabs defaultValue="profile" className="mt-5 space-y-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <User2Icon />
            <span className="max-sm:hidden">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield />
            <span className="max-sm:hidden">Security</span>
          </TabsTrigger>
          <TabsTrigger value="sessions">
            <Key />
            <span className="max-sm:hidden">Sessions</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileUpdateForm user={session.user} />
        </TabsContent>
        <TabsContent value="security">
          <LoadingSuspense>
            <SecutityTab
              currentSessionToken={session.session.token}
            ></SecutityTab>
          </LoadingSuspense>
        </TabsContent>
        <TabsContent value="sessions">
          <SessionsTab></SessionsTab>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LoadingSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader2Icon className="size-20 animate-spin" />}>
      {children}
    </Suspense>
  );
}

async function SecutityTab({
  currentSessionToken,
}: {
  currentSessionToken: string;
}) {
  const sessions = await auth.api.listSessions({ headers: await headers() });
  return (
    <Card>
      <CardContent>
        <SessionManagement
          sessions={sessions}
          currentSessionToken={currentSessionToken}
        />
      </CardContent>
    </Card>
  );
}

function SessionsTab() {
  return <div>SessionTab</div>;
}
