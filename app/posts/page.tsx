import CreatePostButton from "@/components/posts/CreatePostButton";
import PostsLists from "@/components/posts/PostsList";
function Page() {
  return (
    <div className="p-5 h-full w-full relative">
      <CreatePostButton/>
      <PostsLists />
    </div>
  );
}

export default Page;
