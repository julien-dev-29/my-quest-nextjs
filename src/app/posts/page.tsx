import CreatePostButton from "@/app/posts/_components/CreatePostButton";
import PostsLists from "@/app/posts/_components/PostsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Page() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="">
        <Button variant="link" size="lg" asChild>
          <Link href="/settings" className="text-teal-700">
            Settings
          </Link>
        </Button>
      </div>
      <CreatePostButton />
      <PostsLists />
    </div>
  );
}

export default Page;
