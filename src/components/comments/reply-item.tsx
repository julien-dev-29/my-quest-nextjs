"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { ThumbsUpIcon } from "lucide-react";
import { Comment as CommentType } from "@/types/types";
import { useSession } from "@/lib/auth-client";
import { addLikeToComment, deleteLikeFromComment } from "@/app/actions";

function ReplyItem({ comment }: { comment: CommentType }) {
  const session = useSession();

  const hasLiked = comment.likes?.some(
    (l) => l.userId === session.data?.user.id
  );
  const handleLike = async (comment: CommentType) => {
    try {
      if (!session.data?.user?.id) {
        throw new Error("User not authenticated");
      }
      if (hasLiked) {
        await deleteLikeFromComment(comment, session.data.user.id);
      } else {
        await addLikeToComment(comment, session.data.user.id);
      }
    } catch (error) {
      console.error("Failed to update like:", error);
      throw new Error("Failed to update like");
    }
  };
  return (
    <div className="flex flex-col justify-between items-start gap-3 border-l pl-4 mt-3">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={comment.user?.image} alt={comment.user?.name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{comment.user?.name}</span>
      </div>

      <div className="text-gray-700">{comment.content}</div>

      <div className="flex items-center gap-2 mt-1">
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => handleLike(comment)}
        >
          <ThumbsUpIcon
            className={`w-4 h-4 ${hasLiked ? "text-blue-600" : ""}`}
          />
          {comment.likes?.length ? (
            <span className="ml-1 text-sm">{comment.likes.length}</span>
          ) : null}
        </Button>
      </div>
    </div>
  );
}

export default ReplyItem;
