import { getUser } from "@/app/actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeftIcon, User2Icon } from "lucide-react";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="p-4 space-y-2">
      <Button variant="link" className="text-teal-600" asChild>
        <Link href="/posts">
          <div className="flex gap-2 justify-center items-center">
            <ArrowLeftIcon />
            Back
          </div>
        </Link>
      </Button>
      <Item variant="outline">
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage
              src={user?.image as string}
              alt={user?.image as string}
              width={128}
              height={128}
            />
            <AvatarFallback>
              {user?.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-2xl font-bold">{user?.name}</ItemTitle>
          <ItemDescription>{user?.email}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button>
            <User2Icon />
            Invitation
          </Button>
        </ItemActions>
      </Item>
      {user?.posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>
              <Avatar>
                <AvatarImage
                  src={user?.image as string}
                  alt={user?.name as string}
                />
                <AvatarFallback>
                  {user?.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Page;
