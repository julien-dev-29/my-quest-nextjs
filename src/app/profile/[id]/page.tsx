import { getUser } from "@/app/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);
  return (
    <div>
      <Button variant="link" className="text-teal-600" asChild>
        <Link href="/posts">
          <div className="flex gap-2 justify-center items-center">
            <ArrowLeftIcon />
            Back
          </div>
        </Link>
      </Button>
      <div className="flex gap-2 mt-2 justify-start items-center">
        <Avatar>
          <AvatarImage
            src={user?.image as string}
            alt={user?.image as string}
            width={64}
            height={64}
          />
          <AvatarFallback>
            {user?.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>{" "}
        <h1 className="text-4xl font-bold">{user?.name}</h1>
        <p className="mt-4">
          Ma bio est juste un texte statique pour linstant.
        </p>
    </div>
  );
}

export default Page;
