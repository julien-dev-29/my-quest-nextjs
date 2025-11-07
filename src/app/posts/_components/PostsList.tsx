import { getPosts } from "@/app/actions";
import { Post } from "../../../../generated/prisma/client";
import PostCard from "./post-card";

async function PostsLists() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-2 mt-5">
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsLists;
