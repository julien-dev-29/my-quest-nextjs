import { CardContent } from "@/components/ui/card";
import type { Post } from "@/types/types";
import CommentItem from "./CommentItem";

function Comments({ post }: { post: Post }) {
  return (
    <CardContent className="flex flex-col gap-4">
      {post.comments?.map((comment) => (
        <div key={comment.id} className="flex flex-col gap-2">
          <CommentItem postId={post.id!} comment={comment} />
        </div>
      ))}
    </CardContent>
  );
}

export default Comments;
